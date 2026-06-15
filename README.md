# 🛒 Grocery Shop Billing System
### College Project (MERN Stack)

## 📌 Project Overview

Grocery Shop Billing System হলো একটি Web-based POS (Point of Sale) এবং Inventory Management Application যেখানে দোকানদার পণ্য ম্যানেজ করতে পারবেন, বিল তৈরি করতে পারবেন, স্টক ট্র্যাক করতে পারবেন এবং বিক্রয় রিপোর্ট দেখতে পারবেন।

---

# 🎯 Project Goals

- Product Management
- Inventory Management
- Billing System 
- Invoice Generation (PDF)
- Sales Tracking
- Stock Monitoring
- Revenue Analytics
- User Authentication

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React 19
- Tailwind CSS v4
- HeroUI v3.1.0
- Recharts
- Lucide React
- Authentication (Better Auth)

## Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Image Storage

Recommended:

- ImgBB



---

# 👤 User Roles

## Admin

Can:

- Manage Products
- Create Bills
- View Reports
- Manage Inventory
- View Dashboard Analytics

## Cashier (Optional)

Can:

- Create Bills
- View Products

Cannot:

- Delete Products
- Access Settings

---

# 📊 Dashboard Features

## Summary Cards (optional)

### Total Products

Display total number of products.

### Today's Sales

Display today's revenue.

### Total Revenue

Display all-time revenue.

### Low Stock Products

Display products with low inventory.

---

## Charts (optional)

### Weekly Sales

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

### Monthly Revenue

Revenue comparison chart.

---

## Recent Sales Table

Display:

- Invoice Number
- Customer Name
- Total Amount
- Date

---

## Low Stock Alert

Show products where:

```js
stock <= 10
```

---

# 📦 Product Management

## Add Product

Fields:

| Field | Type |
|---------|---------|
| Product Name | Text |
| Category | Select |
| Brand | Text |
| Purchase Price | Number |
| Selling Price | Number |
| Stock Quantity | Number |
| Unit | Select |
| Barcode | Text |
| Expiry Date | Date |
| Product Image | File |

---

## Categories

- Food
- Beverage
- Dairy
- Snacks
- Fruits
- Vegetables
- Bakery
- Household

---

## Product Features

- Add Product
- Update Product
- Delete Product
- Search Product
- Filter Product
- View Product Details

---

# 🧾 Billing System

## Create Bill

Workflow:

1. Search Product
2. Add To Cart
3. Update Quantity
4. Apply Discount
5. Generate Invoice

---

## Bill Structure

Example:

```txt
Rice          2kg     120
Sugar         1kg      80

Subtotal              200
Discount               20

Total                 180
```

---

## Auto Stock Update

Before Sale:

```txt
Rice = 50
```

After Selling 5:

```txt
Rice = 45
```

---

# 🖨 Invoice System

Invoice Includes:

- Shop Name
- Invoice Number
- Date
- Product List
- Total Amount
- Discount
- Final Amount

Libraries:

- react-to-print
- jspdf

---

# 📈 Sales Reports

## Daily Report

Display:

- Total Bills
- Total Revenue

---

## Monthly Report

Display:

- Monthly Revenue
- Total Orders

---

## Yearly Report

Display:

- Annual Revenue
- Product Sales Statistics

---

# 🗄 Database Design

## Users Collection

```js
{
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date
}
```

---

## Products Collection

```js
{
  productName: String,
  category: String,
  brand: String,
  purchasePrice: Number,
  sellingPrice: Number,
  stock: Number,
  unit: String,
  barcode: String,
  expiryDate: Date,
  image: String,
  createdAt: Date
}
```

---

## Orders Collection

```js
{
  customerName: String,

  products: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      price: Number
    }
  ],

  subtotal: Number,
  discount: Number,
  total: Number,

  paymentMethod: String,

  createdAt: Date
}
```

---

# 🔐 Authentication

## Features

- Login
- Logout
- Protected Routes
- JWT Authentication
- Password Hashing

Packages:

```bash
npm install bcryptjs jsonwebtoken
```

---

# 📂 Frontend Structure

```txt
src
│
├── app
│   ├── dashboard
│   ├── products
│   ├── billing
│   ├── reports
│   ├── login
│
├── components
│   ├── dashboard
│   ├── products
│   ├── billing
│
├── services
├── hooks
├── lib
└── utils
```

---

# 📂 Backend Structure

```txt
server
│
├── controllers
├── models
├── routes
├── middleware
├── config
├── utils
└── server.js
```

---

# 🌐 API Routes

## Auth

```http
POST /api/auth/login
POST /api/auth/register
```

---

## Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

---

## Orders

```http
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

---

## Dashboard

```http
GET /api/dashboard/stats
```

Returns:

```js
{
  totalProducts: 120,
  todaySales: 5400,
  revenue: 80000,
  lowStock: 12
}
```

---

# 🚀 Development Roadmap

## Phase 1

Project Setup

- Next.js
- Express
- MongoDB

---

## Phase 2

Authentication

- Login
- JWT
- Protected Routes

---

## Phase 3

Product CRUD

- Add Product
- Edit Product
- Delete Product

---

## Phase 4

Billing System

- Product Search
- Cart
- Invoice

---

## Phase 5

Stock Management

- Auto Stock Deduction

---

## Phase 6

Dashboard Analytics

- Charts
- Reports
- Statistics

---

## Phase 7

Deployment

Frontend:

- Vercel

Backend:

- Vercel

Database:

- MongoDB Atlas

Images:

- ImgBB

---

# ⭐ Bonus Features (Optional)

## Barcode Scanner

Library:

```bash
npm install html5-qrcode
```

---

## Export Report

- CSV
- PDF

---

## Dark / Light Mode (Mandatory)

Theme Switcher

---

## Customer Purchase History

Track previous purchases.

---

## Top Selling Products

Dashboard ranking section.

---

# 📌 Final Submission Checklist

- [ ] Authentication Completed
- [ ] Product CRUD Completed
- [ ] Billing System Completed
- [ ] Invoice Generation Completed
- [ ] Dashboard Completed
- [ ] Reports Completed
- [ ] Responsive Design Completed
- [ ] Database Connected
- [ ] Image Upload Working
- [ ] Deployment Completed

---

# 🏆 Project Outcome

This project demonstrates:

- Full Stack Development
- REST API Development
- Authentication
- Database Design
- Dashboard Analytics
- Billing System Logic
- Inventory Management
- Real-world Business Application







This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
