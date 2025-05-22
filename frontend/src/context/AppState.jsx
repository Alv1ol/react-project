import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  items: [], // Все элементы
  filteredItems: [], // Фильтрованные элементы
  selectedItems: [], // Выбранные элементы
  searchQuery: "", // Поисковый запрос
  sortOrder: [], // Порядок отображения элементов
  visibleCount: 20, // Количество отображаемых элементов
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };

    case "SET_FILTERED_ITEMS":
      return { ...state, filteredItems: action.payload };

    case "TOGGLE_SELECTION": {
      const newSelectedItems = state.selectedItems.includes(action.payload)
        ? state.selectedItems.filter((id) => id !== action.payload)
        : [...state.selectedItems, action.payload];
      return { ...state, selectedItems: newSelectedItems };
    }

    case "SELECT_ALL": {
      const allVisibleIds = state.filteredItems.map((item) => item.id);
      return { ...state, selectedItems: allVisibleIds };
    }

    case "DESELECT_ALL":
      return { ...state, selectedItems: [] };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "UPDATE_SORT_ORDER":
      return { ...state, sortOrder: action.payload };

    case "ADD_ITEM": {
      const newItem = action.payload;
      const updatedItems = [...state.items, newItem];
      const updatedFilteredItems = [...state.filteredItems, newItem];

      return {
        ...state,
        items: updatedItems,
        filteredItems: updatedFilteredItems,
        sortOrder: [...state.sortOrder, newItem.id],
      };
    }

    case "INCREASE_VISIBLE_COUNT":
      return { ...state, visibleCount: state.visibleCount + action.payload };

    default:
      return state;
  }
};

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Инициализация данных
  useEffect(() => {
    const initialItems = Array.from({ length: 1000000 }, (_, i) => ({
      id: i + 1,
      value: `Item ${i + 1}`,
    }));
    dispatch({ type: "SET_ITEMS", payload: initialItems });
    dispatch({ type: "SET_FILTERED_ITEMS", payload: initialItems.slice(0, state.visibleCount) });
    dispatch({ type: "UPDATE_SORT_ORDER", payload: initialItems.slice(0, state.visibleCount).map((item) => item.id) });
  }, []);

  // Фильтрация поиска
  useEffect(() => {
    const filtered = state.items
      .filter((item) => item.value.toLowerCase().includes(state.searchQuery.toLowerCase()))
      .slice(0, state.visibleCount);
    dispatch({ type: "SET_FILTERED_ITEMS", payload: filtered });
    dispatch({ type: "UPDATE_SORT_ORDER", payload: filtered.map((item) => item.id) });
  }, [state.searchQuery, state.items, state.visibleCount]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};