import React from "react";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-0">
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold line leading-[1.1]">
          Kami Menyediakan <br />{" "}
          <span className="text-brand">Kue Terbaik </span> <br /> Untuk Anda
        </h1>
        <p>
          Nikmati berbagai pilihan kue lezat kami yang dibuat <br /> dengan
          bahan berkualitas tinggi. Kami berkomitmen <br /> untuk memberikan
          rasa yang luar biasa di setiap gigitan.
        </p>
        <Button variant="brand">
          Order Sekarang
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="w-full lg:w-1/2">
        <AspectRatio ratio={12 / 9}>
          <Image src="/hero.png" alt="Hero Image" fill />
        </AspectRatio>
      </div>
    </div>
  );
};

export default HeroSection;
