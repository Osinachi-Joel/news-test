import Image from "next/image"


export default function AdvertisementBanner() {
  return (
    <div className="flex items-center gap-2 justify-center mx-auto px-4 py-8 bg-[#1b1b1b]">
      <Image
        src="/eversend.svg"
        alt="Advertisement Banner"
        width={500}
        height={120}
      />
      <Image
        src="/cmarket.svg"
        alt="Advertisement Banner"
        width={500}
        height={120}
      />
    </div>
  )
}
