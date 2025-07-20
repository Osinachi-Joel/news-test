"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface StoryData {
  title: string;
  author: string;
  created_at: string;
  banner_image: string;
  content: string;
}

export default function MainStory() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [story, setStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add state for top stories
  const [topStories, setTopStories] = useState<{
    id: number;
    title: string;
    subtitle: string;
    image: string;
  }[]>([]);
  const [topStoriesLoading, setTopStoriesLoading] = useState(true);
  const [topStoriesError, setTopStoriesError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchStory() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.agcnewsnet.com/api/general/stories/${id}`);
        if (!res.ok) throw new Error("Failed to fetch story");
        const data = await res.json();
        const s = data?.story || data?.data?.story || data?.data;
        if (!s || !s.title) throw new Error("Story not found");
        setStory({
          title: s.title,
          author: s.author || "Unknown",
          created_at: s.created_at || "",
          banner_image: s.banner_image || "",
          content: s.content || "",
        });
      } catch (err: unknown) {
        let message = "Failed to load story.";
        if (err instanceof Error) message = err.message;
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [id]);

  // Fetch top stories for sidebar
  useEffect(() => {
    async function fetchTopStories() {
      setTopStoriesLoading(true);
      setTopStoriesError(null);
      try {
        const res = await fetch("https://api.agcnewsnet.com/api/general/top-stories");
        const data = await res.json();
        type ApiStory = {
          story: {
            id: number;
            title: string;
            subtitle: string;
            banner_image: string;
          };
        };
        const apiStories = (data?.data?.data || []).map((item: ApiStory) => ({
          id: item.story.id,
          title: item.story.title,
          subtitle: item.story.subtitle,
          image: item.story.banner_image,
        }));
        
        // Ensure we always have at least 5 stories by repeating if necessary
        let filledStories = apiStories;
        if (apiStories.length > 0 && apiStories.length < 5) {
          filledStories = [...apiStories];
          while (filledStories.length < 5) {
            filledStories.push(apiStories[0]);
          }
        }
        
        setTopStories(filledStories);
      } catch {
        setTopStoriesError("Failed to load top stories.");
      } finally {
        setTopStoriesLoading(false);
      }
    }
    fetchTopStories();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading story...</div>;
  }
  if (error || !story) {
    return <div className="p-8 text-center text-red-500">{error || "Story not found."}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 bg-white w-full">
      {/* Main Content */}
      <main className="flex-1 lg:flex-3">
        <div className="mb-4 flex items-center text-xs text-gray-500 gap-2">
          <span className="border px-2 py-0.5 rounded-full">World News</span>
          <button className="ml-2 px-2 py-0.5 border rounded text-blue-600 hover:bg-blue-50">+ Share</button>
        </div>
        <h1 className="text-2xl font-bold mb-4">
          {story.title}
        </h1>
        <div className="text-gray-500 text-sm mb-4">
          Posted {story.created_at ? new Date(story.created_at).toLocaleString() : ""} • 4 minute read
        </div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <span className="text-sm text-gray-700">By {story.author}</span>
        </div>
        <div className="mb-6">
          {story.banner_image && (
            <Image
              src={story.banner_image}
              alt={story.title}
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded"
            />
          )}
          <div className="text-xs text-gray-400 mt-2">
            Russia-Africa Forum. Photo: Getty Images
          </div>
        </div>
        <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <div 
            className="space-y-6 text-base leading-7"
            dangerouslySetInnerHTML={{ 
              __html: (() => {
                const paragraphs = story.content.split('</p>');
                const middleIndex = Math.floor(paragraphs.length / 2);
                
                const adHtml = `
                  <div class="my-8 flex flex-col items-center">
                    <img src="/ad.svg" alt="QuickBooks Advertisement" class="w-full h-64 object-contain rounded mb-3" />
                  </div>
                `;
                
                const modifiedParagraphs = [...paragraphs];
                modifiedParagraphs.splice(middleIndex, 0, adHtml);
                
                return modifiedParagraphs.join('</p>').replace(/<p>/g, '<p class="mb-6">');
              })()
            }} 
          />
        </article>
        
        {/* Social Media Icons at Bottom */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button title="Share on X (Twitter)" className="text-gray-600 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button title="Share on Instagram" className="text-gray-600 hover:text-pink-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
          <button title="Share on Facebook" className="text-gray-600 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button title="Share on Pinterest" className="text-gray-600 hover:text-red-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </button>
          <button title="Share on LinkedIn" className="text-gray-600 hover:text-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          <button title="Copy Link" className="text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.5 5.5C7.5 4.119 8.619 3 10 3h8c1.381 0 2.5 1.119 2.5 2.5v8c0 1.381-1.119 2.5-2.5 2.5h-8C8.619 16 7.5 14.881 7.5 13.5v-8zM6 5.5C6 3.567 7.567 2 9.5 2h8C19.433 2 21 3.567 21 5.5v8c0 1.933-1.567 3.5-3.5 3.5h-8C7.567 17 6 15.433 6 13.5v-8z"/>
              <path d="M3 7.5C3 5.567 4.567 4 6.5 4H14v1.5H6.5C5.119 5.5 4 6.619 4 7.5v8C4 16.381 5.119 17.5 6.5 17.5H14V19H6.5C4.567 19 3 17.433 3 15.5v-8z"/>
            </svg>
          </button>
        </div>
      </main>
      
      {/* Sidebar */}
      <aside className="w-full lg:w-96 flex-shrink-0 space-y-6 lg:ml-8">
        <section className="bg-gray-50 rounded p-4 mb-4">
          <h2 className="font-semibold text-sm mb-3 text-gray-700">TOP STORIES</h2>
          {topStoriesLoading ? (
            <div className="text-center py-4 text-gray-400 text-sm">Loading top stories...</div>
          ) : topStoriesError ? (
            <div className="text-center py-4 text-red-400 text-sm">{topStoriesError}</div>
          ) : (
            <ul className="space-y-3">
              {topStories.map((story) => (
                <li key={story.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <a href={`/stories/${story.id}`} className="text-sm text-blue-900 hover:underline leading-relaxed">
                    {story.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
        
        {/* MTN Advertisement */}
        <div className="flex flex-col items-center">
          <Image
            src="/mtnads.svg"
            alt="MTN Advertisement"
            width={800}
            height={600}
            className="w-full h-[400px] object-contain rounded mb-3"
          />
        </div>
        
        {/* Latex Foam Advertisement */}
        <div className="flex flex-col items-center">
          <Image
            src="/foam.svg"
            alt="Latex Foam Advertisement"
            width={800}
            height={600}
            className="w-full h-[400px] object-contain rounded mb-3"
          />
        </div>
      </aside>
    </div>
    </div>
  );
}
