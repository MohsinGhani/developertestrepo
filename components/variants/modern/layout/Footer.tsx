"use client";

import Link from "next/link";
import { Divider } from "@/components/ui/Divider";
import { useState } from "react";

interface FooterProps {
  agencyName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  footerLogoUrl?: string | null;
  services?: Array<{ name: string; href: string }>;
  currentYear: number;
}

export default function Footer({
  agencyName,
  address,
  city,
  state,
  postalCode,
  phone,
  footerLogoUrl,
  services = [
    { name: "Life insurance", href: "#" },
    { name: "Business insurance", href: "#" },
    { name: "Travel insurance", href: "#" },
    { name: "Car insurance", href: "#" },
    { name: "Health insurance", href: "#" },
  ],
  currentYear,
}: FooterProps) {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative bg-[#1d264b] text-white">
      <Divider position="top" />

      <div className="max-w-7xl container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About / Logo */}
          <div>
            {footerLogoUrl && (
              <img
                src={footerLogoUrl}
                alt={agencyName || "Logo"}
                className="h-20 mb-4"
              />
            )}
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link href={service.href}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold mb-4">Contact Information</h3>
            {address && <p className="mb-2">{address}</p>}
            {(city || state || postalCode) && (
              <p className="mb-2">
                {city}, {state} {postalCode}
              </p>
            )}
            {phone && <p className="mb-2">Phone: {phone}</p>}
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for discounts and more.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Subscribe with us"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded flex-1 w-full text-black"
              />

              <button
                className="bg-primary p-2 rounded w-full"
                onClick={() => {
                  console.log(email);

                  setEmail("");
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 border-t border-white/20 pt-6 text-sm flex justify-between">
          <p>
            © {currentYear} {agencyName || ""}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
