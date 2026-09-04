import { Hero } from "@/components/Hero";
import { VaultSection } from "@/components/VaultSection";
import { Calculator } from "@/components/Calculator";
import { Receipts } from "@/components/Receipts";
import { Recipient } from "@/components/Recipient";
import { Commitments } from "@/components/Commitments";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

/*
 * Order of argument: the promise, then the machine that keeps it, then the
 * arithmetic, then the (empty) proof, then who it is for, then everything
 * that is not true. The disclaimers sit before the FAQ rather than in the
 * footer because a reader who leaves early should have hit them.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <VaultSection />
      <Calculator />
      <Receipts />
      <Recipient />
      <Commitments />
      <Faq />
      <Footer />
    </>
  );
}
