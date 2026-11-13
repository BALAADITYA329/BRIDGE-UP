import { Link } from "@tanstack/react-router";
import { useAuth, useLang } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import logo from "@/assets/bridgeup-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/skills", label: "Skills" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/mentors", label: "Mentors" },
  { to: "/opportunities", label: "Jobs" },
  { to: "/resume", label: "Resume" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { lang, setLang } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} alt="BridgeUp logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <span>BridgeUp</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Globe className="h-4 w-4" /> {lang}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("EN")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("HI")}>हिंदी</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("TE")}>తెలుగు</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <Button size="sm" variant="ghost" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-saffron text-saffron-foreground hover:bg-saffron/90">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* mobile nav */}
      <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2 text-sm">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            activeOptions={{ exact: l.to === "/" }}
            className="px-3 py-1.5 rounded-md whitespace-nowrap hover:bg-muted"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
