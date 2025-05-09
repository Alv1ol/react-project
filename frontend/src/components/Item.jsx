import React, { useContext, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AppStateContext } from "../context/AppState";

const Item = ({ item }) => {
  const { state, dispatch } = useContext(AppStateContext);

  // Вызываем useSortable всегда, вне зависимости от наличия item
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item?.id || null });

  // Проверяем, что item существует
  if (!item) {
    console.warn("Item is undefined or null");
    return null;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  const handleToggleSelection = () => {
    dispatch({ type: "TOGGLE_SELECTION", payload: item.id });
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "8px",
        border: "1px solid #ccc",
        marginBottom: "4px",
        backgroundColor: state.selectedItems.includes(item.id) ? "#020202" : "black",
        cursor: "grab",
      }}
      {...attributes} // Используем attributes
      {...listeners}  // Используем listeners
    >
      <input
        type="checkbox"
        checked={state.selectedItems.includes(item.id)}
        onChange={handleToggleSelection}
      />
      <span style={{ marginLeft: "8px" }}>{item.value}</span>
    </div>
  );
};

export default memo(Item);