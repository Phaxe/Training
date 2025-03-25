"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCreateExpenseMutation } from "@/Redux/slices/expensesApiSlice"

// Define validation schema with Yup
const expenseSchema = yup.object().shape({
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
  
type ExpenseFormValues = yup.InferType<typeof expenseSchema>;

export default function AddExpenseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [createExpense] = useCreateExpenseMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: yupResolver(expenseSchema),
    defaultValues: { name: "", amount: 0, type: "expense" },
  });

  const onSubmit = async (data: ExpenseFormValues) => {
    try {
      await createExpense(data);
      reset(); // Reset form after successful submission
      setIsOpen(false); // Close the modal
    } catch (error) {
      console.error("Failed to create expense:", error);
    }
  };

  return (
    <>
      <Button className="w-[150px]  my-2 flex items-center border-white border" onClick={() => setIsOpen(true)}>
         Add New Expense
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-6 max-w-md">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                {...register("amount")}
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={watch("type")}
                onValueChange={(value) => setValue("type", value as "income" | "expense")}
              >
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
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
