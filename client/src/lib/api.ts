// Get API URL from environment variable or use empty string as fallback
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'An error occurred' };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error' };
    }
  }

  // Auth endpoints
  async getUser() {
    return this.request('/api/auth/user');
  }

  async login() {
    if (typeof window !== 'undefined') {
      window.location.href = `${this.baseURL}/api/auth/google`;
    }
  }

  async logout() {
    return this.request('/api/auth/logout');
  }

  // Product endpoints
  async getProducts(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/api/products?${queryString}` : '/api/products';
    return this.request(endpoint);
  }

  async getProduct(id: number) {
    return this.request(`/api/products/${id}`);
  }

  async createProduct(data: any) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: number, data: any) {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: number) {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Category endpoints
  async getCategories() {
    return this.request('/api/categories');
  }

  async createCategory(data: any) {
    return this.request('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Cart endpoints
  async getCart() {
    return this.request('/api/cart');
  }

  async addToCart(data: any) {
    return this.request('/api/cart', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCartItem(id: number, quantity: number) {
    return this.request(`/api/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(id: number) {
    return this.request(`/api/cart/${id}`, {
      method: 'DELETE',
    });
  }

  // Order endpoints
  async getOrders() {
    return this.request('/api/orders');
  }

  async createOrder(data: any) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Contact endpoints
  async sendContactMessage(data: any) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Admin endpoints
  async getAdminOrders() {
    return this.request('/api/admin/orders');
  }

  async getAdminUsers() {
    return this.request('/api/admin/users');
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 