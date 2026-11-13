import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { gigs } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/opportunities")({ component: OppPage });

function OppPage() {
  const [district, setDistrict] = useState("");
  const [skill, setSkill] = useState("All");
  const [payType, setPayType] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const skills = ["All", ...Array.from(new Set(gigs.map((g) => g.skill)))];

  const filtered = useMemo(
    () =>
      gigs.filter(
        (g) =>
          (skill === "All" || g.skill === skill) &&
          (payType === "All" || g.payType === payType) &&
          (district === "" || g.district.toLowerCase().includes(district.toLowerCase())),
      ),
    [district, skill, payType],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Opportunity Board</h1>
          <p className="text-muted-foreground mt-1">Local gigs, apprenticeships, and jobs near you.</p>
        </div>
        <Button onClick={() => setShowForm((s) => !s)} className="bg-teal text-teal-foreground hover:bg-teal/90">
          <Plus className="h-4 w-4 mr-1" /> Post an Opportunity
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Opportunity posted (demo)!"); setShowForm(false); }}
          className="mt-5 rounded-xl border border-border bg-card p-5 grid md:grid-cols-2 gap-3"
        >
          <input required placeholder="Job title" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input required placeholder="Employer / NGO" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input required placeholder="District" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <input required placeholder="Pay e.g. ₹500/day" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <Button type="submit" className="md:col-span-2 bg-saffron text-saffron-foreground hover:bg-saffron/90">Post</Button>
        </form>
      )}

      <div className="mt-6 grid md:grid-cols-3 gap-3 rounded-xl border border-border bg-card p-4">
        <input placeholder="District (e.g. Khammam)" value={district} onChange={(e) => setDistrict(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <select value={skill} onChange={(e) => setSkill(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          {skills.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={payType} onChange={(e) => setPayType(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
          {["All", "Daily", "Monthly", "Project"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((g) => (
          <div key={g.id} className="rounded-xl border border-border bg-card p-5 flex flex-wrap items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal/10 text-teal">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-bold">{g.title}</h3>
              <div className="text-sm text-muted-foreground">{g.employer}</div>
              <div className="text-sm flex items-center gap-1 mt-1"><MapPin className="h-3.5 w-3.5" /> {g.district} · {g.skill}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-saffron">{g.pay}</div>
              <div className="text-xs text-muted-foreground">{g.payType}</div>
            </div>
            <Button onClick={() => toast.success("Application sent!")} className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
              Apply
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
