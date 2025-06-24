import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ExhibitionsPage } from './pages/ExhibitionsPage';
import { EventsPage } from './pages/EventsPage';
import { CollectionPage } from './pages/CollectionPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/exhibitions" element={<ExhibitionsPage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/booking/payment" element={<PaymentPage />} />
              <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App