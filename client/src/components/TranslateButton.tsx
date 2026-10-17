import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Languages, ChevronDown, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          containerId: string
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
    _iwfTranslateReady: boolean;
    _iwfFormObserverInstalled?: boolean;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────
const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";
const SUPPRESSION_STYLE_ID = "goog-translate-suppress";

const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
];

export const FOUNDATION_ADDRESSES: Record<string, string> = {
  en: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi-110025, India",
  ur: "بی-144، ابوالفضل انکلیو-II، اوکھلا، نئی دہلی، پن کوڈ: \u200E110025\u200E، ہندوستان",
  ar: "بي-144، مجمع أبو الفضل الثاني، أوكلا، نيو دلهي، الرمز البريدي: \u200E110025\u200E، الهند",
  hi: "बी-144, अबुल फज़ल एन्क्लेव-II, ओखला, नई दिल्ली-110025, भारत",
  bn: "বি-১৪৪, আবুল ফজল এনক্লেভ-২, ওখলা, নতুন দিল্লি-১১০0২৫, ভারত",
};

export function getLocalizedAddress(langCode?: string): string {
  const code = langCode || (typeof document !== "undefined" ? getCookieLang() : "en");
  return FOUNDATION_ADDRESSES[code] || FOUNDATION_ADDRESSES.en;
}

export function useCurrentLanguage(): string {
  const [lang, setLang] = useState<string>(() => {
    if (typeof document === "undefined") return "en";
    return getCookieLang();
  });

  useEffect(() => {
    initGoogleTranslate();
    const onLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      } else {
        setLang(getCookieLang());
      }
    };

    window.addEventListener("islahLanguageChange", onLangChange);

    // Observer for googtrans cookie or html lang changes
    const interval = setInterval(() => {
      const current = getCookieLang();
      setLang((prev) => (prev !== current ? current : prev));
    }, 400);

    return () => {
      window.removeEventListener("islahLanguageChange", onLangChange);
      clearInterval(interval);
    };
  }, []);

  return lang;
}

const SUPPRESSION_CSS = `
  /* Hide Google's top banner frame */
  .goog-te-banner-frame.skiptranslate,
  .goog-te-banner-frame { display: none !important; }

  /* Reset body top offset that Google forces */
  body { top: 0 !important; position: static !important; }
  body.translated-ltr { top: 0 !important; }
  body.translated-rtl { top: 0 !important; }

  /* Hide the floating tooltip / balloon */
  #goog-gt-tt,
  .goog-te-balloon-frame { display: none !important; }

  /* Hide the skip translate iframe */
  iframe.skiptranslate { display: none !important; }

  /* Hide the widget container safely without display:none so layout metrics work */
  #${GOOGLE_TRANSLATE_ELEMENT_ID} {
    position: absolute !important;
    left: -9999px !important;
    top: -9999px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  /* Ensure form controls and notranslate elements stay LTR without making text editable */
  .notranslate, [translate="no"] {
    direction: ltr !important;
  }

  input, textarea, select {
    direction: ltr !important;
  }

  /* Prevent any unintentional content editing on text, labels, forms, or links throughout the site */
  *, *:before, *:after {
    -webkit-user-modify: read-only !important;
  }

  input, textarea {
    -webkit-user-modify: read-write !important;
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initFormProtection() {
  if (typeof document === "undefined") return;
  const protect = () => {
    document.querySelectorAll("form, input, textarea, select, .form-container").forEach((el) => {
      el.setAttribute("translate", "no");
      el.classList.add("notranslate");
    });
  };
  protect();
  if (!window._iwfFormObserverInstalled) {
    const observer = new MutationObserver(protect);
    observer.observe(document.body, { childList: true, subtree: true });
    window._iwfFormObserverInstalled = true;
  }
}

function injectSuppressionStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SUPPRESSION_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = SUPPRESSION_STYLE_ID;
  style.textContent = SUPPRESSION_CSS;
  document.head.appendChild(style);
  initFormProtection();
}

function injectTranslateContainer() {
  if (typeof document === "undefined") return;
  if (document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) return;
  const div = document.createElement("div");
  div.id = GOOGLE_TRANSLATE_ELEMENT_ID;
  div.style.position = "absolute";
  div.style.left = "-9999px";
  div.style.top = "-9999px";
  div.style.width = "1px";
  div.style.height = "1px";
  div.style.overflow = "hidden";
  div.style.opacity = "0";
  div.style.pointerEvents = "none";
  document.body.appendChild(div);
}

const readyCallbacks: Array<() => void> = [];

function loadGoogleTranslateScript(onReady: () => void) {
  if (typeof document === "undefined") return;

  if (window._iwfTranslateReady && window.google?.translate?.TranslateElement) {
    onReady();
    return;
  }

  readyCallbacks.push(onReady);

  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
    return;
  }

  window.googleTranslateElementInit = () => {
    try {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,ur,ar,bn,ta,te,kn,ml,mr,pa,gu,or",
            autoDisplay: false,
          },
          GOOGLE_TRANSLATE_ELEMENT_ID
        );
        window._iwfTranslateReady = true;
        while (readyCallbacks.length > 0) {
          const cb = readyCallbacks.shift();
          cb?.();
        }
      }
    } catch (err) {
      console.error("Google Translate init error:", err);
    }
  };

  const script = document.createElement("script");
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

function waitForCombo(cb: (select: HTMLSelectElement) => void, attempts = 0) {
  if (attempts > 120) return;
  const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (sel && sel.options && sel.options.length > 1) {
    cb(sel);
    return;
  }
  setTimeout(() => waitForCombo(cb, attempts + 1), 50);
}

let translateInitPromise: Promise<void> | null = null;

export function initGoogleTranslate(): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve();
  }

  if (window._iwfTranslateReady && document.querySelector(".goog-te-combo")) {
    return Promise.resolve();
  }

  if (translateInitPromise) {
    return translateInitPromise;
  }

  translateInitPromise = new Promise((resolve) => {
    injectSuppressionStyle();
    injectTranslateContainer();

    loadGoogleTranslateScript(() => {
      waitForCombo((_select) => {
        window._iwfTranslateReady = true;
        resolve();
      });
    });
  });

  return translateInitPromise;
}

export function getCookieLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
  return match ? match[1] : "en";
}

// Helper to switch language
export function setGoogleLanguage(langCode: string, callback?: () => void) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const hostname = window.location.hostname;
  window.dispatchEvent(new CustomEvent("islahLanguageChange", { detail: langCode }));

  if (langCode === "en") {
    const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = `googtrans=; ${past}; path=/`;
    document.cookie = `googtrans=; ${past}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=; ${past}; path=/; domain=.${hostname}`;
    document.cookie = `googtrans=/en/en; path=/`;

    const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (sel) {
      sel.value = "";
      if (typeof (sel as any).onchange === "function") {
        (sel as any).onchange();
      }
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    }

    callback?.();
    setTimeout(() => {
      try {
        window.location.reload();
      } catch (_) {}
    }, 150);
    return;
  }

  // Set the googtrans cookie
  document.cookie = `googtrans=/en/${langCode}; path=/`;
  if (hostname && hostname !== "localhost") {
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${hostname}`;
  }

  initGoogleTranslate().then(() => {
    waitForCombo((select) => {
      select.value = langCode;
      if (typeof (select as any).onchange === "function") {
        (select as any).onchange();
      }
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.dispatchEvent(new Event("input", { bubbles: true }));

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("islahLanguageChange", { detail: langCode }));
        callback?.();
      }, 300);

      // Verify translation took place; if not, reload page with cookie
      setTimeout(() => {
        const isTranslated =
          document.body.classList.contains("translated-ltr") ||
          document.body.classList.contains("translated-rtl") ||
          document.documentElement.classList.contains("translated-ltr") ||
          document.documentElement.classList.contains("translated-rtl");
        if (!isTranslated) {
          try {
            window.location.reload();
          } catch (_) {}
        }
      }, 1000);
    });
  });
}

// ─── Crisp Google Translate 文A Icon ─────────────────────────────────────────
export function TranslateIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
    </svg>
  );
}

// ─── Floating Translate Widget (Bottom Left / Top Right) ───────────────────────
export function FloatingTranslateButton() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectSuppressionStyle();
    injectTranslateContainer();
    loadGoogleTranslateScript(() => {
      waitForCombo(() => {
        setIsReady(true);
        setCurrentLang(getCookieLang());
      });
    });

    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectLanguage = (code: string) => {
    setIsOpen(false);
    if (code === currentLang) return;
    setGoogleLanguage(code, () => {
      setCurrentLang(code);
    });
  };

  return (
    <div ref={dropdownRef} className="notranslate fixed top-20 right-3 z-[60] flex flex-col items-end gap-2" translate="no">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notranslate w-10 h-10 rounded-xl flex items-center justify-center bg-[#1a365d] hover:bg-[#254f8a] text-white shadow-2xl border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group relative"
        title="Change Website Language / भाषा बदलें"
        translate="no"
      >
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f97316]"></span>
        </span>
        <TranslateIcon className="w-5 h-5 shrink-0 text-white" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="notranslate bg-[#0b1f3b]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-2 w-52 flex flex-col gap-1 text-white animate-in slide-in-from-top-2 fade-in duration-200 max-h-80 overflow-y-auto" translate="no">
          <div className="px-2.5 py-1.5 text-[10px] font-black tracking-wider text-white/50 uppercase border-b border-white/5 mb-1 notranslate" translate="no">
            Select Language
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`notranslate flex items-center justify-between w-full px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left cursor-pointer ${
                currentLang === lang.code
                  ? "bg-brand-orange text-white"
                  : "hover:bg-white/10 text-white/90"
              }`}
              translate="no"
            >
              <span className="notranslate" translate="no">{lang.nativeName} ({lang.name})</span>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Inline Translate Button (Header Pill & Dropdown Matching Screenshot) ─────
export function TranslateButton({ className = "" }: { className?: string }) {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; right: number; maxHeight: number }>({
    top: 0,
    right: 0,
    maxHeight: 320,
  });

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top = rect.bottom + 6;
    let maxHeight = Math.min(340, spaceBelow - 16);

    // If bottom space is constrained (< 180px) and top space has more room, flip above
    if (spaceBelow < 180 && spaceAbove > spaceBelow) {
      const calculatedHeight = Math.min(340, spaceAbove - 16);
      top = Math.max(10, rect.top - calculatedHeight - 6);
      maxHeight = calculatedHeight;
    }

    setMenuCoords({
      top,
      right: Math.max(8, window.innerWidth - rect.right),
      maxHeight: Math.max(140, maxHeight),
    });
  }, []);

  useEffect(() => {
    initGoogleTranslate().then(() => {
      setCurrentLang(getCookieLang());
    });
    setCurrentLang(getCookieLang());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      updatePosition();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  const selectLanguage = (code: string) => {
    setIsOpen(false);
    setCurrentLang(code);
    setGoogleLanguage(code, () => {
      setCurrentLang(code);
    });
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="notranslate relative inline-block text-left" translate="no">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (!isOpen) updatePosition();
          setIsOpen((prev) => !prev);
        }}
        className={`
          notranslate inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300
          bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs
          transition-all duration-200 cursor-pointer select-none
          ${className}
        `}
        translate="no"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <TranslateIcon className="w-4 h-4 text-slate-800 shrink-0" />
        <span className="notranslate" translate="no">{activeLangObj.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownMenuRef}
            style={{
              position: "fixed",
              top: `${menuCoords.top}px`,
              right: `${menuCoords.right}px`,
              maxHeight: `${menuCoords.maxHeight}px`,
              zIndex: 99999,
            }}
            className="notranslate bg-white border border-slate-200/90 rounded-xl shadow-2xl p-1.5 w-52 flex flex-col gap-0.5 text-slate-800 animate-in fade-in zoom-in-95 duration-150 overflow-y-auto ring-1 ring-black/5"
            translate="no"
          >
            <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100 mb-0.5 notranslate select-none sticky top-0 bg-white z-10" translate="no">
              Select Language
            </div>
            {LANGUAGES.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => selectLanguage(lang.code)}
                  className={`notranslate flex items-center justify-between w-full px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-orange-50 text-brand-orange font-bold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                  translate="no"
                >
                  <span className="notranslate flex items-center gap-1.5" translate="no">
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />}
                    <span className={isSelected ? "font-bold" : ""}>
                      {lang.nativeName} {lang.nativeName !== lang.name && `(${lang.name})`}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>,
          document.body
        )
      }
    </div>
  );
}
