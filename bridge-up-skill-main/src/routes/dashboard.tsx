import { createFileRoute, Link } from "@tanstack/react-router";
import { courses, demoLearner, mentors } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Flame, Download, Lock, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { user } = useAuth();
  const learner = user ? { ...demoLearner, name: user.name } : demoLearner;
  const inProgress = courses.filter((c) => learner.inProgress.includes(c.id));
  const completed = courses.filter((c) => learner.completed.includes(c.id));
  const lessonOfDay = courses[0];

  const downloadCert = (courseId: string, courseTitle: string) => {
    if (!learner.completed.includes(courseId)) {
      toast.error("Complete the course to unlock the certificate.");
      return;
    }
    const html = `<!doctype html><html><head><title>BridgeUp Certificate</title>
    <style>body{font-family:Georgia,serif;margin:0;padding:60px;background:#FAF9F6;color:#0D7377}
    .cert{border:8px double #0D7377;padding:60px;text-align:center;background:white}
    h1{font-size:48px;color:#F4A300;margin:0}p{font-size:20px}.name{font-size:36px;color:#0D7377;margin:20px 0}</style>
    </head><body><div class="cert"><h1>BridgeUp</h1><p>Certificate of Completion</p>
    <div class="name">${learner.name}</div><p>has successfully completed</p>
    <h2>${courseTitle}</h2><p>Issued: ${new Date().toLocaleDateString()}</p></div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `BridgeUp-${courseTitle.replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Certificate downloaded!");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">नमस्ते, {learner.name} 👋</h1>
          <p className="text-muted-foreground">{learner.village}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-saffron/20 px-4 py-2">
          <Flame className="h-5 w-5 text-saffron" />
          <span className="font-bold">{learner.streak}-day streak</span>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-5">
        {/* In progress */}
        <div className="lg:col-span-2 space-y-5">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><BookOpen className="h-5 w-5 text-teal" /> Continue learning</h2>
            <div className="space-y-4">
              {inProgress.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="text-3xl">{c.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{c.title}</div>
                    <Progress value={learner.progress[c.id as keyof typeof learner.progress]} className="mt-1 h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{learner.progress[c.id as keyof typeof learner.progress]}% complete</div>
                  </div>
                  <Button size="sm" className="bg-teal text-teal-foreground hover:bg-teal/90" onClick={() => window.open(c.url, "_blank", "noopener,noreferrer")}>Resume</Button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-bold text-lg mb-4">Completed & Certificates</h2>
            <div className="space-y-3">
              {completed.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-3xl">{c.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-xs text-teal">✓ Completed</div>
                  </div>
                  {c.certification ? (
                    <Button size="sm" onClick={() => downloadCert(c.id, c.title)} className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
                      <Download className="h-4 w-4 mr-1" /> Certificate
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">No cert</span>
                  )}
                </div>
              ))}
              {/* Locked example */}
              {inProgress.filter((c) => c.certification).map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 text-sm text-muted-foreground">
                    Certificate for <b>{c.title}</b> unlocks at 100%.
                  </div>
                  <Button size="sm" variant="outline" disabled>Locked</Button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-gradient-to-br from-saffron/20 to-teal/10 p-5">
            <div className="text-xs uppercase font-bold tracking-wide text-teal">5-min lesson of the day</div>
            <div className="text-2xl mt-2">{lessonOfDay.icon}</div>
            <h3 className="font-bold mt-1">{lessonOfDay.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">Quick micro-lesson — no data needed.</p>
            <Button className="mt-4 w-full bg-teal text-teal-foreground hover:bg-teal/90">Start now</Button>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-bold flex items-center gap-2"><Award className="h-5 w-5 text-saffron" /> Badges</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {learner.badges.map((b) => (
                <span key={b} className="rounded-full bg-saffron/20 text-foreground px-3 py-1 text-xs font-semibold">🏅 {b}</span>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-bold">Suggested mentor</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="text-4xl">{mentors[0].avatar}</div>
              <div>
                <div className="font-semibold">{mentors[0].name}</div>
                <div className="text-xs text-muted-foreground">{mentors[0].skill} · {mentors[0].location}</div>
              </div>
            </div>
            <Link to="/mentors"><Button variant="outline" className="w-full mt-3">View all mentors</Button></Link>
          </section>
        </div>
      </div>
    </div>
  );
}
