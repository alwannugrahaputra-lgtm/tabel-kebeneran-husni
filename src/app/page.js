"use client";
import { useState } from "react";

export default function TruthTableApp() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const symbols = [
    { label: "¬", value: "!" },
    { label: "∧", value: "&&" },
    { label: "∨", value: "||" },
    { label: "→", value: "=>" },
    { label: "↔", value: "===" },
    { label: "⊕", value: "!=" },
  ];

  const handleClick = (symbol) => {
    setExpression((prev) => prev + symbol);
  };

  const generateTable = () => {
    try {
      const vars = [...new Set(expression.match(/[A-Z]/g))];
      if (vars.length === 0) {
        setError("Masukkan variabel seperti A, B, atau C.");
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
        const result = eval(replaced);
        rows.push({ ...values, hasil: result });
      }
      setResult({ vars, rows });
      setError("");
    } catch {
      setError("Ekspresi tidak valid! Pastikan format logika benar.");
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 flex flex-col items-center justify-center p-6 text-gray-900 dark:text-gray-100">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-10 max-w-4xl w-full backdrop-blur-xl border border-white/30 dark:border-gray-800/50">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 mb-6 drop-shadow-md">
          🧩 Kalkulator Tabel Kebenaran
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
          <input
            type="text"
            className="w-full md:w-3/4 p-3 rounded-xl border-2 border-cyan-400 focus:ring-4 focus:ring-cyan-300 focus:outline-none dark:bg-gray-800 dark:border-teal-400"
            placeholder="Masukkan ekspresi logika (contoh: A && !B)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <button
            onClick={generateTable}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            Hitung
          </button>
        </div>

        {/* Tombol simbol */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {symbols.map((s) => (
            <button
              key={s.label}
              onClick={() => handleClick(s.value)}
              className="bg-cyan-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-center mb-4">
            ⚠️ {error}
          </p>
        )}

        {/* Tabel hasil */}
        {result && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
              <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                <tr>
                  {result.vars.map((v) => (
                    <th key={v} className="px-4 py-3 border">
                      {v}
                    </th>
                  ))}
                  <th className="px-4 py-3 border">Hasil</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 === 0
                        ? "bg-white/70 dark:bg-gray-800"
                        : "bg-gray-100/70 dark:bg-gray-900"
                    } hover:bg-cyan-100 dark:hover:bg-teal-800 transition`}
                  >
                    {result.vars.map((v) => (
                      <td key={v} className="px-4 py-2 text-center border">
                        {row[v] ? "T" : "F"}
                      </td>
                    ))}
                    <td
                      className={`px-4 py-2 text-center font-bold border ${
                        row.hasil
                          ? "text-teal-700 dark:text-teal-300"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {row.hasil ? "T" : "F"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-700 dark:text-gray-400 mt-6 text-sm">
          © Rifani Husni Mubarok 2025 — Versi Elegan & Interaktif 💡
        </p>
      </div>
    </div>
  );
}
