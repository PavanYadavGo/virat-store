const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface ApiProduct {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  badge?: string;
  sizes: string[];
  stock: number;
  isActive: boolean;
  priceUnconfirmed?: boolean;
}

export interface ApiOrder {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  orderStatus: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending_payment";
  createdAt: string;
}

export const api = {
  // Products
  async getProducts(category?: string): Promise<ApiProduct[]> {
    try {
      const url = category
        ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
        : `${API_BASE}/products`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed fetching products");
      const json = await res.json();
      return json.data || [];
    } catch (e) {
      console.warn("[API] Falling back for products:", e);
      return [];
    }
  },

  async getProductById(id: string): Promise<ApiProduct | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Product not found");
      const json = await res.json();
      return json.data || null;
    } catch (e) {
      console.warn("[API] Product detail fetch error:", e);
      return null;
    }
  },

  // Orders
  async createOrder(orderPayload: {
    customer: { fullName: string; email: string; phone: string };
    shippingAddress: { street: string; city: string; state: string; postalCode: string; country?: string };
    items: Array<{ productId: string; size: string; quantity: number }>;
  }): Promise<{ success: boolean; data?: ApiOrder; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const json = await res.json();
      if (!res.ok) {
        return { success: false, error: json.error || "Order placement failed" };
      }
      return { success: true, data: json.data };
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "Network error while creating order";
      return { success: false, error: err };
    }
  },

  async getOrderById(orderId: string): Promise<ApiOrder | null> {
    try {
      const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}`);
      if (!res.ok) throw new Error("Order not found");
      const json = await res.json();
      return json.data || null;
    } catch (e) {
      console.warn("[API] Fetch order error:", e);
      return null;
    }
  },

  // Contact
  async submitContact(formData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        return { success: false, error: json.error || "Contact submission failed" };
      }
      return { success: true, message: json.message };
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "Network error sending message";
      return { success: false, error: err };
    }
  },

  // Admin Auth
  async adminLogin(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        return { success: false, error: json.error || "Login failed" };
      }
      return { success: true, token: json.token };
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "Network error during login";
      return { success: false, error: err };
    }
  },

  // Admin Dashboard
  async getAdminStats(token: string) {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch admin stats");
    const json = await res.json();
    return json.data;
  },

  async getAdminProducts(token: string): Promise<ApiProduct[]> {
    const res = await fetch(`${API_BASE}/admin/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const json = await res.json();
    return json.data || [];
  },

  async createAdminProduct(token: string, productData: Partial<ApiProduct>) {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to create product");
    return json.data;
  },

  async updateAdminProduct(token: string, id: string, productData: Partial<ApiProduct>) {
    const res = await fetch(`${API_BASE}/admin/products/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update product");
    return json.data;
  },

  async deleteAdminProduct(token: string, id: string) {
    const res = await fetch(`${API_BASE}/admin/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to delete product");
    return true;
  },

  async getAdminOrders(token: string): Promise<ApiOrder[]> {
    const res = await fetch(`${API_BASE}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    const json = await res.json();
    return json.data || [];
  },

  async updateAdminOrderStatus(token: string, orderId: string, orderStatus: string) {
    const res = await fetch(`${API_BASE}/admin/orders/${encodeURIComponent(orderId)}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderStatus }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to update order status");
    return json.data;
  },
};

