// Dynamic route for all main navbar links except Home
import { redirect } from "next/navigation"
import TopNavbar from "@/components/landing-page components/top-navbar"
import AdvertisementBanner from "@/components/section-components/ad-banner"
import MainNavbar from "@/components/landing-page components/main-navbar"
import Footer from "@/components/landing-page components/footer"

interface SectionPageProps {
  params: { section: string }
}

export default function SectionPage({ params }: SectionPageProps) {
  const { section } = params
  if (section === "home") {
    redirect("/")
  }
  return (
    <>
      <TopNavbar />
      <AdvertisementBanner />
      <MainNavbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold capitalize text-center mb-8">{section}</h1>
        {/* Section-specific content can go here */}
      </main>
      <Footer />
    </>
  )
} 