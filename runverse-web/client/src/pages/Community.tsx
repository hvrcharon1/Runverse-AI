import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Heart, MessageCircle, Share2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Community() {
  const { user } = useAuth();
  const { data: feed, isLoading, refetch } = trpc.social.posts.feed.useQuery();
  const createPost = trpc.social.posts.create.useMutation();
  const likePost = trpc.social.posts.like.useMutation();
  const [postContent, setPostContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast.error("Post cannot be empty");
      return;
    }

    try {
      await createPost.mutateAsync({
        content: postContent,
      });
      toast.success("Post shared!");
      setPostContent("");
      refetch();
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  const handleLike = async (postId: number) => {
    try {
      await likePost.mutateAsync({ postId });
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Community
          </h1>
          <p className="text-muted-foreground">
            Share your runs and connect with other runners
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            {user && (
              <Card className="p-6">
                <form onSubmit={handleCreatePost}>
                  <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Share your run or thoughts..."
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={createPost.isPending || !postContent.trim()}
                    >
                      {createPost.isPending ? "Posting..." : "Share"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Feed Posts */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : feed && feed.length > 0 ? (
              feed.map((post) => (
                <Card key={post.id} className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        Runner
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-4">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{post.likes || 0} likes</span>
                    <span>0 comments</span>
                  </div>

                  {/* Post Actions */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 flex-1"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedPosts.has(post.id)
                            ? "fill-accent text-accent"
                            : ""
                        }`}
                      />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 flex-1">
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 flex-1">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No posts yet. Be the first to share!
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {["#MorningRuns", "#MarathonTraining", "#RunningCommunity"].map(
                  (tag) => (
                    <div key={tag} className="cursor-pointer hover:text-accent transition">
                      <p className="text-sm font-medium text-accent">{tag}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 10000)} posts
                      </p>
                    </div>
                  )
                )}
              </div>
            </Card>

            {/* Suggested Runners */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Suggested Runners
              </h3>
              <div className="space-y-3">
                {["Sarah Runner", "Mike Jogger", "Emma Marathoner"].map(
                  (name) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20" />
                        <p className="text-sm font-medium text-foreground">
                          {name}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
