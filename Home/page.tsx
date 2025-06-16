import Hero from "@/component/hero";
import TrendComp from "@/component/Trends";
import Spring from "@/component/spring";
import Learn from "@/component/learn";
import RecommendedComp from "@/component/Recommended";
import AccesoriesComp from "@/Accesories/Accesories";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendComp />
      <Spring/>
      <RecommendedComp/>
      <Learn/>
      <AccesoriesComp/>
    </>
  );
}
