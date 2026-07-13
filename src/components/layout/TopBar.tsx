import { Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-brand-green text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-5">
          <a href="tel:+919811861633" className="flex items-center gap-1.5 hover:opacity-80"><Phone className="w-3.5 h-3.5" /> +91-9811861633</a>
          <a href="mailto:info@iwfindia.org" className="flex items-center gap-1.5 hover:opacity-80"><Mail className="w-3.5 h-3.5" /> info@iwfindia.org</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2">Follow Us:</span>
          {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center"><Icon className="w-3 h-3" /></a>
          ))}
        </div>
      </div>
    </div>
  );
}
