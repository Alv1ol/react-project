import React, { useContext, useState, useRef } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AppStateContext } from "../context/AppState";
import Item from "./Item";

export const List = () => {
  const { state, dispatch } = useContext(AppStateContext);
  const [visibleItems, setVisibleItems] = useState(state.filteredItems.slice(0, 20));
  const observer = useRef();

  // Логика бесконечной подгрузки через Intersection Observer
  const lastItemRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const currentLength = visibleItems.length;
        const nextItems = state.filteredItems.slice(currentLength, currentLength + 20);
        setVisibleItems((prev) => [...prev, ...nextItems]);
      }
    });
    if (node) observer.current.observe(node);
  };

  // Настройка датчиков для Drag & Drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  // Обработка окончания перетаскивания
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = state.sortOrder.indexOf(active.id);
      const newIndex = state.sortOrder.indexOf(over.id);
      const newOrder = arrayMove(state.sortOrder, oldIndex, newIndex);

      dispatch({ type: "UPDATE_SORT_ORDER", payload: newOrder });
    }
  };

  // Отображаем элементы в порядке sortOrder
  const sortedVisibleItems = state.sortOrder
    .map((id) => state.items.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={state.sortOrder} strategy={verticalListSortingStrategy}>
        {sortedVisibleItems.map((item, index) => (
          <div key={item.id} ref={index === sortedVisibleItems.length - 1 ? lastItemRef : null}>
            <Item item={item} />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
};
