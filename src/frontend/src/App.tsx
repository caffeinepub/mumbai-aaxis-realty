import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Property } from "./backend.d";
import { useGetAllProperties, useSubmitContactForm } from "./hooks/useQueries";

// ─── Fallback properties for first load ──────────────────────────────────────
const FALLBACK_PROPERTIES: (Property & { image: string })[] = [
  {
    title: "Codename CORAL by Mayfair Housing",
    location: "Mira Road - East",
    price: BigInt(11700000),
    propertyType: "Apartment",
    bedrooms: BigInt(2),
    bathrooms: BigInt(2),
    area: BigInt(645),
    description: "2 & 3 BHK units | Carpet areas: 689, 946 & 1,031 sq.ft",
    image:
      "/assets/uploads/aerial_cam_0301-019d38a7-bddc-779e-8570-cfa573bff726-1.jpg",
  },
  {
    title: "Altavia by Sunteck",
    location: "ODC Goregaon West",
    price: BigInt(37500000),
    propertyType: "Apartment",
    bedrooms: BigInt(3),
    bathrooms: BigInt(3),
    area: BigInt(1267),
    description: "3 & 4 BHK with Private Lift, Deck and Lobby",
    image:
      "/assets/uploads/sunteck_goregaon_west_luxury_project_2-019d391e-200e-746f-aa37-4304a49eeb02-1.mp4",
  },
  {
    title: "PURVA ESTRELLA",
    location: "Lokhandwala Andheri West",
    price: BigInt(33800000),
    propertyType: "Apartment",
    bedrooms: BigInt(2),
    bathrooms: BigInt(2),
    area: BigInt(784),
    description: "2, 3 & 4 BED Luxury Residences",
    image:
      "/assets/uploads/vid-20260329-wa0088-019d3967-c32c-7323-b278-2c0d3db8651d-1.mp4",
  },
  {
    title: "Colaba Heritage Apartment",
    location: "Colaba, Mumbai",
    price: BigInt(32000000),
    propertyType: "Apartment",
    bedrooms: BigInt(2),
    bathrooms: BigInt(2),
    area: BigInt(1200),
    description: "Colonial heritage building with modern interiors.",
    image: "/assets/generated/property-colaba-heritage.dim_600x400.jpg",
  },
];

const PROPERTY_IMAGES = [
  "/assets/uploads/aerial_cam_0301-019d38a7-bddc-779e-8570-cfa573bff726-1.jpg",
  "/assets/uploads/sunteck_goregaon_west_luxury_project_2-019d391e-200e-746f-aa37-4304a49eeb02-1.mp4",
  "/assets/uploads/vid-20260329-wa0088-019d3967-c32c-7323-b278-2c0d3db8651d-1.mp4",
  "/assets/generated/property-colaba-heritage.dim_600x400.jpg",
];

const LOCATIONS = [
  {
    name: "Mira Road",
    image: "/assets/generated/location-mira-road.dim_600x400.jpg",
    properties: "35 Properties",
  },
  {
    name: "Mumbai",
    image: "/assets/generated/location-bandra.dim_600x400.jpg",
    properties: "120+ Properties",
  },
  {
    name: "SOBO",
    image: "/assets/generated/location-colaba.dim_600x400.jpg",
    properties: "42 Properties",
  },
  {
    name: "Thane",
    image: "/assets/generated/location-thane.dim_600x400.jpg",
    properties: "58 Properties",
  },
  {
    name: "Pune",
    image: "/assets/generated/location-pune.dim_600x400.jpg",
    properties: "47 Properties",
  },
  {
    name: "Dubai",
    image: "/assets/generated/location-dubai.dim_600x400.jpg",
    properties: "30 Properties",
  },
];

const SOCIAL_LINKS = [
  {
    name: "facebook",
    Icon: Facebook,
    href: "https://www.facebook.com/mumbaiaaxisrealtyllp",
  },
  {
    name: "instagram",
    Icon: Instagram,
    href: "https://www.instagram.com/mumbai_aaxis_realty/",
  },
  {
    name: "linkedin",
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/mumbai-aaxis-realty-24a85a22a/",
  },
  { name: "twitter", Icon: Twitter, href: "#" },
];

function formatPrice(price: bigint): string {
  const n = Number(price);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString()}`;
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "HOME", href: "#hero" },
    { label: "LISTINGS", href: "#listings" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "LOCATIONS", href: "#locations" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center shadow-gold">
              <span className="text-white font-serif font-bold text-lg">A</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif font-bold text-sm tracking-widest text-foreground uppercase">
                Mumbai Aaxis
              </div>
              <div className="font-sans text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Realty
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-ocid="nav.link"
                className="text-xs font-semibold tracking-widest text-[#2B2B2B] hover:text-gold transition-colors uppercase"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden lg:inline-block btn-gold text-xs px-5 py-2.5 rounded-lg"
            data-ocid="nav.primary_button"
          >
            BOOK CONSULTATION
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  data-ocid="nav.link"
                  className="text-sm font-semibold tracking-widest text-foreground hover:text-gold uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                className="btn-gold text-center text-xs"
                onClick={() => {
                  setMenuOpen(false);
                  window.location.hash = "#contact";
                }}
                data-ocid="nav.primary_button"
              >
                BOOK CONSULTATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
      style={{
        backgroundImage: `url('/assets/generated/hero-mumbai-sealink.dim_1600x900.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A33]/80 via-[#1F2A33]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2A33]/30 via-transparent to-[#1F2A33]/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "oklch(0.73 0.09 76)" }}
          >
            Mumbai Aaxis Realty
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Discover Your
            <br />
            Signature Home
            <br />
            <span style={{ color: "oklch(0.73 0.09 76)" }}>in Mumbai</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/85 text-base leading-relaxed mb-8 max-w-lg"
          >
            India's financial capital offers unmatched luxury living. From
            Affordable Housing to Luxury sea-facing penthouses &amp; heritage
            apartments in Mumbai, Thane, Pune &amp; Dubai — we curate only the
            finest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <a
              href="#listings"
              className="btn-gold shadow-gold text-sm inline-block"
              data-ocid="hero.primary_button"
            >
              EXPLORE PREMIUM PROPERTIES
            </a>
          </motion.div>
        </div>
      </div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full"
      >
        <div className="bg-white rounded-xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
            <MapPin size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Location (e.g. Bandra, Worli)"
              className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              data-ocid="hero.search_input"
            />
          </div>
          <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
            <Building2 size={16} className="text-muted-foreground shrink-0" />
            <select
              className="w-full text-sm bg-transparent outline-none text-foreground"
              data-ocid="hero.select"
            >
              <option value="">Property Type</option>
              <option>Apartment</option>
              <option>Penthouse</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>
          </div>
          <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-border rounded-lg">
            <TrendingUp size={16} className="text-muted-foreground shrink-0" />
            <select
              className="w-full text-sm bg-transparent outline-none text-foreground"
              data-ocid="hero.select"
            >
              <option value="">Price Range</option>
              <option>Under ₹1 Cr</option>
              <option>₹1 Cr – ₹3 Cr</option>
              <option>₹3 Cr – ₹7 Cr</option>
              <option>Above ₹7 Cr</option>
            </select>
          </div>
          <button
            type="button"
            className="btn-gold flex items-center gap-2 shrink-0"
            data-ocid="hero.button"
          >
            <Search size={16} />
            <span className="hidden sm:inline">SEARCH</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Featured Properties ──────────────────────────────────────────────────────
function FeaturedProperties() {
  const { data: backendProps, isLoading } = useGetAllProperties();

  const properties =
    backendProps && backendProps.length > 0
      ? backendProps.map((p, i) => ({
          ...p,
          image: PROPERTY_IMAGES[i % PROPERTY_IMAGES.length],
        }))
      : FALLBACK_PROPERTIES;

  return (
    <section id="listings" className="py-20 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Featured Properties
          </motion.h2>
          <p className="section-subtitle mt-3">
            Handpicked luxury homes across Mumbai's prime neighbourhoods
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="listings.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-card animate-pulse"
              >
                <div className="h-52 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-8 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="listings.list"
          >
            {properties.slice(0, 4).map((prop, idx) => (
              <motion.div
                key={prop.title}
                data-ocid={`listings.item.${idx + 1}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden h-52">
                  {idx === 1 ? (
                    <video
                      src="/assets/uploads/sunteck_goregaon_west_luxury_project_2-019d391e-200e-746f-aa37-4304a49eeb02-1.mp4"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : idx === 2 ? (
                    <video
                      src="/assets/uploads/vid-20260329-wa0088-019d3967-c32c-7323-b278-2c0d3db8651d-1.mp4"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={(prop as any).image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide">
                      {prop.propertyType}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-semibold text-base text-foreground mb-1 line-clamp-1">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                    <MapPin size={12} />
                    <span>{prop.location}</span>
                  </div>
                  <div className="text-gold font-bold text-lg mb-3">
                    {idx === 0
                      ? "₹1.17 Cr Onwards"
                      : idx === 1
                        ? "₹3.75 Cr Onwards"
                        : idx === 2
                          ? "₹3.38 Cr Onwards"
                          : formatPrice(prop.price)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    {idx === 0 ? (
                      <span>2 &amp; 3 BHK with Deck</span>
                    ) : idx === 1 ? (
                      <span>
                        3 &amp; 4 BHK with Private Lift, Deck &amp; Lobby
                      </span>
                    ) : idx === 2 ? (
                      <span>2, 3 &amp; 4 BED Luxury Residences</span>
                    ) : (
                      <span>{Number(prop.bedrooms)} BHK</span>
                    )}
                    {idx !== 1 && idx !== 2 && (
                      <>
                        <span>·</span>
                        <span>{Number(prop.bathrooms)} Baths</span>
                      </>
                    )}
                    <span>·</span>
                    <span>
                      {idx === 0
                        ? "645–1,031 sq.ft"
                        : idx === 1
                          ? "1,267–1,700 sq.ft"
                          : idx === 2
                            ? "784–1,600 sq.ft"
                            : `${Number(prop.area).toLocaleString()} sq.ft`}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full btn-gold text-xs py-2"
                    data-ocid={`listings.item.${idx + 1}`}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── About Us ─────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase mb-3">
              About Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              Redefining Mumbai
              <br />
              <span className="text-gold">Real Estate</span>
            </h2>
            <p
              className="italic text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.55 0.06 75)" }}
            >
              India's financial capital offers unmatched luxury living. From
              Affordable Housing to Luxury sea-facing penthouses &amp; heritage
              apartments in Mumbai, Thane, Pune &amp; Dubai — we curate only the
              finest.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2016, Mumbai Aaxis Realty has been at the forefront of
              luxury real estate in Maharashtra. With over 10+ years of
              experience and ₹2,500 Crore worth of transactions, we have helped
              thousands of families find their perfect home.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of 30+ seasoned professionals combines deep local
              knowledge with global standards to deliver an unparalleled
              property experience — from the first viewing to the final
              handover.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: "Properties Sold", value: "1,200+" },
                { label: "Happy Families", value: "950+" },
                { label: "Years Experience", value: "10+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-serif text-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="btn-gold text-xs inline-block"
              data-ocid="about.primary_button"
            >
              GET IN TOUCH
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/about-mumbai-luxury.dim_800x600.jpg"
                alt="Mumbai luxury real estate"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-gold text-white rounded-xl px-6 py-4 shadow-gold">
              <div className="font-serif text-2xl font-bold">10+</div>
              <div className="text-xs font-semibold tracking-wide uppercase opacity-90">
                Years of Trust
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      icon: <Star className="text-gold" size={28} />,
      title: "Luxury Sales",
      desc: "Exclusive access to Mumbai's most coveted properties. We handle everything from initial search to seamless registration — no detail overlooked.",
    },
    {
      icon: <Shield className="text-gold" size={28} />,
      title: "Property Management",
      desc: "Full-service management for residential and commercial assets. Maximise your rental yield while we handle tenants, maintenance, and compliance.",
    },
    {
      icon: <Users className="text-gold" size={28} />,
      title: "Project Marketing",
      desc: "End-to-end marketing and sales for new developments. Our data-driven strategies ensure your project achieves premium pricing and rapid sell-out.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Our Services
          </motion.h2>
          <p className="section-subtitle">
            Comprehensive real estate solutions under one roof
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-xl p-8 shadow-card hover:shadow-xl transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F6F6F6] border border-gold/30 mb-5">
                {svc.icon}
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-3">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Locations ────────────────────────────────────────────────────────────────
function LocationsSection() {
  const [current, setCurrent] = useState(0);
  const total = LOCATIONS.length;

  return (
    <section id="locations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Prime Locations
          </motion.h2>
          <p className="section-subtitle">
            Prime locations across Mumbai, Pune & Dubai
          </p>
        </div>

        {/* Desktop 4-grid */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl overflow-hidden group cursor-pointer h-64"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A33]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-white font-serif font-bold text-xl">
                  {loc.name}
                </div>
                <div className="text-white/80 text-xs mt-0.5">
                  {loc.properties}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative rounded-xl overflow-hidden h-64 mb-4">
            <img
              src={LOCATIONS[current].image}
              alt={LOCATIONS[current].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A33]/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <div className="text-white font-serif font-bold text-xl">
                {LOCATIONS[current].name}
              </div>
              <div className="text-white/80 text-xs mt-0.5">
                {LOCATIONS[current].properties}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + total) % total)}
              className="p-2 border border-gold rounded-full hover:bg-gold hover:text-white text-gold transition-colors"
              data-ocid="locations.pagination_prev"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-muted-foreground">
              {current + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % total)}
              className="p-2 border border-gold rounded-full hover:bg-gold hover:text-white text-gold transition-colors"
              data-ocid="locations.pagination_next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const submit = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit.mutateAsync(form);
      toast.success("Thank you! We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Get In Touch
          </motion.h2>
          <p className="section-subtitle">
            Our advisors are ready to help you find your perfect home
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-charcoal text-white rounded-xl p-8 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                Contact Us
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Visit us at our Mumbai office or reach out through any of the
                channels below.
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-gold mb-1">
                    Address
                  </div>
                  <div className="text-sm text-white/80">
                    Office No 205, Raghuleela Mega Mall 1st Floor,
                    <br />
                    Behind Poisar Depot, Kandivali West,
                    <br />
                    Mumbai - 400067
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-gold mb-1">
                    Phone
                  </div>
                  <div className="text-sm text-white/80">+91 8898888918</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide uppercase text-gold mb-1">
                    Email
                  </div>
                  <div className="text-sm text-white/80">
                    mumbaiaaxisrealty@gmail.com
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-white/60"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-card"
            data-ocid="contact.modal"
          >
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
              Send Us a Message
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                >
                  Full Name
                </label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Rahul Sharma"
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="rahul@example.com"
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                >
                  Phone
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+91 8898888918"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us what you're looking for..."
                  rows={4}
                  required
                  data-ocid="contact.textarea"
                />
              </div>
              <button
                type="submit"
                disabled={submit.isPending}
                className="btn-gold w-full text-sm mt-2"
                data-ocid="contact.submit_button"
              >
                {submit.isPending ? "SENDING..." : "SEND MESSAGE"}
              </button>
              {submit.isSuccess && (
                <p
                  className="text-center text-sm text-green-600"
                  data-ocid="contact.success_state"
                >
                  ✓ Message sent successfully!
                </p>
              )}
              {submit.isError && (
                <p
                  className="text-center text-sm text-destructive"
                  data-ocid="contact.error_state"
                >
                  Failed to send. Please try again.
                </p>
              )}
            </div>
          </motion.form>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-card h-full min-h-[400px]"
          >
            <iframe
              title="Mumbai Aaxis Realty Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d72.8258!3d19.2067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2bd9cd07c03e09f0!2sKandivali%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711401234567"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const utm = `utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  const columns = [
    { title: "Company", links: ["About Us", "Our Team", "Careers", "Press"] },
    {
      title: "Services",
      links: [
        "Luxury Sales",
        "Property Management",
        "Project Marketing",
        "Valuation",
      ],
    },
    {
      title: "Locations",
      links: ["Mira Road", "Mumbai", "SOBO", "Thane", "Pune", "Dubai"],
    },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">
                  A
                </span>
              </div>
              <div className="leading-tight">
                <div className="font-serif font-bold text-sm tracking-widest uppercase">
                  Mumbai Aaxis
                </div>
                <div className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">
                  Realty
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Mumbai's trusted luxury real estate partner. Over 10+ years of
              excellence, 1200+ homes delivered.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-white/50 text-xs"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#hero"
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {year} Mumbai Aaxis Realty. All rights reserved.</span>
          <span>
            Built with ❤ using{" "}
            <a
              href={`https://caffeine.ai?${utm}`}
              target="_blank"
              rel="noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans">
      <Toaster richColors position="top-right" />
      <Header />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <AboutSection />
        <ServicesSection />
        <LocationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
