"use client";
import { useState, useEffect } from "react";
import Loader from "@/component/loader";
import Hero from "@/component/hero";
import TrendComp from "@/component/Trends";
import SpringComp from "@/component/springComp";
import Learn from "@/component/learn";
import RecommendedComp from "@/component/Recommended";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate API wake
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

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
