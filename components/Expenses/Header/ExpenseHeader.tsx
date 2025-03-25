export default function Header({ income, outcome,balance }: { income: number; outcome: number ,balance:number}) {
    return (
      <div className="w-full p-4 mx-auto text-center ">
        <h1 className="text-2xl font-bold mb-4 ">Expense Tracker</h1>
        <div className="flex flex-col justify-between  p-4  shadow-md border rounded-lg">
            <div className=" w-[200px] mx-auto p-4 rounded-lg  font-bold text-2xl" >
                <h4 className="whitespace-nowrap">Balance:  <span className="text-cyan-500"> ${balance}</span></h4>
            </div>
          <div className="flex w-full items-center justify-center gap-10 my-5">
          <div className="text-green-600 font-semibold border-2 p-4 rounded-lg border-green-500 ">
            <p>Income</p>
            <p className="text-lg">${income.toFixed(2)}</p>
          </div>
          <div className="text-red-600 font-semibold border-2 p-4 rounded-lg border-red-500 ">
            <p>Expenses</p>
            <p className="text-lg">-${Math.abs(outcome).toFixed(2)}</p>
          </div>
          </div>
        </div>
      </div>
    );
  }
  