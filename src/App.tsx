import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './components/Public/LandingPage';
import { RegistrationForm } from './components/Public/RegistrationForm';
import { TermsAndConditions } from './components/Public/TermsAndConditions';
import { AdminPanel } from './components/Admin/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
