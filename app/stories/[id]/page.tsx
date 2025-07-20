import TopNavbar from "@/components/landing-page components/top-navbar"
import AdvertisementBanner from "@/components/section-components/ad-banner"
import MainNavbar from "@/components/landing-page components/main-navbar"
import Footer from "@/components/landing-page components/footer"
import MainStory from "@/components/stories-components/main-story"

export default function StoriesPage() {
  return (
    <>
      <TopNavbar />
      <AdvertisementBanner />
      <MainNavbar />
      <MainStory />
      <Footer />
    </>
  )
} 