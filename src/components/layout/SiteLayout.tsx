import { useCallback, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  Award,
  BarChart2,
  Briefcase,
  Building2,
  ChevronDown,
  Facebook,
  Globe,
  Heart,
  Home,
  Instagram,
  Leaf,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Twitter,
  UserCheck,
  X,
  Youtube,
} from "lucide-react";
import { CONTACT_DETAILS } from "@/content/siteContent";
import type { RoleType } from "@/components/forms/RoleFormModal";

export { RoleFormModal } from "@/components/forms/RoleFormModal";
import { TranslateButton } from "@/components/TranslateButton";
import newLogo from "@/assets/new logo.png";

export const NAV_ITEMS = [
  "Home",
  "About Us",
  "What We Do",
  "Programs",
  "Impact",
  "Media & Updates",
  "Get Involved",
  "Contact Us",
];

export interface MegaSection {
  cols: number;
  items: string[];
}

export const MEGA_DATA: Record<string, MegaSection> = {
  "About Us": {
    cols: 3,
    items: [
      "Overview",
      "Our Objective & Vision",
      "Vision 2047",
      "Leadership & Management",
      "Governance & Transparency",
      "Legal Status & Registration",
      "Members & Donors",
      "Our Partners & Donors",
      "Membership Policy",
    ],
  },
  "What We Do": {
    cols: 3,
    items: [
      "Education",
      "Health Care",
      "Skills Development",
      "Women Empowerment",
      "Entrepreneur Development",
      "Relief & Rehabilitation",
      "Environment & Sustainability",
      "Agriculture & Rural Livelihood",
    ],
  },
  Programs: {
    cols: 1,
    items: ["View All Programs"],
  },
  Impact: {
    cols: 2,
    items: [
      "Our Impact",
      "Outcomes",
      "Where We Work",
      "Success Stories",
      "Annual Reports",
      "Impact Statistics Dashboard",
    ],
  },
  "Media & Updates": {
    cols: 2,
    items: ["News & Events", "Latest Updates", "Newsletters", "Publications", "Press Release", "Gallery"],
  },
  "Get Involved": {
    cols: 2,
    items: [
      "Volunteer With Us",
      "Partner With Us",
      "Become a Member",
      "Sponsor a Programme",
      "Become a Mentor",
      "Careers & Opportunities",
      "Donate & Support",
    ],
  },
};

function getTopNavHref(item: string) {
  if (item === "Home") return "/";
  if (item === "About Us") return "/about";
  if (item === "What We Do") return "/#focus-areas";
  if (item === "Programs") return "/programs/healthcare";
  if (item === "Impact") return "/#impact-stats";
  if (item === "Media & Updates") return "/news-and-events";
  if (item === "Get Involved") return "/#get-involved";
  if (item === "Contact Us") return "/contact";
  return "#";
}

function getMegaHref(menu: string, item: string) {
  // About Us
  if (menu === "About Us" && item === "Overview") return "/about";
  if (menu === "About Us" && item === "Our Objective & Vision") return "/about/objective-and-vision";
  if (menu === "About Us" && item === "Vision 2047") return "/about/vision-2047";
  if (menu === "About Us" && item === "Leadership & Management") return "/about/leadership";
  if (menu === "About Us" && item === "Governance & Transparency") return "/about/governance";
  if (menu === "About Us" && item === "Legal Status & Registration") return "/about/legal-status";
  if (menu === "About Us" && (item === "Members & Donors" || item === "Members & Supporters")) return "/membership";
  if (menu === "About Us" && item === "Membership Policy") return "/membership#status";
  if (menu === "About Us" && item === "Partners & Donors") return "/about/partners";
  // What We Do
  if (menu === "What We Do" && item === "Education") return "/programs/education";
  if (menu === "What We Do" && item === "Health Care") return "/programs/healthcare";
  if (menu === "What We Do" && item === "Skills Development") return "/programs/skills-development";
  if (menu === "What We Do" && item === "Women Empowerment") return "/programs/women-empowerment";
  // Programs
  if (menu === "Programs" && item === "View All Programs") return "/programs/healthcare";
  // Media & Updates
  if (menu === "Media & Updates" && item === "News & Events") return "/news-and-events";
  if (menu === "Media & Updates" && item === "Latest Updates") return "/news-and-events";
  if (menu === "Media & Updates" && item === "Gallery") return "/gallery";
  if (menu === "Media & Updates" && item === "Publications") return "/news-and-events";
  if (menu === "Media & Updates" && item === "Press Releases") return "/news-and-events";
  if (menu === "Media & Updates" && item === "Annual Reports") return "/news-and-events";
  if (menu === "Media & Updates" && item === "Success Stories") return "/news-and-events";
  if (menu === "Media & Updates" && item === "Newsletters") return "/news-and-events";
  // Get Involved
  if (menu === "Get Involved" && item === "Careers & Opportunities") return "#careers";
  if (menu === "Get Involved" && item === "Donate & Support") return "/donate";
  if (menu === "Get Involved" && item === "Volunteer With Us") return "/#get-involved";
  if (menu === "Get Involved" && item === "Partner With Us") return "/#get-involved";
  if (menu === "Get Involved" && item === "Sponsor a Programme") return "/#get-involved";
  if (menu === "Get Involved" && item === "Become a Mentor") return "/#get-involved";
  if (menu === "Get Involved" && item === "Become a Member") return "/membership";
  // Contact
  if (item === "Contact Us") return "/contact";
  return "#";
}


export function NotificationTicker() {
  const items = [
    { text: "Notification for change in Registration", href: "/about/legal-status" },
    { text: "Islah Welfare Foundation — Official Website", href: "/" },
    { text: "Registration address updated to Bathiya, Darbhanga, Bihar", href: "/about" },
    { text: "Join our mission — volunteer, donate or partner with us", href: "/#get-involved" },
    { text: "Free Health Camp — Bathiya, Darbhanga | June 25", href: "/news-and-events" },
    { text: "Annual Scholarship Distribution — Muzaffarpur | July 15", href: "/news-and-events" },
  ];
  const loopItems = [...items, ...items];

  return (
    <div className="bg-[#1b365d] text-white py-2 overflow-hidden flex items-center relative select-none border-b border-[#1b365d]/20 shadow-sm group">
      <div className="bg-red-600 text-[10px] uppercase px-2 py-0.5 rounded font-black tracking-wider shadow z-10 shrink-0 ml-4 mr-4 animate-pulse">
        NEW
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {loopItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="inline-flex items-center gap-3 hover:underline underline-offset-2 text-white"
            >
              <span className="text-[13px] font-bold tracking-wide px-3">{item.text}</span>
              <span className="text-white/50 text-base px-1">◆</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

interface UtilityBarProps {
  lang?: "en" | "hi";
  setLang?: (l: "en" | "hi") => void;
}

export function UtilityBar({ lang = "en", setLang }: UtilityBarProps) {
  return null;
}

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const openMenu = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(MEGA_DATA[name] ? name : null);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const hasDropdown = activeMenu && MEGA_DATA[activeMenu];

  const isRouteActive = (item: string) =>
    (item === "Home" && pathname === "/") ||
    (item === "About Us" && pathname.startsWith("/about")) ||
    ((item === "What We Do" || item === "Programs") && pathname.startsWith("/programs"));

  const getHeaderHref = (item: string) => {
    if (item === "What We Do" && pathname === "/") return "#focus-areas";
    return getTopNavHref(item);
  };

  const handleHeaderClick = (item: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (item !== "What We Do" || pathname !== "/") return;
    event.preventDefault();
    setActiveMenu(null);
    document.getElementById("focus-areas")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-250 ease-out pointer-events-none ${hasDropdown ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
        onClick={() => setActiveMenu(null)}
      />
      {/* White Branding Logo Banner (Scrolls away) */}
      <div className="bg-white py-4 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-center">
          <a href="/" className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group text-center md:text-left" aria-label="IWF Home">
            <img src={newLogo} alt="IWF Logo" className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105 shrink-0" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl md:text-3xl font-extrabold text-[#0b1f3b] tracking-wide font-sans leading-tight text-center md:text-left">
                ISLAH WELFARE FOUNDATION
              </span>
              <span className="text-xs md:text-sm font-semibold italic text-brand-orange mt-1.5 leading-none text-center md:text-left">
                Planting Seeds of Hope and Change
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 font-medium mt-1.5 leading-none text-center md:text-left">
                Bathiya, Darbhanga, Bihar – 847423, India
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Dark Themed Menu Navbar (Sticky) */}
      <header className="bg-[#1a365d] text-white sticky top-0 z-50 shadow-md transition-all duration-200 py-1">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const hasMega = !!MEGA_DATA[item];
              const isOpen = activeMenu === item;
              return (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => hasMega && openMenu(item)}
                  onMouseLeave={hasMega ? scheduleClose : undefined}
                >
                  <a
                    href={getHeaderHref(item)}
                    className={`relative flex items-center gap-1.5 font-semibold text-sm transition-all px-4 py-3 rounded-md group ${isRouteActive(item) ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    onClick={(event) => {
                      handleHeaderClick(item, event);
                      if (!hasMega) setActiveMenu(null);
                    }}
                  >
                    {item === "Home" ? (
                      <span className="flex items-center gap-1.5 font-bold">
                        <Home className="w-4 h-4 text-[#f97316]" /> IWF
                      </span>
                    ) : (
                      item
                    )}
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-white" : "text-white/60"
                          }`}
                      />
                    )}
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200 ease-out" />
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 shrink-0 py-1.5 ml-auto lg:ml-0">
            <a
              href="/donate"
              className="bg-[#f97316] hover:bg-orange-600 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-md shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
            >
              DONATE NOW
            </a>
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mega Menu Dropdown Window */}
          {activeMenu && MEGA_DATA[activeMenu] && (
            <div
              className="absolute left-0 right-0 top-full bg-[#0b1f3b]/95 backdrop-blur-md border-t border-white/10 shadow-2xl z-50 text-white animate-in fade-in slide-in-from-top-2 duration-200"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div
                  className="grid gap-6"
                  style={{ gridTemplateColumns: `repeat(${MEGA_DATA[activeMenu].cols}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: MEGA_DATA[activeMenu].cols }).map((_, colIndex) => {
                    const items = MEGA_DATA[activeMenu].items;
                    const itemsPerCol = Math.ceil(items.length / MEGA_DATA[activeMenu].cols);
                    const colItems = items.slice(colIndex * itemsPerCol, (colIndex + 1) * itemsPerCol);
                    return (
                      <div key={colIndex} className="flex flex-col gap-2">
                        {colItems.map((sub) => (
                          <a
                            key={sub}
                            href={getMegaHref(activeMenu, sub)}
                            className="flex items-center gap-2 text-sm text-white/80 hover:text-brand-orange hover:bg-white/5 px-3 py-2 rounded-md transition-all"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/60" />
                            {sub}
                          </a>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <span className="font-extrabold text-[#0b1f3b] text-base">Navigation</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 py-2 overflow-y-auto" aria-label="Mobile navigation items">
            {NAV_ITEMS.map((item) => {
              const hasMega = !!MEGA_DATA[item];
              const isExpanded = mobileExpanded === item;
              return (
                <div key={item} className="border-b border-slate-100 last:border-0">
                  <div className="flex items-center">
                    <a
                      href={getHeaderHref(item)}
                      className="flex-1 px-5 py-3.5 text-sm font-semibold text-slate-800 hover:text-brand-green transition-colors"
                      onClick={(event) => {
                        handleHeaderClick(item, event);
                        if (event.defaultPrevented) {
                          setMobileOpen(false);
                          return;
                        }
                        if (!hasMega) setMobileOpen(false);
                        else setMobileExpanded(isExpanded ? null : item);
                      }}
                    >
                      {item === "Home" ? (
                        <span className="flex items-center gap-1.5 font-bold">
                          <Home className="w-4 h-4 text-[#f97316]" /> IWF
                        </span>
                      ) : (
                        item
                      )}
                    </a>
                    {hasMega && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item)}
                        className="px-4 py-3.5 text-slate-400 hover:text-brand-green transition-colors cursor-pointer"
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-green" : ""}`} />
                      </button>
                    )}
                  </div>
                  {hasMega && isExpanded && (
                    <div className="bg-slate-50 border-l-4 border-brand-green ml-4 mr-2 rounded-sm mb-1.5 py-1">
                      {MEGA_DATA[item].items.map((sub) => (
                        <a
                          key={sub}
                          href={getMegaHref(item, sub)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-brand-green hover:bg-white transition-all"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-brand-orange text-xs">→</span>
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-100 shrink-0">
            <a
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="block text-center w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors uppercase tracking-wide text-sm"
            >
              DONATE NOW
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  const quickLinks = [
    ["About Us", "/about"],
    ["Education", "/programs/education"],
    ["Healthcare", "/programs/healthcare"],
    ["Skills Development", "/programs/skills-development"],
    ["Women Empowerment", "/programs/women-empowerment"],
    ["Get In Touch", "/contact"],
    ["Donate", "/donate"],
    ["Membership", "/membership"],
    ["News & Events", "/news-and-events"],
  ];

  return (
    <footer className="w-full">
      <div className="bg-[#0b1f3b] text-white py-14 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={newLogo} alt="IWF Logo" className="h-14 w-auto object-contain shrink-0" />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-wide text-white leading-none">ISLAH</span>
                <span className="font-light text-[10px] tracking-widest text-white mt-0.5">WELFARE FOUNDATION</span>
              </div>
            </div>
            <div className="text-brand-orange font-medium text-sm">Care | Empower | Uplift</div>
            <p className="text-white text-sm leading-relaxed">
              Islah Welfare Foundation empowers underprivileged communities through education, healthcare, women empowerment, skill development and social welfare initiatives.
            </p>
            <div>
              <span className="block text-xs font-bold tracking-widest text-white uppercase mb-2">Follow Us</span>
              <div className="flex gap-2">
                {[Facebook, Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-7 h-7 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center text-white transition-all duration-200" aria-label="Social media profile">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Leaf className="w-4 h-4 text-brand-orange" /> Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">-&gt;</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Building2 className="w-4 h-4 text-brand-orange" /> Get Involved
            </h4>
            <ul className="space-y-2.5">
              {[
                ["Volunteer With Us", "volunteer"],
                ["Partner With Us", "partner"],
                ["Sponsor a Programme", "sponsor"],
                ["Become a Mentor", "mentor"],
                ["Careers & Opportunities", "employee"],
              ].map(([label, type]) => (
                <li key={label}>
                  <button
                    onClick={() => onOpenModal(type as RoleType)}
                    className="inline-flex items-center text-left text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-brand-orange text-xs mr-2">-&gt;</span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Scale className="w-4 h-4 text-brand-orange" /> Legal
            </h4>
            <ul className="space-y-2.5">
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Refund Policy", "/refund-policy"],
                ["Terms & Conditions", "/terms-and-conditions"],
                ["Certificates", "/about/legal-status"],
                ["12A & 80G", "/about/legal-status"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200">
                    <span className="text-brand-orange text-xs mr-2">-&gt;</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Phone className="w-4 h-4 text-brand-orange" /> Contact Us
            </h4>
            <div className="space-y-3 text-white text-sm">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
                <span>{CONTACT_DETAILS.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{CONTACT_DETAILS.phone}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{CONTACT_DETAILS.email}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Globe className="w-4 h-4 text-brand-orange shrink-0" />
                <span>www.islahwelfarefoundation.org</span>
              </div>
            </div>
            <a
              href="/donate"
              className="w-full mt-5 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Heart className="w-4 h-4 fill-white" /> DONATE NOW
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#091f12] py-4 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white">
          <div>(c) 2026 Islah Welfare Foundation. All Rights Reserved.</div>
          <div className="flex flex-wrap gap-3">
            <a href="/privacy-policy" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/refund-policy" className="hover:text-brand-orange transition-colors">Refund Policy</a>
            <span>|</span>
            <a href="/terms-and-conditions" className="hover:text-brand-orange transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
