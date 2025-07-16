import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface MissedStory {
  id: string
  title: string
  date: string
  category: string
  slug: string
}

const missedStories: MissedStory[] = [
  {
    id: "1",
    title: "Binance: Nigeria orders cryptocurrency firm to pay $10bn",
    date: "Feb 29, 2024",
    category: "Finance",
    slug: "binance-nigeria-cryptocurrency-10bn",
  },
  {
    id: "2",
    title: "Rivers Community Protests Alleged Killing Of Indigenes By Militia",
    date: "Feb 29, 2024",
    category: "Finance",
    slug: "rivers-community-protests-killing-militia",
  },
  {
    id: "3",
    title: "Former NGX Group Chairman Abimbola Ogunbanjo Laid To Rest",
    date: "Feb 29, 2024",
    category: "Finance",
    slug: "ngx-chairman-abimbola-ogunbanjo-laid-rest",
  },
  {
    id: "4",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    date: "Feb 29, 2024",
    category: "Finance",
    slug: "foden-man-city-crush-man-united",
  },
]

export default function MissedStoriesSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          STORIES YOU MAY HAVE MISSED
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {missedStories.map((story) => (
          <div key={story.id} className="group cursor-pointer">
            <Link href={`/story/${story.slug}`}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-gray-800 rounded-sm mt-1 flex-shrink-0"></div>
                  <h3 className="text-gray-800 font-semibold leading-tight group-hover:text-purple-600 transition-colors duration-200">
                    {story.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 ml-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>{story.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Newsletter and Advertisement Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Newsletter Signup */}
        <div className="w">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src="/email.svg"
                  alt="Betano Advertisement"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium mb-4">
                Get the latest news and stories from around Africa directly into
                your inbox daily.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full"
                />
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  Get Me In
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Betano Advertisement */}
        <div className="rounded-lg p-6 text-white  overflow-hidden">
          <Image
            src="/betads.svg"
            alt="Betano Advertisement"
            width={640}
            height={360}
          />
        </div>
      </div>
    </section>
  );
}
