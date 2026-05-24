# 🛍️ Exclusive - Premium E-Commerce Storefront

A modern, responsive, and high-fidelity **E-Commerce storefront** built from the ground up to pixel-perfectly match the **Exclusive Figma Design**. Powered by **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Redux Toolkit**.

---

## 🎨 Figma-to-Code Walkthrough

This application is modeled directly after the **Exclusive E-Commerce Figma Canvas**, featuring a complete, high-fidelity implementation of every primary storefront flow.

### 📱 Fully Responsive Screen-by-Screen Implementation
Here is how the codebase maps directly to the Figma page layouts:

| Figma Screen Name | Corresponding Component / Page Path | Key Features |
| :--- | :--- | :--- |
| **Sign Up** | [SignUp.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/signUp/SignUp.tsx) | Formik + Yup validation, Google integration layout, navigation to login. |
| **Log In** | [Login.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/login/Login.tsx) | Secure authentication form, validation state, error handling, password reset route. |
| **Home Page** | [Home.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/home/Home.tsx) | Dynamic category navigation, flash sales, high-fidelity banner sliders (Swiper), grid layouts. |
| **Wishlist** | [Wishlist.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/wishlist/Wishlist.tsx) | Global reactive state for saved items, immediate Add-to-Cart from wishlist, item counters. |
| **Product Detail** | [Details.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/details/Details.tsx) | Multi-image preview selector, size/color variant styling, interactive counters, buy-now button. |
| **Cart** | [Cart.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/cart/Cart.tsx) | Responsive cart table, item quantity controls, subtotal computation, coupon integration space. |
| **Checkout** | [Checkout.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/checkout/Checkout.tsx) | Multi-step billing details, order summary panel, secure radio triggers for Bank/COD options. |
| **Account (Profile)** | [Myaccount.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/myaccount/Myaccount.tsx) | Profile update forms, side-navigation for order histories, responsive layouts. |
| **About** | [About.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/about/About.tsx) | E-Commerce statistics counters, team member carousels (using Swiper), AOS scroll animations. |
| **Contact** | [Contact.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/contact/Contact.tsx) | Direct contact form with form states, map placeholder layout, quick contact options. |
| **404 Not Found** | [Notfound404.tsx](file:///c:/Users/Dell/Desktop/react-2/week-3/my-app2/src/pages/404notfound/Notfound404.tsx) | Custom premium styled page matching the exact design with breadcrumbs and warm red home redirection. |

---

## ⚡ Key Core Features

- **⚡ Fast Code-Splitting & Lazy Loading**: All pages are dynamically split and lazy-loaded via React's `lazy` API, reducing the initial JS bundle size and boosting page load speeds.
- **🛡️ Secure Routing**: Protected routes prevent unauthorized access to crucial checkouts, account profiles, carts, and wishlists.
- **🎨 Tailwind CSS v4 & Shadcn UI**: Leverages modern UI components and variables (`oklch` theme color palettes) for premium dark mode transitions and highly customized interactions.
- **🔄 Dynamic State Management**: Synchronized state across components with Redux Toolkit—items added to cart reflect instantly in the navigation counters, checkout summaries, and detail previews.
- **🌐 Dual-language ready (i18n)**: Fully integrated `i18next` for effortless localization setup.
- **✨ Micro-Animations**: Smooth visual transitions built using `AOS` (Animate On Scroll) and customized CSS keyframe micro-interactions to create a sleek, modern UX.

---

## 🛠️ Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                       EXCLUSIVE APP                         │
├───────────────┬──────────────────────────────┬──────────────┤
│ CORE          │ UI & STYLING                 │ MANAGEMENT   │
│ React 19      │ Tailwind CSS v4              │ Redux Toolkit│
│ TypeScript    │ Shadcn UI / Radix            │ Formik + Yup │
│ Vite          │ Lucide Icons + Swiper        │ Axios        │
└───────────────┴──────────────────────────────┴──────────────┘
```

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) (with Lightning-fast Hot Module Replacement)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
- **Forms**: [Formik](https://formik.org/) & [Yup Validation](https://github.com/jquense/yup)
- **Sliders & Animations**: [Swiper](https://swiperjs.com/) & [AOS](https://michalsnik.github.io/aos/)

---

## 📁 Project Structure

Here is a quick map of the codebase structure:

```bash
src/
├── api/            # API integration calls & helper classes
├── assets/         # Project images, logo vectors, static items
├── components/     # Reusable UI/Shared components
│   ├── model/      # Layout modules like Header and Footer
│   ├── shared/     # General components (Cards, Usermenu, Protection)
│   └── ui/         # Shadcn base primitives (Button, Input, Sheet, etc.)
├── pages/          # Individual screen components mapping to Figma pages
│   ├── 404notfound/# 404 Page (Notfound404)
│   ├── FilterCategory/ # Category Search and Filters sidebar
│   ├── about/      # About & Team Carousel
│   ├── checkout/   # Secure Checkout Layouts
│   ├── home/       # Interactive E-commerce Landing page
│   └── ...         # Product detail, Cart, Profile screens
├── reducer/        # Redux slices (Cart state, Wishlist state, Products)
├── router/         # Lazy route definitions (router.ts)
├── utils/          # Tokens, axios instance config & network defaults
├── App.tsx         # Root routes tree setup
└── main.tsx        # App initialization & Redux Store context provider
```

---

## 🚀 Quick Start Guide

Get the project up and running locally in less than 2 minutes!

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### 2. Clone and Install Dependencies
Navigate into the project directory and install the packages:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to the address shown in the console (usually `http://localhost:5173`).

### 4. Build for Production
To bundle the project into a highly optimized production asset build:
```bash
npm run build
```
This builds static assets into the `dist/` directory, optimized and ready for production deployment (Vercel, Netlify, AWS, etc.).

---

## 💡 Best Development Practices Maintained

- **Keep Components Focused**: Modular UI parts like `FilterSidebar`, `Cards`, `Header`, and `Footer` are decoupled and completely reusable.
- **Strict TypeScript Definitions**: Eliminates runtime issues through descriptive models for Products, Cart Items, API responses, and Redux actions.
- **SEO Ready Structure**: Employs structural elements like `main`, `aside`, `section`, descriptive `<title>` tags, and semantic header levels for standard search optimization indexing.
