import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import { AppLayout } from './layouts/AppLayout';
import { UserHome } from './pages/UserHome';
import { RideSearchPage } from './pages/RideSearchPage';
import { MatchesPage } from './pages/MatchesPage';
import { RideDetailsPage } from './pages/RideDetailsPage';
import { RideHistoryPage } from './pages/RideHistoryPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { Navbar, Footer } from './components/Navigation';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing Landing View */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LandingPage />
              <Footer />
            </>
          }
        />

        {/* Public Authentication Screens */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected App Rider Experience */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<UserHome />} />
          <Route path="find" element={<RideSearchPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="ride/:id" element={<RideDetailsPage />} />
          <Route path="history" element={<RideHistoryPage />} />
          <Route path="profile" element={<UserProfilePage />} />
        </Route>

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
