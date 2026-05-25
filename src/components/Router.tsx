import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import HospitalsPage from '@/components/pages/HospitalsPage';
import HospitalDetailPage from '@/components/pages/HospitalDetailPage';
import DoctorsPage from '@/components/pages/DoctorsPage';
import DoctorDetailPage from '@/components/pages/DoctorDetailPage';
import TreatmentCostsPage from '@/components/pages/TreatmentCostsPage';
import PostCarePage from '@/components/pages/PostCarePage';
import ContactPage from '@/components/pages/ContactPage';
import PatientLoginPage from '@/components/pages/PatientLoginPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in (stored in localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-space-black" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Layout component that includes ScrollToTop, Header, and Footer
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    index: true,
    element: <PatientLoginPage />,
    routeMetadata: {
      pageIdentifier: 'patient-login',
    },
  },
  {
    path: "/login",
    element: <PatientLoginPage />,
    routeMetadata: {
      pageIdentifier: 'patient-login',
    },
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "hospitals",
        element: (
          <ProtectedRoute>
            <HospitalsPage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'hospitals',
        },
      },
      {
        path: "hospitals/:id",
        element: (
          <ProtectedRoute>
            <HospitalDetailPage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'hospital-detail',
        },
      },
      {
        path: "doctors",
        element: (
          <ProtectedRoute>
            <DoctorsPage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'doctors',
        },
      },
      {
        path: "doctors/:id",
        element: (
          <ProtectedRoute>
            <DoctorDetailPage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'doctor-detail',
        },
      },
      {
        path: "treatment-costs",
        element: (
          <ProtectedRoute>
            <TreatmentCostsPage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'treatment-costs',
        },
      },
      {
        path: "post-care",
        element: (
          <ProtectedRoute>
            <PostCarePage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'post-care',
        },
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <ContactPage />
          </ProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
