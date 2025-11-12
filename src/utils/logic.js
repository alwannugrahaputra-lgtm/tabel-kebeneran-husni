export function generateTruthTable(expression) {
  const vars = [...new Set(expression.match(/[A-Z]/g))];
  const numRows = 2 ** vars.length;
  const rows = [];

  for (let i = 0; i < numRows; i++) {
    const values = {};
    vars.forEach((v, idx) => {
      values[v] = Boolean((i >> (vars.length - idx - 1)) & 1);
    });

    let expEval = expression
      .replace(/∧/g, "&&")
      .replace(/∨/g, "||")
      .replace(/~/g, "!")
      .replace(/ /g, "");

    const replaced = expEval.replace(/[A-Z]/g, (v) => values[v]);
    let result = false;
    try {
      result = eval(replaced);
    } catch {
      result = "Error";
    }

    rows.push({ ...values, hasil: result });
  }

  return { vars, rows };
}
