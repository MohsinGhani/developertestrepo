// LocationSection.tsx
import { getClientData } from "@/lib/client";
import { supabase } from "@/lib/supabase";
import { getWebsiteData } from "@/lib/website";
import { MapPinIcon, PhoneCallIcon } from "lucide-react";

interface Location {
  id: string;
  location_name: string;
  city: string;
  state: string;
  location_slug: string;
}

async function getLocations(): Promise<Location[]> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) return [];

  const { data, error } = await supabase
    .from("client_locations")
    .select("id, location_name, city, state, location_slug")
    .eq("client_id", clientId)
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching locations:", error);
    return [];
  }

  return data || [];
}

export default async function LocationSection() {
  const [clientData] = await Promise.all([getClientData()]);

  return (
    <section className="py-24 bg-background w-full">
      <div className="container mx-auto px-4 max-w-screen-xl text-center">
        <h2 className="text-5xl font-heading font-bold mb-6">
          Ready to Secure Your Peace of Mind?
        </h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Contact {clientData.agency_name} today and experience insurance with a
          personal touch. We're here to answer your questions and provide the
          guidance you need.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Call Us Card */}
          <div className="rounded-xl p-8 flex flex-col items-center text-center border-2 border-primary">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 border-2 border-primary">
              <PhoneCallIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Call Us Today</h3>
            <p className="mb-4">
              Speak directly with an insurance expert who understands{" "}
              {clientData.city}
            </p>
            <a
              href={`tel:${clientData.phone}`}
              className="bg-primary text-white font-bold px-6 py-2 rounded-full"
            >
              {clientData.phone}
            </a>
          </div>

          {/* Visit Office Card */}
          <div className="rounded-xl p-8 flex flex-col items-center text-center border-2 border-primary">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 border-2 border-primary">
              <MapPinIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Visit Our Office</h3>
            <p className="mb-2">{clientData.address}</p>
            <p className="mb-2">
              {clientData?.city && clientData.city},{" "}
              {clientData?.state && clientData.state} {clientData.zip}
            </p>
            <p className="text-sm mt-2">Open Monday-Friday: 8 AM – 5 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
