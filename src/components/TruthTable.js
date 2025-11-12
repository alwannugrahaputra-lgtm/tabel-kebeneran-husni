"use client";
import { useState } from "react";
import { generateTruthTable } from "../utils/logic";

export default function TruthTable() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  const handleClick = (symbol) => setExpression((prev) => prev + symbol);

  const calculate = () => {
    try {
      const table = generateTruthTable(expression);
      setResult(table);
    } catch {
      setResult(null);
    }
  };

  return (
    <div className="text-center">
      <div className="bg-white/90 dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-teal-700 dark:text-teal-300">
          Kalkulator Tabel Kebenaran
        </h1>

        <input
          type="text"
          className="w-full p-3 border-2 border-teal-400 rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
          placeholder="Masukkan Ekspresi (contoh: A∧B∨~C)"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {["~", "∧", "∨", "→", "↔", "⊼", "⊽", "⊕"].map((sym) => (
            <button
              key={sym}
              onClick={() => handleClick(sym)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105"
            >
              {sym}
            </button>
          ))}
        </div>

        <button
          onClick={calculate}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105"
        >
          Hitung
        </button>

        <div className="mt-6 overflow-x-auto">
          {result ? (
            <table className="w-full text-center border border-gray-300 dark:border-gray-700">
              <thead className="bg-teal-600 dark:bg-teal-700 text-white">
                <tr>
                  {result.vars.map((v) => (
                    <th key={v} className="px-4 py-2">{v}</th>
                  ))}
                  <th className="px-4 py-2">Hasil</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-800">
                    {result.vars.map((v) => (
                      <td key={v} className="border px-4 py-2">{row[v] ? "T" : "F"}</td>
                    ))}
                    <td className="border px-4 py-2 text-teal-700 dark:text-teal-300 font-semibold">
                      {row.hasil === "Error" ? "Error" : row.hasil ? "T" : "F"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Masukkan ekspresi untuk melihat hasil tabel.
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          © Rifani Husni Mubarok 2025
        </p>
      </div>
    </div>
  );
}
