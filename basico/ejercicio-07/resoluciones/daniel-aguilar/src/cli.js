#!/usr/bin/env node
const { parseArgs } = require('./utils/args');
const { listCars, findCarById, formatPrice } = require('./services/cars.service');

const HELP = `Uso: node src/cli.js <comando> [opciones]

Comandos:
  list                      Lista todos los autos
  find <id>                 Muestra un auto por id
  search --brand=<marca> --max=<precio>
                            Filtra por marca y/o precio maximo
  help                      Muestra esta ayuda

Opciones:
  --json                    Salida en formato JSON
`;

function printCars(cars, asJson) {
  if (asJson) return console.log(JSON.stringify(cars, null, 2));
  if (cars.length === 0) return console.log('Sin resultados.');
  cars.forEach((car) =>
    console.log(`#${car.id} ${car.brand} ${car.model} (${car.year}) - ${formatPrice(car.priceUsd)}`)
  );
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exitCode = 1;
}

function run(argv) {
  const { command, positional, flags } = parseArgs(argv);
  const asJson = flags.json === true;

  switch (command) {
    case 'list':
      return printCars(listCars(), asJson);

    case 'find': {
      const id = Number(positional[0]);
      if (!Number.isInteger(id) || id <= 0) return fail('find requiere un id numerico positivo');
      const car = findCarById(id);
      if (!car) return fail(`No existe un auto con id ${id}`);
      return printCars([car], asJson);
    }

    case 'search': {
      const filters = {};
      if (typeof flags.brand === 'string') filters.brand = flags.brand;
      if (flags.max !== undefined) {
        const max = Number(flags.max);
        if (!Number.isFinite(max) || max <= 0) return fail('--max debe ser un numero positivo');
        filters.maxPrice = max;
      }
      return printCars(listCars(filters), asJson);
    }

    case undefined:
    case 'help':
      return console.log(HELP);

    default:
      fail(`Comando desconocido "${command}"`);
      return console.log(HELP);
  }
}

run(process.argv.slice(2));
