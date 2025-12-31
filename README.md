# Never Alone - Frontend

Modern event management platform frontend built with **Next.js 16**, **React 19**, and **TailwindCSS 4**. A professional event discovery and booking platform with role-based dashboards, real-time management, and seamless payment integration.

---

## 📋 Overview

Never Alone is a comprehensive event management platform connecting users for memorable experiences. The platform delivers:

-   🏠 **Public Landing Page** - Hero section with event discovery and featured events carousel
-   🔍 **Event Discovery** - Advanced filtering, search, and category-based browsing
-   💳 **Seamless Booking** - Intuitive booking flow with Stripe payment integration
-   📊 **Multi-Role Dashboards** - Dedicated interfaces for Users, Hosts, and Administrators
-   📱 **Responsive Design** - Mobile-first approach across all pages and dashboards
-   🎨 **Modern UI** - Smooth animations, Lottie effects, and professional animations
-   🔐 **Secure Authentication** - JWT-based auth with protected routes

---

## 🛠️ Tech Stack

| Layer             | Technology          | Version |
| ----------------- | ------------------- | ------- |
| **Framework**     | Next.js App Router  | 16      |
| **Runtime**       | React + TypeScript  | 19      |
| **Styling**       | TailwindCSS         | 4       |
| **UI Components** | Radix UI Primitives | Latest  |
| **Carousel**      | Embla Carousel      | Latest  |
| **Validation**    | Zod                 | Latest  |
| **Animations**    | Lottie Player       | Latest  |
| **Payment**       | Stripe Integration  | Latest  |

---

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (commonLayout)/            # Public Pages Layout
│   │   ├── page.tsx               # Home page
│   │   ├── about-us/              # About page
│   │   ├── events/                # Event listing & details
│   │   │   ├── page.tsx           # All events
│   │   │   └── [id]/              # Event details
│   │   └── (auth)/                # Auth pages
│   │       ├── login/
│   │       ├── register/
│   │       └── forgot-password/
│   │
│   ├── (dashboardLayout)/         # Protected Dashboards
│   │   ├── admin/                 # Admin panel
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── events/
│   │   │   └── reports/
│   │   ├── host/                  # Host dashboard
│   │   │   ├── dashboard/
│   │   │   ├── events/
│   │   │   └── bookings/
│   │   └── user/                  # User dashboard
│   │       ├── dashboard/
│   │       ├── my-bookings/
│   │       └── profile/
│   │
│   ├── booking/                   # Booking Flow
│   │   ├── success/               # After successful payment
│   │   └── cancel/                # Payment cancelled
│   │
│   ├── api/                       # API Route Handlers
│   │   └── auth/                  # Authentication endpoints
│   │
│   ├── layout.tsx                 # Root layout
│   └── error.tsx                  # Error boundary
│
├── components/                    # Reusable Components
│   ├── common/                    # Shared Components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ManagementTable.tsx
│   │   ├── SearchFilter.tsx
│   │   ├── LottieAnimation.tsx
│   │   └── PageLoader.tsx
│   │
│   ├── modules/                   # Feature-Based Modules
│   │   ├── About/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Events/
│   │   ├── Home/
│   │   ├── Host/
│   │   ├── MyProfile/
│   │   └── User/
│   │
│   └── ui/                        # UI Kit (Radix Based)
│       ├── accordion/
│       ├── button/
│       ├── card/
│       ├── dialog/
│       ├── dropdown-menu/
│       ├── input/
│       ├── label/
│       ├── carousel/
│       ├── select/
│       └── tabs/
│
├── hooks/                         # Custom React Hooks
│   ├── useDebounce.ts
│   ├── useAuth.ts
│   └── useUser.ts
│
├── lib/                           # Utilities & Helpers
│   ├── auth-utils.ts              # Authentication helpers
│   ├── formatters.ts              # Data formatting
│   ├── serverFetchHelper.ts       # Server-side API calls
│   ├── zodValidator.ts            # Validation helpers
│   └── constants.ts               # App constants
│
├── service/                       # API Service Layer
│   ├── admin.service.ts
│   ├── auth.service.ts
│   ├── booking.service.ts
│   ├── events.service.ts
│   └── review.service.ts
│
├── types/                         # TypeScript Interfaces
│   ├── admin.d.ts
│   ├── event.d.ts
│   ├── host.d.ts
│   ├── user.d.ts
│   └── dashboard.d.ts
│
├── zod/                           # Validation Schemas
│   ├── auth.schema.ts             # Login, Register, Password Reset
│   ├── booking.schema.ts          # Booking form validation
│   ├── event.schema.ts            # Event creation/update
│   ├── user.schema.ts             # User profile validation
│   └── host.schema.ts             # Host-specific validation
│
├── assets/                        # Static Assets
│   ├── lotties/                   # Lottie animation files
│   └── images/
│
├── middleware.ts                  # Next.js middleware
├── env.ts                         # Environment configuration
└── globals.css                    # Global styles

public/                            # Static files
├── images/
├── icons/
└── fonts/
```

---

## 🎯 Key Features

### 🏠 **Public Pages**

-   **Landing Page** - Hero section, event carousel, featured events, testimonials
-   **About Page** - Platform information and team details
-   **Event Listing** - Browse events with advanced filters (category, date, price, location)
-   **Event Details** - Full event information, reviews, booking button
-   **Authentication** - Login, Register, Password Reset with JWT

### 👤 **User Dashboard**

-   **Dashboard Overview** - Quick stats and upcoming bookings
-   **My Bookings** - View all bookings with status tracking
-   **My Profile** - Edit profile information and preferences
-   **Search & Filter** - Find events by category, date, price range
-   **Wishlist** - Save favorite events for later

### 🏢 **Host Dashboard**

-   **Dashboard Overview** - Event stats, earnings, booking analytics
-   **Manage Events** - Create, edit, delete hosted events
-   **View Bookings** - Track bookings for all events
-   **Revenue Analytics** - Monitor earnings and performance metrics
-   **Event Promotion** - Tools to promote and manage event visibility

### 👨‍💼 **Admin Dashboard**

-   **System Overview** - Total users, events, bookings, revenue metrics
-   **User Management** - View, edit, suspend, or remove users
-   **Event Management** - Approve, reject, or feature events
-   **Booking Management** - Monitor all platform bookings
-   **Category Management** - Create and manage event categories
-   **Reports & Analytics** - Detailed platform performance reports

### 💳 **Payment System**

-   **Stripe Integration** - Secure credit card payments
-   **Payment Flow** - Seamless checkout experience
-   **Success/Cancel Pages** - Payment status confirmation
-   **Invoice Generation** - Automatic receipt generation
-   **Refund Management** - Automated refund processing

### 🎨 **UI Components & Animations**

-   **Radix UI Components** - Accessible and customizable UI primitives
-   **Embla Carousel** - Smooth image carousels for events
-   **Lottie Animations** - Professional animations on login/register
-   **Theme Toggle** - Light/Dark mode support
-   **Responsive Tables** - Data management with sorting and filtering
-   **Modal Dialogs** - Confirmation dialogs and modals
-   **Skeleton Loading** - Placeholder skeletons while loading

---

## 🚀 Quick Start

### Prerequisites

-   **Node.js** (LTS version recommended)
-   **npm** or **pnpm** package manager
-   **Environment Variables** (`.env.local` file)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd never_alone_client

# Install dependencies
pnpm install
# or
npm install

# Create environment file
cp .env.example .env.local

# Run development server
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build && pnpm start
# or
npm run build && npm start
```

---

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Authentication
NEXT_PUBLIC_AUTH_COOKIE_NAME=authToken

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key

# Third-party Services
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🏗️ Code Architecture

### Component Structure

-   **Server Components** - Data fetching and page structure (default in App Router)
-   **Client Components** - Interactive features (marked with `'use client'`)
-   **Smart/Container Components** - State management and API calls
-   **Presentational Components** - UI rendering only

### State Management

-   **React Server Components** - For static/server-rendered content
-   **Client Components with Hooks** - For interactive features
-   **Context API** - For global auth and theme state
-   **Custom Hooks** - `useAuth`, `useUser`, `useDebounce`

### API Integration

-   **Service Layer** - Centralized API calls in `src/service/`
-   **Server Fetch Helper** - Secure server-side data fetching
-   **Request/Response Interceptors** - Handle auth tokens and errors

### Form Validation

-   **Zod Schemas** - Type-safe validation in `src/zod/`
-   **React Hook Form** - Efficient form management
-   **Real-time Validation** - Instant field-level validation

---

## 📦 Dependencies

### Core

-   `next` - React framework with App Router
-   `react` & `react-dom` - UI library
-   `typescript` - Type safety

### Styling & UI

-   `tailwindcss` - Utility-first CSS framework
-   `@radix-ui/*` - Accessible UI components
-   `embla-carousel` - Carousel component
-   `lottie-react` - Animation library

### Forms & Validation

-   `zod` - Schema validation
-   `react-hook-form` - Efficient form handling

### Payment

-   `@stripe/react-js` - Stripe payment integration
-   `@stripe/js` - Stripe SDK

### Utilities

-   `axios` - HTTP client
-   `js-cookie` - Cookie management
-   `clsx` - Conditional class names

---

## 🔐 Security Features

-   **JWT Authentication** - Secure token-based auth
-   **Protected Routes** - Client-side route protection
-   **HTTPS Only** - Secure cookie transmission
-   **CORS Configuration** - Restricted API access
-   **Input Validation** - Zod schema validation
-   **XSS Protection** - React's built-in XSS prevention
-   **CSRF Tokens** - Server-side request verification

---

## 📱 Responsive Design

The application is fully responsive across:

-   **Mobile** - Enhanced mobile-first design
-   **Tablet** - Optimized layouts for tablets
-   **Desktop** - Full-featured desktop experience

---

## 🔗 Links

-   🌐 **[Live Frontend](https://never-alone-client.vercel.app)**
-   🌐 **[Live Backend API](https://never-alone-server.onrender.com)**
-   📦 **[Frontend Repository](https://github.com/asraful-devs/Never_Alone_Client)**
-   📦 **[Backend Repository](https://github.com/asraful-devs/Never_Alone_Server)**

---

## 📄 License

This project is open-source. See LICENSE file for details.

---

## 👨‍💻 Developer

Developed with ❤️ by **Md. Asraful Islam**

For questions or support, reach out via the repository issues section.
