// Exporta UNA funcion: module.exports = funcion
function formatRole(role) {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

module.exports = formatRole;
