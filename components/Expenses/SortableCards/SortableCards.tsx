    import { Card } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { GripVertical, Pencil, Trash2 } from "lucide-react";
    import { useSortable } from "@dnd-kit/sortable";
    import { CSS } from "@dnd-kit/utilities";
import {  SortableExpenseCardProps } from "@/lib/types";





    export default function SortableExpenseCard({ expense, handleEdit, handleDelete }: SortableExpenseCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: expense.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card ref={setNodeRef} style={style} className="flex flex-row items-center justify-between p-4 ">
        <div className="flex items-center gap-3">
            {/* ✅ Drag Handle */}
            <GripVertical {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-300" />
            <div>
            <p className="font-semibold text-lg ">{expense.name}</p>
            <p className={`${expense.type === "income" ? "text-green-500" : "text-red-500"} font-semibold`}>
                ${expense.amount}
            </p>
            </div>
        </div>
        <div className="flex">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(expense)}>
            <Pencil className="w-4 h-4 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(expense.id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
        </div>
        </Card>
    );
    }
