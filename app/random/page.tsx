"use client";

import { useState, useEffect } from "react";

type User = { name: string; rollNumber: string; tshirtSize: string };

export default function RandomPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tshirt/random");
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRandom(); }, []);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <p style={styles.label}>Random Registered User</p>

        {loading && <p style={styles.muted}>Loading...</p>}

        {!loading && error && <p style={styles.muted}>{error}</p>}

        {!loading && user && (
          <>
            <h1 style={styles.name}>{user.name}</h1>
            <div style={styles.row}>
              <span style={styles.tag}>{user.rollNumber}</span>
              <span style={styles.tag}>{user.tshirtSize}</span>
            </div>
          </>
        )}

        <button
          onClick={fetchRandom}
          disabled={loading}
          style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
        >
          {loading ? "Loading..." : "Pick Another"}
        </button>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    background: "#fff",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    border: "1.5px solid #000",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    color: "#666",
  },
  name: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#000",
  },
  row: {
    display: "flex",
    gap: "8px",
  },
  tag: {
    padding: "6px 12px",
    border: "1.5px solid #000",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  muted: {
    fontSize: "15px",
    color: "#666",
  },
  button: {
    marginTop: "8px",
    padding: "12px",
    fontSize: "14px",
    fontWeight: 700,
    background: "#000",
    color: "#fff",
    border: "1.5px solid #000",
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  buttonDisabled: {
    background: "#666",
    borderColor: "#666",
    cursor: "not-allowed",
  },
};
