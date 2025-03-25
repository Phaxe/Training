"use client"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { useUpdateExpenseMutation } from "@/Redux/slices/expensesApiSlice"
import { EditExpenseModalProps, ExpensesType } from "@/lib/types";




type ExpenseFormData = Omit<ExpensesType, "id">;


// ✅ Define validation schema
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .when("type", {
        is: (type: string) => type === "income",
        then: (schema) => schema.positive("Income must be a positive number"),
        otherwise: (schema) => schema.negative("Expense must be a negative number"),
      }),
    type: yup.string().oneOf(["income", "expense"], "Invalid type").required("Type is required"),
  });

export default function EditExpenseModal({ isOpen, onClose, expense }: EditExpenseModalProps) {
  const [updateExpense] = useUpdateExpenseMutation();

  // ✅ Set up React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: expense?.name || "",
      amount: expense?.amount || 0,
      type: expense?.type || "expense",
    },
  });

  // ✅ Update form when expense changes
  useEffect(() => {
    if (expense) {
      reset({
        name: expense.name,
        amount: expense.amount,
        type: expense.type,
      });
    }
  }, [expense, reset]);

  // ✅ Handle form submission
  const onSubmit = async (data: ExpenseFormData) => {
    if (!expense) return;
    try {
      await updateExpense({ id: expense.id, ...data });
      onClose();
    } catch (error) {
      console.error("Failed to update expense", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-md " >
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Amount</Label>
            <Input type="number" {...register("amount")} />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          <div>
            <Label>Type</Label>
            <Select value={watch("type")} onValueChange={(value) => setValue("type", value as "income" || "expense")}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
