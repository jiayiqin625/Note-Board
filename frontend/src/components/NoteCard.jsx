import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note Deleted Successfully");
    } catch (error) {
      toast.error("Failed to Delete Note");
    }
  };

  return (
    <Link to={`/${note._id}`}>
      <div className="card-body">
        <h3 className="card-title">{note.title}</h3>
        <p className="line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center">
          <span className="text-sm">{note.createdAt}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon />
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="btn btn-ghost btn-xs"
            >
              <Trash2Icon />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
