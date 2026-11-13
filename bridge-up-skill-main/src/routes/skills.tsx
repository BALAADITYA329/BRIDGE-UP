import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { courses, type Course } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Download, Share2, Award } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/skills")({ component: SkillsPage });

const categories = ["All", "Coding", "Linux", "Cybersecurity", "IT", "AI/ML", "Data Science", "CSE", "Digital Literacy", "Agriculture Tech", "Handicrafts", "Construction", "Healthcare", "Finance Basics"];
const langs = ["All", "English", "हिंदी", "తెలుగు", "தமிழ்"];

function SkillsPage() {
  const [cat, setCat] = useState("All");
  const [lang, setLang] = useState("All");
  const [offlineOnly, setOfflineOnly] = useState(false);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (cat === "All" || c.category === cat) &&
          (lang === "All" || c.language.includes(lang)) &&
          (!offlineOnly || c.offline),
      ),
    [cat, lang, offlineOnly],
  );

  const share = (c: Course) => {
    const msg = encodeURIComponent(`Check out "${c.title}" on BridgeUp — free skill course!`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Explore Skills</h1>
      <p className="text-muted-foreground mt-1">Filter by what fits your day, language, and connection.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3 rounded-xl border border-border bg-card p-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Category</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Language</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            {langs.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={offlineOnly} onCheckedChange={setOfflineOnly} id="off" />
            <label htmlFor="off" className="text-sm font-medium">Offline available only</label>
          </div>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-card p-5 flex flex-col">
            <div className="flex items-start justify-between">
              <div className="text-4xl">{c.icon}</div>
              {c.offline && (
                <span className="text-[10px] font-semibold uppercase tracking-wide bg-saffron/20 text-foreground rounded-full px-2 py-1">
                  Offline ✓
                </span>
              )}
            </div>
            <div className="mt-3 text-xs uppercase tracking-wide text-teal font-semibold">{c.category}</div>
            <h3 className="font-bold text-lg">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2 py-0.5">{c.level}</span>
              <span>{c.duration}</span>
              <span>· {c.learners.toLocaleString()} learners</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">🗣️ {c.language.join(", ")}</div>
            {c.certification && (
              <div className="mt-2 text-xs text-teal flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Certificate on completion</div>
            )}
            <div className="mt-2 text-xs text-muted-foreground">🎓 Provider: <span className="font-semibold text-foreground">{c.provider}</span></div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-teal text-teal-foreground hover:bg-teal/90"
                onClick={() => {
                  window.open(c.url, "_blank", "noopener,noreferrer");
                  toast.success(`Opening ${c.provider}…`);
                }}
              >
                Start
              </Button>
              {c.offline && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setDownloaded((d) => ({ ...d, [c.id]: !d[c.id] }));
                    toast.success(downloaded[c.id] ? "Removed offline copy" : "Downloaded for offline!");
                  }}
                >
                  <Download className="h-4 w-4" /> {downloaded[c.id] ? "Saved" : "Save"}
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => share(c)} aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
