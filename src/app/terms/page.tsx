"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem", maxWidth: "800px" }}>
      <Link href="/" className="btn btn-outline" style={{ marginBottom: "2rem", display: "inline-flex" }}>
        <ArrowLeft size={16} /> Back to Login
      </Link>
      
      <div className="glass-card" style={{ padding: "3rem" }}>
        <div className="flex-center" style={{ marginBottom: "2rem", justifyContent: "flex-start", gap: "1rem" }}>
          <div style={{ padding: "1rem", background: "rgba(59, 130, 246, 0.1)", borderRadius: "var(--radius-full)", color: "var(--accent-primary)" }}>
            <FileText size={32} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem", margin: 0 }}>Terms & Conditions</h1>
        </div>

        <div style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
          <p><strong>Last Updated: May 2026</strong></p>
          
          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>1. Acceptance of Terms</h3>
          <p>By accessing and using AutoAnalyzer, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using this service, you shall be subject to any posted guidelines or rules applicable to such services.</p>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>2. Description of Service</h3>
          <p>AutoAnalyzer provides an AI-powered service bill analysis tool. It extracts data from uploaded bills and provides educational explanations of vehicle parts and associated costs. The information provided is for educational and understanding purposes and does not constitute mechanical advice.</p>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>3. User Responsibilities</h3>
          <p>You are responsible for maintaining the confidentiality of your RC number and Phone number. You agree to use this service only for bills belonging to vehicles you legally own or are authorized to manage.</p>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>4. Accuracy of AI Analysis</h3>
          <p>While we use advanced AI to analyze your service bills, OCR (Optical Character Recognition) and AI interpretation can occasionally make errors. You agree that AutoAnalyzer is not liable for disputes with your service center based on our simplified analysis.</p>

          <h3 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>5. Modification of Service</h3>
          <p>We reserve the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.</p>
        </div>
      </div>
    </div>
  );
}
