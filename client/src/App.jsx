import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

// Eager load critical landing page for LCP (Largest Contentful Paint)
import LandingPage from './pages/LandingPage';

// Lazy load everything else
const MethodPage = lazy(() => import('./pages/MethodPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Journal = lazy(() => import('./pages/Journal'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Mindfulness = lazy(() => import('./pages/Mindfulness'));
const Goals = lazy(() => import('./pages/Goals'));
const Insights = lazy(() => import('./pages/Insights'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/method" element={<MethodPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/mindfulness" element={<Mindfulness />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/insights" element={<Insights />} />
            </Route>

            {/* Admin Only Route */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Error Handling */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
