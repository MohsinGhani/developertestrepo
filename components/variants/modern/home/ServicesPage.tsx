"use client";
import { CarFront, GlobeIcon, HeartHandshake, HomeIcon } from "lucide-react";
import React from "react";

const services = [
  {
    id: 1,
    name: "Car Insurance",
    icon: CarFront,
    description:
      "Viverra mauris in aliquam sem fringilla ut. Suscipit tellus mauris a diam maecenas sed enim ut.",
  },
  {
    id: 2,
    name: "Home Insurance",
    icon: HomeIcon,
    description:
      "Pulvinar elementum integer enim neque volutpat ac. Scelerisque purus semper eget duis.",
  },
  {
    id: 3,
    name: "Life and Health",
    icon: HeartHandshake,
    description:
      "Dignissim convallis aenean et tortor at. Gravida dictum fusce ut placerat orci nulla et egestas quis.",
  },
  {
    id: 4,
    name: "Travel",
    icon: GlobeIcon,
    description:
      "Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Pellentesque id nibh tortor id aliquet.",
  },
];

const ServicesPage = () => {
  return (
    <section className="py-20  w-full">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-5xl font-heading font-bold text-primary mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              //   className=""
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {service.icon && (
                <service.icon className="w-10 h-10 text-primary mb-4" />
              )}
              <p className="text-2xl font-semibold text-primary mb-4">
                {service.name}
              </p>
              <p className="text-base text-secondary mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
