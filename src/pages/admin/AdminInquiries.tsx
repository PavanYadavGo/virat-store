import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, AlertCircle, Loader2 } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ContactMsg {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  deliveryStatus: string;
  createdAt: string;
}

const AdminInquiries = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;
    fetch(`${API_BASE}/admin/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed fetching messages");
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setMessages(json.data || []);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed loading messages");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, navigate]);

  return (
    <AdminLayout title="Customer Inquiries">
      {error && (
        <div className="mb-6 flex items-center gap-3 border border-red-500/30 bg-red-50 p-4 text-xs font-bold text-red-800">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-black/50">
          {messages.length} Messages Received
        </p>
      </div>

      {loading ? (
        <div className="border border-black/10 bg-white p-12 text-center">
          <Loader2 size={32} className="mx-auto animate-spin text-black/30" />
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-black/50">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="border border-black/10 bg-white p-12 text-center">
          <Mail size={32} className="mx-auto text-black/30" />
          <h3 className="mt-4 text-base font-black uppercase tracking-tight">No Messages Yet</h3>
          <p className="mt-1 text-xs text-black/50">Customer contact inquiries will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((m, idx) => (
            <div key={m._id || m.id || idx} className="border border-black/10 bg-white p-6">
              <div className="flex flex-col justify-between gap-2 border-b border-black/10 pb-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#080808]">
                    {m.subject}
                  </h3>
                  <p className="mt-0.5 text-xs text-black/60">
                    From: <span className="font-bold text-black">{m.name}</span> ({m.email})
                    {m.phone ? ` • Phone: ${m.phone}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                      m.deliveryStatus === "sent"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {m.deliveryStatus === "sent" ? "Dispatched" : "Logged in System"}
                  </span>
                  <span className="text-[10px] text-black/40">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-black/80 whitespace-pre-wrap">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminInquiries;
