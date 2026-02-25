"use client";

import { Instagram, Phone, Facebook, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/mhdrizwand_",
    label: "Instagram",
  },
  { icon: Phone, href: "https://wa.me/085214139915", label: "WhatsApp" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/m-rizwan-b28a26319/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:rizwandmuhammad@gmail.com", label: "Email" },
];

export function SocialSidebar() {
  return (
    <aside className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors duration-200 hover:text-primary"
          aria-label={social.label}
        >
          <social.icon size={18} strokeWidth={1.5} />
        </a>
      ))}

      <div className="mt-4 flex flex-col items-center gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground [writing-mode:vertical-lr]">
          RIZWAN
        </span>
        <div className="h-16 w-px bg-primary/40" />
      </div>
    </aside>
  );
}
