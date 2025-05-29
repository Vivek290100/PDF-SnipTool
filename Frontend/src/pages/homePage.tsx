import HeroSection from "@/components/home"
import Navbar from "@/components/navbar"
const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      <Navbar/>
      <HeroSection/>
    </div>
  )
}

export default HomePage