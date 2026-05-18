"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Car, Sun, Moon, User, LayoutDashboard, LogOut } from "lucide-react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    const stored = sessionStorage.getItem("vehicleData");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("vehicleData");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <nav className="container" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)" }}>
      {/* Logo Area */}
      <Link href="/" className="flex-center" style={{ gap: "0.75rem", textDecoration: "none" }}>
        <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "0.25rem", borderRadius: "var(--radius-md)" }}>
          <img src="/logo.png" alt="AutoAnalyzer Logo" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
        </div>
        <span className="text-gradient" style={{ fontSize: "1.25rem", fontWeight: "700" }}>AutoAnalyzer</span>
      </Link>

      {/* Action Area */}
      <div className="flex-center" style={{ gap: "1rem" }}>
        {/* Theme Toggle */}
        {mounted && (
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="btn btn-secondary"
            style={{ padding: "0.5rem", borderRadius: "50%" }}
            title="Toggle Light/Dark Mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}

        {/* Auth Area */}
        {mounted && (
          user ? (
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-outline"
                style={{ borderRadius: "var(--radius-full)", padding: "0.5rem 1rem", gap: "0.5rem" }}
              >
                <div style={{ background: "var(--accent-primary)", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold" }}>
                  {user.ownerName.charAt(0)}
                </div>
                {user.ownerName.split(" ")[0]}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="glass-panel animate-fade-in" style={{ position: "absolute", top: "120%", right: "0", minWidth: "200px", display: "flex", flexDirection: "column", padding: "0.5rem", zIndex: 50 }}>
                  <Link href="/dashboard" onClick={() => setDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", color: "var(--text-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }} className="hover-bg">
                    <LayoutDashboard size={16} /> View Dashboard
                  </Link>
                  <Link href="/profile" onClick={() => setDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", color: "var(--text-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }} className="hover-bg">
                    <User size={16} /> Profile
                  </Link>
                  <div style={{ height: "1px", background: "var(--border-subtle)", margin: "0.25rem 0" }}></div>
                  <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", color: "var(--accent-danger)", borderRadius: "var(--radius-md)", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", fontSize: "1rem" }} className="hover-bg">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary">Login / Register</Link>
          )
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-bg:hover { background: rgba(0,0,0,0.05); }
        [data-theme='dark'] .hover-bg:hover { background: rgba(255,255,255,0.05); }
      `}} />
    </nav>
  );
}
