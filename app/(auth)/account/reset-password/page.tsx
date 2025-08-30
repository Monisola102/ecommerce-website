import { Suspense } from "react";
import ResetPassword from "@/component/resetpassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
