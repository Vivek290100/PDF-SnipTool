// App.tsx - Updated routing with protected routes
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navbar";

const Signup = lazy(() => import("./pages/signUpPage"));
const Login = lazy(() => import("./pages/loginPage"));
const Home = lazy(() => import("./pages/homePage"));
const PdfPagesPage = lazy(() => import("./pages/pdfPagesPage"));


const App = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}> 
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pdf-pages/:pdfId" element={<PdfPagesPage />} />

        
        </Routes>
      </Suspense>
    </>
  );
};

export default App;