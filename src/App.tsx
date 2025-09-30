import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Layout/Navigation';
import { Footer } from './components/Layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';

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

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          
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
  );
}

export default App;