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

import ParentLayout from '../components/Parent/ParentLayout';
import ParentHome from '../pages/Parent/ParentHome';
import ParentDashboard from '../pages/Parent/ParentDashboard';
import PostManagement from '../pages/Parent/PostManagement';
import CreatePost from '../pages/Parent/CreatePost';
import ApplicantReview from '../pages/Parent/ApplicantReview';
import ClassManagement from '../pages/Parent/ClassManagement';
import FeedbackList from '../pages/Parent/FeedbackList';
import CreateFeedback from '../pages/Parent/CreateFeedback';
import Settings from '../pages/Parent/Settings';

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

      <Route path="/parent" element={<ParentLayout />}>
        <Route index element={<ParentHome />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="posts" element={<PostManagement />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="applicants" element={<ApplicantReview />} />
        <Route path="classes" element={<ClassManagement />} />
        <Route path="feedback" element={<FeedbackList />} />
        <Route path="create-feedback" element={<CreateFeedback />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
