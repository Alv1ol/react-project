import React, { useContext, useTransition } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AppStateContext } from "../context/AppState";
import Item from "./Item";

export const List = () => {
  const { state, dispatch } = useContext(AppStateContext);
  const [isPending, startTransition] = useTransition(); // Используем isPending
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = state.sortOrder.indexOf(active.id);
      const newIndex = state.sortOrder.indexOf(over.id);
      const newOrder = arrayMove(state.sortOrder, oldIndex, newIndex);

      // Используем startTransition для оптимизации
      startTransition(() => {
        dispatch({ type: "UPDATE_SORT_ORDER", payload: newOrder });
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* Отображаем индикатор загрузки */}
      {isPending && <div style={{ color: "blue" }}>Сортировка...</div>}

      <SortableContext items={state.sortOrder} strategy={verticalListSortingStrategy}>
        {state.filteredItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
};