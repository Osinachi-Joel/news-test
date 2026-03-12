"use client";
import Image from "next/image"


export default function AdvertisementBanner() {
  return (
    <div className="flex items-center justify-center mx-auto px-4 py-8 bg-[#1b1b1b]">
      <div className="rounded-xl overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-500 cursor-pointer">
        <Image
          src="/ad.svg"
          alt="Advertisement Banner"
          width={1000}
          height={90}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
