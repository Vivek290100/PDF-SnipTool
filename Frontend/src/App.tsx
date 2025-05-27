import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/UserLayout";

const Signup = lazy(() => import("./pages/auth/signUp"));
const Login = lazy(() => import("./pages/auth/login"));
const Home = lazy(() => import("./pages/user/HomePage"));


const App = () => {
  return (
    <>
      <Suspense> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<UserLayout />} >
            <Route index element={<Navigate to="userDashboard" replace />} />  
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};


export default App;
