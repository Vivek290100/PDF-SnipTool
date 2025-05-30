// HeroSection.tsx - Updated to make homepage public
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";

export default function HeroSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("pdf", file);
      try {
        const response = await axiosInstance.post("/pdf/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSelectedPdfId(response.data.pdf._id);
      } catch (error) {
        alert("Failed to upload PDF. Please try again.");
      }
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleProceed = () => {
    if (selectedPdfId) {
      navigate(`/pdf-pages/${selectedPdfId}`);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background relative overflow-hidden">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-xl bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent animate-fade-in">
        Extract PDF Pages<br />with Ease
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-fade-in-up">
        Effortlessly upload, select, and create your custom PDF in just a few clicks.
      </p>

      <div className="flex flex-col items-center gap-4 animate-fade-in-up delay-200">
        <Button
          size="lg"
          className="group relative text-lg px-8 py-6 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-105 transition-transform duration-340 ease-in-out animate-pulse"
          onClick={handleButtonClick}
          aria-label="Upload PDF file"
        >
          <Upload className="mr-2 h-6 w-6" />
          {isAuthenticated ? "Upload PDF File" : "Get Started"}
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        {isAuthenticated && (
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            aria-hidden="true"
          />
        )}
        {selectedPdfId && (
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground rounded-full shadow-2xl hover:scale-105 transition-transform duration-340"
            onClick={handleProceed}
          >
            Proceed
          </Button>
        )}
        <p className="text-sm text-muted-foreground">
          {isAuthenticated 
            ? "Supports all PDF formats | Secure & Fast"
            : "Sign in to start extracting PDF pages"
          }
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}