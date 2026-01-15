"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewItem {
  author: string;
  rating: number;
  content: string;
  title?: string;
}

interface TestimonialsSectionData {
  tagline?: { content: string };
  subtitle?: { content: string };
  description?: { content: string };
  reviews?: { items: ReviewItem[] };
}

export default function TestimonialsSection() {
  const [section, setSection] = useState<TestimonialsSectionData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      if (!clientId) return;

      const { data, error } = await supabase
        .from("client_home_page")
        .select("testimonials_section")
        .eq("client_id", clientId)
        .maybeSingle();

      if (error) {
        console.error("Testimonials fetch failed:", error);
        return;
      }

      setSection(data?.testimonials_section ?? null);
    };

    fetchTestimonials();
  }, []);

  if (!section?.reviews?.items?.length) return null;

  const reviews = section.reviews.items;
  const currentTestimonial = reviews[currentIndex];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gray-50 w-full">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wide bg-primary text-primary-foreground px-3 py-1">
          {section.tagline?.content || "WHAT OUR CLIENTS SAY"}
        </span>

        <h2 className="text-5xl font-heading font-bold text-primary mb-12">
          {section.subtitle?.content || "Those who trust us"}
        </h2>

        <div className="relative text-start">
          {/* Testimonial Text */}
          <blockquote className="text-3xl italic text-gray-700 mb-6 leading-relaxed border-b pb-10">
            “{currentTestimonial.content}”
          </blockquote>

          {/* Client Info */}
          <div className="mb-8">
            <p className="font-medium text-2xl text-primary">
              {currentTestimonial.author}
            </p>
            {currentTestimonial.title && (
              <p className="text-2xl text-secondary">{currentTestimonial.title}</p>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={goToPrev}
              className="bg-primary-foreground text-primary p-2 rounded-full shadow-md hover:text-primary-foreground hover:bg-primary transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="bg-primary-foreground text-primary p-2 rounded-full shadow-md hover:text-primary-foreground hover:bg-primary transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
