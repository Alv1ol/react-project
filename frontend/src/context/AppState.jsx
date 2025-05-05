import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  items: [],
  filteredItems: [],
  selectedItems: [],
  searchQuery: "",
  sortOrder: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_FILTERED_ITEMS":
      return { ...state, filteredItems: action.payload };
    case "TOGGLE_SELECTION":
      return {
        ...state,
        selectedItems: state.selectedItems.includes(action.payload)
          ? state.selectedItems.filter((id) => id !== action.payload)
          : [...state.selectedItems, action.payload],
      };
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
        filteredItems: updatedItems.slice(0, 1000000), // Обновляем отображаемые элементы
        sortOrder: [...state.sortOrder, newItem.id], // Обновляем порядок сортировки
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
    dispatch({ type: "SET_FILTERED_ITEMS", payload: initialItems.slice(0, 1000000) });
    dispatch({ type: "UPDATE_SORT_ORDER", payload: initialItems.slice(0, 1000000).map((item) => item.id) });
  }, []);

  // Сохранение состояния в localStorage
  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(state.selectedItems));
    localStorage.setItem("sortOrder", JSON.stringify(state.sortOrder));
  }, [state.selectedItems, state.sortOrder]);

  // Восстановление состояния из localStorage
  useEffect(() => {
    const savedSelectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    const savedSortOrder = JSON.parse(localStorage.getItem("sortOrder"));
    if (savedSelectedItems) dispatch({ type: "TOGGLE_SELECTION", payload: savedSelectedItems });
    if (savedSortOrder) dispatch({ type: "UPDATE_SORT_ORDER", payload: savedSortOrder });
  }, []);

  // Фильтрация поиска
  useEffect(() => {
    const filtered = state.items.filter((item) =>
      item.value.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    dispatch({ type: "SET_FILTERED_ITEMS", payload: filtered.slice(0, 20) });
    dispatch({ type: "UPDATE_SORT_ORDER", payload: filtered.slice(0, 20).map((item) => item.id) });
  }, [state.searchQuery, state.items]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};