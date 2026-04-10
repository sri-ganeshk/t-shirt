"use client";

import { useState, useEffect } from "react";

const LS_KEY = "tshirt_registered";

export function RegistrationForm() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [tshirtSize, setTshirtSize] = useState("M");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On mount: check if already registered on this device
  useEffect(() => {
    if (localStorage.getItem(LS_KEY)) {
      setRegistered(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tshirt/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, rollNumber, tshirtSize }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(LS_KEY, data.registrationId);
        setRegistered(true);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.successTitle}>Already Registered</h1>
          <p style={styles.successText}>
            Your t-shirt registration is confirmed on this device.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>T-Shirt Registration</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              autoComplete="name"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="rollNumber" style={styles.label}>Roll Number</label>
            <input
              id="rollNumber"
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
              placeholder="e.g. 22L31A0501"
              required
              autoComplete="off"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="tshirtSize" style={styles.label}>T-Shirt Size</label>
            <select
              id="tshirtSize"
              value={tshirtSize}
              onChange={(e) => setTshirtSize(e.target.value)}
              style={styles.select}
            >
              <option value="S">S — Small</option>
              <option value="M">M — Medium</option>
              <option value="L">L — Large</option>
              <option value="XL">XL — Extra Large</option>
            </select>
          </div>

          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
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
  },
  heading: {
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "-0.3px",
    marginBottom: "28px",
    color: "#000",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    border: "1.5px solid #000",
    borderRadius: "0",
    background: "#fff",
    color: "#000",
    outline: "none",
    appearance: "none" as const,
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    border: "1.5px solid #000",
    borderRadius: "0",
    background: "#fff",
    color: "#000",
    outline: "none",
    appearance: "none" as const,
    cursor: "pointer",
  },
  errorBox: {
    padding: "12px 14px",
    border: "1.5px solid #000",
    background: "#000",
    color: "#fff",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "15px",
    fontWeight: 700,
    background: "#000",
    color: "#fff",
    border: "1.5px solid #000",
    cursor: "pointer",
    letterSpacing: "0.3px",
    marginTop: "4px",
  },
  buttonDisabled: {
    background: "#666",
    borderColor: "#666",
    cursor: "not-allowed",
  },
  successIcon: {
    fontSize: "40px",
    fontWeight: 700,
    marginBottom: "16px",
  },
  successTitle: {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#000",
  },
  successText: {
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.5",
  },
};
