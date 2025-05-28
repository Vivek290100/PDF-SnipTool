import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      console.log("Selected PDF:", file.name);
      // TODO: Implement file upload logic (e.g., dispatch to Redux or API call)
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background relative overflow-hidden">
      {/* Subtle animated background elements */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" /> */}

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-xl  bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent animate-fade-in">
        Extract PDF Pages<br />with Ease
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-fade-in-up">
        Effortlessly upload, select, and create your custom PDF in just a few clicks.
      </p>

      <div className="flex flex-col items-center gap-4 animate-fade-in-up delay-200">
        <Button
          size="lg"
          className="group relative text-lg px-8 py-6 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 hover:scale-105 transition-transform duration-300 ease-in-out animate-pulse"
          onClick={handleButtonClick}
          aria-label="Upload PDF file"
        >
          <Upload className="mr-2 h-6 w-6 group-hover:animate-bounce" />
          Upload PDF File
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">
          Supports all PDF formats | Secure & Fast
        </p>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}