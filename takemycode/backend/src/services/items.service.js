const dataGenerator = require('../utils/dataGenerator');

// Хранилище состояния (вместо БД)
const storage = {
  selectedItems: new Set(),
  customOrder: null
};

// Применение кастомного порядка к данным
const applyCustomOrder = (items, customOrder) => {
  if (!customOrder || customOrder.length === 0) return items;
  
  const orderedItems = [];
  const itemsMap = new Map(items.map(item => [item.id, item]));
  
  // Сначала добавляем элементы в кастомном порядке
  for (const id of customOrder) {
    if (itemsMap.has(id)) {
      orderedItems.push(itemsMap.get(id));
      itemsMap.delete(id);
    }
  }
  
  // Затем добавляем оставшиеся элементы
  orderedItems.push(...itemsMap.values());
  
  return orderedItems;
};

module.exports = {
  /**
   * Получение элементов с пагинацией и фильтрацией
   * @param {number} page - Номер страницы
   * @param {number} pageSize - Размер страницы
   * @param {string} searchTerm - Поисковый запрос
   * @returns {Promise<{data: Array, total: number, hasMore: boolean}>}
   */
  async getItems(page = 1, pageSize = 20, searchTerm = '') {
    const start = (page - 1) * pageSize + 1;
    const end = start + pageSize - 1;
    
    // Генерируем данные для текущей страницы через dataGenerator
    let items = dataGenerator.generateRange(start, end, {
      searchTerm,
      selectedItems: storage.selectedItems
    });
    
    // Применяем кастомный порядок, если нет поискового запроса
    if (!searchTerm && storage.customOrder) {
      items = applyCustomOrder(items, storage.customOrder);
    }
    
    // Получаем общее количество элементов (с фильтрацией или без)
    const total = searchTerm 
      ? dataGenerator.getFilteredCount(searchTerm)
      : 1000000;
    
    const hasMore = end < total;
    
    return {
      data: items,
      total,
      hasMore
    };
  },
  
  /**
   * Переключение выбора элемента
   * @param {number} id - ID элемента
   * @param {boolean} selected - Новое состояние выбора
   * @returns {Promise<void>}
   */
  async toggleSelect(id, selected) {
    if (selected) {
      storage.selectedItems.add(id);
    } else {
      storage.selectedItems.delete(id);
    }
  },
  
  /**
   * Сохранение кастомного порядка элементов
   * @param {Array<number>} order - Массив ID в новом порядке
   * @returns {Promise<void>}
   */
  async saveOrder(order) {
    storage.customOrder = order;
  },
  
  /**
   * Получение выбранных элементов
   * @returns {Promise<Array<{id: number, value: number}>>}
   */
  async getSelectedItems() {
    return Array.from(storage.selectedItems).map(id => ({ 
      id, 
      value: id 
    }));
  },
  
  // Метод для тестирования/очистки хранилища
  _clearStorage() {
    storage.selectedItems = new Set();
    storage.customOrder = null;
  }
};