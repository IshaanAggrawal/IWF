import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";

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
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────
const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-script";
const GOOGLE_TRANSLATE_ELEMENT_ID = "google_translate_element";
const SUPPRESSION_STYLE_ID = "goog-translate-suppress";

/** CSS that hides all Google Translate UI chrome while keeping the translation active */
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

  /* Hide the widget container itself */
  #${GOOGLE_TRANSLATE_ELEMENT_ID} { display: none !important; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function injectSuppressionStyle() {
  if (document.getElementById(SUPPRESSION_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = SUPPRESSION_STYLE_ID;
  style.textContent = SUPPRESSION_CSS;
  document.head.appendChild(style);
}

function injectTranslateContainer() {
  if (document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) return;
  const div = document.createElement("div");
  div.id = GOOGLE_TRANSLATE_ELEMENT_ID;
  div.style.display = "none";
  document.body.appendChild(div);
}

function loadGoogleTranslateScript(onReady: () => void) {
  // Already initialised
  if (window._iwfTranslateReady) { onReady(); return; }
  // Script already injected but not yet ready
  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) return;

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en", includedLanguages: "hi", autoDisplay: false },
      GOOGLE_TRANSLATE_ELEMENT_ID
    );
    window._iwfTranslateReady = true;
    onReady();
  };

  const script = document.createElement("script");
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

/** Poll until the internal Google Translate <select> appears, then call cb. */
function waitForCombo(cb: (select: HTMLSelectElement) => void, attempts = 0) {
  if (attempts > 60) return; // give up after ~3 s
  const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (sel) { cb(sel); return; }
  setTimeout(() => waitForCombo(cb, attempts + 1), 50);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TranslateButton({ className = "" }: { className?: string }) {
  const [isHindi, setIsHindi] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    injectSuppressionStyle();
    injectTranslateContainer();

    const handleReady = () => {
      // Wait a tick for the select element to be injected into the DOM
      waitForCombo(() => setIsReady(true));
    };

    loadGoogleTranslateScript(handleReady);

    // If the script was already loaded by another instance
    if (window._iwfTranslateReady) {
      waitForCombo(() => setIsReady(true));
    }
  }, []);

  const handleToggle = () => {
    if (isLoading) return;

    if (isHindi) {
      // ── Revert to English ─────────────────────────────────────────────────
      // Google Translate Widget does NOT reliably restore via select.value = 'en'.
      // The only guaranteed method is clearing the googtrans cookie then reloading.
      setIsLoading(true);
      const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
      const hostname = window.location.hostname;
      document.cookie = `googtrans=; ${past}; path=/`;
      document.cookie = `googtrans=; ${past}; path=/; domain=${hostname}`;
      document.cookie = `googtrans=; ${past}; path=/; domain=.${hostname}`;
      window.location.reload();
    } else {
      // ── Translate to Hindi ─────────────────────────────────────────────────
      if (!isReady) return;
      setIsLoading(true);
      waitForCombo((select) => {
        select.value = "hi";
        select.dispatchEvent(new Event("change", { bubbles: true }));
        select.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => {
          setIsHindi(true);
          setIsLoading(false);
        }, 400);
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isHindi ? "Switch to English" : "Switch to Hindi / हिंदी में देखें"}
      aria-label={isHindi ? "Switch to English" : "Switch to Hindi"}
      className={`
        flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/30
        bg-white/10 hover:bg-white/25 text-white text-[10px] font-bold
        transition-all duration-200 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-wait
        ${className}
      `}
    >
      <Languages className="w-3 h-3 shrink-0" />
      {isLoading ? (
        <span className="animate-pulse">…</span>
      ) : isHindi ? (
        <span>EN</span>
      ) : (
        <span>हिंदी</span>
      )}
    </button>
  );
}
