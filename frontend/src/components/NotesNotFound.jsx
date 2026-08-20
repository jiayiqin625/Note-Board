import React from "react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="card-body">
      <h3 className="card-title">No Notes Yet</h3>
      <Link to="/create" className="btn btnprimary">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
