// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

// Category types
export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
  id: number;
  userId?: string;
  sessionId?: string;
  total: number;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

// Contact types
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
} 