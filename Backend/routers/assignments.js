import express from 'express';
import { AssignmentController }  from '../controllers/AssignmentController.js';
import { authenticate } from '../middlewares/auth-middleware.js';

const assignmentRouter = express.Router();

const assignment = new AssignmentController();


assignmentRouter.get('/get_all_assignments', authenticate, assignment.getAllAssignments.bind(assignment));
assignmentRouter.post('/add_assignment', authenticate, assignment.createAssignment.bind(assignment));
assignmentRouter.delete('/delete_assignment', authenticate, assignment.deleteAssignment.bind(assignment));
assignmentRouter.put('/update_assignment', authenticate, assignment.updateAssignment.bind(assignment));


export default assignmentRouter;