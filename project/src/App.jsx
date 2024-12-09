import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import CareerQuiz from './components/quiz/CareerQuiz';
import QuizResults from './pages/QuizResults';
import StudentProfile from './pages/StudentProfile';
import LoginPage from './pages/Login';
import Feed from './pages/Feed';
import ProfileManagement from './pages/ProfileManagement';
import MentorSearch from './pages/MentorSearch';
import MentorProfile from './pages/MentorProfile';
import MentorProfileManagement from './pages/MentorProfileManagement';
import StudentSearchPage from './pages/StudentSearch';
import WorkshopSearch from './pages/WorkshopSearch';
import StudentProfile2 from './pages/StudentProfile2';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();

  const noNavbarRoutes = ['/login', '/register','/student-profile'];

  return (
    <div className="min-h-screen bg-gray-50">
     
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/career-quiz" element={<CareerQuiz />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/edit-profile" element={< ProfileManagement />} />
        <Route path="/mentors" element={<MentorSearch />} />
        <Route path="/mentor-profile/:id" element={<MentorProfile />} />
        <Route path="/edit-mentor" element={<MentorProfileManagement />} />
        <Route path="/student-search" element={<StudentSearchPage />} />
        <Route path="/workshop-search" element={<WorkshopSearch />} />
        <Route path="/student-profile2/:id" element={<StudentProfile2 />} />
      </Routes>
    </div>
  );
}

export default App;
