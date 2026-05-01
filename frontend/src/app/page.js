import Topbar from '@/components/Topbar';
import MainHeader from '@/components/MainHeader';
import ActionButtons from '@/components/ActionButtons';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WelcomeSection from '@/components/WelcomeSection';
import DigitalActions from '@/components/DigitalActions';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Topbar />
      <MainHeader />
      <ActionButtons />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WelcomeSection />
        <DigitalActions />
      </main>
      <Footer />
    </div>
  );
}
