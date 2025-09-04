import SignUpUser from "@/component/sign-in";
import { Suspense } from "react";

export default function SignIn() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignUpUser />
    </Suspense>
  );
}
