import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(product.id, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          {product.featured && (
            <Badge className="ml-2 flex-shrink-0 bg-secondary">
              Featured
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
          <Link href={`/product/${product.id}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
