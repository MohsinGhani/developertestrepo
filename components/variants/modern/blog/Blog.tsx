"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllTopics, getPostBySlug, getPostsByTopic } from "@/lib/blog";

export default function BlogPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const allTopics = await getAllTopics();
        const getpostBySlug = await getPostsByTopic(5);
        setTopics(allTopics);
        setPost(getpostBySlug);
      } catch (err) {
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
      console.log("Fetched topics:", topics);
    };

    fetchTopics();
  }, []);
  console.log("Rendering topics:", topics);
  console.log("Rendering post:", post);
  if (loading) {
    return (
      <div className="py-20 mt-20 text-center text-lg text-theme-body">
        Loading blog topics...
      </div>
    );
  }

  if (!topics.length) {
    return (
      <div className="py-20 text-center text-lg text-theme-body">
        No blog topics available.
      </div>
    );
  }

  return (
    <main className="flex-grow">
      {/* Header */}
      <div className="py-12 mt-16 text-center">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 relative">
            All Blog Topics
            <div className="h-1 w-24 bg-accent/60 rounded mx-auto mt-3"></div>
          </h2>
          <p className="text-theme-body text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            Explore the latest insights, tips, and guides from our insurance
            experts.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <section className="pb-12 bg-primary-foreground/5">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <div
                key={topic.id}
                // href={`/blog/${topic.slug}`}
                className="block h-full"
              >
                <div className="bg-white border border-secondary/30 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  {topic.image_url && (
                    <div className="relative w-full h-72">
                      <Image
                        src={topic.image_url}
                        alt={topic.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        quality={95}
                      />
                    </div>
                  )}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-heading font-bold text-primary mb-1">
                      {topic.name}
                    </h3>
                    <p className="text-theme-body flex-grow">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
