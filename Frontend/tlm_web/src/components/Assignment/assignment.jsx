import "./styles.css";
import { useState } from "react";

function Assignment({
  id,
  title,
  description,
  startDate,
  endDate,
  onDeleteAssignment,
  onUpdateAssignment
}) {
  const [showEditModal, setShowEditModal] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [editStartDate, setEditStartDate] = useState(
    startDate ? startDate.slice(0, 10) : ""
  );
  const [editEndDate, setEditEndDate] = useState(
    endDate ? endDate.slice(0, 10) : ""
  );

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/assignments/update_assignment?id=${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editTitle,
            description: editDesc,
            startDate: editStartDate,
            endDate: editEndDate
          })
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }

      onUpdateAssignment(data);
      setShowEditModal(false);
    } catch (err) {
      console.error("Edit assignment failed", err);
    }
  };

  return (
    <>
      {/* ===== Assignment Card ===== */}
      <div className="assignment-box upcoming">
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Start: {startDate?.slice(0, 10)}</p>
        <p>End: {endDate?.slice(0, 10)}</p>

        <div className="assignment-actions">
          <button onClick={() => setShowEditModal(true)}>✏️ Edit</button>
          <button onClick={() => onDeleteAssignment(id)}>🗑 Delete</button>
        </div>
      </div>

      {/* ===== Edit Modal ===== */}
      <div
        className={`assignment-modal-overlay ${
          showEditModal ? "show" : ""
        }`}
      >
        <div className="assignment-modal">
          <h3>Edit Assignment</h3>

          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description"
          />

          <input
            type="date"
            value={editStartDate}
            onChange={(e) => setEditStartDate(e.target.value)}
          />

          <input
            type="date"
            value={editEndDate}
            onChange={(e) => setEditEndDate(e.target.value)}
          />

          <div className="modal-actions">
            <button className="btn-primary" onClick={saveEdit}>
              Save
            </button>
            <button
              className="btn-secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assignment;
