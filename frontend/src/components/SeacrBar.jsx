import React, { useContext, useState } from "react";
import { AppStateContext } from "../context/AppState";

export const SearchBar = () => {
  const { dispatch, state } = useContext(AppStateContext);
  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now(),
      value: newItemText,
    };

    dispatch({ type: "ADD_ITEM", payload: newItem });
    setNewItemText("");
  };

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

      {/* Кнопки выбора */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <button onClick={handleSelectAll} style={{ padding: "8px 16px" }}>
          Выбрать все
        </button>
        <button onClick={handleDeselectAll} style={{ padding: "8px 16px" }}>
          Снять выделение
        </button>
      </div>

      {/* Форма для добавления нового элемента */}
      <form onSubmit={handleAddItem} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Введите текст для добавления..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          style={{ padding: "8px", flex: 1 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Добавить
        </button>
      </form>
    </div>
  );
};

