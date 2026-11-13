import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { mentors } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/mentors")({ component: MentorsPage });

function MentorsPage() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("All");

  const filtered = useMemo(
    () =>
      mentors.filter(
        (m) =>
          (mode === "All" || m.availability === mode) &&
          (m.name.toLowerCase().includes(q.toLowerCase()) || m.skill.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, mode],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Mentor Connect</h1>
      <p className="text-muted-foreground mt-1">Learn from someone who's walked your path.</p>

      <div className="mt-6 grid md:grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4">
        <input
          placeholder="Search by name or skill..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <div className="flex gap-2 flex-wrap">
          {["All", "Online", "In-person", "WhatsApp"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${
                mode === m ? "bg-teal text-teal-foreground border-teal" : "bg-background border-border hover:bg-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m) => (
          <div key={m.id} className="rounded-xl border border-border bg-card p-5">
            <div className="text-5xl">{m.avatar}</div>
            <h3 className="font-bold text-lg mt-2">{m.name}</h3>
            <div className="text-sm text-teal font-semibold">{m.skill}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" /> {m.location}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-saffron text-saffron" /> {m.rating}
              <span className="text-xs rounded-full bg-muted px-2 py-0.5 ml-auto">{m.availability}</span>
            </div>
            <Button
              className="w-full mt-4 bg-saffron text-saffron-foreground hover:bg-saffron/90"
              onClick={() => toast.success(`Session request sent to ${m.name}!`)}
            >
              Request a Session
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
