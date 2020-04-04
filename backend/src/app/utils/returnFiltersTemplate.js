module.exports = {
  returnTemplateFilters(filters) {
    return (filters =
      filters.length > 1 ? filters.join(' = ?') : filters[0] + ' = ? ');
  }
};
