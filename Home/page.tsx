import Hero from "@/component/hero";
import TrendComp from "@/component/Trends";
import SpringComp from "@/component/springComp";
import Learn from "@/component/learn";
import RecommendedComp from "@/component/Recommended";

export default function Home() {
  return (
    <>
      <Hero />
       <div className="mb-8">
        <TrendComp />
      </div>

      <div className="mb-8">
        <SpringComp />
      </div>

      <div className="mb-8">
        <RecommendedComp />
      </div>

      <div className="mb-8">
        <Learn />
      </div>
    </>
  );
}
5