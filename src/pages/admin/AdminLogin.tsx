import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/admin");
      } else {
        setError(result.error || "Authentication failed. Check your credentials.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F2] pt-24 text-[#080808] sm:pt-36">
      <div className="mx-auto max-w-md px-6 pb-24">
        
        {/* LOGO & TITLE */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-[#FF0000]">
            <Lock size={24} />
          </div>

          <h1 className="mt-6 text-3xl font-black uppercase tracking-tight">
            Admin Portal<span className="text-[#FF0000]">.</span>
          </h1>

          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-black/40">
            Virat Sportswear Store Management
          </p>
        </div>

        {/* ERROR NOTIFICATION */}
        {error && (
          <div className="mt-8 flex items-center gap-3 border border-red-500/30 bg-red-50 p-4 text-xs font-bold text-red-800">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="mt-8 border border-black/10 bg-white p-8 sm:p-10">
          <div className="flex flex-col gap-6">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@viratsports.com"
                className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-[#FF0000]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black/60">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-[#FF0000]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center gap-3 bg-[#080808] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#FF0000] disabled:bg-black/50"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-8 border-t border-black/10 pt-6 text-center">
            <p className="text-[11px] text-black/50">
              Default development credentials:
              <br />
              <code className="text-black font-mono">admin@viratsports.com / Admin@Virat2026!</code>
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs font-bold uppercase tracking-wider text-black/40 hover:text-black">
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
