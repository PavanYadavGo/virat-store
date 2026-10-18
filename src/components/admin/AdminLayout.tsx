import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export const AdminLayout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navLinks = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Inquiries", path: "/admin/inquiries", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#080808]">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-xl font-black uppercase tracking-[-0.05em]">
              VIRAT<span className="text-[#FF0000]">.ADMIN</span>
            </Link>

            <span className="hidden rounded-none border border-black/10 bg-black/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black/60 sm:inline-block">
              Control Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black"
            >
              <ExternalLink size={14} />
              <span>View Storefront</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-black/15 bg-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:border-[#FF0000] hover:text-[#FF0000]"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* SUB-NAVBAR TABS */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-6 lg:px-10">
          {navLinks.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 border-b-2 px-5 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-[#FF0000] text-[#FF0000]"
                    : "border-transparent text-black/60 hover:text-black"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* MAIN ADMIN CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            {title}
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
};

