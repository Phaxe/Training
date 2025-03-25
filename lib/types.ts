export interface ExpensesType {
    id: string;
    name: string;
    amount: number;
    type: "income" | "expense";
  }
  
  export interface ExpenseListProps {
    expenses: ExpensesType[];
  }
  
  export interface SortableExpenseCardProps {
    expense: ExpensesType;
    handleEdit: (expense: ExpensesType) => void;
    handleDelete: (id: string) => void;
  }
  
  export interface EditExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    expense: ExpensesType | null;
  }
  export interface TableDataProps {
    id:number,
    name:string,
    email:string,
    phone:number,
    company:{
      name:string
    }
  }
  // src/types/types.ts

export interface OrderItem {
    name: string;
    id: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision: null | "reject" | "accept" | "escalate";
    Items: OrderItem[];
  }
  
  export interface OrderData {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision: null;
    Items: OrderItem[];
  }
  
  export interface OrdersState {
    data: Order[];
    loading: boolean;
    error: string | null;
    status: boolean;
  }