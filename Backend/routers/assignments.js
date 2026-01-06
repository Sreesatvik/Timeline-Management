import express from 'express';
import { AssignmentController }  from '../controllers/AssignmentController.js';

const assignmentRouter = express.Router();

const assignment = new AssignmentController();


// router.get('/categories',home.getHome);
// router.post('/categories', assignment.createCategory.bind(assignment));
assignmentRouter.get('/get_all_assignments', assignment.getAllAssignments.bind(assignment));
assignmentRouter.post('/add_assignment', assignment.createAssignment.bind(assignment));
assignmentRouter.delete('/delete_assignment', assignment.deleteAssignment.bind(assignment));
assignmentRouter.put('/update_assignment', assignment.updateAssignment.bind(assignment));
export default assignmentRouter;