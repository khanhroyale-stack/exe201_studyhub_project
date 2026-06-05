import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Homepage from '../pages/Homepage';
import ClassList from '../pages/Classes/ClassList';
import ClassDetail from '../pages/Classes/ClassDetail';
import TutorList from '../pages/Tutor/TutorList';
import TutorDetail from '../pages/Tutor/TutorDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';

import ParentLayout from '../components/Parent/ParentLayout';
import ParentDashboard from '../pages/Parent/ParentDashboard';
import PostManagement from '../pages/Parent/PostManagement';
import CreatePost from '../pages/Parent/CreatePost';
import ApplicantReview from '../pages/Parent/ApplicantReview';
import ClassManagement from '../pages/Parent/ClassManagement';
import FeedbackList from '../pages/Parent/FeedbackList';
import CreateFeedback from '../pages/Parent/CreateFeedback';
import Settings from '../pages/Parent/Settings';

import TutorLayout from '../components/Tutor/TutorLayout';
import TutorDashboard from '../pages/TutorPortal/TutorDashboard';
import TutorSearchClasses from '../pages/TutorPortal/TutorSearchClasses';
import TutorApplyClass from '../pages/TutorPortal/TutorApplyClass';
import TutorOffers from '../pages/TutorPortal/TutorOffers';
import TutorBilling from '../pages/TutorPortal/TutorBilling';
import Messages from '../pages/Shared/Messages';
import TutorCreatePost from '../pages/TutorPortal/TutorCreatePost';
import TutorClasses from '../pages/TutorPortal/TutorClasses';
import TutorApplications from '../pages/TutorPortal/TutorApplications';
import TutorSchedule from '../pages/TutorPortal/TutorSchedule';
import TutorReviews from '../pages/TutorPortal/TutorReviews';
import TutorSettings from '../pages/TutorPortal/TutorSettings';

import AdminLayout from '../components/Admin/AdminLayout';
import AdminDashboard from '../pages/AdminPortal/AdminDashboard';
import AdminUsers from '../pages/AdminPortal/AdminUsers';
import AdminContent from '../pages/AdminPortal/AdminContent';
import AdminReports from '../pages/AdminPortal/AdminReports';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* ── Public Routes (shared Navbar + Footer via Layout) ── */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="classes" element={<ClassList />} />
        <Route path="classes/:id" element={<ClassDetail />} />
        <Route path="tutors" element={<TutorList />} />
        <Route path="tutors/:id" element={<TutorDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* ── Parent Dashboard Routes (shared Navbar + SideNavBar + Footer via ParentLayout) ── */}
      <Route path="/parent" element={<ParentLayout />}>
        {/* Index → Redirect to Dashboard */}
        <Route index element={<Navigate to="/parent/dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="posts" element={<PostManagement />} />
        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/:postId/applicants" element={<ApplicantReview />} />
        <Route path="classes" element={<ClassManagement />} />
        <Route path="feedback" element={<FeedbackList />} />
        <Route path="feedback/create" element={<CreateFeedback />} />
        <Route path="settings" element={<Settings />} />
        <Route path="messages" element={<Messages />} />
        {/* Catch-all redirect within /parent */}
        <Route path="*" element={<Navigate to="/parent" replace />} />
      </Route>

      {/* ── Tutor Dashboard Routes (shared Navbar + SideNavBar + Footer via TutorLayout) ── */}
      <Route path="/tutor" element={<TutorLayout />}>
        {/* Index → Redirect to Dashboard */}
        <Route index element={<Navigate to="/tutor/dashboard" replace />} />
        <Route path="dashboard" element={<TutorDashboard />} />
        <Route path="search-classes" element={<TutorSearchClasses />} />
        <Route path="apply-class/:postId" element={<TutorApplyClass />} />
        <Route path="create-post" element={<TutorCreatePost />} />
        <Route path="classes" element={<TutorClasses />} />
        <Route path="applications" element={<TutorApplications />} />
        <Route path="schedule" element={<TutorSchedule />} />
        <Route path="reviews" element={<TutorReviews />} />
        <Route path="offers" element={<TutorOffers />} />
        <Route path="billing" element={<TutorBilling />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<TutorSettings />} />
        {/* Catch-all redirect within /tutor */}
        <Route path="*" element={<Navigate to="/tutor" replace />} />
      </Route>

      {/* ── Admin Dashboard Routes (standalone AdminLayout) ── */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Index → Redirect to Dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="reports" element={<AdminReports />} />
        {/* Catch-all redirect within /admin */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* ── Global catch-all ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
