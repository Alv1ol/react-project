import React, { useContext } from "react";
import { AppStateContext } from "../context/AppState";

export const SearchBar = () => {
  const { dispatch, state } = useContext(AppStateContext);

  const handleSelectAll = () => {
    dispatch({ type: "SELECT_ALL" });
  };

  const handleDeselectAll = () => {
    dispatch({ type: "DESELECT_ALL" });
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск..."
        value={state.searchQuery}
        onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
        style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
      />

      {/* Индикация выбранных элементов */}
      <div style={{ marginBottom: "8px" }}>
        Выбрано элементов: {state.selectedItems.length}
      </div>

      {/* Кнопки выбора */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <button onClick={handleSelectAll} style={{ padding: "8px 16px" }}>
          Выбрать все
        </button>
        <button onClick={handleDeselectAll} style={{ padding: "8px 16px" }}>
          Снять выделение
        </button>
      </div>
    </div>
  );
};
