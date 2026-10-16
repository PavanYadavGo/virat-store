import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye, AlertCircle, X, ShieldAlert, Loader2 } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { api, type ApiOrder } from "../../services/api";

const AdminOrders = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;
    api
      .getAdminOrders(token)
      .then((items) => {
        if (isMounted) {
          setOrders(items);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed loading orders");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, navigate]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    if (!token) return;
    try {
      const updated = await api.updateAdminOrderStatus(token, orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: updated.orderStatus } : o))
      );
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: updated.orderStatus });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed updating status");
    }
  };

  return (
    <AdminLayout title="Order Management">
      {error && (
        <div className="mb-6 flex items-center gap-3 border border-red-500/30 bg-red-50 p-4 text-xs font-bold text-red-800">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* TOP SUMMARY */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-black/50">
          {orders.length} Total Orders Registered
        </p>
      </div>

      {/* ORDERS TABLE */}
      {loading ? (
        <div className="border border-black/10 bg-white p-12 text-center">
          <Loader2 size={32} className="mx-auto animate-spin text-black/30" />
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-black/50">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-black/10 bg-white p-12 text-center">
          <Clock size={32} className="mx-auto text-black/30" />
          <h3 className="mt-4 text-base font-black uppercase tracking-tight">No Orders Yet</h3>
          <p className="mt-1 text-xs text-black/50">When customers place orders, they will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-black/10 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/10 bg-[#F5F5F2] uppercase tracking-wider text-black/60">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {orders.map((o) => (
                <tr key={o.orderId} className="hover:bg-black/[0.02]">
                  <td className="px-6 py-4 font-mono font-bold text-black">
                    {o.orderId}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-[#080808]">{o.customer?.fullName}</p>
                    <p className="text-[10px] text-black/50">{o.customer?.email}</p>
                  </td>

                  <td className="px-6 py-4 font-semibold text-black/70">
                    {o.items?.reduce((acc, it) => acc + it.quantity, 0)} items
                  </td>

                  <td className="px-6 py-4 font-black text-black">
                    ₹{o.total?.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-amber-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-amber-900">
                      Pending
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleUpdateStatus(o.orderId, e.target.value)}
                      className="border border-black/20 bg-transparent px-2 py-1 font-bold uppercase text-[10px] tracking-wider outline-none focus:border-[#FF0000]"
                    >
                      <option value="placed">Placed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="p-1.5 text-black/50 hover:text-black"
                      title="Inspect Order Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-black/10 bg-white p-8">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF0000]">Order Inspection</span>
                <h2 className="text-xl font-black uppercase tracking-tight">{selectedOrder.orderId}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-black/50 hover:text-black">
                <X size={20} />
              </button>
            </div>

            {/* Invariant Banner */}
            <div className="mt-4 flex items-center gap-2 border border-amber-500/20 bg-amber-50 p-3 text-[11px] font-bold text-amber-900">
              <ShieldAlert size={16} />
              <span>Payment status is permanently tracked as PENDING PAYMENT (no real transactions).</span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 text-xs">
              <div>
                <p className="font-bold uppercase tracking-wider text-black/40">Customer</p>
                <p className="mt-1 font-black text-sm">{selectedOrder.customer?.fullName}</p>
                <p className="text-black/70">{selectedOrder.customer?.email}</p>
                <p className="text-black/70">{selectedOrder.customer?.phone}</p>
              </div>

              <div>
                <p className="font-bold uppercase tracking-wider text-black/40">Delivery Destination</p>
                <p className="mt-1 font-bold">{selectedOrder.shippingAddress?.street}</p>
                <p className="text-black/70">
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}{" "}
                  {selectedOrder.shippingAddress?.postalCode}
                </p>
                <p className="text-black/70">{selectedOrder.shippingAddress?.country}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-6 border-t border-black/10 pt-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-black/40">Line Items</p>
              <div className="flex flex-col gap-3">
                {selectedOrder.items?.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold uppercase">{it.name}</p>
                      <p className="text-[10px] text-black/50">Size: {it.size} | Qty: {it.quantity} | Unit: ₹{it.price}</p>
                    </div>
                    <span className="font-bold">₹{(it.price * it.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial summary */}
            <div className="mt-6 border-t border-black/10 pt-4 flex flex-col gap-2 text-xs uppercase tracking-wider">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Shipping Fee</span>
                <span>{selectedOrder.shippingFee === 0 ? "FREE" : `₹${selectedOrder.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#080808] border-t border-black/10 pt-2">
                <span>Total Amount Due</span>
                <span>₹{selectedOrder.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-[#080808] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#FF0000]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
