import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Signup = lazy(() => import("./pages/signUpPage"));
const Login = lazy(() => import("./pages/loginPage"));
const Home = lazy(() => import("./pages/homePage"));


const App = () => {
  return (
    <>
      <Suspense> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </>
  );
};


export default App;
