"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "4rem 1.5rem" }}>
      {/* Background Blobs */}
      <div className="blob blob-blue" style={{ top: "20%", left: "15%" }}></div>
      <div className="blob blob-purple" style={{ bottom: "20%", right: "15%" }}></div>

      <div className="animate-fade-in" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Understand Your Vehicle <br/>
          <span className="text-gradient">Service Bills Instantly</span>
        </h1>
        
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--text-secondary)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
          AutoAnalyzer uses advanced AI to break down complex service receipts. Find out exactly what you're paying for in simple, easy-to-understand terms.
        </p>

        <div className="flex-center" style={{ gap: "1.5rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          <Link href="/login" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
            Get Started <ArrowRight size={20} />
          </Link>
          <Link href="/dashboard" className="btn btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
            View Dashboard
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "left" }}>
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ background: "rgba(59, 130, 246, 0.1)", width: "50px", height: "50px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "var(--accent-primary)" }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Instant Analysis</h3>
            <p style={{ fontSize: "0.875rem", margin: 0 }}>Simply upload a photo of your bill, and get a complete cost breakdown in seconds.</p>
          </div>
          
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ background: "rgba(16, 185, 129, 0.1)", width: "50px", height: "50px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "var(--accent-success)" }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Clear Explanations</h3>
            <p style={{ fontSize: "0.875rem", margin: 0 }}>Confusing part codes are translated into simple, everyday language.</p>
          </div>
          
          <div className="glass-card" style={{ padding: "2rem" }}>
            <div style={{ background: "rgba(139, 92, 246, 0.1)", width: "50px", height: "50px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "var(--accent-secondary)" }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Privacy First</h3>
            <p style={{ fontSize: "0.875rem", margin: 0 }}>Bank-grade security ensures your data is never stored permanently or shared.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
