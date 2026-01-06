import "./styles.css";
import { useState, useEffect } from "react";
import Assignment from "../Assignment/assignment";

function Category({ title, description, onDelete, id, onUpdate }) {
  const [assignments, setAssignments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const [assignmentStartDate, setAssignmentStartDate] = useState("");
  const [assignmentEndDate, setAssignmentEndDate] = useState("");

  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);

  /* ===== Fetch Assignments ===== */
  useEffect(() => {
    if (!id) return;

    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/assignments/get_all_assignments?category_id=${id}`
        );
        const data = await response.json();
        setAssignments(data.assignments || []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [id]);

  /* ===== Add Assignment ===== */
  const addAssignment = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/assignments/add_assignment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: assignmentTitle,
            description: assignmentDesc,
            startDate: assignmentStartDate,
            endDate: assignmentEndDate,
            category_id: id
          })
        }
      );

      const data = await response.json();
      setAssignments((prev) => [...prev, data]);

      setAssignmentTitle("");
      setAssignmentDesc("");
      setAssignmentStartDate("");
      setAssignmentEndDate("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  /* ===== Delete Assignment ===== */
  const removeAssignment = async (assignmentId) => {
    try {
      await fetch(
        `http://localhost:5000/api/assignments/delete_assignment?id=${assignmentId}`,
        { method: "DELETE" }
      );

      setAssignments((prev) =>
        prev.filter((a) => a._id !== assignmentId)
      );
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  /* ===== Update Category ===== */
  const updateCategory = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/categories/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editTitle,
            description: editDesc
          })
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }

      onUpdate(data);
      setShowEditModal(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const updateAssignment = (updatedAssignment) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a._id === updatedAssignment._id ? updatedAssignment : a
      )
    );
  };

  return (
    <div className="category-wrapper">
      {/* ===== Category Header ===== */}
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="category-actions">
        <button
          className="btn-secondary"
          onClick={() => setShowEditModal(true)}
        >
          ✏️ Edit Category
        </button>

        <button
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Assignment
        </button>

        <button
          className="btn-danger"
          onClick={() => onDelete(id)}
        >
          Delete Category
        </button>
      </div>

      {/* ===== Edit Category Modal ===== */}
      <div
        className={`assignment-modal-overlay ${
          showEditModal ? "show" : ""
        }`}
      >
        <div className="assignment-modal">
          <h3>Edit Category</h3>

          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Category title"
          />

          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Category description"
          />

          <div className="modal-actions">
            <button
              className="btn-primary"
              onClick={updateCategory}
            >
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

      {/* ===== Add Assignment Modal ===== */}
      <div
        className={`assignment-modal-overlay ${
          showModal ? "show" : ""
        }`}
      >
        <div className="assignment-modal">
          <h3>Add Assignment</h3>

          <input
            type="text"
            placeholder="Assignment title"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />

          <textarea
            placeholder="Assignment description"
            value={assignmentDesc}
            onChange={(e) => setAssignmentDesc(e.target.value)}
          />

          <input
            type="date"
            value={assignmentStartDate}
            onChange={(e) =>
              setAssignmentStartDate(e.target.value)
            }
          />

          <input
            type="date"
            value={assignmentEndDate}
            onChange={(e) =>
              setAssignmentEndDate(e.target.value)
            }
          />

          <div className="modal-actions">
            <button
              className="btn-primary"
              onClick={addAssignment}
            >
              Save
            </button>
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* ===== Assignments ===== */}
      <div className="category-container">
        {assignments.map((assignment) => (
          <Assignment
            key={assignment._id}
            id={assignment._id}
            title={assignment.title}
            description={assignment.description}
            startDate={assignment.startDate}
            endDate={assignment.endDate}
            onDeleteAssignment={removeAssignment}
            onUpdateAssignment={updateAssignment}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
