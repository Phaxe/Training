"use client";
import {  useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddOrderModal from "@/components/Orders/OrderModal/OrderModal";
import { Order } from "@/lib/types";
import {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useToggleActiveStatusMutation,
  useUpdateDecisionMutation,

} from "@/Redux/slices/ordersApiSlice";
import OrdersTable from "@/components/Orders/OrdersTable/OrdersTable";
function OrdersPage() {


  const {
    data: orders = [],
    isLoading: loading,
    error,
  } = useGetOrdersQuery();
  const errorMessage = error
  ? "status" in error
    ? `Error ${error.status}: ${JSON.stringify(error.data)}`
    : error.message || "An unknown error occurred"
  : null;
  const [deleteOrderMutation] = useDeleteOrderMutation();
  const [createOrderMutation] = useCreateOrderMutation();
  const [toggleActiveStatus] = useToggleActiveStatusMutation();
  const [updateDecisionMutation] = useUpdateDecisionMutation();
  const handleToggleActive = async (id: string) => {
    try {
      const order = orders.find((order) => order.id === id);
      if (!order) {
        toast.error("Order not found.");
        return;
      }
  
      await toggleActiveStatus({ id, active: !order.active }).unwrap();
      toast.success("Order status updated successfully!");
    } catch {
      toast.error("Failed to update order status.");
    }
  };
  

  // Handle decision change
  const handleDecisionChange = async (id: string, decision: "reject" | "accept" | "escalate") => {
    try {
      await updateDecisionMutation({ id, decision }).unwrap();
      toast.success(`Order decision updated to ${decision}!`);
    } catch {
      toast.error("Failed to update order decision.");
    }
  };
  // Handle adding a new order
  const [isModalOpen, setModalOpen] = useState(false);
  const handleAddOrder = async (newOrder: Order) => {
    try {
      await createOrderMutation(newOrder).unwrap();
      toast.success("Order created successfully!");
      setModalOpen(false);
    } catch {
      toast.error("Failed to create order.");
    }
  };

 
  // Handle deleting an order
  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrderMutation(id).unwrap();
      toast.success("Order deleted successfully!");
    } catch {
      toast.error("Failed to delete order.");
    }
  };

  //Handling search functionality
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterOrders = (orders: Order[], query: string) => {
    if (!query) return orders;

    const lowerCaseQuery = query.toLowerCase();
    return orders.filter((order) => {
      return (
        order.reason.toLowerCase().includes(lowerCaseQuery) ||
        order.store_name.toLowerCase().includes(lowerCaseQuery) ||
        order.store_url.toLowerCase().includes(lowerCaseQuery) ||
        order.id.toString().includes(lowerCaseQuery)
      );
    });
  };

  const filteredOrders = filterOrders(orders, searchQuery);

  //Here to pass the max item per page and the total page to dynamicly pass it through tables
  const maxItems = 15;
  const totalPages = Math.ceil(filteredOrders.length / maxItems); // Calculate total pages

  // Here to pass table headers depending on the table needs
  const tableHeaders = [
    { key: "id", label: "ID" },
    { key: "reason", label: "Reason" },
    { key: "store_name", label: "Store Name" },
    { key: "store_logo", label: "Store Logo" },
    { key: "store_url", label: "Store URL" },
    { key: "amount", label: "Amount" },
    { key: "active", label: "Active" },
    { key: "actions", label: "Actions" },
    { key: "view", label: "View" },
    { key: "delete", label: "Delete" },
  ];
  //calling and passing props to the generic table
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Reason, Store Name, Store URL, or ID"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded-lg p-2 w-full md:w-1/2"
          />
          <Button
            onClick={() => setModalOpen(true)}
            className="flex-end self-end bg-blue-600"
          >
            Add new order
          </Button>
        </div>
        <div className="w-full">
          <OrdersTable
            tableHeaders={tableHeaders}
            tableRows={filteredOrders}
            tableClassName="my-10 w-full"
            loading={loading}
            maxItems={15}
            totalPages={totalPages}
            error={errorMessage}
            onToggleActive={handleToggleActive}
            onDecisionChange={handleDecisionChange}
            deleteOrder={handleDeleteOrder}
          />
        </div>
      </div>
      {isModalOpen && (
        <AddOrderModal
          onSubmit={(values) => handleAddOrder(values as Order)}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default OrdersPage;
