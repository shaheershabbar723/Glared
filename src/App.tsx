import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Layout/Navigation';
import { Footer } from './components/Layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { CategoryPage } from './pages/CategoryPage';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Success } from './pages/Success';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ImageGalleryTest } from './pages/ImageGalleryTest';

// Auth Pages
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Profile } from './pages/auth/Profile';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { UpdatePassword } from './pages/auth/UpdatePassword';

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth/signin" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/update-password" element={<UpdatePassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Profile />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/category/:categoryId" element={<CategoryPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/success" element={<Success />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/image-gallery-test" element={<ImageGalleryTest />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;