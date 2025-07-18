import Image from "next/image"
import Link from "next/link"

const stories = Array.from({ length: 5 }).map((_, i) => ({
  id: `${i + 1}`,
  title: "Dozens of Russian tourists were recently allowed to visit North Korea. Here's what they saw",
  date: "1:32 AM, Sun March 10, 2024",
  excerpt:
    "Former President John Dramani Mahama has emphasized the importance of education to the country's development, noting that the sector consistently receives a significant portion of budgetary allocations from every government...",
  image: "/placeholder.svg?height=120&width=120",
  slug: `north-korea-russian-tourists-${i + 1}`,
}))

const ads = [
  { src: "/flakes.svg", alt: "Ad 1" },
  { src: "/foam.svg", alt: "Ad 2" },
  { src: "/socc.svg", alt: "Ad 3" },
]

export default function OtherStories({ section }: { section: string }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <div className="w-1 h-5 bg-purple-900 mr-3"></div>
        <h2 className="text-lg font-bold text-gray-900 tracking-wide">OTHER STORIES IN <span className="uppercase">{section}</span></h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stories List */}
        <div className="lg:col-span-2 space-y-6">
          {stories.map((story) => (
            <div key={story.id} className="flex bg-white rounded shadow-md overflow-hidden">
              <div className="relative w-40 h-40 flex-shrink-0">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">
                    {story.title}
                  </h3>
                  <div className="text-xs text-gray-500 mb-2">Posted {story.date}</div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{story.excerpt}</p>
                </div>
                <Link href={`/stories/${story.id}`} className="inline-block mt-2">
                  <button className="px-4 py-1 text-xs bg-gray-100 rounded-2xl border border-gray-300 hover:bg-gray-200 transition">Continue reading</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar Ads */}
        <div className="space-y-6">
          {ads.map((ad, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <Image 
                src={ad.src} 
                alt={ad.alt} 
                width={idx === 2 ? 233 : 300} 
                height={idx === 2 ? 466 : 250} 
                className="" 
              />
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-8 mt-8 text-sm">
        <span>Showing 1 - 10 of 68</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100" aria-label="Previous">&#60;</button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 flex items-center text-white hover:text-black justify-center rounded-md border ${n === 1 ? "bg-gray-800 text-white" : "bg-gray-400 hover:bg-gray-100"}`}
            >
              {n}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100" aria-label="Next">&#62;</button>
        </div>
      </div>
    </section>
  )
} 