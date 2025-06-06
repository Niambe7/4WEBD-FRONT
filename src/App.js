// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import AddEventPage from './pages/AddEventPage';
import AdminDashboard from './pages/AdminDashboard';
import EditEventPage from './pages/EditEventPage';
import PaymentPage from './pages/PaymentPage';
import MesReservationsPage from './pages/MesReservationsPage';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div className="container mt-4" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/add-event" element={<AddEventPage />} />
              <Route path="/events/:id/edit" element={<EditEventPage />} />
              <Route path="/events/:id/reserve" element={<PaymentPage />} />
              <Route
                path="/admin"
                element={
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleProtectedRoute>
                }
              />

            <Route
              path="/mes-reservations"
              element={
                <RoleProtectedRoute allowedRoles={['user']}>
                  <MesReservationsPage />
                </RoleProtectedRoute>
              }
            />
            
          <Route path="/register" element={<RegisterPage />} />
              
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
