import Image from "next/image"


export default function AdvertisementBanner() {
  return (
    <div className="flex items-center justify-center mx-auto px-4 py-4 bg-[#1b1b1b]">
      <Image
        src="/ad.svg"
        alt="Advertisement Banner"
        width={1000}
        height={90}
      />
    </div>
  )
}
