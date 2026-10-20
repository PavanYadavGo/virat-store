import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getImagePresentation } from "../utils/imagePresentation";
import { api } from "../services/api";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const shippingFee = subtotal >= 1500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F5F2] pt-32 text-center text-[#080808]">
        <div className="mx-auto max-w-lg px-6 py-20">
          <h2 className="text-2xl font-black uppercase tracking-tight">Your Cart is Empty</h2>
          <p className="mt-2 text-sm text-black/60">Add items to your cart before proceeding to checkout.</p>
          <Link
            to="/men"
            className="mt-6 inline-flex items-center gap-2 bg-[#080808] px-6 py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-[#FF0000]"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side field validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please complete all customer contact fields.");
      return;
    }

    if (!formData.street.trim() || !formData.city.trim() || !formData.state.trim() || !formData.postalCode.trim()) {
      setErrorMessage("Please complete all shipping address fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map((item) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),
      };

      const result = await api.createOrder(orderPayload);

      if (result.success && result.data?.orderId) {
        clearCart();
        navigate(`/order/${result.data.orderId}/payment`);
      } else {
        setErrorMessage(result.error || "Failed creating order. Please verify your items.");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F2] pt-24 text-[#080808] sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        
        {/* BREADCRUMB */}
        <div className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
          <Link to="/cart" className="flex items-center gap-1 hover:text-[#FF0000]">
            <ArrowLeft size={12} />
            Back to Bag
          </Link>
          <span>/</span>
          <span className="text-black">Checkout</span>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF0000]">
            Fast & Secure
          </p>
          <h1 className="text-3xl font-black uppercase leading-tight tracking-[-0.05em] sm:text-5xl">
            Checkout Details<span className="text-[#FF0000]">.</span>
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-8 flex items-center gap-3 border border-red-500/20 bg-red-50 p-4 text-xs font-bold text-red-700">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          
          {/* LEFT: CUSTOMER & ADDRESS INPUTS */}
          <div className="flex flex-col gap-10">
            {/* 1. Customer Information */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <h2 className="mb-6 text-sm font-black uppercase tracking-[0.15em] text-[#080808]">
                1. Customer Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Virat Kohli"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="virat@example.com"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="border border-black/10 bg-white p-6 sm:p-8">
              <h2 className="mb-6 text-sm font-black uppercase tracking-[0.15em] text-[#080808]">
                2. Shipping Address
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Apartment, suite, street name"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Karnataka"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="560001"
                    className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    disabled
                    value={formData.country}
                    className="w-full border border-black/10 bg-black/5 px-4 py-3 text-sm font-medium text-black/60 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div>
            <div className="sticky top-28 border border-black/10 bg-white p-8">
              <h2 className="mb-6 text-xl font-black uppercase tracking-tight">
                Review Order
              </h2>

              {/* Items Preview */}
              <div className="flex flex-col gap-4 border-b border-black/10 pb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const pres = getImagePresentation(item.image, { context: "thumbnail" });
                        return (
                          <div
                            style={pres.containerStyle}
                            className={`h-12 w-12 shrink-0 overflow-hidden border border-black/10 ${pres.containerClass}`}
                          >
                            <img src={item.image} alt={item.name} className={pres.imageClass} />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-bold uppercase text-[#080808]">{item.name}</p>
                        <p className="text-black/50">Size: {item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-3 border-b border-black/10 py-6 text-xs uppercase tracking-wider text-black/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-black">{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between py-6">
                <span className="text-sm font-black uppercase tracking-[0.1em]">Total Due</span>
                <span className="text-2xl font-black text-[#080808]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-[#080808] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#FF0000] disabled:bg-black/50"
              >
                {isSubmitting ? (
                  <span>Verifying & Creating Order...</span>
                ) : (
                  <>
                    <span>Confirm Order & Proceed</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center gap-2 text-[11px] font-medium text-black/50">
                <ShieldCheck size={16} className="shrink-0 text-black/70" />
                <span>Orders are verified and recorded directly by the Virat Store server.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;

