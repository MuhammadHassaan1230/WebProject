import express from 'express';
import {
  AddEvent,
  getResources,
  login,
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  addAchievement,
  deleteAchievement,
  addResource,
  deleteResource,
 
} from '../controllers/Mentor.controller.js';
import upload from '../middlewares/upload.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.post("/login",login);

router.post('/create', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]), createMentor);

router.get('/', getAllMentors);

router.get('/:id', getMentorById);

router.put('/update', upload.single('profileImage'), (req, res, next) => {
  console.log('File in request:', req.file);  
  console.log('Request Body:', req.body);    
  next();  
}, updateMentor);




router.post('/achievements', auth, upload.single('imageUrl'),addAchievement);
router.post('/addevent', auth, upload.single('imageUrl'), AddEvent);
router.delete('/:id/achievements/:achievementId', deleteAchievement);


router.post('/addresources', auth, upload.single('file'), addResource);
router.get("/getresources",auth,getResources);
router.delete('/:id/resources/:resourceId', deleteResource);




export default router;
