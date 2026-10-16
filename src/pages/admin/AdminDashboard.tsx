import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ShoppingBag, Clock, Mail, ArrowUpRight, Plus, RefreshCw } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { api } from "../../services/api";

const AdminDashboard = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<{
    totalProducts: number;
    activeProducts: number;
    totalOrders: number;
    pendingPaymentOrders: number;
    totalContacts: number;
  }>({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    pendingPaymentOrders: 0,
    totalContacts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;
    api
      .getAdminStats(token)
      .then((data) => {
        if (isMounted && data) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (isMounted) {
          console.error("Failed loading stats:", e);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, navigate]);

  const handleRefresh = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await api.getAdminStats(token);
      if (data) setStats(data);
    } catch (e: unknown) {
      console.error("Failed loading stats:", e);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      sublabel: `${stats.activeProducts} active on storefront`,
      icon: Package,
      link: "/admin/products",
      color: "text-black",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      sublabel: "Registered in store database",
      icon: ShoppingBag,
      link: "/admin/orders",
      color: "text-black",
    },
    {
      label: "Awaiting Payment",
      value: stats.pendingPaymentOrders,
      sublabel: "Unpaid orders (Pending)",
      icon: Clock,
      link: "/admin/orders",
      color: "text-[#FF0000]",
    },
    {
      label: "Inquiries",
      value: stats.totalContacts,
      sublabel: "Contact form messages",
      icon: Mail,
      link: "/admin/inquiries",
      color: "text-black",
    },
  ];

  return (
    <AdminLayout title="Overview & Performance">
      {/* KPI METRIC CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="group border border-black/10 bg-white p-6 transition-all duration-200 hover:border-black/30 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  {card.label}
                </span>
                <Icon size={18} className="text-black/30 group-hover:text-[#FF0000]" />
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className={`text-3xl font-black ${card.color}`}>
                  {loading ? "..." : card.value}
                </span>
                <ArrowUpRight
                  size={16}
                  className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </div>

              <p className="mt-2 text-xs font-medium text-black/50">
                {card.sublabel}
              </p>
            </Link>
          );
        })}
      </div>

      {/* QUICK ACTIONS & RECENT ACTIVITY */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border border-black/10 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <h2 className="text-base font-black uppercase tracking-wider">
              Quick Management Actions
            </h2>
            <button
              onClick={handleRefresh}
              title="Refresh stats"
              className="p-1 text-black/40 hover:text-black"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              to="/admin/products"
              className="flex items-center justify-between border border-black/15 bg-[#F5F5F2] p-4 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#FF0000] hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <Plus size={16} className="text-[#FF0000]" />
                <span>Add New Product</span>
              </div>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center justify-between border border-black/15 bg-[#F5F5F2] p-4 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#FF0000] hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-[#FF0000]" />
                <span>View Order Registry</span>
              </div>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/admin/inquiries"
              className="flex items-center justify-between border border-black/15 bg-[#F5F5F2] p-4 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#FF0000] hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#FF0000]" />
                <span>Check Customer Messages</span>
              </div>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between border border-black/15 bg-[#F5F5F2] p-4 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#FF0000] hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <Package size={16} className="text-[#FF0000]" />
                <span>Browse Storefront</span>
              </div>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* POLICY & SECURITY COMPLIANCE SUMMARY */}
        <div className="border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-base font-black uppercase tracking-wider border-b border-black/10 pb-4">
            Security & Payment Invariants
          </h2>

          <div className="flex flex-col gap-4 text-xs leading-relaxed text-black/70">
            <p>
              • <strong>Authoritative Pricing:</strong> All orders recalculate item prices on the server. Client-side price modifications are discarded.
            </p>
            <p>
              • <strong>Payment Isolation:</strong> Real transaction gateways remain disabled. Orders are recorded in <code>pending_payment</code> status.
            </p>
            <p>
              • <strong>Admin Authentication:</strong> Token-based JWT guards with bcrypt password hashing protect all administrative endpoints.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

