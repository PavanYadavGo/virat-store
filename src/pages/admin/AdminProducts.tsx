import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, X, AlertCircle, Loader2, UploadCloud } from "lucide-react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { api, type ApiProduct } from "../../services/api";

const AdminProducts = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    subcategory: string;
    price: number;
    description: string;
    features: string;
    images: string[];
    badge: string;
    sizes: string;
    stock: number;
    isActive: boolean;
  }>({
    name: "",
    category: "Men",
    subcategory: "T-Shirts",
    price: 999,
    description: "",
    features: "Moisture-wicking, Ergonomic fit, Breathable fabric",
    images: ["/src/assets/products/performance-tee.png"],
    badge: "",
    sizes: "XS, S, M, L, XL, XXL",
    stock: 50,
    isActive: true,
  });

  const refreshProducts = async () => {
    if (!token) return;
    try {
      const items = await api.getAdminProducts(token);
      setProducts(items);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed loading products");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;
    api
      .getAdminProducts(token)
      .then((items) => {
        if (isMounted) {
          setProducts(items);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed loading products");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, navigate]);

  const handleProcessFiles = (files: FileList | File[]) => {
    const validExtensions = ["jpg", "jpeg", "png", "webp", "avif", "svg", "gif"];
    const fileList = Array.from(files);

    fileList.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (file.type.startsWith("image/") || validExtensions.includes(ext)) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const dataUrl = loadEvent.target?.result as string;
          if (dataUrl) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, dataUrl],
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleAddManualUrl = () => {
    if (!manualImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, manualImageUrl.trim()],
    }));
    setManualImageUrl("");
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Men",
      subcategory: "T-Shirts",
      price: 999,
      description: "",
      features: "Moisture-wicking, Ergonomic fit, Breathable fabric",
      images: ["/src/assets/products/performance-tee.png"],
      badge: "",
      sizes: "XS, S, M, L, XL, XXL",
      stock: 50,
      isActive: true,
    });
    setManualImageUrl("");
    setIsEditing(true);
  };

  const handleOpenEdit = (p: ApiProduct) => {
    setEditingId(p.id);
    const productImages =
      Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : typeof p.images === "string" && (p.images as string).length > 0
        ? [p.images as string]
        : ["/src/assets/products/performance-tee.png"];

    setFormData({
      name: p.name,
      category: p.category,
      subcategory: p.subcategory || "",
      price: p.price,
      description: p.description,
      features: Array.isArray(p.features) ? p.features.join(", ") : "",
      images: productImages,
      badge: p.badge || "",
      sizes: Array.isArray(p.sizes) ? p.sizes.join(", ") : "S, M, L, XL",
      stock: p.stock || 50,
      isActive: p.isActive,
    });
    setManualImageUrl("");
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
      images: formData.images.filter(Boolean),
      sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await api.updateAdminProduct(token, editingId, payload);
      } else {
        await api.createAdminProduct(token, payload);
      }
      setIsEditing(false);
      refreshProducts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed saving product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.deleteAdminProduct(token, id);
      refreshProducts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed deleting product");
    }
  };

  const handleToggleActive = async (p: ApiProduct) => {
    if (!token) return;
    try {
      await api.updateAdminProduct(token, p.id, { isActive: !p.isActive });
      refreshProducts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed toggling status");
    }
  };

  return (
    <AdminLayout title="Product Management">
      {error && (
        <div className="mb-6 flex items-center gap-3 border border-red-500/30 bg-red-50 p-4 text-xs font-bold text-red-800">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* TOP CONTROLS */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-black/50">
          {products.length} Products in Catalog
        </p>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#080808] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#FF0000]"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      {loading ? (
        <div className="border border-black/10 bg-white p-12 text-center">
          <Loader2 size={32} className="mx-auto animate-spin text-black/30" />
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-black/50">Loading catalog...</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-black/10 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-black/10 bg-[#F5F5F2] uppercase tracking-wider text-black/60">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-black/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 border border-black/10 bg-[#E8E8E5] p-1">
                      <img
                        src={p.images?.[0] || "/src/assets/products/performance-tee.png"}
                        alt={p.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#080808]">{p.name}</p>
                      <p className="text-[10px] text-black/40 font-mono">{p.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-black/70">
                  {p.category} {p.subcategory ? `• ${p.subcategory}` : ""}
                </td>

                <td className="px-6 py-4 font-bold text-black">
                  {p.price > 0 && !p.priceUnconfirmed ? (
                    `₹${p.price.toLocaleString("en-IN")}`
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF0000]">
                      Unconfirmed
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 font-medium text-black/70">
                  {p.stock} units
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleActive(p)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
                      p.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      title="Edit Product"
                      className="p-1.5 text-black/50 hover:text-black"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      title="Delete Product"
                      className="p-1.5 text-black/50 hover:text-[#FF0000]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-black/10 bg-white p-8">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <h2 className="text-lg font-black uppercase tracking-wider">
                {editingId ? "Edit Product" : "New Product"}
              </h2>
              <button onClick={() => setIsEditing(false)} className="p-1 text-black/50 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 flex flex-col gap-5 text-xs">
              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Subcategory</label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="T-Shirts, Polos, Shorts..."
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="NEW, POPULAR..."
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-medium outline-none focus:border-[#FF0000]"
                />
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Features (comma-separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-medium outline-none focus:border-[#FF0000]"
                />
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-medium outline-none focus:border-[#FF0000]"
                />
              </div>

              <div>
                <label className="mb-2 block font-bold uppercase tracking-wider text-black/60">
                  Product Images (Drag & Drop or Select from Folder)
                </label>

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed p-6 text-center transition-all ${
                    isDragging
                      ? "border-[#FF0000] bg-red-50/50"
                      : "border-black/20 bg-black/[0.02] hover:border-black/40"
                  }`}
                >
                  <input
                    type="file"
                    id="product-image-upload"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.avif,.svg,.gif,image/*"
                    onChange={(e) => {
                      if (e.target.files) handleProcessFiles(e.target.files);
                      e.target.value = "";
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="product-image-upload"
                    className="flex cursor-pointer flex-col items-center justify-center"
                  >
                    <UploadCloud
                      size={32}
                      className={`mb-2 transition-colors ${
                        isDragging ? "text-[#FF0000]" : "text-black/50"
                      }`}
                    />
                    <span className="font-bold uppercase tracking-wider text-black">
                      Click to choose files from folder or drag & drop here
                    </span>
                    <span className="mt-1 text-[11px] font-medium text-black/50">
                      Supports all formats: PNG, JPG, JPEG, WEBP, AVIF, SVG, GIF
                    </span>
                  </label>
                </div>

                {/* Image Previews */}
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-black/60">
                      Selected Images ({formData.images.length}) — First image is primary cover:
                    </div>
                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                      {formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-square overflow-hidden border border-black/10 bg-black/5"
                        >
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-[#FF0000] px-1.5 py-0.5 text-[9px] font-black uppercase text-white shadow">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center bg-black/80 text-white opacity-0 transition-opacity hover:bg-[#FF0000] group-hover:opacity-100"
                            title="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Manual URL/Path */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Or enter path / URL (e.g. /images/products/1.jpg)"
                    value={manualImageUrl}
                    onChange={(e) => setManualImageUrl(e.target.value)}
                    className="flex-1 border border-black/20 p-2 text-xs font-medium outline-none focus:border-[#FF0000]"
                  />
                  <button
                    type="button"
                    onClick={handleAddManualUrl}
                    className="border border-black bg-black px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-[#FF0000] hover:bg-[#FF0000]"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 accent-[#FF0000]"
                />
                <label htmlFor="isActive" className="font-bold uppercase tracking-wider text-black/80">
                  Visible in Public Storefront
                </label>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 border-t border-black/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-black/20 px-5 py-2.5 font-bold uppercase tracking-wider text-black/70 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#080808] px-6 py-2.5 font-black uppercase tracking-wider text-white hover:bg-[#FF0000]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
