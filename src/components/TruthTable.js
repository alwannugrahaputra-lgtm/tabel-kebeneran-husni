'use client';
import { useState } from 'react';
import { generateTruthTable } from '../utils/logic';

export default function TruthTable() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  const handleClick = (symbol) => {
    setExpression((prev) => prev + symbol);
  };

  const calculate = () => {
    try {
      const table = generateTruthTable(expression);
      setResult(table);
    } catch (err) {
      setResult(null);
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-300">
        Kalkulator Tabel Kebenaran
      </h1>

      <input
        className="border px-4 py-2 rounded w-2/3 dark:bg-gray-800 dark:text-white"
        type="text"
        placeholder="Masukan Ekspresi (contoh: A∧B∨~C)"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />

      <div className="my-4 flex flex-wrap justify-center gap-2">
        {['~', '∧', '∨', '→', '↔', '⊼', '⊽', '⊕'].map((sym) => (
          <button
            key={sym}
            onClick={() => handleClick(sym)}
            className="bg-teal-700 text-white px-3 py-2 rounded hover:bg-teal-800 transition"
          >
            {sym}
          </button>
        ))}
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Hitung
      </button>

      <div className="mt-6 bg-white dark:bg-gray-900 shadow-md rounded p-4 inline-block text-left">
        {result ? (
          <table className="border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr>
                {result.vars.map((v) => (
                  <th key={v} className="border px-2 dark:text-white">
                    {v}
                  </th>
                ))}
                <th className="border px-2 dark:text-white">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i}>
                  {result.vars.map((v) => (
                    <td key={v} className="border px-2 dark:text-gray-200">
                      {row[v] ? 'T' : 'F'}
                    </td>
                  ))}
                  <td className="border px-2 dark:text-gray-200">
                    {row.hasil === 'Error' ? 'Error' : row.hasil ? 'T' : 'F'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Masukan ekspresi untuk mendapatkan hasil
          </p>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-4 dark:text-gray-400">
        © Rifani Husni Mubarok 2025
      </p>
    </div>
  );
}
