
import { ReactNode } from "react";
import { Users } from "lucide-react";
import { getClientData } from "@/lib/client";
import { Divider } from "@/components/ui/Divider";
import Image from "next/image";
import Link from "next/link";



interface TeamMember {
  name: string;
  position: string;
  excerpt: string;
  imagePath: string;
  slug: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    position: "Senior Insurance Advisor",
    excerpt:
      "Alice has over 10 years of experience in personal and commercial insurance, helping clients find the best coverage.",
    imagePath: "/Images/team/alice.webp",
    slug: "alice-johnson",
  },
  {
    name: "Michael Smith",
    position: "Claims Specialist",
    excerpt:
      "Michael ensures claims are processed quickly and efficiently while providing compassionate support to clients.",
    imagePath: "/Images/team/michael.jpg",
    slug: "michael-smith",
  },
  {
    name: "Sophia Lee",
    position: "Customer Relations Manager",
    excerpt:
      "Sophia focuses on client satisfaction, building strong relationships, and ensuring every client feels valued.",
    imagePath: "/Images/team/sophia.jpg",
    slug: "sophia-lee",
  },
  {
    name: "David Brown",
    position: "Financial Planner",
    excerpt:
      "David offers personalized insurance and financial planning advice to help clients secure their future.",
    imagePath: "/Images/team/david.jpg",
    slug: "david-brown",
  },
];

export default async function TeamPageTemplate(
) {
  const clientData = await getClientData();

  const clientCity = clientData?.city
    ? clientData.city.charAt(0).toUpperCase() + clientData.city.slice(1).toLowerCase()
    : "your city";

  return (
    <main className="flex-grow">  

      {/* Introduction */}
      <div className="py-12 mt-16 ">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4 shadow-sm">
              <Users size={16} className="text-primary" />
              <span>Our Dedicated Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 relative">
              Experienced Insurance Professionals
              <div className="h-1 w-24 bg-accent/60 rounded mx-auto mt-3"></div>
            </h2>
            <p className="text-theme-body text-lg max-w-3xl mx-auto leading-relaxed mb-6">
              Get to know the faces behind {clientData?.agency_name || ""}. Our team of experienced professionals is dedicated to providing personalized insurance solutions for{" "}
              {clientCity} and the surrounding area.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="pb-12 bg-primary-foreground/5 mb-5">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Link key={member.slug} href={`/our-team/${member.slug}`} className="block h-full">
                <div className="bg-white border border-secondary/30 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  <div className="relative w-full h-72">
                    <Image
                      src={member.imagePath}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={95}
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-heading font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-accent font-medium mb-3">{member.position}</p>
                    <p className="text-theme-body mb-4 flex-grow ">{member.excerpt}</p>
                   
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
