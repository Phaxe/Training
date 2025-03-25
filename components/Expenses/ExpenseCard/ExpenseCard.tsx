"use client"
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDeleteExpesesMutation } from "@/Redux/slices/expensesApiSlice"
import EditExpenseModal from "../EditExpense/EditExpense";

import { useSortableExpenses } from "@/lib/hooks";
import SortableExpenseCard from "../SortableCards/SortableCards";
import { ExpenseListProps, ExpensesType } from "@/lib/types";



export default function ExpenseList({ expenses }: ExpenseListProps) {
  const [deleteExpense] = useDeleteExpesesMutation();
  const [selectedExpense, setSelectedExpense] = useState<ExpensesType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Use custom sorting hook
  const { sortedExpenses, handleDragEnd } = useSortableExpenses(expenses || []);

  // ✅ Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }; 

  // ✅ Open edit modal
  const handleEdit = (expense: ExpensesType) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full mx-auto px-4 flex flex-col">
      {/* ✅ Drag-and-drop wrapper */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedExpenses} strategy={verticalListSortingStrategy}>
          <div className="max-h-[400px] overflow-y-auto space-y-3 p-1">
            {sortedExpenses && sortedExpenses.map((expense) => (
              <SortableExpenseCard
                key={expense.id}
                expense={expense}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* ✅ Edit Expense Modal */}
      {selectedExpense && (
        <EditExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} expense={selectedExpense} />
      )}
    </div>
  );
}
