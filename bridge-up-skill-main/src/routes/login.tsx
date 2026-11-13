import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(id, pw)) {
      toast.success("Welcome to BridgeUp!");
      nav({ to: "/dashboard" });
    } else {
      toast.error("User ID required and password must be 4+ characters.");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal text-teal-foreground mb-4">
          <Sprout className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">Login with your unique BridgeUp ID.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">User ID</label>
            <input value={id} onChange={(e) => setId(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. anjali_k" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="••••" />
          </div>
          <Button type="submit" className="w-full bg-saffron text-saffron-foreground hover:bg-saffron/90">Login</Button>
          <p className="text-xs text-center text-muted-foreground">Demo: any ID & 4+ char password works.</p>
        </form>
      </div>
    </div>
  );
}
