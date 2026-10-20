import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getImagePresentation } from "../utils/imagePresentation";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const shippingFee = subtotal >= 1500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shippingFee;
  const freeShippingThreshold = 1500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F5F2] pt-28 text-[#080808] sm:pt-36">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5 text-black/40">
            <ShoppingBag size={36} strokeWidth={1.5} />
          </div>

          <h1 className="mt-8 text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">
            Your Bag is Empty<span className="text-[#FF0000]">.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm text-black/60 sm:text-base">
            Gear up with our high-performance sportswear, cricket equipment, and apparel built for movement.
          </p>

          <div className="mt-10">
            <Link
              to="/men"
              className="inline-flex items-center gap-3 bg-[#080808] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#FF0000]"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F2] pt-24 text-[#080808] sm:pt-32">
      {/* HEADER */}
      <section className="border-b border-black/10 pb-8 pt-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            <Link to="/" className="hover:text-[#FF0000]">Home</Link>
            <span>/</span>
            <span className="text-black">Shopping Bag</span>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF0000]">
                Review Selection
              </p>
              <h1 className="text-3xl font-black uppercase leading-tight tracking-[-0.05em] sm:text-5xl">
                Shopping Bag ({itemCount})<span className="text-[#FF0000]">.</span>
              </h1>
            </div>

            <Link
              to="/men"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-black/50 hover:text-black"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* FREE SHIPPING PROGRESS */}
          {amountToFreeShipping > 0 ? (
            <div className="mt-6 rounded-none border border-black/10 bg-white/60 p-4">
              <p className="text-xs font-medium text-black/80">
                Add <span className="font-bold text-[#FF0000]">₹{amountToFreeShipping.toLocaleString("en-IN")}</span> more to qualify for <span className="font-bold">Free Express Delivery</span>.
              </p>
              <div className="mt-2 h-1.5 w-full bg-black/10">
                <div
                  className="h-full bg-[#FF0000] transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-6 border border-green-600/20 bg-green-50/50 p-4 text-xs font-bold uppercase tracking-wider text-green-800">
              ✓ You have unlocked FREE Express Delivery!
            </div>
          )}
        </div>
      </section>

      {/* CART CONTENT GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          
          {/* ITEMS LIST */}
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.size}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-6 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Product Image & Details */}
                <div className="flex items-center gap-5">
                  {(() => {
                    const pres = getImagePresentation(item.image, { context: "thumbnail" });
                    return (
                      <div
                        style={pres.containerStyle}
                        className={`h-24 w-24 shrink-0 overflow-hidden border border-black/10 ${pres.containerClass}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={pres.imageClass}
                        />
                      </div>
                    );
                  })()}

                  <div>
                    {item.category && (
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                        {item.category}
                      </p>
                    )}
                    <h3 className="text-base font-bold uppercase tracking-tight text-[#080808]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-black/60">
                      Size: <span className="font-bold text-black">{item.size}</span>
                    </p>
                    <p className="mt-2 text-sm font-black text-[#080808]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  <div className="flex items-center border border-black/20 bg-white">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="p-2 transition-colors hover:text-[#FF0000]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="p-2 transition-colors hover:text-[#FF0000]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="w-24 text-right text-base font-bold">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="p-2 text-black/30 transition-colors hover:text-[#FF0000]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <div className="border border-black/10 bg-white p-8">
              <h2 className="mb-6 text-xl font-black uppercase tracking-tight">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 border-b border-black/10 pb-6 text-xs uppercase tracking-wider text-black/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-black">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Estimate</span>
                  <span className="font-bold text-black">Included in Price</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between py-6">
                <span className="text-sm font-black uppercase tracking-[0.1em]">Total</span>
                <span className="text-2xl font-black text-[#080808]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-[#080808] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#FF0000]"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-6 flex flex-col gap-2 text-[10px] text-black/40">
                <p>• Free shipping on orders over ₹1,500 across India.</p>
                <p>• 15-day return and exchange policy on unworn merchandise.</p>
                <p>• Strict security: Prices verified directly by store backend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;

