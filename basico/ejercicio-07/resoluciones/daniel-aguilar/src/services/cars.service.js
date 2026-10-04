const cars = [
  { id: 1, brand: 'Bentley', model: 'Continental GT', year: 2024, priceUsd: 245000 },
  { id: 2, brand: 'Rolls-Royce', model: 'Ghost', year: 2023, priceUsd: 355000 },
  { id: 3, brand: 'Aston Martin', model: 'DB12', year: 2024, priceUsd: 248000 },
  { id: 4, brand: 'Bentley', model: 'Flying Spur', year: 2023, priceUsd: 215000 },
  { id: 5, brand: 'Mercedes-Maybach', model: 'S 680', year: 2024, priceUsd: 230000 },
];

function listCars({ brand, maxPrice } = {}) {
  return cars.filter((car) => {
    if (brand && car.brand.toLowerCase() !== brand.toLowerCase()) return false;
    if (maxPrice !== undefined && car.priceUsd > maxPrice) return false;
    return true;
  });
}

function findCarById(id) {
  return cars.find((car) => car.id === id) || null;
}

function formatPrice(value) {
  return `USD ${value.toLocaleString('en-US')}`;
}

module.exports = { listCars, findCarById, formatPrice };
