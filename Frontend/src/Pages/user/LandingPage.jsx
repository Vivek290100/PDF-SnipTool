import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AcmeLogo } from "../../components/AcmeLogo";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900">
      {/* Navbar */}
      <Navbar isBordered className="bg-gray-900 backdrop-blur-md ">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-white">PDF-SnipTool</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              auto
              light
              onClick={() => navigate("/login")}
              className="text-white hover:text-white bg-red-600 "
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="primary"
              onClick={() => navigate("/signup")}
              variant="flat"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-slate-200 via-gray-300 to-slate-400 bg-clip-text text-transparent animate-fade-in">
          Edit Your PDFs Effortlessly
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed animate-pulse">
          Our PDF editor allows you to easily edit, annotate, and share PDF
          documents with ease. Sign up today to get started.
        </p>
        <div className="mt-8">
          <Button
            color="primary"
            size="lg"
            onClick={() => navigate("/signup")}
            className="group relative bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
          >
            Get Started for Free
            <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Features that You'll Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                Edit Text
              </h3>
              <p className="text-gray-300">
                Modify text, fonts, and more directly within your PDF documents.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                Annotate PDFs
              </h3>
              <p className="text-gray-300">
                Highlight, underline, and add comments with a variety of
                annotation tools.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                Merge & Split PDFs
              </h3>
              <p className="text-gray-300">
                Easily merge multiple PDFs into one or split them into separate
                files.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;