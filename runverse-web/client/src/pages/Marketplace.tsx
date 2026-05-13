import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ShoppingBag, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Marketplace() {
  const { data: listings, isLoading } = trpc.marketplace.listings.browse.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["shoes", "gear", "apparel", "nutrition", "accessories"];

  const filteredListings = selectedCategory
    ? listings?.filter((l) => l.category === selectedCategory)
    : listings;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              RunMarket
            </h1>
            <p className="text-muted-foreground">
              Buy, sell, and trade running gear with the community
            </p>
          </div>
          <Link href="/marketplace/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              List Item
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            All Items
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredListings && filteredListings.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:border-accent/50 transition-colors cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-accent/40" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded capitalize">
                      {listing.category}
                    </span>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {listing.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  {/* Condition Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      {listing.condition}
                    </span>
                    {listing.mileage && (
                      <span className="text-xs text-muted-foreground">
                        {listing.mileage} km
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    {listing.isFree ? (
                      <span className="text-lg font-bold text-accent">Free</span>
                    ) : (
                      <span className="text-lg font-bold text-foreground">
                        ${(parseFloat(String(listing.price || 0))).toFixed(2)}
                      </span>
                    )}
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No items found in this category
            </p>
            <Link href="/marketplace/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                List First Item
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
