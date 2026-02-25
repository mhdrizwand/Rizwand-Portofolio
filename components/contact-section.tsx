"use client";

import { useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  Instagram,
  Linkedin,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Pesan terkirim! Terima kasih telah menghubungi saya.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="kontak" className="grid-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:pl-16">
        {/* Section Title */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-rehgal text-3xl text-foreground sm:text-4xl">
            Hubungi <span className="text-primary">Saya</span>
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="leading-relaxed text-muted-foreground">
              Saya siap untuk mendiskusikan hal apapun, hubungi saya untuk
              membangun silaturahmi
            </p>

            <div className="space-y-4">
              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    rizwandmuhmmad@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+62"
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Whatsapp
                  </p>
                  <p className="text-sm text-muted-foreground">
                    +62 852 1413 9915
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Lokasi</p>
                  <p className="text-sm text-muted-foreground">
                    Aceh, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                {
                  icon: Instagram,
                  href: "https://instagram.com/mhdrizwand_",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/m-rizwan-b28a26319/",
                  label: "LinkedIn",
                },
                { icon: MessageCircle, href: "#", label: "Whatsapp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Nama
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Nama lengkap Anda"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="email@contoh.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Pesan
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Tuliskan pesan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Send size={16} />
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
