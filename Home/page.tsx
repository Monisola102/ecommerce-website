import Hero from "@/component/hero";
import TrendComp from "@/component/Trends";
import SpringComp from "@/component/springComp";
import Learn from "@/component/learn";
import RecommendedComp from "@/component/Recommended";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendComp />
      <SpringComp/>
      <RecommendedComp/>
      <Learn/>
    </>
  );
}
5