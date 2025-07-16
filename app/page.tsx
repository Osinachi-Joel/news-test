"use client";
import TopNavbar from "@/components/landing-page components/top-navbar"
import MainNavbar from "@/components/landing-page components/main-navbar"
import AdvertisementBanner from "@/components/landing-page components/ad-banner"
import TopStories from "@/components/landing-page components/top-stories"
import LatestNews from "@/components/landing-page components/latest-news"
import MoreStories from "@/components/landing-page components/more-stories"
import PoliticsSection from "@/components/landing-page components/politics-section"
import BusinessSection from "@/components/landing-page components/business-section"
import SportSection from "@/components/landing-page components/sport-section"
import FeaturedStories from "@/components/landing-page components/featured-stories"
import NewsVideosSection from "@/components/landing-page components/news-video-section"
import NewsPicturesSection from "@/components/landing-page components/news-pic-section"
import MissedStoriesSection from "@/components/landing-page components/missed-stories-section"
import Footer from "@/components/landing-page components/footer"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from "react";

export default function HomePage() {
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionCount = sectionRefs.length;
  const scrollToSection = (idx: number) => {
    const ref = sectionRefs[idx].current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", inline: "start" });
      setCurrentIdx(idx);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <AdvertisementBanner />
      <MainNavbar />
      <TopStories />
      <LatestNews />
      <MoreStories />
      <div className="relative">
        {currentIdx > 0 && (
          <button
            type="button"
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full shadow-lg p-2 text-3xl text-pink-600 hover:bg-pink-100 transition-all border-2 border-pink-400"
            onClick={() => {
              if (currentIdx > 0) scrollToSection(currentIdx - 1);
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}
        <nav id="scrollable-nav" className="flex overflow-x-hidden no-scrollbar py-4 px-0 h-[700px] w-full" style={{scrollbarWidth:'none'}}>
          <div ref={sectionRefs[0]} className="flex-shrink-0 min-w-full w-full h-full flex items-center justify-center">
            <PoliticsSection />
          </div>
          <div ref={sectionRefs[1]} className="flex-shrink-0 min-w-full w-full h-full flex items-center justify-center">
            <BusinessSection />
          </div>
          <div ref={sectionRefs[2]} className="flex-shrink-0 min-w-full w-full h-full flex items-center justify-center">
            <SportSection />
          </div>
        </nav>
        {currentIdx < sectionCount - 1 && (
          <button
            type="button"
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full shadow-lg p-2 text-3xl text-pink-600 hover:bg-pink-100 transition-all border-2 border-pink-400"
            onClick={() => {
              if (currentIdx < sectionCount - 1) scrollToSection(currentIdx + 1);
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>
      <FeaturedStories />
      <NewsVideosSection />
      <NewsPicturesSection />
      <MissedStoriesSection />
      <Footer />
    </div>
  )
}
