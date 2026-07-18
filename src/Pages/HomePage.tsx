import { useState, useRef, useCallback, useEffect } from "react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import {
  Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin,
  GraduationCap, HeartPulse, Users, Sprout, Wrench, Leaf,
  BookOpen, Stethoscope, Hand, MapPin,
  ArrowRight, ArrowLeft, Award, ShieldCheck, Heart, HandHeart, Briefcase,
  Info, BarChart2, Newspaper, UserCheck, MessageCircle, Target,
  ChevronDown, X, Menu, Globe, Building2, Scale, FileText, Send, Lock, Shield,
  TrendingUp, Home, Activity, Star, Zap, Leaf as LeafIcon,
  Megaphone, BookMarked, Wind, Sparkles
} from "lucide-react";
import hero from '@/assets/hero.png';
import causeEdu from "@/assets/cause-education.jpg";
import causeMed from "@/assets/cause-medical.png";
import causeWomen from "@/assets/cause-women.jpg";
import thEnv from "@/assets/thematic-environment.jpg";
import thEnt from "@/assets/thematic-entrepreneur.jpg";
import thWom from "@/assets/thematic-women.jpg";
import thAgr from "@/assets/thematic-agriculture.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import footerBg from "@/assets/footer-bg.jpg";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { RoleFormModal, type RoleType } from "@/components/forms/RoleFormModal";
import { PatientCard } from "@/components/healthcare/PatientCard";
import { URGENT_PATIENTS } from "@/content/patients";
import { TranslateButton } from "@/components/TranslateButton";
import newLogo from "@/assets/new logo.png";

// ─── Mega Nav Data ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  "Home",
  "About Us",
  "What We Do",
  "Programs",
  "Impact",
  "Media & Updates",
  "Get Involved",
  "Contact Us",
];

interface MegaSection {
  cols: number;
  items: string[];
}

const MEGA_DATA: Record<string, MegaSection> = {
  "About Us": {
    cols: 3,
    items: [
      "Overview",
      "Our Objective & Vision",
      "Vision 2047",
      "Leadership & Management",
      "Governance & Transparency",
      "Legal Status & Registration",
      "Members & Supporters",
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
      "Model Village",
      "Environment & Sustainability",
      "Agriculture & Rural Livelihood",
    ],
  },
  "Programs": {
    cols: 1,
    items: [
      "View All Programs →",
    ],
  },
  "Impact": {
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
    items: [
      "News & Events",
      "Latest Updates",
      "Newsletters",
      "Publications",
      "Press Release",
      "Gallery",
    ],
  },
  "Get Involved": {
    cols: 2,
    items: [
      "Volunteer With Us",
      "Partner With Us",
      "Sponsor a Programme",
      "Become a Mentor",
      "Careers & Opportunities",
      "Donate & Support",
    ],
  },
};

// ─── Shared Components ────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    urgentTitle: "Patients Needing Urgent Support",
    urgentTag: "Critical Life & Emergency Support",
    urgentSub: "Your support can help critically ill patients receive timely treatment and life-saving care when every second counts.",
    viewAllPatients: "View All Patients",
    whatWeDo: "What We Do",
    ourImpactTitle: "Numbers That Speak",
    ourImpactTag: "Our Impact",
    ourImpactSub: "Every number represents a life changed, a family supported, and a community uplifted.",
    featuredCauses: "Featured Causes",
    exploreIWF: "Explore IWF",
    exploreSub: "Discover the full breadth of our work — from governance and programs to impact and opportunities to join us.",
    eventsNotices: "Events & Notices",
    newsUpdates: "News & Updates",
    latest: "Latest",
    viewAll: "View All",
    getInvolved: "Get Involved",
    getInvolvedSub: "Islah Welfare Foundation's doors are always open. If you feel you can fill the gap of a missing drop. Our doors are always open to all, like individuals, Corporates, and institutions. Come and join us …",
    donateNow: "DONATE NOW",
    volunteer: "Volunteer",
    partner: "Partner",
    sponsor: "Sponsor",
    mentor: "Mentor",
    employee: "Employee",
    volunteerSub: "Give your time & skills",
    partnerSub: "CSR & collaborations",
    sponsorSub: "Fund a programme",
    mentorSub: "Guide the next generation",
    employeeSub: "Build a career with purpose",
    ourPrograms: "Our Programs",
    readMore: "Read More",
  },
  hi: {
    urgentTitle: "मदद की तत्काल आवश्यकता वाले मरीज",
    urgentTag: "क्रिटिकल लाइफ और आपातकालीन सहायता",
    urgentSub: "आपका सहयोग गंभीर रूप से बीमार मरीजों को समय पर इलाज और जीवन रक्षक देखभाल प्राप्त करने में मदद कर सकता है जब हर सेकंड मायने रखता है।",
    viewAllPatients: "सभी मरीज देखें",
    whatWeDo: "हम क्या करते हैं",
    ourImpactTitle: "आंकड़े जो बोलते हैं",
    ourImpactTag: "हमारा प्रभाव",
    ourImpactSub: "हर संख्या एक बदलते जीवन, एक समर्थित परिवार और एक उन्नत समुदाय का प्रतिनिधित्व करती है।",
    featuredCauses: "विशेष अभियान",
    exploreIWF: "आईडब्ल्यूएफ को जानें",
    exploreSub: "हमारे काम की पूरी जानकारी प्राप्त करें — शासन और कार्यक्रमों से लेकर प्रभाव और हमसे जुड़ने के अवसरों तक।",
    eventsNotices: "कार्यक्रम और सूचनाएं",
    newsUpdates: "समाचार और अपडेट",
    latest: "ताजा खबरें",
    viewAll: "सभी देखें",
    getInvolved: "हमसे जुड़ें",
    getInvolvedSub: "इसलाह वेलफेयर फाउंडेशन के दरवाजे हमेशा खुले हैं। यदि आपको लगता है कि आप कमी को पूरा कर सकते हैं, तो हमारा स्वागत है। सभी व्यक्ति, कॉर्पोरेट और संस्थान हमारे साथ आ सकते हैं…",
    donateNow: "अभी दान करें",
    volunteer: "स्वयंसेवक बनें",
    partner: "भागीदार बनें",
    sponsor: "प्रायोजक बनें",
    mentor: "मेंटर बनें",
    employee: "कर्मचारी बनें",
    volunteerSub: "अपना समय और कौशल दें",
    partnerSub: "सीएसआर और सहयोग",
    sponsorSub: "एक कार्यक्रम को प्रायोजित करें",
    mentorSub: "अगली पीढ़ी का मार्गदर्शन करें",
    employeeSub: "उद्देश्य के साथ करियर बनाएं",
    ourPrograms: "हमारे कार्यक्रम",
    readMore: "अधिक पढ़ें",
  }
};

const NAV_ITEMS_TRANSLATIONS = {
  en: ["Home", "About Us", "What We Do", "Programs", "Impact", "Media & Updates", "Get Involved", "Contact Us"],
  hi: ["होम", "हमारे बारे में", "हम क्या करते हैं", "कार्यक्रम", "प्रभाव", "मीडिया और अपडेट", "जुड़ें", "संपर्क करें"]
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide uppercase">
        {children}
      </h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

// ─── Page Sections ────────────────────────────────────────────────────────────

function NotificationTicker() {
  const items = [
    { text: "Notification for change in Registration", href: "/about/legal-status" },
    { text: "Islah Welfare Foundation — Official Website", href: "/" },
    { text: "Registration address updated to Bathiya, Darbhanga, Bihar", href: "/about" },
    { text: "Join our mission — volunteer, donate or partner with us", href: "/#get-involved" },
    { text: "Free Health Camp — Bathiya, Darbhanga | June 25", href: "/news-and-events" },
    { text: "Annual Scholarship Distribution — Muzaffarpur | July 15", href: "/news-and-events" },
  ];
  // Duplicate for seamless loop
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
  lang: "en" | "hi";
  setLang: (l: "en" | "hi") => void;
}

function UtilityBar({ lang, setLang }: UtilityBarProps) {
  return (
    <div className="bg-brand-green text-white py-3.5 border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        
        {/* Left: Contact Info - Stacked Vertically */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-xs shrink-0 select-text w-full md:w-auto">
          <a href="tel:+919811861633" className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium">
            <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>+91-9811861633</span>
          </a>
          <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium">
            <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>info@iwfindia.org</span>
          </a>
          <a href="#careers" className="flex items-center gap-2 hover:text-white/80 transition-colors font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>Careers</span>
          </a>
        </div>

        {/* Center: Big White Organization Name - Enormous and Dominant */}
        <div className="text-center flex-1 py-2 md:py-0 w-full md:w-auto">
          <span className="font-black text-lg md:text-3xl tracking-[0.25em] uppercase text-white block select-all drop-shadow-lg leading-tight font-sans">
            ISLAH WELFARE FOUNDATION
          </span>
        </div>

        {/* Right: Social & Translate - Stacked Vertically */}
        <div className="flex flex-col items-center md:items-end gap-2.5 shrink-0 w-full md:w-auto">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] opacity-80 font-medium hidden sm:inline">Follow Us:</span>
            {[
              { Icon: Facebook, color: "#1877F2", label: "Facebook", href: "https://facebook.com" },
              { Icon: Twitter, color: "#1DA1F2", label: "Twitter/X", href: "https://twitter.com" },
              { Icon: Instagram, color: "#E1306C", label: "Instagram", href: "https://instagram.com" },
              { Icon: Youtube, color: "#FF0000", label: "YouTube", href: "https://youtube.com" },
              { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn", href: "https://linkedin.com" },
            ].map(({ Icon, color, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: color }}
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5 text-white" />
              </a>
            ))}
          </div>

          {/* Hindi Translate Pill - Stacked below socials */}
          <TranslateButton />
        </div>
      </div>
    </div>
  );
}

interface HeaderProps {
  lang: "en" | "hi";
}

function Header({ lang }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(MEGA_DATA[name] ? name : null);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Backdrop overlay visibility
  const hasDropdown = activeMenu && MEGA_DATA[activeMenu];

  return (
    <>
      {/* Dimming Page Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-250 ease-out pointer-events-none ${hasDropdown ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
        onClick={() => setActiveMenu(null)}
      />

      {/* White Branding Logo Banner (Scrolls away) */}
      <div className="bg-white py-4 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-4 group" aria-label="IWF Home">
            <img src={newLogo} alt="IWF Logo" className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xl md:text-3xl font-extrabold text-[#0d2b1a] tracking-wide font-sans leading-tight">
                ISLAH WELFARE FOUNDATION
              </span>
              <span className="text-xs md:text-sm font-semibold italic text-brand-orange mt-1.5 leading-none">
                Planting Seeds of Hope and Change
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 font-medium mt-1.5 leading-none">
                Bathiya, Via- Putai Manigachhi, Darbhanga, Bihar – 847423, India
              </span>
            </div>
          </a>

          {/* Right stats/trust labels for premium styling */}
          <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <div className="text-right border-r pr-4 border-gray-200">
              <div className="text-brand-orange">12A & 80G Certified</div>
              <div>Registered Trust</div>
            </div>
            <div>
              <div className="text-brand-green">FCRA Compliant</div>
              <div>Govt. Registered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Themed Menu Navbar (Sticky) */}
      <header className="bg-[#0d2b1a] text-white sticky top-0 z-50 shadow-md transition-all duration-200 py-1">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">

          {/* Left Group: Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item, idx) => {
              const hasMega = !!MEGA_DATA[item];
              const isActive = activeMenu === item;
              const label = NAV_ITEMS_TRANSLATIONS[lang][idx] || item;
              return (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => hasMega && openMenu(item)}
                  onMouseLeave={hasMega ? scheduleClose : undefined}
                >
                  <a
                    href={
                      item === "Home"
                        ? "/"
                        : item === "About Us"
                          ? "/about"
                          : item === "What We Do"
                            ? "#focus-areas"
                            : item === "Programs"
                              ? "/programs/healthcare"
                              : item === "Impact"
                                ? "/#impact-stats"
                                : item === "Media & Updates"
                                  ? "/news-and-events"
                                  : item === "Get Involved"
                                    ? "/#get-involved"
                                    : item === "Contact Us"
                                      ? "/contact"
                                      : "#"
                    }
                    className="relative flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 font-semibold text-sm transition-all px-4 py-3 rounded-md group"
                    onClick={(event) => {
                      if (item === "What We Do") {
                        event.preventDefault();
                        setActiveMenu(null);
                        document.getElementById("focus-areas")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else if (!hasMega) {
                        setActiveMenu(null);
                      }
                    }}
                  >
                    {label}
                    {hasMega && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "rotate-180 text-white" : "text-white/60"
                          }`}
                      />
                    )}
                    {/* Sliding underline */}
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200 ease-out" />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Right Group: Donate Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0 py-1.5 ml-auto lg:ml-0">
            <TranslateButton className="border-white/20 bg-white/5 hover:bg-white/15 text-xs text-white" />
            <a href="/donate" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs md:text-sm px-4 py-2 rounded-md shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wide">
              DONATE NOW
            </a>
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mega Panel Dropdown */}
          {activeMenu && MEGA_DATA[activeMenu] && (
            <div
              className="absolute left-0 right-0 top-full bg-white shadow-2xl z-50 border-t-2 border-brand-orange py-8 px-16 flex gap-10"
              style={{
                clipPath: activeMenu ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                transition: "clip-path 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {/* Left columns group */}
              <div className="flex-1">
                {/* Column Section Heading */}
                <div className="text-brand-orange uppercase text-xs tracking-widest font-bold mb-4">
                  {activeMenu}
                </div>

                {/* Columns grid */}
                <div
                  className="grid gap-8"
                  style={{ gridTemplateColumns: `repeat(${MEGA_DATA[activeMenu].cols}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: MEGA_DATA[activeMenu].cols }).map((_, colIndex) => {
                    const items = MEGA_DATA[activeMenu].items;
                    const colsCount = MEGA_DATA[activeMenu].cols;
                    const itemsPerCol = Math.ceil(items.length / colsCount);
                    const colItems = items.slice(colIndex * itemsPerCol, (colIndex + 1) * itemsPerCol);
                    return (
                      <div key={colIndex} className="flex flex-col gap-3">
                        {colItems.map((subItem, itemIndex) => {
                          const globalIndex = colIndex * itemsPerCol + itemIndex;
                          return (
                            <a
                              key={subItem}
                              href={
                                activeMenu === "About Us" && subItem === "Overview"
                                  ? "/about"
                                  : activeMenu === "About Us" && subItem === "Our Objective & Vision"
                                    ? "/about/objective-and-vision"
                                    : activeMenu === "About Us" && subItem === "Vision 2047"
                                      ? "/about/vision-2047"
                                      : activeMenu === "About Us" && subItem === "Leadership & Management"
                                        ? "/about/leadership"
                                        : activeMenu === "About Us" && subItem === "Governance & Transparency"
                                          ? "/about/governance"
                                          : activeMenu === "About Us" && subItem === "Legal Status & Registration"
                                            ? "/about/legal-status"
                                            : activeMenu === "About Us" && subItem === "Members & Supporters"
                                              ? "/membership"
                                              : activeMenu === "About Us" && subItem === "Our Partners & Donors"
                                                ? "/about/legal-status"
                                                : activeMenu === "About Us" && subItem === "Membership Policy"
                                                  ? "/membership#status"
                                                  : activeMenu === "What We Do" && subItem === "Health Care"
                                                    ? "/programs/healthcare"
                                                    : activeMenu === "What We Do" && subItem === "Education"
                                                      ? "/programs/education"
                                                      : activeMenu === "What We Do" && subItem === "Skills Development"
                                                        ? "/programs/skills-development"
                                                        : activeMenu === "What We Do" && subItem === "Women Empowerment"
                                                          ? "/programs/women-empowerment"
                                                          : activeMenu === "What We Do"
                                                            ? "/programs/healthcare"
                                                            : activeMenu === "Programs" && subItem === "View All Programs →"
                                                              ? "/programs/healthcare"
                                                              : activeMenu === "Impact"
                                                                ? "/#impact-stats"
                                                                : activeMenu === "Media & Updates" && subItem === "News & Events"
                                                                  ? "/news-and-events"
                                                                  : activeMenu === "Media & Updates" && subItem === "Latest Updates"
                                                                    ? "/news-and-events"
                                                                    : activeMenu === "Media & Updates" && subItem === "Gallery"
                                                                      ? "/news-and-events"
                                                                      : activeMenu === "Media & Updates" && subItem === "Press Release"
                                                                        ? "/news-and-events"
                                                                        : activeMenu === "Media & Updates"
                                                                          ? "/news-and-events"
                                                                          : activeMenu === "Get Involved" && subItem === "Donate & Support"
                                                                            ? "/donate"
                                                                            : activeMenu === "Get Involved"
                                                                              ? "/#get-involved"
                                                                              : "#"
                              }
                              className="flex items-center gap-2 text-gray-700 hover:text-[#0d2b1a] text-sm hover:translate-x-1 transition-all duration-200"
                              style={{
                                transitionDelay: `${globalIndex * 30}ms`,
                              }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <span className="text-brand-orange text-sm font-semibold">→</span>
                              {subItem}
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Accent Column (Optional feature card for About Us, What We Do, Get Involved) */}
              {(activeMenu === "About Us" || activeMenu === "What We Do" || activeMenu === "Get Involved") && (
                <div className="w-72 shrink-0 border-l border-gray-100 pl-8 flex flex-col justify-between">
                  <div className="bg-[#f9fdf9] border border-green-100/50 rounded-lg p-5 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-[#0d2b1a] text-sm leading-snug">
                      Planting Seeds of Hope and Change
                    </div>
                    <div className="text-xs text-gray-600 leading-normal">
                      10,000+ lives impacted since 2019. Join us in bringing sustainable growth.
                    </div>
                    <a
                      href="#"
                      className="text-brand-orange text-xs font-bold hover:underline inline-flex items-center gap-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </header>

      {/* Mobile Drawer Slide-in Panel */}
      {mobileOpen && (
        <>
          {/* Backdrop for Mobile Drawer */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Left slide drawer */}
          <div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto mobile-drawer lg:hidden flex flex-col"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0d2b1a] shrink-0 text-white">
              <div className="flex items-center gap-2.5">
                <Leaf className="w-6 h-6 text-brand-green fill-brand-green/20" />
                <div className="flex flex-col leading-none">
                  <span className="font-extrabold text-white text-base">IWF</span>
                  <span className="font-semibold text-[8px] text-white/70 tracking-wider">ISLAH WELFARE FOUNDATION</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-white/80 hover:text-white transition-colors rounded cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav List */}
            <nav className="flex-1 py-2" aria-label="Mobile navigation items">
              {NAV_ITEMS.map((item) => {
                const hasMega = !!MEGA_DATA[item];
                const isExpanded = mobileExpanded === item;
                return (
                  <div key={item} className="border-b border-slate-100 last:border-0">
                    <div className="flex items-center">
                      <a
                        href={
                          item === "Home"
                            ? "/"
                            : item === "About Us"
                              ? "/about"
                              : item === "What We Do"
                                ? "#focus-areas"
                                : item === "Programs"
                                  ? "/programs/healthcare"
                                  : item === "Impact"
                                    ? "/#impact-stats"
                                    : item === "Media & Updates"
                                      ? "/news-and-events"
                                      : item === "Get Involved"
                                        ? "/#get-involved"
                                        : item === "Contact Us"
                                          ? "/contact"
                                          : "#"
                        }
                        className="flex-1 px-5 py-3.5 text-sm font-semibold text-slate-800 hover:text-brand-green transition-colors"
                        onClick={(event) => {
                          if (item === "What We Do") {
                            event.preventDefault();
                            setMobileOpen(false);
                            document.getElementById("focus-areas")?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          } else if (!hasMega) {
                            setMobileOpen(false);
                          } else {
                            setMobileExpanded(isExpanded ? null : item);
                          }
                        }}
                      >
                        {item}
                      </a>
                      {hasMega && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item)}
                          className="px-4 py-3.5 text-slate-400 hover:text-brand-green transition-colors cursor-pointer"
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-green" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Sub-items */}
                    {hasMega && isExpanded && (
                      <div className="bg-slate-50 border-l-4 border-brand-green ml-4 mr-2 rounded-sm mb-1.5 py-1">
                        {MEGA_DATA[item].items.map((sub) => (
                          <a
                            key={sub}
                            href={
                              item === "About Us" && sub === "Overview"
                                ? "/about"
                                : item === "About Us" && sub === "Our Objective & Vision"
                                  ? "/about/objective-and-vision"
                                  : item === "About Us" && sub === "Vision 2047"
                                    ? "/about/vision-2047"
                                    : item === "About Us" && sub === "Leadership & Management"
                                      ? "/about/leadership"
                                      : item === "About Us" && sub === "Governance & Transparency"
                                        ? "/about/governance"
                                        : item === "About Us" && sub === "Legal Status & Registration"
                                          ? "/about/legal-status"
                                          : item === "About Us" && sub === "Members & Supporters"
                                            ? "/membership"
                                            : item === "About Us" && sub === "Our Partners & Donors"
                                              ? "/about/legal-status"
                                              : item === "About Us" && sub === "Membership Policy"
                                                ? "/membership#status"
                                                : item === "What We Do" && sub === "Health Care"
                                                  ? "/programs/healthcare"
                                                  : item === "What We Do" && sub === "Education"
                                                    ? "/programs/education"
                                                    : item === "What We Do" && sub === "Skills Development"
                                                      ? "/programs/skills-development"
                                                      : item === "What We Do" && sub === "Women Empowerment"
                                                        ? "/programs/women-empowerment"
                                                        : item === "What We Do"
                                                          ? "/programs/healthcare"
                                                          : item === "Programs" && sub === "View All Programs →"
                                                            ? "/programs/healthcare"
                                                            : item === "Impact"
                                                              ? "/#impact-stats"
                                                              : item === "Media & Updates" && sub === "News & Events"
                                                                ? "/news-and-events"
                                                                : item === "Media & Updates" && sub === "Gallery"
                                                                  ? "/news-and-events"
                                                                  : item === "Media & Updates" && sub === "Press Release"
                                                                    ? "/news-and-events"
                                                                    : item === "Media & Updates"
                                                                      ? "/news-and-events"
                                                                      : item === "Get Involved" && sub === "Donate & Support"
                                                                        ? "/donate"
                                                                        : item === "Get Involved"
                                                                          ? "/#get-involved"
                                                                          : "#"
                            }
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

            {/* Footer / Donate Button */}
            <div className="p-4 border-t border-slate-100 shrink-0">
              <a
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="block w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors uppercase tracking-wide text-sm text-center"
              >
                DONATE NOW
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function HeroSection() {
  return (
    <section id="welcome-hero" className="relative scroll-mt-20">
      <div className="relative min-h-[600px] lg:min-h-[680px] overflow-hidden flex items-center">
        {/* Background Image */}
        <img
          src={hero}
          alt="Empowering kids in rural India"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Modern dark/green gradient overlay for rich premium feel and high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full z-10">
          <div className="max-w-3xl text-white">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-white/95">
                "Planting Seeds of Hope and Change" — Islah Welfare Foundation (Reg.)
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6">
              Welcome to <span className="text-brand-orange">Islah Welfare Foundation</span>
            </h1>

            {/* Body Paragraph */}
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6 font-normal">
              Islah Welfare Foundation is an effort to lay a positive foundation of change in the field of education for the underprivileged kids. We believe that happiness for a lifetime can only be achieved by helping and enriching the next generation. Some of us give our time, some money, and some give skills, but ultimately, we strongly feel everyone has something to give to these kids in need. Most importantly, working for ISLAH does not translate to sacrificing personal lives or needs.
            </p>

            {/* Styled Mother Teresa Quote Block */}
            <blockquote className="border-l-4 border-brand-orange bg-white/5 backdrop-blur-sm p-4 rounded-r-lg my-6 max-w-2xl">
              <p className="text-sm md:text-base italic text-slate-100 font-medium">
                “We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.”
              </p>
              <cite className="block text-xs md:text-sm font-semibold text-brand-orange mt-2 not-italic">
                — Mother Teresa
              </cite>
            </blockquote>

            {/* Join CTA Paragraph */}
            <p className="text-base md:text-lg font-semibold text-slate-100 mb-8 tracking-wide">
              IWF‘s doors are always open. If you feel you can fill the gap of a missing drop, <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange/60">come join us….</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="/donate" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm">
                DONATE NOW
              </a>
              <a href="#get-involved" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm backdrop-blur-sm">
                GET INVOLVED
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-brand-green text-white rounded-md shadow-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {[
            { icon: Users, n: "5,000+", l: "Lives Impacted" },
            { icon: HeartPulse, n: "100+", l: "Health Camps" },
            { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
            { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
          ].map(({ icon: Icon, n, l }) => (
            <div key={l} className="p-5 flex items-center gap-3 justify-center">
              <Icon className="w-9 h-9 opacity-90" />
              <div>
                <div className="text-2xl font-extrabold">{n}</div>
                <div className="text-xs opacity-90">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface LanguageProp {
  lang: "en" | "hi";
}

function UrgentPatientsSection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                {t.urgentTag}
              </p>
              <h2 className="text-xl md:text-2xl font-black text-slate-950 uppercase tracking-wide">
                {t.urgentTitle}
              </h2>
              <p className="text-base font-bold text-[#f97316] mt-1 font-sans">
                हर पल अनमोल है
              </p>
              <div className="h-1 w-12 bg-[#f97316] rounded-full mt-1.5" />
              <p className="text-sm text-slate-900 font-medium mt-3 max-w-2xl leading-relaxed">
                {t.urgentSub}
              </p>
            </div>
            <a
              href="/programs/healthcare/critical-life-support"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-green hover:text-slate-950 transition-colors shrink-0"
            >
              {t.viewAllPatients} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {URGENT_PATIENTS.map((patient) => (
              <PatientCard key={patient.id} {...patient} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FeaturedCauses({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const causes = [
    { img: causeEdu, icon: BookOpen, title: lang === "en" ? "Child Education" : "बाल शिक्षा", desc: lang === "en" ? "Scholarships, school kits & learning centres keeping children in school." : "छात्रवृत्ति, स्कूल किट और लर्निंग सेंटर बच्चों को स्कूल से जोड़े रखने के लिए।", route: "/programs/education" },
    { img: causeMed, icon: Stethoscope, title: lang === "en" ? "Medical Help" : "चिकित्सा सहायता", desc: lang === "en" ? "Free health camps, essential medicines & emergency treatment." : "मुफ़्त स्वास्थ्य शिविर, आवश्यक दवाएं और आपातकालीन चिकित्सा सहायता।", route: "/programs/healthcare" },
    { img: causeWomen, icon: Users, title: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", desc: lang === "en" ? "Self-Help Groups, vocational skills & financial literacy programs." : "स्वयं सहायता समूह, व्यावसायिक कौशल और वित्तीय साक्षरता कार्यक्रम।", route: "/programs/women-empowerment" },
    { img: thAgr, icon: Sprout, title: lang === "en" ? "Rural Development" : "ग्रामीण विकास", desc: lang === "en" ? "Sanitation, clean water and housing for self-reliant villages." : "आत्मनिर्भर गांवों के लिए स्वच्छता, स्वच्छ पानी और आवास निर्माण।", route: "#" },
    { img: thEnt, icon: Wrench, title: lang === "en" ? "Skill Development" : "कौशल विकास", desc: lang === "en" ? "Vocational training and micro-entrepreneurship for village youth." : "ग्रामीण युवाओं के लिए व्यावसायिक प्रशिक्षण और सूक्ष्म-उद्यम विकास।", route: "/programs/skills-development" },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>{t.featuredCauses}</SectionTitle></ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {causes.map((c) => (
              <div key={c.title} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden flex flex-col">
                <div className="relative h-36 w-full">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                    <c.icon className="w-4 h-4 text-brand-green" />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-extrabold text-base text-slate-950 mb-1.5">{c.title}</h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed flex-1">{c.desc}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <a href={c.route} className="text-sm font-bold text-brand-green hover:text-brand-green-dark">{t.readMore} →</a>
                    <a href="/donate" className="text-xs font-extrabold bg-brand-orange text-white px-3.5 py-1.5 rounded-lg hover:bg-brand-orange-dark transition-all">{t.donateNow}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WhatWeDo({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const items = [
    { icon: GraduationCap, l: lang === "en" ? "Education" : "शिक्षा", s: lang === "en" ? "Learning & Scholarships" : "लर्निंग और छात्रवृत्ति", route: "/programs/education" },
    { icon: HeartPulse, l: lang === "en" ? "Healthcare" : "स्वास्थ्य सेवा", s: lang === "en" ? "Free camps & awareness" : "मुफ़्त शिविर और जागरूकता", route: "/programs/healthcare" },
    { icon: Users, l: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", s: lang === "en" ? "SHGs & skills" : "एसएचजी और व्यावसायिक कौशल", route: "/programs/women-empowerment" },
    { icon: Sprout, l: lang === "en" ? "Rural Development" : "ग्रामीण विकास", s: lang === "en" ? "Water & infrastructure" : "जल और बुनियादी ढांचा", route: "#" },
    { icon: Wrench, l: lang === "en" ? "Skill Development" : "कौशल विकास", s: lang === "en" ? "Vocational training" : "व्यावसायिक प्रशिक्षण", route: "/programs/skills-development" },
    { icon: Leaf, l: lang === "en" ? "Environment" : "पर्यावरण", s: lang === "en" ? "Plantation & green energy" : "वृक्षारोपण और हरित ऊर्जा", route: "#" },
  ];

  return (
    <section id="focus-areas" className="py-16 bg-slate-50 scroll-mt-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>{t.whatWeDo}</SectionTitle></ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map(({ icon: Icon, l, s, route }) => (
              <a key={l} href={route} className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition block group hover:-translate-y-0.5">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7 text-brand-green" />
                </div>
                <div className="text-base font-extrabold text-slate-950">{l}</div>
                <div className="text-sm font-semibold text-slate-800 mt-1">{s}</div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProgramsAndThematic({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const programs = [
    { icon: BookOpen, title: lang === "en" ? "Education Support" : "शिक्षा सहायता", desc: lang === "en" ? "We run Community Learning Centres and 'Shiksha Na Ruke' scholarships to support children." : "हम बच्चों के सहयोग के लिए सामुदायिक शिक्षा केंद्र और 'शिक्षा न रुके' छात्रवृत्ति चलाते हैं।", route: "/programs/education" },
    { icon: HeartPulse, title: lang === "en" ? "Healthcare Camps" : "स्वास्थ्य शिविर", desc: lang === "en" ? "Under 'Health Cannot Wait', we organize free camps, check-ups and hygiene drives." : "'हेल्थ कैन नॉट वेट' के तहत, हम मुफ्त चिकित्सा शिविर और स्वच्छता अभियान आयोजित करते हैं।", route: "/programs/healthcare" },
    { icon: Users, title: lang === "en" ? "Women Empowerment" : "महिला सशक्तिकरण", desc: lang === "en" ? "Forming Self-Help Groups (SHGs) and providing vocational and leadership training." : "स्वयं सहायता समूहों (SHGs) का गठन और व्यावसायिक एवं नेतृत्व प्रशिक्षण प्रदान करना।", route: "/programs/women-empowerment" },
    { icon: Sprout, title: lang === "en" ? "Rural Development" : "ग्रामीण विकास", desc: lang === "en" ? "Clean water access, sanitation, and public infrastructure in 'Model Villages'." : "'मॉडल गांवों' में स्वच्छ पेयजल पहुंच, स्वच्छता और सार्वजनिक बुनियादी ढांचा।", route: "#" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>{t.ourPrograms}</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                <p.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-950 mb-1">{p.title}</h3>
              <p className="text-xs text-slate-900 font-semibold mb-3 leading-relaxed">{p.desc}</p>
              <a href={p.route} className="text-xs font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1">
                {t.readMore} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsAndNoticesSection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const notices = [
    { d: "25", m: "MAY", title: lang === "en" ? "Free Health Camp — Darbhanga" : "निःशुल्क स्वास्थ्य शिविर — दरभंगा", desc: lang === "en" ? "Free diagnostic consultation and distributing medicines to rural families." : "ग्रामीण परिवारों के लिए निःशुल्क परामर्श, जाँच शिविर और निःशुल्क दवा वितरण।" },
    { d: "05", m: "JUN", title: lang === "en" ? "Environment Day Plantation" : "पर्यावरण दिवस वृक्षारोपण अभियान", desc: lang === "en" ? "Planting saplings and promoting environment awareness in local villages." : "स्थानीय गांवों में वृक्षारोपण और पर्यावरण संरक्षण के प्रति जागरूकता फैलाना।" },
    { d: "15", m: "JUL", title: lang === "en" ? "Shiksha Na Ruke Distribution" : "शिक्षा न रुके छात्रवृत्ति वितरण", desc: lang === "en" ? "Scholarship kits distribution to deserving students under our flagship campaign." : "फ्लैगशिप अभियान के तहत पात्र विद्यार्थियों को छात्रवृत्ति किट का वितरण।" },
    { d: "10", m: "NOV", title: lang === "en" ? "Winter Relief Blanket Drive" : "शीतकालीन राहत कंबल वितरण अभियान", desc: lang === "en" ? "Distributing warm blankets to shelterless and needy families before peak winter." : "भीषण ठंड से पहले बेघर और जरूरतमंद परिवारों को गर्म कंबल वितरित करना।" },
    { d: "12", m: "DEC", title: lang === "en" ? "Livelihood Toolkit Distribution" : "आजीविका टूलकिट वितरण कार्यक्रम", desc: lang === "en" ? "Providing sewing machines and tools to local youth and women to support self-employment." : "स्थानीय युवाओं और महिलाओं को स्वरोजगार के लिए सिलाई मशीन और उपकरण प्रदान करना।" },
  ];

  // We will clone the first 3 notices to the end for seamless looping
  const loopNotices = [...notices, ...notices.slice(0, 3)];

  const [noticeIndex, setNoticeIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tick = () => {
      setNoticeIndex((prev) => {
        const next = prev + 1;
        setTransitionEnabled(true);
        return next;
      });
    };

    const run = () => {
      timeoutRef.current = setTimeout(() => {
        tick();
        run();
      }, 3500);
    };

    run();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // When we reach index 5 (which displays duplicates of 0, 1, 2), snap back to 0 without animation
  useEffect(() => {
    if (noticeIndex === 5) {
      const snapTimer = setTimeout(() => {
        setTransitionEnabled(false);
        setNoticeIndex(0);
      }, 500); // Wait for transition animation (500ms) to complete
      return () => clearTimeout(snapTimer);
    }
  }, [noticeIndex]);

  // For the News column on the right: a vertical carousel showing 1 card at a time.
  const newsList = LATEST_NEWS.map((news) => {
    let title = news.title;
    let excerpt = news.excerpt;
    let tag = news.tag;

    if (lang === "hi") {
      if (news.tag === "Health Camp") {
        tag = "स्वास्थ्य शिविर";
        title = "दरभंगा के बथिया में निःशुल्क चिकित्सा शिविर का आयोजन — 200+ मरीजों का उपचार";
        excerpt = "आईडब्ल्यूएफ की स्वास्थ्य टीम ने दरभंगा के बथिया में एक व्यापक निःशुल्क चिकित्सा शिविर का आयोजन किया, जिसमें आसपास के गांवों के 200 से अधिक रोगियों को निःशुल्क परामर्श, दवाएं और जाँच सेवाएं प्रदान की गईं।";
      } else if (news.tag === "Education") {
        tag = "शिक्षा";
        title = "मुजफ्फरपुर में आयोजित वार्षिक छात्रवृत्ति वितरण समारोह";
        excerpt = "शिक्षा न रुके अभियान के तहत कमजोर परिवारों के 100 मेधावी छात्रों को छात्रवृत्ति प्रदान की गई, जिसमें शैक्षणिक वर्ष के लिए स्कूल की फीस, यूनिफॉर्म और अध्ययन सामग्री शामिल है।";
      } else if (news.tag === "Women Empowerment") {
        tag = "महिला सशक्तिकरण";
        title = "सीतामढ़ी में नया स्वयं सहायता समूह शुरू — 30 महिलाओं ने पंजीकरण कराया";
        excerpt = "शी कैन फ्लाई अभियान के तहत सीतामढ़ी में 30 महिलाओं के साथ एक नया स्वयं सहायता समूह बनाया गया, जो सिलाई, मोमबत्ती बनाने और खाद्य प्रसंस्करण के व्यावसायिक प्रशिक्षण में नामांकित हैं।";
      } else if (news.tag === "Annual Report") {
        tag = "वार्षिक रिपोर्ट";
        title = "आईडब्ल्यूएफ वार्षिक रिपोर्ट 2024–25 प्रकाशित — 50+ गांवों तक पहुंचा प्रभाव";
        excerpt = "वार्षिक रिपोर्ट 2024–25 शिक्षा, स्वास्थ्य और आजीविका कार्यक्रमों में आईडब्ल्यूएफ के काम का विवरण प्रस्तुत करती है, जो 50 से अधिक गांवों तक पहुंची और 5,000 से अधिक लाभार्थियों को प्रभावित किया।";
      }
    }
    return { ...news, tag, title, excerpt };
  });

  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [newsList.length]);

  return (
    <section className="py-16 bg-[#0d2b1a] text-white border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Events & Notices */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-orange rounded-full"></span>
                {t.eventsNotices}
              </h2>
            </div>
            
            {/* Scroll Container with height exactly matching 3 items (440px) */}
            <div className="relative flex-1 h-[440px] max-h-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#091f12] shadow-sm p-4">
              <div 
                className="space-y-4"
                style={{
                  transform: `translateY(-${noticeIndex * 140}px)`,
                  transition: transitionEnabled ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                }}
              >
                {loopNotices.map((e, i) => (
                  <div key={i} className="h-[124px] bg-[#0a2315] hover:bg-[#0c2e1b] rounded-xl p-5 flex gap-5 items-center border border-white/5 shadow-sm transition-colors duration-200">
                    <div className="text-center bg-white/5 rounded-lg px-4 py-2 w-20 shrink-0">
                      <div className="text-xs font-bold text-brand-orange uppercase">{e.m}</div>
                      <div className="text-2xl font-extrabold text-white leading-none mt-1">{e.d}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm md:text-base text-white truncate">{e.title}</h4>
                      <p className="text-xs md:text-sm text-white/70 font-medium leading-relaxed mt-1.5 line-clamp-2">{e.desc}</p>
                    </div>
                    <a href="#" className="text-xs md:text-sm font-bold text-brand-orange hover:underline shrink-0 transition-colors">{t.readMore} →</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Right Column: News & Updates (Vertical Carousel) */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-orange rounded-full"></span>
                {t.newsUpdates}
              </h2>
              <a href="/news-and-events" className="text-xs font-bold text-brand-orange hover:underline transition-colors">
                {t.viewAll} →
              </a>
            </div>
 
            {/* Carousel Container showing 1 card with animation transitions */}
            <div className="relative flex-1 h-[440px] max-h-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#091f12] shadow-sm p-6 flex flex-col justify-between">
              {newsList.map((news, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-700 ease-in-out ${
                    newsIndex === idx 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10" style={{ color: news.tagColor }}>
                        {news.tag}
                      </span>
                      <span className="text-xs text-white/50 font-semibold">{news.date}</span>
                    </div>
                    <h3 className="font-extrabold text-base md:text-lg text-white leading-snug hover:text-brand-orange transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-white/70 font-medium leading-relaxed line-clamp-4">
                      {news.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-4">
                    <a href="#" className="text-xs font-bold inline-flex items-center gap-1 hover:underline" style={{ color: news.tagColor }}>
                      {t.readMore} <ArrowRight className="w-3 h-3" />
                    </a>
                    
                    {/* Dots indicator */}
                    <div className="flex gap-1.5">
                      {newsList.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setNewsIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${newsIndex === i ? "w-4 bg-brand-orange" : "bg-white/20"}`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}

interface GetInvolvedProps {
  lang: "en" | "hi";
  onOpenModal: (type: RoleType) => void;
}

function GetInvolved({ lang, onOpenModal }: GetInvolvedProps) {
  const t = TRANSLATIONS[lang];
  return (
    <section id="get-involved" className="py-12 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>{t.getInvolved}</SectionTitle></ScrollReveal>
        <p className="text-center text-slate-950 font-medium text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.getInvolvedSub}
        </p>
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
          {[
            { icon: Hand, l: t.volunteer, s: t.volunteerSub, type: "volunteer" as const },
            { icon: HandHeart, l: t.partner, s: t.partnerSub, type: "partner" as const },
            { icon: Heart, l: t.sponsor, s: t.sponsorSub, type: "sponsor" as const },
            { icon: Users, l: t.mentor, s: t.mentorSub, type: "mentor" as const },
            { icon: Briefcase, l: t.employee, s: t.employeeSub, type: "employee" as const },
          ].map((item) => (
            <div
              key={item.l}
              onClick={() => onOpenModal(item.type)}
              className="text-center p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 cursor-pointer group"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <item.icon className="w-5 h-5 text-brand-green" />
              </div>
              <div className="text-sm font-extrabold text-slate-950 group-hover:text-brand-green transition-colors">{item.l}</div>
              <div className="text-[11px] text-slate-900 font-semibold mt-1 leading-snug">{item.s}</div>
            </div>
          ))}
          <a href="/donate" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 rounded-lg transition shadow-md w-full text-center text-sm tracking-wider uppercase select-none">
            {t.donateNow}
          </a>
        </div>
      </div>
    </section>
  );
}

function ExploreIWF({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const items = [
    {
      icon: Info,
      page: lang === "en" ? "About Us" : "हमारे बारे में",
      summary: lang === "en"
        ? "We are a public charitable trust dedicated to building an equitable, self-reliant India. Guided by 'Vision 2047', we empower vulnerable communities through education and health."
        : "हम एक सार्वजनिक धर्मार्थ ट्रस्ट हैं जो एक न्यायसंगत, आत्मनिर्भर भारत के निर्माण के लिए समर्पित है। 'विज़न 2047' के तहत हम कमजोर समुदायों को सशक्त बनाते हैं।",
      route: "/about"
    },
    {
      icon: Target,
      page: lang === "en" ? "Programs" : "हमारे कार्यक्रम",
      summary: lang === "en"
        ? "We run structured development programs across key sectors, including primary education, rural healthcare, women empowerment, environment, and emergency relief."
        : "हम प्राथमिक शिक्षा, ग्रामीण स्वास्थ्य सेवा, महिला सशक्तिकरण, पर्यावरण संरक्षण और आपातकालीन राहत सहित प्रमुख क्षेत्रों में विकास कार्यक्रम चलाते हैं।",
      route: "/programs/healthcare"
    },
    {
      icon: BarChart2,
      page: lang === "en" ? "Impact" : "हमारा प्रभाव",
      summary: lang === "en"
        ? "With over 5,000 lives touched, 100 health camps conducted, and 2,000 students supported, we document and share all outcomes via our public impact dashboard."
        : "5,000+ जीवन को प्रभावित करने, 100+ स्वास्थ्य शिविर आयोजित करने और 2,000+ छात्रों की सहायता के साथ, हम सभी परिणामों को सार्वजनिक डैशबोर्ड पर साझा करते हैं।",
      route: "#"
    },
    {
      icon: Newspaper,
      page: lang === "en" ? "Media & Updates" : "मीडिया और अपडेट",
      summary: lang === "en"
        ? "Stay updated with our latest field activities, news, press releases, newsletters, and view our photo gallery capturing real moments of community transformation."
        : "हमारी नवीनतम गतिविधियों, समाचारों, प्रेस विज्ञप्तियों, समाचार पत्रों से अपडेट रहें और समुदाय परिवर्तन के वास्तविक क्षणों को कैद करने वाली हमारी फोटो गैलरी देखें।",
      route: "#"
    },
    {
      icon: UserCheck,
      page: lang === "en" ? "Get Involved" : "हमसे जुड़ें",
      summary: lang === "en"
        ? "We invite individuals, corporates, and institutions to join us. Make a lasting difference by volunteering, mentoring, partnering, or supporting a campaign."
        : "हम व्यक्तियों, कॉर्पोरेट और संस्थानों को हमारे साथ जुड़ने के लिए आमंत्रित करते हैं। स्वयंसेवा, सलाह देने या भागीदारी के माध्यम से एक स्थायी बदलाव लाएं।",
      route: "#"
    },
    {
      icon: MessageCircle,
      page: lang === "en" ? "Contact Us" : "संपर्क करें",
      summary: lang === "en"
        ? "Connect with our team at our offices in Bihar, Delhi, or Meerut. Write to us at info@iwfindia.org or call +91 9811861633 for direct inquiries."
        : "बिहार, दिल्ली या मेरठ में हमारे कार्यालयों में हमारी टीम से जुड़ें। सीधे पूछताछ के लिए हमें info@iwfindia.org पर लिखें या +91 9811861633 पर कॉल करें।",
      route: "#"
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>{t.exploreIWF}</SectionTitle></ScrollReveal>
        <p className="text-center text-slate-900 font-medium text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.exploreSub}
        </p>
        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.page} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-md bg-brand-orange/15 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-extrabold text-base mb-2.5 text-brand-green-dark">{item.page}</h3>
                <p className="text-sm text-slate-800 font-medium leading-relaxed mb-4">{item.summary}</p>
                <a href={item.route} className="text-sm font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1 hover:opacity-80 transition">
                  {t.readMore} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  return (
    <footer className="w-full">
      {/* Zone B — Trust Sub-Strip */}
      <div className="bg-[#f9f9f6] text-slate-800 py-10 px-4 md:px-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

          {/* Left — Stay Connected */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#0d2b1a] text-white flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-[#0d2b1a] text-base leading-tight">STAY CONNECTED</h5>
              <p className="text-gray-600 text-sm mt-1">
                Subscribe to our newsletter and stay updated with our latest activities and impact.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center mt-3 shadow-sm rounded-md overflow-hidden border border-gray-200">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none border-0"
                />
                <button
                  type="submit"
                  className="bg-[#0d2b1a] hover:bg-brand-green text-white text-xs font-semibold px-5 py-2.5 transition-colors uppercase shrink-0 cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Center — We Are A Trusted Organization */}
          <div className="text-center">
            <h5 className="font-bold text-[#0d2b1a] text-xs uppercase tracking-wide mb-6">
              WE ARE A TRUSTED ORGANIZATION
            </h5>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Registered Trust", Icon: () => <Award className="w-5 h-5 text-[#0d2b1a]" /> },
                { label: "12A & 80G Certified", Icon: () => <span className="text-[9px] font-black tracking-tighter text-[#0d2b1a]">12A 80G</span> },
                { label: "Impact Driven", Icon: () => <BarChart2 className="w-5 h-5 text-[#0d2b1a]" /> },
                { label: "Secure & Transparent", Icon: () => <Lock className="w-5 h-5 text-[#0d2b1a]" /> }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0d2b1a] bg-white flex items-center justify-center">
                    <badge.Icon />
                  </div>
                  <span className="text-[#0d2b1a] font-semibold text-[9px] text-center mt-2 leading-tight">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Quote Block */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center mt-4 lg:mt-0">
            <span className="text-[#0d2b1a] text-5xl font-serif leading-none block h-5">“</span>
            <p className="text-[#0d2b1a] font-medium text-sm italic leading-relaxed mt-2">
              Alone we can do so little, together we can do so much.
            </p>
            <span className="text-xs font-semibold text-[#0d2b1a] mt-2 block">
              – Helen Keller
            </span>
          </div>

        </div>
      </div>

      {/* Zone C — Values Strip */}
      <div className="bg-[#0d2b1a] text-white py-6 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
          {[
            { title: "Transparency", desc: "We are open and honest in all our actions.", Icon: ShieldCheck },
            { title: "Accountability", desc: "We take responsibility for our commitments.", Icon: UserCheck },
            { title: "Integrity", desc: "We operate with strong moral principles.", Icon: Scale },
            { title: "Compassion", desc: "We care for people and the communities we serve.", Icon: Heart }
          ].map((val, i) => (
            <div key={i} className="flex items-start gap-3">
              <val.Icon className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
              <div>
                <h6 className="font-bold text-white text-sm">{val.title}</h6>
                <p className="text-white text-xs mt-0.5">{val.desc}</p>
              </div>
            </div>
          ))}
          {/* 5th Cell (Rightmost) */}
          <div className="relative p-4 rounded bg-black/10 border border-white/5 flex items-center justify-end">
            <div className="text-right">
              <p className="text-white font-serif italic text-sm">
                "Together, we build a better tomorrow"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone A — Main Footer */}
      <div className="bg-[#0d2b1a] text-white py-14 px-4 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1 — Organization Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={newLogo} alt="IWF Logo" className="h-14 w-auto object-contain shrink-0" />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-wide text-white leading-none">ISLAH</span>
                <span className="font-light text-[10px] tracking-widest text-white mt-0.5">WELFARE FOUNDATION</span>
              </div>
            </div>
            <div className="text-brand-orange font-medium text-sm">
              Care | Empower | Uplift
            </div>
            <p className="text-white text-sm leading-relaxed">
              Islah Welfare Foundation is committed to empowering underprivileged communities through education, skill development, healthcare and social welfare initiatives for a better tomorrow.
            </p>
            <hr className="border-white/20" />
            <div>
              <span className="block text-xs font-bold tracking-widest text-white uppercase mb-2">FOLLOW US</span>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Youtube, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center text-white transition-all duration-200"
                  >
                    <social.Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Info className="w-4 h-4 text-brand-orange" />
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {[
                "About Us",
                "What We Do",
                "Our Programs",
                "Impact Stories",
                "Media Center",
                "Careers",
                "Get In Touch"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-brand-orange text-xs mr-2">►</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Management */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Building2 className="w-4 h-4 text-brand-orange" />
              MANAGEMENT
            </h4>
            <ul className="space-y-2.5">
              {[
                "Board of Trustees",
                "Executive Body",
                "Advisory Board",
                "Policies & Documents",
                "Annual Reports"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-brand-orange text-xs mr-2">►</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Scale className="w-4 h-4 text-brand-orange" />
              LEGAL
            </h4>
            <ul className="space-y-2.5">
              {[
                "Certificates",
                "FCRA",
                "12A & 80G",
                "Privacy Policy",
                "Terms & Conditions",
                "Refund Policy"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-flex items-center text-white text-sm hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="text-brand-orange text-xs mr-2">►</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact Us */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-white font-semibold text-sm uppercase border-l-2 border-brand-orange pl-2 tracking-wide">
              <Phone className="w-4 h-4 text-brand-orange" />
              CONTACT US
            </h4>
            <div className="space-y-3 text-white text-sm">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" />
                <span>Bathiya, Via- Putai Manigachhi, Darbhanga, Bihar – 847423, India</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>+91 9811861633</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>info@iwfindia.org</span>
              </div>
              <div className="flex gap-2 items-center">
                <Globe className="w-4 h-4 text-brand-orange shrink-0" />
                <span>www.islahwelfarefoundation.org</span>
              </div>
            </div>
            <button
              onClick={() => onOpenModal('sponsor')}
              className="w-full mt-5 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" /> DONATE NOW
            </button>
            <div className="text-xs italic text-white text-center mt-2">
              "Your support can change lives"
            </div>
          </div>

        </div>
      </div>

      {/* Zone D — Copyright Bar */}
      <div className="bg-[#091f12] py-4 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white">
          <div>
            © 2026 Islah Welfare Foundation. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-brand-orange transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Impact Statistics Dashboard ─────────────────────────────────────────────

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const IMPACT_STATS = [
  { icon: Users, value: 5000, suffix: "+", label: "Lives Touched", color: "#15803d" },
  { icon: HeartPulse, value: 100, suffix: "+", label: "Health Camps", color: "#ea580c" },
  { icon: BookOpen, value: 2000, suffix: "+", label: "Students Supported", color: "#1D4ED8" },
  { icon: MapPin, value: 50, suffix: "+", label: "Villages Reached", color: "#D97706" },
  { icon: Activity, value: 12, suffix: "", label: "Active Programs", color: "#7C3AED" },
  { icon: Award, value: 8, suffix: "", label: "Years of Service", color: "#DB2777" },
];

function StatCard({ stat, visible }: { stat: typeof IMPACT_STATS[0]; visible: boolean }) {
  const count = useCountUp(stat.value, 1800, visible);
  const Icon = stat.icon;
  return (
    <ScrollReveal>
      <div className="text-center p-4 rounded-xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] group">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stat.color}18` }}>
          <Icon className="w-5 h-5" style={{ color: stat.color }} />
        </div>
        <div className="text-2xl font-extrabold text-[#0d2b1a] mb-0.5">
          {count.toLocaleString("en-IN")}{stat.suffix}
        </div>
        <div className="text-[10px] font-semibold text-slate-500">{stat.label}</div>
      </div>
    </ScrollReveal>
  );
}

function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="impact-stats" className="py-8 bg-blue-50/60 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">Our Impact</p>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#0d2b1a]">Numbers That Speak</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {IMPACT_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Campaigns Section ────────────────────────────────────────────────────────

const CAMPAIGNS = [
  {
    emoji: "📚",
    name: "Shiksha Na Ruke",
    tagline: "Education Must Not Stop",
    desc: "Ensuring uninterrupted education for underprivileged children through scholarships, school kits, and community learning centres.",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    cta: "Support Education",
  },
  {
    emoji: "🏥",
    name: "Health Cannot Wait",
    tagline: "Free Medical Care for All",
    desc: "Emergency medical aid, free health camps, and ambulance services reaching the most remote corners of rural Bihar.",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    cta: "Support Health",
  },
  {
    emoji: "✈️",
    name: "She Can Fly",
    tagline: "Empowering Women, Changing Lives",
    desc: "Vocational training, Self-Help Groups, and livelihood programs giving women the tools to achieve financial independence.",
    color: "#DB2777",
    bg: "#FDF2F8",
    border: "#FBCFE8",
    cta: "Support Women",
  },
  {
    emoji: "🤝",
    name: "Swabhiman",
    tagline: "Dignity Through Self-Reliance",
    desc: "Skill development, micro-finance, and entrepreneurship training turning vulnerable communities into self-sufficient contributors.",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    cta: "Support Livelihoods",
  },
  {
    emoji: "🌱",
    name: "Tayyari Kal Ki",
    tagline: "Preparing for Tomorrow",
    desc: "Rural development, environmental sustainability, and community infrastructure building for a resilient, future-ready India.",
    color: "#15803d",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    cta: "Support Development",
  },
];

function CampaignsSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Our Campaigns</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Five Pillars of Change</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">Each campaign targets a critical dimension of poverty and inequality — together they form IWF's blueprint for a better India.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPAIGNS.map((c, i) => (
              <div
                key={c.name}
                className="bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                style={{ borderColor: i === 0 ? "transparent" : "transparent" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl shrink-0">{c.emoji}</div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base">{c.name}</h3>
                    <p className="text-xs font-semibold" style={{ color: c.color }}>{c.tagline}</p>
                  </div>
                </div>
                <div className="w-full h-1 rounded-full mb-4" style={{ backgroundColor: c.color, opacity: 0.2 }} />
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{c.desc}</p>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: c.bg, color: c.color, border: `1.5px solid ${c.border}` }}
                >
                  {c.cta} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-brand-green to-[#0d2b1a] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🌟</div>
                <h3 className="font-extrabold text-white text-base mb-2">Join the Movement</h3>
                <p className="text-white/70 text-sm leading-relaxed">Volunteer, donate, or partner with IWF to amplify the impact of these campaigns across rural India.</p>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <a href="/donate" className="w-full text-center bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm py-2.5 rounded-lg transition">
                  Donate Now
                </a>
                <a href="/membership" className="w-full text-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm py-2.5 rounded-lg transition">
                  Become a Member
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── News & Latest Updates ────────────────────────────────────────────────────

const LATEST_NEWS = [
  {
    tag: "Health Camp",
    tagColor: "#DC2626",
    date: "June 28, 2025",
    title: "Free Medical Camp Organized at Bathiya — 200+ Patients Treated",
    excerpt: "IWF's Healthcare team conducted a comprehensive free medical camp at Bathiya, Darbhanga, providing consultations, medicines, and diagnostic services to over 200 patients from surrounding villages.",
    img: "🏥",
  },
  {
    tag: "Education",
    tagColor: "#1D4ED8",
    date: "June 15, 2025",
    title: "Annual Scholarship Distribution Ceremony Held in Muzaffarpur",
    excerpt: "100 meritorious students from underprivileged families received scholarships under the Shiksha Na Ruke campaign, covering school fees, uniforms, and study materials for the academic year.",
    img: "🎓",
  },
  {
    tag: "Women Empowerment",
    tagColor: "#DB2777",
    date: "June 05, 2025",
    title: "New Self-Help Group Launched in Sitamarhi — 30 Women Enroll",
    excerpt: "Under the She Can Fly campaign, a new SHG was formed at Sitamarhi with 30 women enrolled in vocational training programs for tailoring, candle making, and food processing.",
    img: "🤝",
  },
  {
    tag: "Annual Report",
    tagColor: "#15803d",
    date: "May 20, 2025",
    title: "IWF Annual Report 2024–25 Published — Impact Across 50+ Villages",
    excerpt: "The Annual Report 2024–25 documents IWF's work across education, healthcare, and livelihood programmes, reaching 50+ villages and impacting 5,000+ beneficiaries over the year.",
    img: "📊",
  },
];

function GallerySection({ lang }: LanguageProp) {
  const t = TRANSLATIONS[lang];
  const items = [
    { type: "video", src: g1, title: lang === "en" ? "VISION ACADEMIC CITY" : "विज़न एकेडमिक सिटी" },
    { type: "video", src: g2, title: lang === "en" ? "OPENING CEREMONY" : "उद्घाटन समारोह" },
    { type: "photo", src: g3, title: lang === "en" ? "HEALTH DIAGNOSTIC CAMP" : "स्वास्थ्य जाँच शिविर" },
    { type: "photo", src: g4, title: lang === "en" ? "ENVIRONMENT PLANTATION" : "पर्यावरण वृक्षारोपण" },
    { type: "photo", src: g5, title: lang === "en" ? "SHIKSHA NA RUKE CAMPAIGN" : "शिक्षा न रुके अभियान" },
    { type: "photo", src: g6, title: lang === "en" ? "VOCATIONAL TRAINING" : "व्यावसायिक प्रशिक्षण कार्यक्रम" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive scroll bounds
  const [maxIndex, setMaxIndex] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMaxIndex(2);
      } else if (window.innerWidth >= 640) {
        setMaxIndex(4);
      } else {
        setMaxIndex(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Title with red/orange dashes and navigation arrows */}
        <div className="flex items-center justify-between mb-10 relative">
          
          {/* Centered Gallery Header in full width parent */}
          <div className="flex-1 flex items-center justify-center gap-3">
            <span className="w-8 h-1 bg-brand-orange rounded-full"></span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-wider uppercase">
              {lang === "en" ? "Gallery" : "गैलरी"}
            </h2>
            <span className="w-8 h-1 bg-brand-orange rounded-full"></span>
          </div>

          {/* Navigation controls */}
          <div className="absolute right-0 flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                currentIndex === 0 
                  ? "border-slate-200 text-slate-300 cursor-not-allowed" 
                  : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              }`}
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                currentIndex >= maxIndex 
                  ? "border-slate-200 text-slate-300 cursor-not-allowed" 
                  : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              }`}
              aria-label="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-4 w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / (maxIndex === 2 ? 4 : maxIndex === 4 ? 2 : 1))}%` }}
          >
            {items.map((item, idx) => (
              <div 
                key={idx} 
                className="w-[calc(100%-16px)] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(25%-12px)] rounded-2xl overflow-hidden shadow-md border border-slate-100 group relative aspect-[4/3] bg-slate-900 cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Video Play Button Overlay */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white/40 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center pl-1 shadow-md">
                        <svg className="w-5 h-5 text-slate-900 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Title Overlay with gradient shadow */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                  <h4 className="text-white font-extrabold text-xs tracking-wider uppercase group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All link below the carousel */}
        <div className="text-center mt-8">
          <a 
            href="/news-and-events" 
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-green hover:text-brand-green-dark hover:underline transition-colors uppercase tracking-wider"
          >
            {lang === "en" ? "View All Media" : "सभी मीडिया देखें"} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

// ─── Video Hero Section Component ──────────────────────────────────────────

function VideoHeroSection({ lang }: LanguageProp) {
  const isHi = lang === "hi";

  return (
    <section className="relative w-full h-[calc(100vh-130px)] min-h-[500px] overflow-hidden flex items-center justify-center select-none bg-slate-950">
      {/* Loop Background YouTube Video Embed */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/0CbFrom3Qkk?autoplay=1&mute=1&loop=1&playlist=0CbFrom3Qkk&controls=0&showinfo=0&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&modestbranding=1"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-90"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Background video"
          frameBorder="0"
        />
      </div>

      {/* Dark Gradient Overlay - Subtler since there is no text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Scroll indicator */}
      <a 
        href="#welcome-hero"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-bounce group cursor-pointer"
        aria-label="Scroll to welcome section"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold group-hover:text-white transition-colors">{isHi ? "नीचे स्क्रॉल करें" : "Scroll Down"}</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5 group-hover:border-white transition-colors">
          <div className="w-1.5 h-2.5 bg-brand-orange rounded-full" />
        </div>
      </a>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const handleOpenModal = (type: RoleType) => {
    setActiveModal(type);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <Header lang={lang} />
      <VideoHeroSection lang={lang} />
      <HeroSection />
      <UrgentPatientsSection lang={lang} />
      <EventsAndNoticesSection lang={lang} />
      <WhatWeDo lang={lang} />
      <ImpactStats />
      <FeaturedCauses lang={lang} />
      <CampaignsSection />
      <ProgramsAndThematic lang={lang} />
      <ExploreIWF lang={lang} />
      <GallerySection lang={lang} />
      <GetInvolved lang={lang} onOpenModal={handleOpenModal} />
      <Footer onOpenModal={handleOpenModal} />

      {/* Unified Role Forms Modal */}
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
