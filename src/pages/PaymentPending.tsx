import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertTriangle, Clock, ArrowRight, CheckCircle2, PackageCheck } from "lucide-react";
import { api, type ApiOrder } from "../services/api";

const PaymentPending = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    api.getOrderById(orderId)
      .then((data) => {
        setOrder(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F2] pt-36 text-center text-[#080808]">
        <div className="mx-auto max-w-md px-6">
          <div className="mx-auto h-8 w-8 animate-spin border-2 border-black border-t-[#FF0000]" />
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-black/60">
            Retrieving Order Status...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F2] pt-24 text-[#080808] sm:pt-32">
      <div className="mx-auto max-w-4xl px-6 pb-24 lg:px-10">
        
        {/* SUCCESSFUL REGISTRATION ICON */}
        <div className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#FF0000]">
          <PackageCheck size={20} />
          <span>Order Registered</span>
        </div>

        <h1 className="text-3xl font-black uppercase leading-tight tracking-[-0.05em] sm:text-5xl">
          Order #{orderId}<span className="text-[#FF0000]">.</span>
        </h1>

        <p className="mt-3 text-sm text-black/60 sm:text-base">
          Thank you! Your order request has been successfully recorded in our system.
        </p>

        {/* MANDATORY PAYMENT NOTICE BANNER */}
        <div className="mt-8 border-2 border-amber-500/30 bg-amber-50/80 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-700">
              <AlertTriangle size={22} />
            </div>

            <div className="flex-1">
              <h2 className="text-sm font-black uppercase tracking-wider text-amber-900 sm:text-base">
                Notice: Online Payments Are Currently Disabled
              </h2>
              
              <p className="mt-2 text-xs leading-relaxed text-amber-800 sm:text-sm">
                No payment transaction has occurred, and your bank account or payment method has <strong>NOT</strong> been charged. In accordance with store policy, real payment gateways are temporarily disabled.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 rounded-none bg-amber-200/60 px-3 py-1.5 uppercase tracking-wider text-amber-900">
                  <Clock size={14} />
                  Payment Status: {order?.paymentStatus || "PENDING_PAYMENT"}
                </span>

                <span className="flex items-center gap-1.5 rounded-none bg-black/10 px-3 py-1.5 uppercase tracking-wider text-black">
                  <CheckCircle2 size={14} />
                  Order Status: {order?.orderStatus || "PLACED"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY CARD */}
        {order && (
          <div className="mt-10 border border-black/10 bg-white p-6 sm:p-10">
            <h3 className="mb-6 text-base font-black uppercase tracking-wider border-b border-black/10 pb-4">
              Order Details
            </h3>

            {/* Grid of info */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Customer</p>
                <p className="mt-1 font-bold">{order.customer.fullName}</p>
                <p className="text-xs text-black/60">{order.customer.email}</p>
                <p className="text-xs text-black/60">{order.customer.phone}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Shipping Address</p>
                <p className="mt-1 font-bold">{order.shippingAddress.street}</p>
                <p className="text-xs text-black/60">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p className="text-xs text-black/60">{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-black/40">Items</p>
              <div className="flex flex-col gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-bold uppercase">{item.name}</span>
                      <span className="ml-2 text-black/50">({item.size} × {item.quantity})</span>
                    </div>
                    <span className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total calculation */}
            <div className="mt-8 border-t border-black/10 pt-6 flex flex-col gap-2 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#080808] pt-2 border-t border-black/10">
                <span>Total Amount</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/men"
            className="inline-flex items-center justify-center gap-3 bg-[#080808] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#FF0000]"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/"
            className="text-center text-xs font-bold uppercase tracking-[0.15em] text-black/60 hover:text-black"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PaymentPending;
