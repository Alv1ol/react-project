import React, { useContext, useState, useRef } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AppStateContext } from "../context/AppState";
import {Item} from "./Item";
import { FixedSizeList as ListVirtualized } from "react-window";

export const List = () => {
  const { state, dispatch } = useContext(AppStateContext);
  const [newItemText, setNewItemText] = useState(""); // Состояние для нового элемента
  const listRef = useRef(null); // Ссылка на виртуализированный список

  // Настройка датчиков для Drag & Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Обработка окончания перетаскивания
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = state.sortOrder.indexOf(active.id);
      const newIndex = state.sortOrder.indexOf(over.id);
      const newOrder = arrayMove(state.sortOrder, oldIndex, newIndex);

      // Обновляем порядок отображения
      dispatch({ type: "UPDATE_SORT_ORDER", payload: newOrder });
    }
  };

  // Отображаем элементы в порядке sortOrder
  const sortedVisibleItems = state.sortOrder
    .map((id) => state.items.find((item) => item.id === id)) // Находим элементы по ID
    .filter(Boolean); // Убираем undefined (если ID не найден)

  console.log("Sorted Visible Items:", sortedVisibleItems); // Отладочное сообщение

  // Виртуализированный список
  const Row = ({ index, style }) => {
    const item = sortedVisibleItems[index];
    return (
      <div style={style}>
        <Item item={item} />
      </div>
    );
  };

  // Добавление нового элемента
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now(), // Генерируем уникальный ID
      value: newItemText,
    };

    // Обновляем глобальное состояние
    dispatch({ type: "ADD_ITEM", payload: newItem });

    // Очищаем поле ввода
    setNewItemText("");

    // Прокручиваем список к последнему элементу
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToItem(sortedVisibleItems.length - 1, "end");
      }
    }, 0);
  };

  return (
    <div>
      {/* Форма для добавления нового элемента */}
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

      {/* Список элементов */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={state.sortOrder} strategy={verticalListSortingStrategy}>
          <ListVirtualized
            ref={listRef} // Ссылка на виртуализированный список
            height={600} // Высота видимой области
            itemCount={sortedVisibleItems.length} // Общее количество элементов
            itemSize={50} // Высота одного элемента
            width="100%" // Ширина списка
          >
            {Row}
          </ListVirtualized>
        </SortableContext>
      </DndContext>
    </div>
  );
};