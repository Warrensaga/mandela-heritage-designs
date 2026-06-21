import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Installation — Mandela Heritage Nairobi" },
      { name: "description", content: "Free Nairobi-wide delivery on orders over KES 30,000. Free installation included. Same day delivery available on select items. WhatsApp to order." },
      { property: "og:title", content: "Delivery & Installation — Mandela Heritage" },
      { property: "og:description", content: "Free delivery, free installation, Nairobi-wide." },
    ],
  }),
  component: Delivery,
});

const areas = "Westlands, Karen, Kilimani, Lavington, Runda, Muthaiga, Gigiri, Parklands, Upperhill, Hurlingham, South B, South C, Embakasi, Utawala, Ruai, Donholm, Fedha, Tassia, Imara Daima, Kasarani, Roysambu, Kahawa, Zimmerman, Buruburu, Umoja, Kayole, Pipeline, Githurai, Thika Road, Eastern Bypass and surrounding areas".split(", ");

function Delivery() {
  return (
    <Layout>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">How We Deliver</p>
          <h1 className="mt-3 font-display text-5xl font-bold">Delivery & <span className="italic text-accent">Installation</span></h1>
          <p className="mt-4 text-muted-foreground">Free delivery, free installation, every Nairobi neighbourhood.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-12 font-display text-3xl font-bold">How it <span className="italic text-accent">works</span></h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            ["1", "📞 Order on WhatsApp", "WhatsApp us. Reply in 1 hour."],
            ["2", "✅ Confirm Availability", "We confirm stock and delivery date."],
            ["3", "🚚 Deliver to Your Door", "Our team delivers to any Nairobi address."],
            ["4", "🔧 Install Everything", "Free assembly and install included."],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-3xl font-black text-accent">Step {n}</div>
              <h3 className="mt-3 font-display text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-6 font-display text-3xl font-bold">We deliver across <span className="italic text-accent">all Nairobi</span></h2>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <span key={a} className="rounded-full border border-border bg-card px-4 py-2 text-sm">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-8 font-display text-3xl font-bold">Delivery <span className="italic text-accent">info</span></h2>
        <ul className="space-y-4 text-sm">
          {[
            "✅ Free delivery on orders above KES 30,000",
            "🚚 Small orders from KES 500 depending on location",
            "🔧 Installation always free",
            "📅 Same day available on select items",
            "⏱️ Standard: 1–3 working days",
          ].map((l) => <li key={l} className="rounded-lg border border-border bg-card p-4">{l}</li>)}
        </ul>
      </section>
    </Layout>
  );
}