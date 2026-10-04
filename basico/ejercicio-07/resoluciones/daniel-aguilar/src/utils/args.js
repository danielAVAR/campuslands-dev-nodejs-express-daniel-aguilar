/**
 * Convierte process.argv.slice(2) en { command, positional, flags }.
 *   ["search", "--brand=Bentley", "--max", "230000", "--json"]
 *   -> { command: "search", positional: [], flags: { brand: "Bentley", max: "230000", json: true } }
 */
function parseArgs(argv) {
  const [command, ...rest] = argv;
  const positional = [];
  const flags = {};

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }
    const [name, inlineValue] = arg.slice(2).split('=');
    if (inlineValue !== undefined) {
      flags[name] = inlineValue;
    } else if (rest[i + 1] !== undefined && !rest[i + 1].startsWith('--')) {
      flags[name] = rest[i + 1];
      i += 1;
    } else {
      flags[name] = true;
    }
  }
  return { command, positional, flags };
}

module.exports = { parseArgs };
