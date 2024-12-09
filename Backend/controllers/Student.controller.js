import Student from "../models/Student.model";

export const createStudent = async (req, res) => {
  const { email } = req.body;
  const existingStudent = await Student.findOne({ email });
  if (existingStudent) return res.status(400).json({ message: 'Email already exists' });

  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
};


export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id).populate('posts');
  if (!student) return res.status(404).json({ message: 'Student not found' });

  res.status(200).json(student);
};


export const getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};


export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ message: 'Student not found' });

  res.status(200).json(student);
};

// Delete student
export const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  res.status(200).json({ message: 'Student deleted successfully' });
};
