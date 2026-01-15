import React from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface ContentBlock {
  tag?: string;
  type?: string;
  content: string;
}

interface ImageBlock {
  url: string;
  type?: string;
}

interface ParagraphBlock {
  type: string;
  content: string;
}

interface IntroDescription {
  type: string;
  paragraphs: {
    paragraph_1?: ParagraphBlock;
    paragraph_2?: ParagraphBlock;
    [key: string]: ParagraphBlock | undefined;
  };
}

interface IntroContent {
  image: ImageBlock;
  title: ContentBlock;
  tagline: ContentBlock;
  image_tag: ContentBlock;
  description: IntroDescription;
}

async function getIntroSection(): Promise<IntroContent | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  if (!clientId) {
    console.error("NEXT_PUBLIC_CLIENT_ID is not set");
    return null;
  }

  const { data, error } = await supabase
    .from("client_home_page")
    .select("intro_section")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching intro section:", error);
    return null;
  }

  return data?.intro_section || null;
}

const IntroSection = async () => {
  const introSection = await getIntroSection();

  if (!introSection) {
    return null;
  }

  return (
    <section
      className="md:py-40 py-20  bg-theme-bg w-full"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Image Section */}
          <div className="relative">
            {introSection?.image?.url && (
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={introSection.image.url}
                  alt="Agency introduction image"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Content Section (overlapping image slightly from left) */}
          <div className="mt-12 relative z-20 md:-translate-x-16 ">
            <div className="animate-fade-in-left bg-[#F8F9FA] h-full p-10 rounded-lg shadow-lg flex flex-col justify-center">
              {/* Tagline */}
              {introSection?.tagline?.content && (
                <h1 className="uppercase font-bold text-primary text-xl mb-9">
                  {introSection.tagline.content}
                </h1>
              )}

              {/* Title */}
              {introSection?.title?.content && (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-primary font-pl">
                  {introSection.title.content}
                </h2>
              )}

              {/* Description paragraphs */}
              {introSection?.description?.paragraphs && (
                <div className="my-6 flex flex-col gap-4">
                  <h3 className="text-lg font-medium text-primary mb-4 italic">
                    " {introSection.description.paragraphs.paragraph_1.content}{" "}
                    "
                  </h3>
                  <h3 className="text-lg font-medium text-theme-body">
                    {introSection.description.paragraphs.paragraph_2.content}
                  </h3>
                  <h3>
                    {introSection.description.paragraphs.paragraph_3.content}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
