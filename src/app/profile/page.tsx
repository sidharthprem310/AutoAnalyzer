"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Car, Phone } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("vehicleData");
    if (!stored) {
      router.push("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="container" style={{ padding: "4rem 1.5rem", maxWidth: "600px" }}>
      <div className="glass-card animate-fade-in" style={{ padding: "3rem" }}>
        <h1 style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem" }}>Your Profile</h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "1rem", borderRadius: "50%", color: "var(--accent-primary)" }}>
              <User size={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>Owner Name</p>
              <p style={{ margin: 0, fontSize: "1.125rem", fontWeight: "500" }}>{user.ownerName}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "1rem", borderRadius: "50%", color: "var(--accent-success)" }}>
              <Car size={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>Vehicle details</p>
              <p style={{ margin: 0, fontSize: "1.125rem", fontWeight: "500" }}>
                {user.vehicleBrand} {user.vehicleModel} <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>({user.rcNumber})</span>
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ background: "rgba(139, 92, 246, 0.1)", padding: "1rem", borderRadius: "50%", color: "var(--accent-secondary)" }}>
              <Phone size={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>Registered Phone</p>
              <p style={{ margin: 0, fontSize: "1.125rem", fontWeight: "500" }}>+91 {user.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
