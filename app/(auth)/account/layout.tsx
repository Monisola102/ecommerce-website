import { ReactNode } from "react";
import AccountSidebar from "@/component/accountsidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AccountSidebar />  
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
