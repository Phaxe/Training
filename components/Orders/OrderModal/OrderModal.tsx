import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { OrderData } from "@/lib/types";


interface AddOrderModalProps {
  onSubmit: (values: OrderData) => void;
  onClose: () => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg w-[750px]">
        <h2 className="text-xl font-bold mb-4">Add New Order</h2>
        <Formik<OrderData> // Explicitly set the type of form values
          initialValues={{
            id: String(Date.now()),
            reason: "",
            store_name: "",
            store_logo: "/addlogo.png",
            store_url: "",
            amount: 0,
            active: false,
            decision: null,
            Items: [],
          }}
          validationSchema={Yup.object().shape({
            reason: Yup.string().required("Reason is required"),
            store_name: Yup.string().required("Store name is required"),
            // store_logo: Yup.string().url("Invalid URL"),
            store_url: Yup.string()
              .url("Invalid URL")
              .required("Store URL is required"),
            amount: Yup.number()
              .min(0, "Amount must be positive")
              .required("Amount is required"),
            items: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().required("Item name is required"),
                id: Yup.string().required("Item ID is required"),
                price: Yup.number()
                  .min(0, "Price must be positive")
                  .required("Price is required"),
                quantity: Yup.number()
                  .min(1, "Quantity must be at least 1")
                  .required("Quantity is required"),
              })
            ),
          })}
          onSubmit={(values: OrderData, { resetForm }) => {
            onSubmit(values); // ✅ Now correctly typed
            resetForm();
            onClose();
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col  w-full justify-center gap-5">
              <div>
                <label>Reason</label>
                <Field name="reason" className="border p-2 w-full" />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Store Name</label>
                <Field name="store_name" className="border p-2 w-full" />
                <ErrorMessage
                  name="store_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Store URL</label>
                <Field
                  name="store_url"
                  type="url"
                  className="border p-2 w-full"
                />
                <ErrorMessage
                  name="store_url"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Amount</label>
                <Field
                  name="amount"
                  type="number"
                  className="border p-2 w-full"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Active</label>
                <Field name="active" type="checkbox" className="ml-2" />
              </div>

              {/* Items Field Array */}
              <FieldArray name="Items">
  {({ push, remove }) => (
    <div className="max-h-60 overflow-y-auto border p-2 mt-5 rounded-md">
      <h3 className="font-bold mt-4">Items</h3>
      {values.Items.map((_, index) => (
        <div
          key={index}
          className="border p-2 mb-2 bg-gray-200 rounded"
        >
          <div>
            <label>Item Name</label>
            <Field
              name={`Items.${index}.name`}
              className="border p-2 w-full"
            />
            <ErrorMessage
              name={`Items.${index}.name`}
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label>Item ID</label>
            <Field
              name={`Items.${index}.id`}
              className="border p-2 w-full"
            />
            <ErrorMessage
              name={`Items.${index}.id`}
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label>Price</label>
            <Field
              name={`Items.${index}.price`}
              type="number"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name={`Items.${index}.price`}
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label>Quantity</label>
            <Field
              name={`Items.${index}.quantity`}
              type="number"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name={`Items.${index}.quantity`}
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 mt-2"
          >
            Remove Item
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          push({ name: "", id: "", price: 0, quantity: 1 })
        }
        className="mt-2 text-blue-500"
      >
        Add Item
      </button>
    </div>
  )}
</FieldArray>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Order
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddOrderModal;
