
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL
export const expensesApi = createApi({
    reducerPath:"expensesApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    tagTypes:["Expenses"],
    endpoints:(build) => ({
        getExpenses: build.query({
            query:() => "/Expenses",
            providesTags:["Expenses"],
        }),
        deleteExpeses:build.mutation({
            query:(id)=>({
                url:`/Expenses/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: ["Expenses"],
            
        }),
        updateExpense: build.mutation({
            query: ({ id, ...expense }) => ({
                url: `/Expenses/${id}`,
                method: "PUT", // or "PATCH" if your API supports partial updates
                body: expense,
            }),
            invalidatesTags: ["Expenses"],
        }),
        createExpense:build.mutation({
            query:(expense)=>({
                url:"/Expenses",
                method:"POST",
                body:expense
            }),
            invalidatesTags: ["Expenses"],
        })
    }),
})
export const {useGetExpensesQuery , useDeleteExpesesMutation , useCreateExpenseMutation, useUpdateExpenseMutation} = expensesApi
