import { Play } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Become an Expert,
            <br />
            One Code at a Time
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            "From Basics to Advanced: Your Coding Journey Starts Here!"
            <br />
            "Sharpen Your Skills Through Real Problems"
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full mt-4 transition-colors duration-300">
            Begin Challenge →
          </button>
        </div>

        {/* Video Player Section */}
        <div className="relative aspect-video bg-black/40 rounded-lg border border-purple-500/30 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors duration-300">
              <Play className="w-8 h-8 text-white ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;