import React from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface HeroSectionData {
  title?: {
    content: string;
    color?: string;
  };
  subtitle?: {
    content: string;
    color?: string;
  };
  description?: {
    content: string;
  };
  background_image?: {
    url: string;
    alt?: string;
  };
  overlay?: {
    color?: string;
    opacity?: number;
  };
}

async function getHeroSection(): Promise<HeroSectionData | null> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return null;
  const { data, error } = await supabase
    .from("client_home_page")
    .select("hero_section")
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) {
    console.error("Hero section fetch failed:", error);
    return null;
  }

  return data?.hero_section ?? null;
}

const HeroSection = async () => {
  const [hero] = await Promise.all([getHeroSection()]);

  if (!hero) return null;

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <section
      className="relative min-h-[100vh] w-full overflow-hidden "
      aria-label="Hero Section"
    >
      {hero.background_image?.url && (
        <Image
          src={hero.background_image.url}
          alt={hero.background_image.alt || "Hero background"}
          fill
          priority
          className="object-cover"
        />
      )}

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: hero.overlay?.color || "#000",
          opacity: (hero.overlay?.opacity ?? 50) / 100,
        }}
      />

      <div className="relative z-20 flex h-[100vh] items-center md:px-0 px-12">
        <div className="mx-auto w-full max-w-7xl  flex justify-end md:pr-10 xl:pr-0">
          <div className=" text-left  md:px-0 space-y-6 md:space-y-8 ">
            {hero.subtitle?.content && (
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-wider text-right"
                style={{
                  color:
                    hero.subtitle.color || "var(--color-primary-foreground)",
                }}
              >
                {renderText(hero.subtitle.content)}
              </p>
            )}

            {hero.title?.content && (
              <h1
                className="mb-6 text-4xl text-right font-extrabold  sm:text-2xl md:text-6xl lg:text-7xl"
                style={{
                  color: hero.title.color || "var(--color-primary-foreground)",
                }}
              >
                {renderText(hero.title.content)}
              </h1>
            )}

            <div className="text-end ">
              <a
                href="/contact-us"
                className="bg-primary hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-xl text-base transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
