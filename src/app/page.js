"use client";
import { useState } from "react";

export default function TruthTable() {
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

  const handleClick = (symbol) => setExpression((prev) => prev + symbol);

  const generateTable = () => {
    try {
      const vars = [...new Set(expression.match(/[A-Z]/g))];
      if (vars.length === 0) {
        setError("⚠️ Masukkan variabel seperti A, B, atau C");
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
      setResult({ vars, rows });
      setError("");
    } catch {
      setError("Ekspresi logika tidak valid! Gunakan format seperti A && !B");
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl backdrop-blur-lg p-10 max-w-4xl w-full border border-white/20 dark:border-gray-800/40">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-500 drop-shadow-lg">
          🧠 Kalkulator Tabel Kebenaran
        </h1>

        <div className="flex flex-col md:flex-row gap-3 mb-6 justify-center">
          <input
            type="text"
            className="w-full md:w-3/4 p-3 rounded-xl border-2 border-cyan-400 focus:ring-4 focus:ring-cyan-300 outline-none dark:bg-gray-800 dark:text-white"
            placeholder="Masukkan ekspresi logika (contoh: A && !B)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <button
            onClick={generateTable}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg"
          >
            Hitung
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {symbols.map((s) => (
            <button
              key={s.label}
              onClick={() => handleClick(s.value)}
              className="bg-cyan-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              {s.label}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-center font-medium mb-4 animate-pulse">
            {error}
          </p>
        )}

        {result && (
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  {result.vars.map((v) => (
                    <th key={v}>{v}</th>
                  ))}
                  <th>Hasil</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, idx) => (
                  <tr key={idx}>
                    {result.vars.map((v) => (
                      <td key={v}>{row[v] ? "T" : "F"}</td>
                    ))}
                    <td
                      className={`font-bold ${
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

        <p className="text-center text-gray-700 dark:text-gray-400 mt-8 text-sm">
          © Rifani Husni Mubarok 2025
        </p>
      </div>
    </div>
  );
}
