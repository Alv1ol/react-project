import React, { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AppStateContext } from "../context/AppState";

const Item = ({ item }) => {
  const { state, dispatch } = useContext(AppStateContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
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
        backgroundColor: state.selectedItems.includes(item.id) ? "#e0f7fa" : "#040404",
      }}
      {...attributes}
      {...listeners}
    >
      <input
        type="checkbox"
        checked={state.selectedItems.includes(item.id)}
        onChange={() => dispatch({ type: "TOGGLE_SELECTION", payload: item.id })}
      />
      <span style={{ marginLeft: "8px" }}>{item.value}</span>
    </div>
  );
};

export default Item;