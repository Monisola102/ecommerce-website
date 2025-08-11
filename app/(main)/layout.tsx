
"use client";

import { ToastContainer } from "react-toastify";
import Header from "@/component/header";
import Footer from "@/component/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
       <Header/>
        <main>{children}</main>
      <ToastContainer
       position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
      
      />
        <Footer/>
        </>
  );
}
