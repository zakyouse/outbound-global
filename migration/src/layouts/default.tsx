import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import ScrollToTop from "@/components/Home Components/ScrollToTop";
import ConsultationForm from "@/components/consultation_form";
import { useConsultation } from "@/contexts/consultationContext";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { consultation } = useConsultation();

  

  return (
    <div className="relative flex flex-col h-screen">
      {consultation && <ConsultationForm />}
      <Navbar />
      <main className="container mx-auto md:max-w-7xl md:px-6 flex-grow pt-8">
        {children}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
