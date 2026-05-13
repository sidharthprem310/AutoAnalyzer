"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Download, CheckCircle, AlertCircle, Settings, Wrench, Battery, Droplet, Wind, Fan, Clock, ChevronRight } from "lucide-react";

interface VehicleDetails {
  make: string;
  model: string;
  mileage: string;
  serviceDate: string;
}

interface PartAnalysis {
  partName: string;
  partCode: string;
  cost: number;
  labor: number;
  description: string;
  condition: string;
}

interface ExtraConsumable {
  name: string;
  cost: number;
}

interface AnalysisResult {
  totalServiceCost: number;
  partsCost: number;
  laborCost: number;
  vehicleDetails: VehicleDetails;
  partsAnalysis: PartAnalysis[];
  extraConsumables: ExtraConsumable[];
}

interface HistoryItem {
  id: string;
  rcNumber: string;
  timestamp: string;
  data: AnalysisResult;
}

export default function DashboardPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("vehicleData");
    if (!storedData) {
      router.push("/");
    } else {
      const data = JSON.parse(storedData);
      setVehicleData(data);
      fetchHistory(data.rcNumber);
    }
  }, [router]);

  const fetchHistory = async (rcNumber: string) => {
    try {
      const res = await fetch(`/api/history?rcNumber=${rcNumber}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setHistory(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch history");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid PDF or Image file (JPEG/PNG).");
      setFile(null);
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !vehicleData) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("rcNumber", vehicleData.rcNumber);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
        fetchHistory(vehicleData.rcNumber); // Refresh history
      } else {
        setError(data.error || "Failed to analyze the bill.");
      }
    } catch (err) {
      setError("An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    // @ts-ignore
    const html2pdf = (await import("html2pdf.js")).default;
    
    const element = reportRef.current;
    const opt = {
      margin: 0.5,
      filename: `Service_Report_${vehicleData?.rcNumber || 'vehicle'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderPartIcon = (partName: string) => {
    const name = partName.toLowerCase();
    if (name.includes("oil") || name.includes("fluid")) return <Droplet className="animate-float" size={40} color="var(--accent-primary)" />;
    if (name.includes("brake")) return <Wrench size={40} color="var(--accent-danger)" />;
    if (name.includes("filter")) return <Wind className="animate-float" size={40} color="var(--text-muted)" />;
    if (name.includes("battery") || name.includes("spark")) return <Battery size={40} color="var(--accent-warning)" />;
    if (name.includes("fan") || name.includes("belt")) return <Fan size={40} style={{ animation: "spin 3s linear infinite" }} color="var(--text-primary)" />;
    return <Settings size={40} style={{ animation: "spin 5s linear infinite" }} color="var(--accent-secondary)" />;
  };

  if (!vehicleData) return null;

  return (
    <div className="container" style={{ padding: "2rem 1.5rem" }}>
      <header className="flex-between" style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: "1.5rem", margin: 0 }}>AutoAnalyzer Dashboard</h1>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Welcome, {vehicleData.ownerName}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span className="badge badge-success" style={{ marginBottom: "0.25rem" }}><CheckCircle size={12} style={{ marginRight: "4px" }}/> Verified RC</span>
          <p style={{ margin: 0, fontSize: "0.875rem", fontFamily: "monospace" }}>{vehicleData.rcNumber} • {vehicleData.vehicleModel}</p>
        </div>
      </header>

      {!result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
          <div className="glass-card animate-fade-in" style={{ padding: "3rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: "1rem" }}>Upload Service Bill</h2>
            <p style={{ marginBottom: "2rem" }}>Securely upload your e-receipt or scanned bill (PDF/Image). Our AI will break down the costs and explain each part.</p>
            
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? "var(--accent-primary)" : "var(--border-strong)"}`,
                borderRadius: "var(--radius-lg)",
                padding: "3rem",
                background: isDragging ? "rgba(59, 130, 246, 0.05)" : "rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                cursor: "pointer",
                marginBottom: "1.5rem"
              }}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                type="file" 
                id="file-upload" 
                style={{ display: "none" }} 
                accept=".pdf,image/png,image/jpeg"
                onChange={(e) => e.target.files && handleFileSelection(e.target.files[0])}
              />
              
              {file ? (
                <div className="flex-center" style={{ flexDirection: "column", gap: "0.5rem" }}>
                  <FileText size={48} color="var(--accent-success)" />
                  <p style={{ margin: 0, fontWeight: "500", color: "var(--text-primary)" }}>{file.name}</p>
                  <p style={{ margin: 0, fontSize: "0.75rem" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="flex-center" style={{ flexDirection: "column", gap: "0.5rem" }}>
                  <UploadCloud size={48} color="var(--text-muted)" />
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>Drag & Drop your bill here</p>
                  <p style={{ margin: 0, fontSize: "0.75rem" }}>or click to browse</p>
                </div>
              )}
            </div>

            {error && (
              <div style={{ color: "var(--accent-danger)", fontSize: "0.875rem", marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button 
              className="btn btn-primary" 
              onClick={handleUpload} 
              disabled={!file || isAnalyzing}
              style={{ width: "100%", opacity: (!file || isAnalyzing) ? 0.5 : 1 }}
            >
              {isAnalyzing ? (
                <>
                  <Settings className="animate-spin" size={18} style={{ animation: "spin 2s linear infinite" }}/> 
                  Analyzing Bill using AI...
                </>
              ) : "Analyze Bill"}
            </button>
          </div>

          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={20} color="var(--accent-primary)" /> History
            </h3>
            {history.length === 0 ? (
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>No past reports found. Upload your first bill!</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {history.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setResult(item.data)}
                    style={{ background: "rgba(0,0,0,0.05)", border: "1px solid var(--border-subtle)", padding: "1rem", borderRadius: "var(--radius-md)", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text-primary)" }}
                    className="hover-bg"
                  >
                    <div>
                      <p style={{ margin: "0 0 0.25rem 0", fontWeight: "500", fontSize: "0.875rem" }}>Service Report</p>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)" }}>{new Date(item.timestamp).toLocaleDateString()}</p>
                    </div>
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className="animate-fade-in">
          <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
            <h2>Analysis Report</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-outline" onClick={() => {setResult(null); setFile(null);}}>Back to Dashboard</button>
              <button className="btn btn-primary" onClick={handleDownloadPDF}><Download size={18} /> Export as PDF</button>
            </div>
          </div>

          <div ref={reportRef} style={{ background: "var(--bg-base)", padding: "1px" }}>
            <div className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem", background: "rgba(36, 41, 62, 0.4)" }}>
              <h3 style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>Cost Summary</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                <div style={{ background: "rgba(0,0,0,0.1)", padding: "1.5rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-primary)" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>Total Bill Amount</p>
                  <h2 style={{ fontSize: "2rem", margin: "0.5rem 0 0 0", color: "var(--text-primary)" }}>₹{result.totalServiceCost.toLocaleString()}</h2>
                </div>
                <div style={{ background: "rgba(0,0,0,0.1)", padding: "1.5rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-secondary)" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>Total Parts Cost</p>
                  <h2 style={{ fontSize: "1.75rem", margin: "0.5rem 0 0 0" }}>₹{result.partsCost.toLocaleString()}</h2>
                </div>
                <div style={{ background: "rgba(0,0,0,0.1)", padding: "1.5rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-warning)" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>Total Labor Cost</p>
                  <h2 style={{ fontSize: "1.75rem", margin: "0.5rem 0 0 0" }}>₹{result.laborCost.toLocaleString()}</h2>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: "1rem" }}>Parts Dictionary & Breakdown</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              Understanding your bill: We've simplified the technical part codes and explained what each part does for your vehicle.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
              {result.partsAnalysis.map((part, idx) => (
                <div key={idx} className="glass-card" style={{ display: "flex", flexDirection: "row", padding: "1.5rem", gap: "1.5rem", alignItems: "center" }}>
                  <div style={{ 
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "16px", 
                    background: "rgba(128,128,128,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid var(--border-subtle)"
                  }}>
                    {renderPartIcon(part.partName)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <h3 style={{ margin: 0, color: "var(--text-primary)" }}>{part.partName}</h3>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>Code: {part.partCode}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: "600", color: "var(--accent-success)" }}>₹{part.cost.toLocaleString()} <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "normal" }}>(Part)</span></div>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-warning)" }}>+ ₹{part.labor.toLocaleString()} <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>(Labor)</span></div>
                      </div>
                    </div>
                    
                    <p style={{ margin: "0.5rem 0", fontSize: "0.875rem", lineHeight: 1.5, color: "var(--text-secondary)" }}>
                      <strong>What it does:</strong> {part.description}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <AlertCircle size={14} /> <em>Condition noted: {part.condition}</em>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {result.extraConsumables.length > 0 && (
              <div className="glass-panel" style={{ padding: "1.5rem", marginTop: "2rem", border: "1px solid var(--border-subtle)" }}>
                <h4 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>Extra Consumables & Miscellaneous</h4>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {result.extraConsumables.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "0.5rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                      <span style={{ fontWeight: "500" }}>₹{item.cost.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", padding: "2rem 0", borderTop: "1px solid var(--border-subtle)" }}>
              <p>Generated by AutoAnalyzer AI • Not valid for legal disputes • Data securely processed and purged.</p>
            </div>
            
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover-bg:hover { background: rgba(0,0,0,0.1) !important; }
        [data-theme='dark'] .hover-bg:hover { background: rgba(255,255,255,0.1) !important; }
      `}} />
    </div>
  );
}
