"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem", maxWidth: "800px" }}>
      <Link href="/" className="btn btn-outline" style={{ marginBottom: "2rem", display: "inline-flex" }}>
        <ArrowLeft size={16} /> Back to Login
      </Link>
      
      <div className="glass-card" style={{ padding: "3rem" }}>
        <div className="flex-center" style={{ marginBottom: "2rem", justifyContent: "flex-start", gap: "1rem" }}>
          <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "var(--radius-full)", color: "var(--accent-success)" }}>
            <Shield size={32} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem", margin: 0 }}>Privacy Policy</h1>
        </div>

        <div style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
          <p><strong>Last Updated: May 2026</strong></p>
          
          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>1. Strict Data Security</h3>
          <p>Your privacy is our utmost priority. We employ end-to-end encryption to ensure your vehicle RC, phone number, and service bills are strictly confidential. We do not sell, rent, or share your personal details with any third parties, advertisers, or external workshops.</p>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>2. What We Collect and Why</h3>
          <p>We only collect the minimum required data to provide our service:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Vehicle RC & Phone Number:</strong> Used exclusively for authentication to prevent unauthorized access to your vehicle's data.</li>
            <li><strong>Service Bills:</strong> Uploaded bills are processed in-memory by our AI engine to generate your simplified report. They are NOT permanently stored on our servers unless explicitly saved by you for future reference.</li>
          </ul>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>3. AI Processing</h3>
          <p>The analysis of your service bill is conducted through secure APIs. No personally identifiable information (PII) is used to train AI models. The extracted data is immediately discarded from the processing queue once your report is generated.</p>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>4. Your Rights</h3>
          <p>You have the absolute right to delete your account and all associated data at any time. Clicking "Delete Account" immediately erases all trace of your information from our systems.</p>
        </div>
      </div>
    </div>
  );
}
