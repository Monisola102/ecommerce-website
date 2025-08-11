import { Suspense } from "react";
import Login from "@/component/account";

export default function Account() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
