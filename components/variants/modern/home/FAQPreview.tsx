"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ChevronUp } from "lucide-react";

interface QuestionItem {
  question: string;
  answer: string;
}

interface FAQContent {
  tagline?: { content: string };
  subtitle?: { content: string };
  description?: { content: string };
  items?: QuestionItem[];
}

export default function FAQSection() {
  const [content, setContent] = useState<FAQContent | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      if (!clientId) return;

      const { data, error } = await supabase
        .from("client_home_page")
        .select("common_questions_section")
        .eq("client_id", clientId)
        .maybeSingle();

      if (error) console.error("Error fetching FAQ:", error);
      else setContent(data?.common_questions_section || null);
    };

    fetchFAQ();
  }, []);

  if (!content?.items?.length) return null;

  const toggleFAQ = (index: number) => {
    setAnimatingIndex(index);
    setTimeout(() => {
      setOpenIndex(openIndex === index ? null : index);
      setAnimatingIndex(null); 
    }, 200);
  };

  return (
    <section className="py-24 container mx-auto px-4 max-w-screen-xl">
      <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wide bg-primary text-primary-foreground px-3 py-1">
        {content.tagline?.content || "POPULAR QUESTION"}
      </span>

      <h2 className="text-5xl font-bold mb-10 leading-tight">
        {content.subtitle?.content || "We help you explore and secure protection"}
      </h2>

      {content.description?.content && (
        <p className="mb-10 text-secondary max-w-2xl">{content.description.content}</p>
      )}

      <div className="divide-y border-t border-b">
        {content.items.map((faq, index) => {
          const isOpen = openIndex === index;
          const isAnimating = animatingIndex === index;

          return (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="text-xl font-medium">{faq.question}</span>
                <div
                  className={`border rounded-full p-1.5 transition-colors ${
                    isOpen ? "bg-primary border-primary" : "bg-transparent"
                  }`}
                >
                  {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-primary" />}
                </div>
              </button>

              <div
                className={`overflow-hidden text-secondary text-lg transition-all duration-300 ${
                  isOpen || isAnimating ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
