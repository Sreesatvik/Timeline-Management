import Assignment from "../models/assignment.js";

export class AssignmentController {

 async createAssignment(req, res) {
  try {
    const { title, description, category_id, startDate, endDate } = req.body;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: "startDate and endDate are required" });
      }

      const newStart = new Date(startDate);
      const newEnd = new Date(endDate);

      if (newStart >= newEnd) {
        return res.status(400).json({ error: "Invalid date range" });
      }

      // 1️⃣ Create assignment
      const assignment = await Assignment.create({
        title,
        description,
        category_id,
        startDate: newStart,
        endDate: newEnd,
      });

      // 2️⃣ Find overlapping future assignments
      const overlapping = await Assignment.find({
        category_id,
        _id: { $ne: assignment._id },
        startDate: { $lt: assignment.endDate },
        endDate: { $gt: assignment.startDate },
      }).sort({ startDate: 1 });

      // 3️⃣ Shift future assignments forward
      let cursor = assignment.endDate;
      const updates = [];

      for (const a of overlapping) {
        const duration = a.endDate - a.startDate;

        a.startDate = new Date(cursor);
        a.endDate = new Date(cursor.getTime() + duration);

        cursor = a.endDate;
        updates.push(a);
      }

      if (updates.length > 0) {
        await Assignment.bulkSave(updates);
      }

      return res.status(201).json({
        message: "Assignment created and schedule adjusted",
        assignment,
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
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
        .sort({ startDate: 1 });

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
      const { title, description, startDate, endDate } = req.body;

      const editedStart = new Date(startDate);
      const editedEnd = new Date(endDate);

      if (editedStart >= editedEnd) {
        return res.status(400).json({ error: "Invalid date range" });
      }

      const assignment = await Assignment.findById(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      assignment.title = title;
      assignment.description = description;
      assignment.startDate = editedStart;
      assignment.endDate = editedEnd;
      assignment.modifiedAt = new Date();

      await assignment.save();

      // Find overlapping future assignments
      const overlapping = await Assignment.find({
        category_id: assignment.category_id,
        _id: { $ne: assignment._id },
        startDate: { $lt: assignment.endDate },
        endDate: { $gt: assignment.startDate },
      }).sort({ startDate: 1 });

      // Shift forward
      let cursor = assignment.endDate;
      const updates = [];

      for (const a of overlapping) {
        const duration = a.endDate - a.startDate;

        a.startDate = new Date(cursor);
        a.endDate = new Date(cursor.getTime() + duration);

        cursor = a.endDate;
        updates.push(a);
      }

      if (updates.length > 0) {
        await Assignment.bulkSave(updates);
      }

      return res.status(200).json({
        message: "Assignment updated and schedule adjusted",
        assignment,
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

