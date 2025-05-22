import React, { useContext, useState, useRef, useCallback } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AppStateContext } from "../context/AppState";
import  Item  from "./Item";
import { FixedSizeList as ListVirtualized } from "react-window";

export const List = () => {
  const { state, dispatch } = useContext(AppStateContext);
  const [newItemText, setNewItemText] = useState("");
  const listRef = useRef(null);
  const loadingRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Обработчик скролла для бесконечной загрузки
  const handleScroll = useCallback(({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
    if (loadingRef.current || scrollUpdateWasRequested || !listRef.current) return;

    const { offsetHeight, scrollHeight } = listRef.current;
    const isNearBottom = scrollOffset + offsetHeight >= scrollHeight - 100;

    if (scrollDirection === "forward" && isNearBottom) {
      loadingRef.current = true;
      dispatch({ type: "INCREASE_VISIBLE_COUNT", payload: 20 });
      setTimeout(() => {
        loadingRef.current = false;
      }, 200);
    }
  }, [dispatch]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = state.sortOrder.indexOf(active.id);
      const newIndex = state.sortOrder.indexOf(over.id);
      const newOrder = arrayMove(state.sortOrder, oldIndex, newIndex);
      dispatch({ type: "UPDATE_SORT_ORDER", payload: newOrder });
    }
  };

  const sortedVisibleItems = state.sortOrder
    .map((id) => state.items.find((item) => item.id === id))
    .filter(Boolean);

  const Row = ({ index, style }) => {
    const item = sortedVisibleItems[index];
    return (
      <div style={style}>
        <Item item={item} />
      </div>
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now(),
      value: newItemText,
    };

    dispatch({ type: "ADD_ITEM", payload: newItem });
    setNewItemText("");

    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToItem(sortedVisibleItems.length - 1, "end");
      }
    }, 0);
  };

  return (
    <div>
      <form onSubmit={handleAddItem} style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Введите текст для добавления..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Добавить
        </button>
      </form>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={state.sortOrder} strategy={verticalListSortingStrategy}>
          <ListVirtualized
            ref={listRef}
            height={600}
            itemCount={sortedVisibleItems.length}
            itemSize={50}
            width="100%"
            onScroll={handleScroll}
          >
            {Row}
          </ListVirtualized>
        </SortableContext>
      </DndContext>
    </div>
  );
};