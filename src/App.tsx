import Navbar from '@/components/Navbar';
import CinematicHero from '@/components/CinematicHero';
import SolarHighlight from '@/components/SolarHighlight';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import SavingsCalculator from '@/components/SavingsCalculator';
import Trust from '@/components/Trust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-ink-900">
      <Navbar />
      <main>
        {/* Scenes 1 & 2 — cinematic aerial-to-home scroll transition */}
        <CinematicHero />
        {/* Scene 3 — interactive rooftop solar highlight */}
        <SolarHighlight />
        {/* Scene 4 — transition into the main website */}
        <Services />
        <Projects />
        <SavingsCalculator />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
