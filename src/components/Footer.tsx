export function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "2rem",
      marginTop: "auto",
      borderTop: "1px solid var(--border-subtle)",
      fontSize: "0.875rem",
      color: "var(--text-muted)"
    }}>
      <p>
        AutoAnalyzer © {new Date().getFullYear()} • 
        Made by <a href="https://www.linkedin.com/in/sidharthprem310" target="_blank" rel="noopener noreferrer" style={{color: "var(--accent-primary)", fontWeight: "500"}}>Sidharth Prem</a>
      </p>
    </footer>
  );
}
