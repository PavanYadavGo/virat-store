import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Loader2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  Video,
  Info,
  CheckCircle2,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { api, type ApiActionVideo } from "../../services/api";

const VALID_PLATFORMS = ["Instagram", "Facebook", "YouTube", "Other"] as const;

export const AdminActionVideos = () => {
  const { token, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [videos, setVideos] = useState<ApiActionVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal / Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "Instagram",
    videoUrl: "",
    posterUrl: "",
    externalUrl: "",
    isPublished: true,
    displayOrder: 1,
  });

  // Upload guidance banner state
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setUploadNotice(null);
  };

  const refreshVideos = async () => {
    if (!token) return;
    try {
      const items = await api.getAdminActionVideos(token);
      setVideos(items);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load action videos");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;
    api
      .getAdminActionVideos(token)
      .then((items) => {
        if (isMounted) {
          setVideos(items);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load action videos");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token, navigate]);

  const handleOpenAdd = () => {
    clearMessages();
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      platform: "Instagram",
      videoUrl: "/videos/seeitinaction1.mp4",
      posterUrl: "/images/action/poster-1.webp",
      externalUrl: "https://www.instagram.com/",
      isPublished: true,
      displayOrder: videos.length + 1,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (v: ApiActionVideo) => {
    clearMessages();
    setEditingId(v.id || v._id || null);
    setFormData({
      title: v.title,
      description: v.description,
      platform: v.platform || "Instagram",
      videoUrl: v.videoUrl,
      posterUrl: v.posterUrl,
      externalUrl: v.externalUrl || "",
      isPublished: v.isPublished,
      displayOrder: v.displayOrder,
    });
    setIsEditing(true);
  };

  const handleTogglePublish = async (v: ApiActionVideo) => {
    if (!token) return;
    clearMessages();
    const targetId = v.id || v._id;
    if (!targetId) return;

    const newStatus = !v.isPublished;
    // Optimistic update
    setVideos((prev) =>
      prev.map((item) =>
        (item.id === targetId || item._id === targetId)
          ? { ...item, isPublished: newStatus }
          : item
      )
    );

    try {
      await api.updateAdminActionVideo(token, targetId, { isPublished: newStatus });
      setSuccessMessage(
        `"${v.title}" is now ${newStatus ? "published on storefront" : "hidden as draft"}.`
      );
    } catch (err: unknown) {
      // Revert optimistic update
      setVideos((prev) =>
        prev.map((item) =>
          (item.id === targetId || item._id === targetId)
            ? { ...item, isPublished: v.isPublished }
            : item
        )
      );
      setError(err instanceof Error ? err.message : "Failed to update publish status");
    }
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    if (!token) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= videos.length) return;

    clearMessages();
    const updated = [...videos];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    // Re-assign displayOrder numbers sequentially
    const reordered = updated.map((item, idx) => ({
      ...item,
      displayOrder: idx + 1,
    }));

    setVideos(reordered);

    try {
      const videoIds = reordered.map((item) => item.id || item._id || "");
      await api.reorderAdminActionVideos(token, videoIds);
      setSuccessMessage("Video order updated successfully.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reorder videos");
      refreshVideos();
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    clearMessages();
    try {
      await api.deleteAdminActionVideo(token, id);
      setVideos((prev) => prev.filter((v) => v.id !== id && v._id !== id));
      setDeleteConfirmId(null);
      setSuccessMessage("Action video deleted successfully.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete video");
    }
  };

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate video format
    const validFormats = ["video/mp4", "video/webm"];
    if (!validFormats.includes(file.type) && !file.name.match(/\.(mp4|webm)$/i)) {
      setError("Only MP4 and WebM video formats are supported.");
      return;
    }

    // Validate size (e.g. 50 MB max for web video)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(
        `Video file size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds 50 MB limit. Please compress or optimize the video.`
      );
      return;
    }

    // Inform user of storage provider requirement
    setUploadNotice(
      `Selected "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)} MB). Storage upload requires configured cloud credentials in server/.env. For local/hosted setups, place the file in public/videos and specify the URL path (e.g., /videos/${file.name}).`
    );

    // Default the videoUrl to the standard local public video path
    setFormData((prev) => ({
      ...prev,
      videoUrl: `/videos/${file.name}`,
    }));
  };

  const handlePosterFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpe?g|png|webp)$/i)) {
      setError("Only JPG, PNG, or WebP images are supported for posters.");
      return;
    }

    // Local preview data URL for poster image
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (dataUrl) {
        setFormData((prev) => ({
          ...prev,
          posterUrl: dataUrl,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    clearMessages();

    // Client-side validation
    if (!formData.title.trim()) {
      setError("Video title is required.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Short description/tagline is required.");
      return;
    }
    if (!formData.videoUrl.trim()) {
      setError("Video URL is required.");
      return;
    }
    if (!formData.posterUrl.trim()) {
      setError("Poster URL is required.");
      return;
    }

    // Prevent dangerous schemes
    const lowerVideo = formData.videoUrl.trim().toLowerCase();
    if (lowerVideo.startsWith("javascript:") || lowerVideo.startsWith("vbscript:")) {
      setError("Prohibited or dangerous URL scheme in Video URL.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const updated = await api.updateAdminActionVideo(token, editingId, formData);
        setVideos((prev) =>
          prev.map((v) =>
            v.id === editingId || v._id === editingId ? updated : v
          )
        );
        setSuccessMessage(`"${formData.title}" updated successfully.`);
      } else {
        const created = await api.createAdminActionVideo(token, formData);
        setVideos((prev) => [...prev, created]);
        setSuccessMessage(`"${formData.title}" created successfully.`);
      }
      setIsEditing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save action video");
    } finally {
      setSaving(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "instagram":
        return <FaInstagram size={14} className="text-[#E1306C]" />;
      case "facebook":
        return <FaFacebookF size={14} className="text-[#1877F2]" />;
      case "youtube":
        return <FaYoutube size={14} className="text-[#FF0000]" />;
      default:
        return <Video size={14} className="text-black/60" />;
    }
  };

  return (
    <AdminLayout title="See It in Action Management">
      {/* HEADER CONTROLS */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-black/60">
            Manage the videos showcased in the homepage &ldquo;See It in Action&rdquo; section.
            Control display order, titles, platforms, video URLs, and publication status.
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-black/70">
            <span>Total: {videos.length}</span>
            <span>&bull;</span>
            <span className="text-green-700">
              Published: {videos.filter((v) => v.isPublished).length}
            </span>
            <span>&bull;</span>
            <span className="text-amber-700">
              Drafts: {videos.filter((v) => !v.isPublished).length}
            </span>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 border border-transparent bg-[#FF0000] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#CC0000]"
        >
          <Plus size={16} />
          <span>Add Video</span>
        </button>
      </div>

      {/* FEEDBACK BANNERS */}
      {error && (
        <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <div className="flex-1 text-xs font-medium">{error}</div>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-800">
            <X size={16} />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 flex items-start gap-3 border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <div className="flex-1 text-xs font-medium">{successMessage}</div>
          <button onClick={() => setSuccessMessage(null)} className="text-green-500 hover:text-green-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* VIDEO LIST TABLE */}
      {loading ? (
        <div className="flex h-64 items-center justify-center border border-black/10 bg-white">
          <Loader2 size={28} className="animate-spin text-[#FF0000]" />
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-black/10 bg-white p-12 text-center">
          <Video size={48} className="text-black/20" />
          <h3 className="mt-4 text-base font-black uppercase tracking-wider">No Action Videos Found</h3>
          <p className="mt-1 text-xs text-black/50">
            Get started by adding your first promotional or match day action video.
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-6 inline-flex items-center gap-2 bg-[#FF0000] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#CC0000]"
          >
            <Plus size={14} />
            <span>Add First Video</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border border-black/10 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/10 bg-black/5 font-black uppercase tracking-wider text-black/60">
              <tr>
                <th className="px-4 py-3.5 text-center w-20">Order</th>
                <th className="px-4 py-3.5 w-24">Preview</th>
                <th className="px-6 py-3.5">Details</th>
                <th className="px-6 py-3.5">Platform</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {videos.map((v, index) => (
                <tr key={v.id || v._id || index} className="transition-colors hover:bg-black/[0.02]">
                  {/* Reorder controls */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono text-xs font-bold text-black/60">
                        #{v.displayOrder}
                      </span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMoveOrder(index, "up")}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-0.5 text-black/40 hover:text-black disabled:opacity-20"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveOrder(index, "down")}
                          disabled={index === videos.length - 1}
                          title="Move Down"
                          className="p-0.5 text-black/40 hover:text-black disabled:opacity-20"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Thumbnail */}
                  <td className="px-4 py-4">
                    <div className="relative aspect-[9/14] w-16 overflow-hidden border border-black/10 bg-black">
                      <img
                        src={v.posterUrl}
                        alt={v.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // Fallback poster on image error
                          (e.target as HTMLImageElement).src = "/images/action/poster-1.webp";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Video size={14} className="text-white" />
                      </div>
                    </div>
                  </td>

                  {/* Details */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black uppercase tracking-tight text-black sm:text-sm">
                          {v.title}
                        </span>
                        <span className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[9px] font-bold text-black/60">
                          ID: {v.id}
                        </span>
                      </div>
                      <p className="text-black/60 line-clamp-1">{v.description}</p>
                      <div className="mt-1 flex items-center gap-3 text-[10px] text-black/50">
                        <span className="font-mono truncate max-w-xs" title={v.videoUrl}>
                          Source: {v.videoUrl}
                        </span>
                        {v.externalUrl && (
                          <a
                            href={v.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#FF0000] hover:underline"
                          >
                            <span>Link</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5 rounded-none border border-black/10 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/80">
                      {getPlatformIcon(v.platform)}
                      <span>{v.platform}</span>
                    </div>
                  </td>

                  {/* Published status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublish(v)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider transition-colors ${
                        v.isPublished
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      }`}
                      title={v.isPublished ? "Click to unpublish" : "Click to publish"}
                    >
                      {v.isPublished ? (
                        <>
                          <Eye size={12} />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={12} />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(v)}
                        title="Edit Video"
                        className="p-1.5 text-black/50 transition-colors hover:text-black"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(v.id || v._id || null)}
                        title="Delete Video"
                        className="p-1.5 text-black/50 transition-colors hover:text-[#FF0000]"
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

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md border border-black/10 bg-white p-6 shadow-xl">
            <h3 className="text-base font-black uppercase tracking-wider text-black">
              Confirm Video Deletion
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-black/70">
              Are you sure you want to delete this action video? This will remove it from the
              admin list and the public &ldquo;See It in Action&rdquo; section immediately.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="border border-black/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="bg-[#FF0000] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#CC0000]"
              >
                Delete Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-black/10 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-black">
                  {editingId ? "Edit Action Video" : "New Action Video"}
                </h2>
                <p className="text-[11px] text-black/60">
                  Configure video details for the homepage reel.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-black/50 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {uploadNotice && (
              <div className="mt-4 flex items-start gap-2 border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900">
                <Info size={16} className="mt-0.5 shrink-0 text-blue-700" />
                <div className="flex-1">{uploadNotice}</div>
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 flex flex-col gap-5 text-xs">
              {/* Title & Description */}
              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Match Day, Train Hard, Game Ready"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                />
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">
                  Tagline / Short Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Built for the pressure. / Made to move."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-medium outline-none focus:border-[#FF0000]"
                />
              </div>

              {/* Platform & Order */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">
                    Platform *
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  >
                    {VALID_PLATFORMS.map((plat) => (
                      <option key={plat} value={plat}>
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: Number(e.target.value) })
                    }
                    className="w-full border border-black/20 p-2.5 font-bold outline-none focus:border-[#FF0000]"
                  />
                </div>
              </div>

              {/* Video URL & File Selector */}
              <div className="border border-black/10 bg-black/[0.01] p-4">
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/70">
                  Video Source URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/videos/seeitinaction1.mp4 or https://..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-mono text-[11px] outline-none focus:border-[#FF0000]"
                />
                <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-[10px] text-black/50">
                    Direct hosted link or local path. Or select video file to validate &amp; configure:
                  </span>
                  <label className="cursor-pointer border border-black/20 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black hover:border-[#FF0000]">
                    <span>Browse MP4/WebM</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={handleVideoFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Poster URL & Image Selector */}
              <div className="border border-black/10 bg-black/[0.01] p-4">
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/70">
                  Poster Image URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/action/poster-1.webp or https://..."
                  value={formData.posterUrl}
                  onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-mono text-[11px] outline-none focus:border-[#FF0000]"
                />
                <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-[10px] text-black/50">
                    Poster image shown before video playback starts. Or upload an image:
                  </span>
                  <label className="cursor-pointer border border-black/20 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black hover:border-[#FF0000]">
                    <span>Browse Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePosterFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* External Social URL */}
              <div>
                <label className="mb-1 block font-bold uppercase tracking-wider text-black/60">
                  External Social Media Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reels/... or https://youtube.com/..."
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  className="w-full border border-black/20 p-2.5 font-mono text-[11px] outline-none focus:border-[#FF0000]"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3 border-t border-black/10 pt-4">
                <input
                  type="checkbox"
                  id="isPublishedToggle"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="h-4 w-4 accent-[#FF0000]"
                />
                <label
                  htmlFor="isPublishedToggle"
                  className="cursor-pointer text-xs font-bold uppercase tracking-wider text-black"
                >
                  Publish Video on Storefront
                </label>
                <span className="text-[10px] text-black/50">
                  (Uncheck to save as draft hidden from the public homepage)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end gap-3 border-t border-black/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-black/20 bg-white px-5 py-2.5 font-bold uppercase tracking-wider text-black hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#FF0000] px-6 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-[#CC0000] disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingId ? "Save Changes" : "Create Video"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminActionVideos;
