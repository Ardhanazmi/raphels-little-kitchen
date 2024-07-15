import Footer from "@/components/bar/footer";
import Navbar from "@/components/bar/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-b from-brand-secondary">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
