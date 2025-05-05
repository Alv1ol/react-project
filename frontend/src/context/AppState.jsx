import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  items: [], // Все элементы
  filteredItems: [], // Фильтрованные элементы
  selectedItems: [], // Выбранные элементы
  searchQuery: "",
  sortOrder: [], // Порядок отображения элементов
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_FILTERED_ITEMS":
      return { ...state, filteredItems: action.payload };
    case "TOGGLE_SELECTION": {
      const newSelectedItems = state.selectedItems.includes(action.payload)
        ? state.selectedItems.filter((id) => id !== action.payload) // Удалить ID
        : [...state.selectedItems, action.payload]; // Добавить ID
      return { ...state, selectedItems: newSelectedItems };
    }
    case "SELECT_ALL": {
      // Выбрать все видимые элементы
      const allVisibleIds = state.filteredItems.map((item) => item.id);
      return { ...state, selectedItems: allVisibleIds };
    }
    case "DESELECT_ALL": {
      // Снять выделение со всех элементов
      return { ...state, selectedItems: [] };
    }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "UPDATE_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "ADD_ITEM": {
      const newItem = action.payload;
      const updatedItems = [...state.items, newItem];
      return {
        ...state,
        items: updatedItems,
        filteredItems: updatedItems.slice(0, 20),
        sortOrder: [...state.sortOrder, newItem.id],
      };
    }
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
    dispatch({ type: "SET_FILTERED_ITEMS", payload: initialItems.slice(0, 20) });
    dispatch({ type: "UPDATE_SORT_ORDER", payload: initialItems.slice(0, 20).map((item) => item.id) });
  }, []);

  // Фильтрация поиска
  useEffect(() => {
    const filtered = state.items.filter((item) =>
      item.value.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    dispatch({ type: "SET_FILTERED_ITEMS", payload: filtered });
  }, [state.searchQuery, state.items]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};