import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/mock";
import { ArrowRight, Wifi, Globe2, Users, Award } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const stats = [
    { v: "2M+", l: "Learners" },
    { v: "500+", l: "Skills" },
    { v: "12", l: "Languages" },
    { v: "85%", l: "Course Completion" },
  ];
  const featured = courses.slice(0, 6);
  const testimonials = [
    { name: "Sita, 19", place: "Warangal", quote: "I learned UPI in Telugu. Now I help my mother run her shop." },
    { name: "Mohan, 24", place: "Nashik", quote: "The drip irrigation course doubled my brinjal yield this season." },
    { name: "Fatima, 21", place: "Lucknow", quote: "I got tailoring orders within a week of finishing the course." },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-background to-saffron/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block rounded-full bg-saffron/20 text-foreground px-3 py-1 text-xs font-semibold mb-4">
              For Tier 2/3 & rural India 🇮🇳
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Skills that <span className="text-teal">bridge</span> villages to <span className="text-saffron">opportunity</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Bite-sized, offline-friendly courses in your language. Real mentors. Local jobs.
              Built for first-generation learners.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/skills">
                <Button size="lg" className="bg-saffron text-saffron-foreground hover:bg-saffron/90 gap-2">
                  Start Learning Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/mentors">
                <Button size="lg" variant="outline">Find a Mentor</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { i: <Wifi />, t: "Works on 2G", d: "Tiny lessons, downloadable" },
              { i: <Globe2 />, t: "12 Indian languages", d: "Telugu, Hindi, Tamil & more" },
              { i: <Users />, t: "Peer mentors", d: "From your district" },
              { i: <Award />, t: "Certified", d: "Recognized by NGOs" },
            ].map((c, i) => (
              <div key={i} className="rounded-xl bg-card border border-border p-5 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/10 text-teal mb-3">{c.i}</div>
                <div className="font-semibold">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-teal text-teal-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-extrabold text-saffron">{s.v}</div>
              <div className="text-sm opacity-90 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured tracks */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured skill tracks</h2>
            <p className="text-muted-foreground mt-1">Hand-picked for high local demand.</p>
          </div>
          <Link to="/skills" className="text-teal font-semibold hidden md:inline">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((c) => (
            <div key={c.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition">
              <div className="text-4xl mb-3">{c.icon}</div>
              <div className="text-xs uppercase tracking-wide text-teal font-semibold">{c.category}</div>
              <h3 className="font-bold text-lg mt-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-2 py-0.5">{c.level}</span>
                <span>{c.duration}</span>
                <span>· {c.learners.toLocaleString()} learners</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Voices from the village 🌾</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl bg-card border border-border p-6">
                <p className="italic">"{t.quote}"</p>
                <div className="mt-4 font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.place}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
