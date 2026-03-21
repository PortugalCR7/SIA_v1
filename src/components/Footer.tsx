"use client";

import NavMonogram from "@/components/NavMonogram";

interface SocialLink {
  platform: "instagram" | "linkedin" | "twitter" | "youtube";
  url: string;
}

interface FooterProps {
  siteTitle: string;
  brandTagline: string;
  contactEmail: string;
  establishedLine: string;
  copyrightText: string;
  socialLinks?: SocialLink[];
}

const socialIcons: Record<string, JSX.Element> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3"/>
      <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

export default function Footer({
  siteTitle,
  brandTagline,
  contactEmail,
  establishedLine,
  copyrightText,
  socialLinks = [],
}: FooterProps) {
  return (
    <>
      {/* Decorative seal — visual closure before footer */}
      <div className="bg-ink flex justify-center py-10">
        <NavMonogram className="w-8 h-10 text-parchment" style={{ opacity: 0.15 }} aria-hidden="true" />
      </div>

      <footer className="bg-ink text-parchment pt-16 pb-12 px-6 md:px-14 border-t border-parchment/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-24">
            <div>
              <p className="font-heading text-2xl mb-8 font-bold">{siteTitle}</p>
              <p className="text-parchment/40 font-medium">{brandTagline}</p>
            </div>
            <div>
              <p className="overline text-white/20 font-bold mb-8">Contact</p>
              <a href={`mailto:${contactEmail}`} className="text-parchment/60 hover:text-parchment font-bold border-b border-transparent hover:border-parchment/30 transition-colors">{contactEmail}</a>
            </div>
            <div className="flex flex-col justify-between gap-10">
              <p className="text-parchment/20 uppercase tracking-[0.3em] font-bold">{establishedLine}</p>
              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-6">
                  {socialLinks.map(({ platform, url }) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      className="text-parchment/30 hover:text-parchment transition-colors duration-300"
                    >
                      {socialIcons[platform]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-12 text-center md:text-left">
            <p className="text-parchment/30 uppercase tracking-widest font-bold">{copyrightText}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
