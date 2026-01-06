import Assignment from "../models/assignment.js";

export class AssignmentController {
  async createAssignment(req, res) {
  try {
    const { title, description, category_id, startDate, endDate } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      startDate,
      endDate,
      category_id,
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  // GET ALL ASSIGNMENTS (CATEGORY WISE)
  async getAllAssignments(req, res) {
    try {
      const { category_id } = req.query;

      if (!category_id) {
        return res.status(400).json({ error: "category_id is required" });
      }

      const assignments = await Assignment.find({ category_id })
        .sort({ createdAt: -1 });

      return res.status(200).json({ assignments });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE ASSIGNMENT
  async deleteAssignment(req, res) {
    try {
      const { id } = req.query;
      console.log(req);
      const deleted = await Assignment.findByIdAndDelete(id);
      console.log(id);

      if (!deleted) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      return res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  //Edit Assignment
    async updateAssignment(req, res) {
          try {
              const { id } = req.query;
              const { title, description, startDate,endDate } = req.body;
              const updated = await Assignment.findByIdAndUpdate(
                  id,
                  { title, description, startDate, endDate },
                  { new: true }
              );
  
              if (!updated) {
                  return res.status(404).json({ error: "Assignment not found" });
              }
  
              res.status(200).json(updated);
          } catch (err) {
              res.status(500).json({ error: err.message });
          }
      }
}

