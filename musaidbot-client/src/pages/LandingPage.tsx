import { Box } from '@mui/material'
import HeroSection from '../components/landing/HeroSection'
import HowItWorks from '../components/landing/HowItWorks'
import FeaturesSection from '../components/landing/FeaturesSection'
import DemoSection from '../components/landing/DemoSection'
import ComparisonSection from '../components/landing/ComparisonSection'
import PricingSection from '../components/landing/PricingSection'
import Testimonials from '../components/landing/Testimonials'
import FinalCTA from '../components/landing/FinalCTA'
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
const LandingPage = () => {
  return (
    <Box>
            <Navbar />

      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <DemoSection />
      <ComparisonSection />
      <PricingSection />
      <Testimonials />
      <FinalCTA />
            <Footer />

    </Box>
  )
}

export default LandingPage
