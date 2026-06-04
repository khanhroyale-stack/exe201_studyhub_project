import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Homepage from '../pages/Homepage';
import ClassList from '../pages/Classes/ClassList';
import ClassDetail from '../pages/Classes/ClassDetail';
import TutorList from '../pages/Tutor/TutorList';

import Login from '../pages/Login';
import Register from '../pages/Register';
import TutorDetail from '../pages/Tutor/TutorDetail';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="classes" element={<ClassList />} />
        <Route path="classes/:id" element={<ClassDetail />} />
        <Route path="tutors" element={<TutorList />} />
        <Route path="tutors/:id" element={<TutorDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
