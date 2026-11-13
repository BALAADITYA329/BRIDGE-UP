import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/resume")({ component: ResumePage });

function ResumePage() {
  const [form, setForm] = useState({
    name: "Anjali Nair", role: "Digital Field Assistant",
    skills: "WhatsApp Business, UPI payments, basic Excel, customer service, Hindi/English/Malayalam",
    experience: "Helped run family kirana shop for 2 years; volunteered at village ASHA center for 6 months",
    education: "Class 12, Kerala State Board, 2024", location: "Palakkad, Kerala",
  });
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resume`;
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify(form),
      });
      if (r.status === 429) { toast.error("Too many requests. Try again shortly."); return; }
      if (r.status === 402) { toast.error("AI credits exhausted."); return; }
      const data = await r.json();
      if (data.resume) { setResume(data.resume); toast.success("Resume generated!"); }
      else toast.error("Could not generate. Try again.");
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };

  const download = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${form.name} — Resume</title>
<style>body{font-family:Georgia,serif;max-width:780px;margin:40px auto;padding:0 24px;color:#222;line-height:1.5}
h1{color:#0D7377;border-bottom:3px solid #F4A300;padding-bottom:8px}h2{color:#0D7377;margin-top:24px}
ul{padding-left:20px}</style></head><body>${markdownToHtml(resume)}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${form.name.replace(/\s+/g, "-")}-Resume.html`;
    a.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-saffron text-saffron-foreground"><FileText className="h-5 w-5" /></div>
        <h1 className="text-3xl md:text-4xl font-bold">AI Resume Builder</h1>
      </div>
      <p className="text-muted-foreground">Fill the basics — our AI crafts a professional resume in seconds.</p>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          {[
            ["name", "Full name"], ["role", "Target role"], ["location", "Location"],
            ["skills", "Skills (comma separated)"], ["experience", "Experience"], ["education", "Education"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="text-sm font-medium">{label}</label>
              {key === "experience" || key === "skills" ? (
                <textarea
                  value={(form as any)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              ) : (
                <input
                  value={(form as any)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}
          <Button onClick={generate} disabled={loading} className="w-full bg-saffron text-saffron-foreground hover:bg-saffron/90">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate Resume
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">Preview</h2>
            {resume && (
              <Button size="sm" variant="outline" onClick={download}>
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            )}
          </div>
          {resume ? (
            <div
              className="prose prose-sm max-w-none [&_h1]:text-teal [&_h2]:text-teal [&_h1]:border-b-2 [&_h1]:border-saffron [&_h1]:pb-2"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(resume) }}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Your AI-generated resume will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  if (!md) return "";
  const escape = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
  const lines = md.split("\n");
  let html = ""; let inList = false;
  for (let line of lines) {
    const l = line.trim();
    const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
    if (l.startsWith("# ")) { closeList(); html += `<h1>${escape(l.slice(2))}</h1>`; }
    else if (l.startsWith("## ")) { closeList(); html += `<h2>${escape(l.slice(3))}</h2>`; }
    else if (l.startsWith("### ")) { closeList(); html += `<h3>${escape(l.slice(4))}</h3>`; }
    else if (l.startsWith("- ") || l.startsWith("* ")) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${escape(l.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</li>`;
    } else if (l === "") { closeList(); }
    else { closeList(); html += `<p>${escape(l).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`; }
  }
  if (inList) html += "</ul>";
  return html;
}
