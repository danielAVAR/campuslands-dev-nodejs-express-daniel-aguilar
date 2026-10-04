// Exporta UN objeto con varias funciones: module.exports = { ... }
const formatRole = require('../utils/format');

const heroes = [
  { id: 1, name: 'Aurelia', role: 'MID', winRate: 52.4 },
  { id: 2, name: 'Bruto', role: 'tank', winRate: 49.8 },
  { id: 3, name: 'Cielo', role: 'SUPPORT', winRate: 54.1 },
  { id: 4, name: 'Dagger', role: 'carry', winRate: 50.6 },
];

function listHeroes() {
  return heroes.map((hero) => ({ ...hero, role: formatRole(hero.role) }));
}

function getHeroById(id) {
  return listHeroes().find((hero) => hero.id === id) || null;
}

module.exports = { listHeroes, getHeroById };
