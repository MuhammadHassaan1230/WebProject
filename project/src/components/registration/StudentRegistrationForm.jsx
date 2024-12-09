import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { User } from 'lucide-react';

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    highestQualification: '',
    fieldOfStudy: '',
    institutionName: '',
    yearOfPassing: '',
    cgpa: '',
    shortTermGoals: '',
    longTermGoals: '',
    idealJobRole: '',
    profileImage: null,
    
  });

  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep === steps.length) {
      console.log(formData);
      dispatch(setUser({ ...formData, role: 'student' }));
      navigate('/career-quiz');
      }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser({ ...formData, role: 'student' }));
    navigate('/career-quiz');
  };

  const steps = [
    {
      id: 1,
      title: "Personal Information",
      content: (
        <>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
            <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
        </>
      ),
    },
    {
      id: 2,
      title: "Academic Background",
      content: (
        <>
          <select
            
            name="highestQualification"
            placeholder="Highest Qualification"
            value={formData.highestQualification}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          >
            <option value="">Select Highest Qualification</option>
            <option value="degree">Bachelors</option>
            <option value="diploma">Matriculation</option>
            <option value="certificate">Intermediate</option>
          </select>
          <input
            id="fieldOfStudy"
            name="fieldOfStudy"
            type="text"
            placeholder="Field of Study"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <input
            id="institutionName"
            name="institutionName"
            type="text"
            placeholder="Institution Name"
            value={formData.institutionName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <input
            id="yearOfPassing"
            name="yearOfPassing"
            type="number"
            placeholder="Year of Passing"
            value={formData.yearOfPassing}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <input
            id="cgpa"
            name="cgpa"
            type="number"
            placeholder="CGPA"
            value={formData.cgpa}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
        </>
      ),
    },
    {
      id: 3,
      title: "Career Goals",
      content: (
        <>
          <textarea
            name="shortTermGoals"
            placeholder="Short-term Career Goals"
            value={formData.shortTermGoals}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <textarea
            name="longTermGoals"
            placeholder="Long-term Career Goals"
            value={formData.longTermGoals}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
          <input
            id="idealJobRole"
            name="idealJobRole"
            type="text"
            placeholder="Ideal Job Role"
            value={formData.idealJobRole}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border"
          />
        </>
      ),
    },
  ];
  console.log(steps.length);

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Student Registration Form</h2>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold mb-2">{steps[currentStep - 1].title}</h3>
        {steps[currentStep - 1].content}

        <div className="flex justify-between mt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            >
              Previous
            </button>
          )}
          {currentStep <= steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-indigo-600 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
