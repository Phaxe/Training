This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Hello there, I started this mini project with installing Nextjs, shadcn, redux, redux-toolkit, toastify, axios and lucid-reacte 
1. Created the folder structure for Redux to manage the state inside it 
2. created lib/utils for small utils functions
3. inside component there will be my own components (sidebar and ordersTable) and inside ui will be the shadcn components
4. i used at the start json-server to mock the data untill i achived the desired goals regarding the task
5. when trying to deploy it on vercel with json-server would take alot of time so i used mockapi to deploy it faster
6. changed some settings and configration on vercel.com to deploy it succsesfuly 
7. created both pages for /orders which will take you to the orders table
8. created single order page which you can navigate to from the table or manually with /order/#
9. responsive side bar with toggle options and 2 navigation links one to the dashboard and the second to the orders table page