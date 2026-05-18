"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ShieldCheck, Car, Phone, MapPin, X, User, Tag } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  // Login State
  const [selectedState, setSelectedState] = useState("KL");
  const [rcNumber, setRcNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Registration Modal State
  const [showSignup, setShowSignup] = useState(false);
  const [regData, setRegData] = useState({
    rcNumber: "",
    phoneNumber: "",
    ownerName: "",
    vehicleModel: "",
    vehicleBrand: ""
  });
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // States list
  const stateOptions = [
    { code: "KL", name: "Kerala (KL)" },
    { code: "BH", name: "Bharat Series (BH)" },
    // Expandable in the future
  ];

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rcNumber, phoneNumber }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to verify vehicle. Please check your details.");
      } else {
        setOtpSent(true);
        sessionStorage.setItem("vehicleData", JSON.stringify(data.data));
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid OTP. Please try again.");
      } else {
        sessionStorage.setItem("vehicleData", JSON.stringify(data.data));
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setRegError(data.error || "Registration failed.");
      } else {
        alert("Registration Successful! You can now login.");
        setShowSignup(false);
        setRcNumber(regData.rcNumber);
        setPhoneNumber(regData.phoneNumber);
      }
    } catch (err) {
      setRegError("An unexpected error occurred.");
    } finally {
      setRegLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (selectedState === "KL") return "e.g. KL07CD5678";
    if (selectedState === "BH") return "e.g. 21BHAA0001";
    return "e.g. MH02CD5678";
  };

  return (
    <div className="container flex-center" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background Ornaments */}
      <div className="blob blob-blue" style={{ top: "10%", left: "10%" }}></div>
      <div className="blob blob-purple" style={{ bottom: "10%", right: "10%" }}></div>

      <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem", position: "relative", zIndex: 10 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="flex-center" style={{ marginBottom: "1rem" }}>
            <div style={{ padding: "0.5rem", background: "rgba(59, 130, 246, 0.1)", borderRadius: "var(--radius-lg)" }}>
              <img src="/logo.png" alt="AutoAnalyzer Logo" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
            </div>
          </div>
          <h1 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>AutoAnalyzer</h1>
          <p>AI-Powered Vehicle Service Bill Insights</p>
        </div>

        {error && (
          <div className="glass-panel" style={{ padding: "1rem", marginBottom: "1.5rem", borderLeft: "4px solid var(--accent-danger)", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <ShieldAlert color="var(--accent-danger)" size={24} style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-primary)" }}>{error}</p>
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Choose your state
              </label>
              <div style={{ position: "relative" }}>
                <MapPin size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <select 
                  className="input-field" 
                  style={{ paddingLeft: "2.5rem", appearance: "none" }}
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {stateOptions.map(state => (
                    <option key={state.code} value={state.code} style={{color: "black"}}>{state.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Vehicle Registration Number (RC)
              </label>
              <div style={{ position: "relative" }}>
                <Car size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  className="input-field"
                  placeholder={getPlaceholder()}
                  value={rcNumber}
                  onChange={(e) => setRcNumber(e.target.value.toUpperCase())}
                  style={{ paddingLeft: "2.5rem", textTransform: "uppercase" }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Linked Phone Number
              </label>
              <div style={{ position: "relative" }}>
                <Phone size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="tel"
                  className="input-field"
                  placeholder="e.g. 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ paddingLeft: "2.5rem" }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Get OTP"}
              {!loading && <ShieldCheck size={18} />}
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline" 
              style={{ width: "100%" }} 
              onClick={() => setShowSignup(true)}
            >
              Register Vehicle (Closed Beta)
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="animate-fade-in">
             <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <span className="badge badge-success">Identity Verified</span>
                <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>An OTP has been sent to your verified mobile number.</p>
             </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Enter OTP
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="00000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ textAlign: "center", letterSpacing: "0.25rem", fontSize: "1.25rem" }}
                required
                maxLength={5}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              Secure Login
            </button>
          </form>
        )}

        <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          <p>By logging in, you agree to our <Link href="/terms" style={{ color: "var(--accent-primary)" }}>Terms & Conditions</Link> and <Link href="/privacy" style={{ color: "var(--accent-primary)" }}>Privacy Policy</Link>.</p>
        </div>
      </div>

      {/* Registration Modal */}
      {showSignup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "500px", padding: "2rem", position: "relative" }}>
            <button 
              onClick={() => setShowSignup(false)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              <X size={24} />
            </button>
            
            <h2 style={{ marginBottom: "0.5rem" }}>Register Vehicle</h2>
            
            <div style={{ background: "rgba(245, 158, 11, 0.1)", borderLeft: "4px solid var(--accent-warning)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                <strong>Beta Notice:</strong> Please register with your actual vehicle RC and correct RC-linked phone number. We are using a local mock registry until official Vahan API integration is complete.
              </p>
            </div>

            {regError && (
              <div style={{ color: "var(--accent-danger)", fontSize: "0.875rem", marginBottom: "1rem" }}>{regError}</div>
            )}

            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>RC Number</label>
                  <input required className="input-field" placeholder="e.g. KL01AB1234" value={regData.rcNumber} onChange={e => setRegData({...regData, rcNumber: e.target.value.toUpperCase()})} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>Phone Number</label>
                  <input required type="tel" className="input-field" placeholder="9876543210" value={regData.phoneNumber} onChange={e => setRegData({...regData, phoneNumber: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>Owner Name</label>
                <div style={{ position: "relative" }}>
                  <User size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input required className="input-field" style={{ paddingLeft: "2.5rem" }} placeholder="Full Name" value={regData.ownerName} onChange={e => setRegData({...regData, ownerName: e.target.value})} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>Vehicle Brand</label>
                  <input required className="input-field" placeholder="e.g. Honda" value={regData.vehicleBrand} onChange={e => setRegData({...regData, vehicleBrand: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>Vehicle Model</label>
                  <input required className="input-field" placeholder="e.g. City ZX" value={regData.vehicleModel} onChange={e => setRegData({...regData, vehicleModel: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }} disabled={regLoading}>
                {regLoading ? "Registering..." : "Complete Registration"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
