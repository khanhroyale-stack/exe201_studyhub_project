import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import ClassList from '../pages/Classes/ClassList';
import ClassDetail from '../pages/Classes/ClassDetail';
import TutorList from '../pages/Tutor/TutorList';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/classes" element={<ClassList />} />
      <Route path="/classes/:id" element={<ClassDetail />} />
      <Route path="/tutors" element={<TutorList />} />
    </Routes>
  );
};

export default AppRouter;
