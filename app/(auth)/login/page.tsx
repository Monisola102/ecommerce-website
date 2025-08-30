import { Suspense } from "react";
import Login from "@/component/login";

export default function Account() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
