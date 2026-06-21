const items = [
  "🚚 Free Delivery on Orders Over KES 30,000",
  "💳 M-Pesa Accepted",
  "🔧 Free Installation",
  "📞 Reply Within 1 Hour",
  "⭐ 4.0 Google Rating",
];

export function AnnouncementBar() {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-accent py-2 text-xs font-medium text-charcoal">
      <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="tracking-wide">{t} <span className="mx-3 opacity-60">·</span></span>
        ))}
      </div>
    </div>
  );
}