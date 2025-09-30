<<<<<<< HEAD
# Advanced React E-Commerce Store

A modern, interactive e-commerce web application built with **React**, **Redux Toolkit**, and **React Query**. Users can browse products, view individual product details, add items to a shopping cart, and see real-time feedback when adding items.

---

## Features

- **Product Browsing:** View a list of products on the homepage with images, titles, descriptions, and prices.
- **Category Filter:** Filter products by category directly from the homepage.
- **Product Details:** Click a product to view a detailed page with larger images, descriptions, and pricing.
- **Shopping Cart:** Add products to a cart with live feedback. View the cart in a sidebar.
- **Responsive Design:** Works across desktops, tablets, and mobile devices.
- **Interactive UI:** Hover effects on product cards, animated cart feedback, and sticky navbar.
- **State Management:** Managed with Redux Toolkit.
- **Data Fetching:** Optimized with React Query (v5+).

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/advanced-ecommerce.git
   cd advanced-ecommerce

---

## Install dependencies

npm install

---

## Run the development server:

npm run dev

---

## Open in browser

The app will typically be available at http://localhost:5173.

---

## Project Structure

src/
├─ api/
│  └─ api.js             # Fetch functions for products and categories
├─ components/
│  ├─ Cart.jsx           # Shopping cart sidebar
│  ├─ ProductCard.jsx    # Product card for homepage grid
│  └─ ProductDetail.jsx  # Individual product page
├─ store/
│  ├─ slices/
│  │  └─ cartSlice.js    # Redux cart state
│  └─ store.jsx          # Redux store configuration
├─ pages/
│  └─ Home.jsx           # Optional homepage component
├─ App.jsx               # Main app routes and layout
└─ index.css             # Global and component styles

---

## Key Components
ProductCard.jsx: Shows product image, title, price, description, and “Add to Cart” button.

ProductDetail.jsx: Shows product details with larger images and detailed description.

Cart.jsx: Displays the shopping cart in a sidebar with item list and totals.

Redux Store: Handles cart state (add/remove items) across the application.

React Query: Fetches products and categories with caching and loading/error states.

---

## Styling
Responsive grid layout for products.

Sticky navbar at the top.

Centered product images and buttons.

Hover effects for product cards and buttons.

Multiline truncation for product descriptions on the homepage.

---

## Notes
Product data is fetched from Fake Store API.

Prices are formatted to always display two decimal places.

Adding a product to the cart provides immediate feedback with a short “Added!” notification.

Navbar and cart button have subtle spacing adjustments for better layout and readability.

Adding a product to the cart provides immediate feedback with a short “Added!” notification.

Navbar and cart button have subtle spacing adjustments for better layout and readability.
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 542c176 (Implement Firebase orders and update Cart & OrderHistory components)
