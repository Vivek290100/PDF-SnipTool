import Navbar from "@/components/layout/navbar"
import HeroSection from "@/components/home/heroSection"
import Footer from "@/components/layout/footer"
const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      <Navbar/>
      <HeroSection/>
      <Footer/>
    </div>
  )
}

export default HomePage