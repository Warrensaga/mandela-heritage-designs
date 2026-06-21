import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="font-display text-2xl font-black">MANDELA <span className="text-accent">HERITAGE</span></div>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Quality furniture and furnishing solutions for Nairobi homes and offices. Eastern Bypass, Nairobi.
            </p>
            <div className="mt-5 flex gap-3 text-cream/70">
              <a href="#" aria-label="Facebook" className="hover:text-accent">FB</a>
              <a href="#" aria-label="Instagram" className="hover:text-accent">IG</a>
              <a href="#" aria-label="TikTok" className="hover:text-accent">TT</a>
              <a href="#" aria-label="YouTube" className="hover:text-accent">YT</a>
            </div>
          </div>
          <FooterCol title="Shop" links={[
            ["Sofas", "/shop"], ["Bedroom", "/shop"], ["Dining", "/shop"], ["Office", "/shop"], ["Accent", "/shop"], ["Packages", "/shop"], ["New Arrivals", "/shop"], ["Sale Items", "/shop"],
          ]} />
          <FooterCol title="Company" links={[
            ["About Us", "/about"], ["Our Story", "/about"], ["Projects", "/projects"], ["Contact Us", "/contact"], ["FAQ", "/faq"],
          ]} />
          <FooterCol title="Support" links={[
            ["FAQ", "/faq"], ["Delivery Info", "/delivery"], ["Returns Policy", "/faq"], ["WhatsApp Us", "/contact"], ["Privacy Policy", "/faq"],
          ]} />
        </div>
        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/60">
          <p>© 2025 Mandela Heritage Furnitures · Eastern Bypass, Nairobi · All rights reserved</p>
          <p className="mt-1">M-Pesa Accepted · Free Delivery Over KES 30,000 · Free Installation Included</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">{title}</h4>
      <ul className="space-y-2 text-sm text-cream/80">
        {links.map(([label, to]) => (
          <li key={label}><Link to={to} className="hover:text-accent">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}