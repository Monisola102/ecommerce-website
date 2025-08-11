import React, { Suspense } from "react";
import SearchPage from "@/component/search";

export default function Search() {
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
          </Suspense>

    </>
  );
}
