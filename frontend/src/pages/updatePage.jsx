import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const UpdatePage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/${id}`);
        setNote(res.data.note);
      } catch (error) {
        toast.error(
          error.response?.status === 404
            ? "Note not found"
            : "Failed to load note",
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      console.log("error deleting:", error);
      toast.error("Note NOT Deleted");
    }
  };

  const handleUpdate = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/${id}`, note);
      toast.success("Note Updated");
      navigate("/");
    } catch (error) {
      console.log("Note NOT UPdated", error);
      toast.error("failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  value={note.title}
                  className="input input-bordered"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Content"
                  value={note.content}
                  className="textarea textarea-bordered h-32"
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              disabled={saving}
              onClick={handleUpdate}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
