import Image from "next/image"


export default function AdvertisementBanner() {
  return (
    <div className="flex items-center flex-wrap gap-8 justify-center mx-auto px-4 py-12 bg-[#1b1b1b]">
      <div className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer border border-white/5">
        <Image
          src="/eversend.svg"
          alt="Advertisement Banner"
          width={500}
          height={120}
          className="h-auto"
        />
      </div>
      <div className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer border border-white/5">
        <Image
          src="/cmarket.svg"
          alt="Advertisement Banner"
          width={500}
          height={120}
          className="h-auto"
        />
      </div>
    </div>
  )
}
