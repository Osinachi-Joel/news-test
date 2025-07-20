import { redirect } from "next/navigation"
import TopNavbar from "@/components/landing-page components/top-navbar"
import AdvertisementBanner from "@/components/section-components/ad-banner"
import MainNavbar from "@/components/landing-page components/main-navbar"
import Footer from "@/components/landing-page components/footer"
import LatestSection from "@/components/section-components/latest-section"
import OtherStories from "@/components/section-components/other-stories"

type Props = {
  params: Promise<{ section: string }>
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params
  if (section === "home") {
    redirect("/")
  }
  return (
    <>
      <TopNavbar />
      <AdvertisementBanner />
      <MainNavbar />
      <main className="">
        {/* <h1 className="text-3xl font-bold capitalize text-center mb-8">{section}</h1> */}
        <LatestSection section={section} />
        <OtherStories section={section} />
      </main>
      <Footer />
    </>
  )
} 