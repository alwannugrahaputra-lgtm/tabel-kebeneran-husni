'use client';
import { useState } from 'react';
import { generateTruthTable } from '../utils/logic';

export default function TruthTable() {
  const [expression, setExpression] = useState('');
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 text-gray-800 dark:text-gray-100 transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-11/12 md:w-3/4 lg:w-2/3">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-700 dark:text-teal-300">
          Kalkulator Tabel Kebenaran
        </h1>

        <div className="flex flex-col items-center gap-3 mb-4">
          <input
            type="text"
            className="w-full md:w-3/4 p-3 border-2 border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
            placeholder="Masukan Ekspresi (contoh: A∧B∨~C)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />

          <div className="flex flex-wrap justify-center gap-2">
            {['~', '∧', '∨', '→', '↔', '⊼', '⊽', '⊕'].map((sym) => (
              <button
                key={sym}
                onClick={() => handleClick(sym)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
              >
                {sym}
              </button>
            ))}
          </div>

          <button
            onClick={calculate}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-3 rounded-xl mt-3 shadow-lg transition transform hover:scale-105"
          >
            Hitung
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-inner mt-6 overflow-x-auto">
          {result ? (
            <table className="border-collapse border border-gray-400 dark:border-gray-700 w-full text-center">
              <thead>
                <tr className="bg-teal-600 dark:bg-teal-700 text-white">
                  {result.vars.map((v) => (
                    <th key={v} className="border px-4 py-2">{v}</th>
                  ))}
                  <th className="border px-4 py-2">Hasil</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
                  >
                    {result.vars.map((v) => (
                      <td key={v} className="border px-4 py-2">{row[v] ? 'T' : 'F'}</td>
                    ))}
                    <td className="border px-4 py-2 font-semibold text-teal-700 dark:text-teal-300">
                      {row.hasil === 'Error' ? 'Error' : row.hasil ? 'T' : 'F'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              Masukan ekspresi untuk mendapatkan hasil
            </p>
          )}
        </div>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          © Rifani Husni Mubarok 2025
        </footer>
      </div>
    </div>
  );
}
