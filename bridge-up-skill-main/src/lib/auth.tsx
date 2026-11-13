import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { id: string; name: string };
type AuthCtx = {
  user: User | null;
  login: (id: string, password: string) => boolean;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("bridgeup_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (id: string, password: string) => {
    if (!id.trim() || password.length < 4) return false;
    const u = { id, name: id.charAt(0).toUpperCase() + id.slice(1) };
    localStorage.setItem("bridgeup_user", JSON.stringify(u));
    setUser(u);
    return true;
  };
  const logout = () => {
    localStorage.removeItem("bridgeup_user");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

// Lang context
type LangCtx = { lang: "EN" | "HI" | "TE"; setLang: (l: "EN" | "HI" | "TE") => void };
const LCtx = createContext<LangCtx>({ lang: "EN", setLang: () => {} });
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<"EN" | "HI" | "TE">("EN");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const l = (localStorage.getItem("bridgeup_lang") as "EN" | "HI" | "TE") || "EN";
    setLangState(l);
  }, []);
  const setLang = (l: "EN" | "HI" | "TE") => {
    localStorage.setItem("bridgeup_lang", l);
    setLangState(l);
  };
  return <LCtx.Provider value={{ lang, setLang }}>{children}</LCtx.Provider>;
}
export const useLang = () => useContext(LCtx);
