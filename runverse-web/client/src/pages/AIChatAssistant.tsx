import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";

export default function AIChatAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm your RunVerse AI Assistant. I can help you with training plans, nutrition advice, recovery tips, and answer any running-related questions. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatQuery = trpc.social.posts.create.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulating AI response for now
      const response = {
        reply: `Thanks for your question about "${userMessage}". As your AI running coach, I'm here to help! This feature will be enhanced with full AI integration soon.`,
      };

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Running Coach
          </h1>
          <p className="text-muted-foreground">
            Get personalized advice from your AI running assistant
          </p>
        </div>

        {/* Chat Container */}
        <Card className="flex flex-col h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Streamdown>{message.content}</Streamdown>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-6">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about running..."
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </Button>
            </form>
          </div>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "What's a good training plan for a 5K?",
              "How should I fuel before a long run?",
              "How do I prevent running injuries?",
              "What's the best recovery routine?",
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => {
                  setInput(question);
                  setTimeout(() => {
                    const form = document.querySelector(
                      "form"
                    ) as HTMLFormElement;
                    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));
                  }, 0);
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{question}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
