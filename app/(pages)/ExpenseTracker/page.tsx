"use client";
import AddExpenseModal from "@/components/Expenses/AddExpense/AddExpense";
import ExpenseList from "@/components/Expenses/ExpenseCard/ExpenseCard";
import Header from "@/components/Expenses/Header/ExpenseHeader";
import { calculateTotals } from "@/lib/utils";
import { useGetExpensesQuery } from "@/Redux/slices/expensesApiSlice";

function Expenses() {
  const { data, isLoading, error } = useGetExpensesQuery({});

  // Calculate Income & Outcome
  const { totalIncome, totalExpenses, balance } = calculateTotals(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading expenses</p>;
  return (
    <div className="w-full  flex flex-col items-center justify-center max-w-lg mx-auto">
      <Header income={totalIncome} outcome={totalExpenses} balance={balance} />
      <AddExpenseModal />
      <ExpenseList expenses={data || []} />
    </div>
  );
}

export default Expenses;
