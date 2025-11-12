"use client";
import { useState } from "react";

export default function TruthTable() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const symbols = [
    { label: "¬ (Negasi)", value: "!" },
    { label: "∧ (AND)", value: "&&" },
    { label: "∨ (OR)", value: "||" },
    { label: "⇒ (IF THEN)", value: "(!A || B)" },
    { label: "⇔ (IF AND ONLY IF)", value: "(A === B)" },
    { label: "⊕ (XOR)", value: "!=" },
    { label: "⊼ (NAND)", value: "!(A && B)" },
    { label: "⊽ (NOR)", value: "!(A || B)" },
  ];

  const handleClick = (symbol) => setExpression((prev) => prev + symbol);

  const generateTable = () => {
    try {
      const vars = [...new Set(expression.match(/[A-Z]/g))];
      if (vars.length === 0) {
        setError("⚠️ Masukkan variabel seperti A, B, atau C untuk memulai perhitungan.");
        return;
      }

      const rows = [];
      const numRows = 2 ** vars.length;
      for (let i = 0; i < numRows; i++) {
        const values = {};
        vars.forEach((v, idx) => {
          values[v] = Boolean((i >> (vars.length - idx - 1)) & 1);
        });
        const replaced = expression.replace(/[A-Z]/g, (v) => values[v]);
        const hasil = eval(replaced);
        rows.push({ ...values, hasil });
      }

      const cnf = rows
        .filter((r) => !r.hasil)
        .map((r) => vars.map((v) => (r[v] ? `¬${v}` : v)).join(" ∨ "))
        .join(") ∧ (");

      const dnf = rows
        .filter((r) => r.hasil)
        .map((r) => vars.map((v) => (r[v] ? v : `¬${v}`)).join(" ∧ "))
        .join(") ∨ (");

      setResult({
        vars,
        rows,
        cnf: cnf ? `(${cnf})` : "-",
        dnf: dnf ? `(${dnf})` : "-",
      });
      setError("");
    } catch {
      setError("❌ Ekspresi logika tidak valid. Gunakan format seperti (A && !B) || C");
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 max-w-5xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-cyan-300 mb-3 drop-shadow-lg">
          🧠 Kalkulator Tabel Kebenaran
        </h1>
        <p className="text-gray-300 mb-6 text-sm">
          Masukkan ekspresi logika (gunakan huruf kapital seperti A, B, atau C)
        </p>

        {/* Input dan tombol */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <input
            type="text"
            className="w-full md:w-2/3 p-3 rounded-xl border-2 border-cyan-400 bg-white/10 text-white placeholder-gray-400 focus:ring-4 focus:ring-cyan-300 outline-none"
            placeholder="Contoh: (A && !B) || C"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <button
            onClick={generateTable}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
          >
            Hitung
          </button>
        </div>

        {/* Tombol simbol */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {symbols.map((s) => (
            <button
              key={s.label}
              onClick={() => handleClick(s.value)}
              className="bg-cyan-700/70 hover:bg-cyan-600/90 text-white px-3 py-2 rounded-lg shadow-md transition-all text-sm"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 font-medium text-center mb-4 animate-pulse">
            {error}
          </p>
        )}

        {/* Hasil */}
        {result && (
          <div className="mt-6 space-y-6">
            {/* Tabel utama */}
            <div className="overflow-x-auto">
              <table className="rounded-lg shadow-lg">
                <thead>
                  <tr>
                    {result.vars.map((v) => (
                      <th key={v}>{v}</th>
                    ))}
                    <th className="text-yellow-300">Hasil</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i}>
                      {result.vars.map((v) => (
                        <td key={v}>{row[v] ? "T" : "F"}</td>
                      ))}
                      <td
                        className={`font-bold ${
                          row.hasil ? "text-teal-300" : "text-red-400"
                        }`}
                      >
                        {row.hasil ? "T" : "F"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CNF dan DNF */}
            <div className="grid md:grid-cols-2 gap-6 text-left text-gray-200">
              <div className="bg-white/10 p-5 rounded-xl border border-cyan-600/40">
                <h2 className="text-lg font-semibold text-cyan-300 mb-2">
                  🧩 CNF (Conjunctive Normal Form)
                </h2>
                <p className="text-sm">{result.cnf}</p>
              </div>

              <div className="bg-white/10 p-5 rounded-xl border border-teal-600/40">
                <h2 className="text-lg font-semibold text-teal-300 mb-2">
                  🔷 DNF (Disjunctive Normal Form)
                </h2>
                <p className="text-sm">{result.dnf}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-400 mt-10 text-sm">
          © Rifani Husni Mubarok 2025
        </p>
      </div>
    </div>
  );
}
