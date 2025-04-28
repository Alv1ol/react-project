module.exports = {
  /**
   * Генерация диапазона элементов
   * @param {number} start - Начальный ID
   * @param {number} end - Конечный ID
   * @param {object} options - Опции
   * @param {string} options.searchTerm - Поисковый запрос
   * @param {Set} options.selectedItems - Set выбранных ID
   * @returns {Array<{id: number, value: number, selected: boolean}>}
   */
  generateRange(start, end, { searchTerm = '', selectedItems = new Set() } = {}) {
    const items = [];
    
    for (let i = start; i <= end; i++) {
      // Пропускаем элементы, которые не соответствуют поисковому запросу
      if (searchTerm && !i.toString().includes(searchTerm)) {
        continue;
      }
      
      items.push({
        id: i,
        value: i,
        selected: selectedItems.has(i)
      });
    }
    
    return items;
  },
  
  /**
   * Получение количества элементов, соответствующих фильтру
   * @param {string} searchTerm - Поисковый запрос
   * @returns {number} - Количество элементов
   */
  getFilteredCount(searchTerm) {
    // В реальной реализации нужно подсчитать количество элементов,
    // содержащих searchTerm в диапазоне от 1 до 1,000,000
    // Это упрощенная реализация для демонстрации
    if (!searchTerm) return 1000000;
    
    // Эвристическая оценка - в реальном приложении нужно точное вычисление
    return Math.max(1000, 1000000 / (searchTerm.length * 10));
  }
};