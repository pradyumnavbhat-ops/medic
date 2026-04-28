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

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "hospitals",
        element: <HospitalsPage />,
        routeMetadata: {
          pageIdentifier: 'hospitals',
        },
      },
      {
        path: "hospitals/:id",
        element: <HospitalDetailPage />,
        routeMetadata: {
          pageIdentifier: 'hospital-detail',
        },
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
        routeMetadata: {
          pageIdentifier: 'doctors',
        },
      },
      {
        path: "doctors/:id",
        element: <DoctorDetailPage />,
        routeMetadata: {
          pageIdentifier: 'doctor-detail',
        },
      },
      {
        path: "treatment-costs",
        element: <TreatmentCostsPage />,
        routeMetadata: {
          pageIdentifier: 'treatment-costs',
        },
      },
      {
        path: "post-care",
        element: <PostCarePage />,
        routeMetadata: {
          pageIdentifier: 'post-care',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
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
