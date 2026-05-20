# Zojatech Frontend Developer Assessment

<div align="center">

![Buddy Finance](https://img.shields.io/badge/Buddy-Finance%20Dashboard-F97316?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

**A pixel-perfect conversion of the Buddy Finance Figma design into a fully integrated React application.**

[Live Demo](#) · [Figma Design](https://www.figma.com/design/lQrEPAxRaQlkLJxNXZttuh/Test-design?node-id=631-2259&t=RT7Bp4SAsmVKyyOL-0) · [API Docs](https://documenter.getpostman.com/view/23819134/2s8YekQZzc)

</div>

---

## Overview

This project is a frontend implementation of the **Buddy** financial management platform, built as part of the Zojatech Frontend Developer technical assessment. It converts a provided Figma design into a fully functional, responsive React application integrated with the provided REST API endpoints.

The platform enables companies to track real-time financial performance, monitor project budgets against actual revenue and expenses, and generate highlighted reports on budget deficits, surpluses, and sales margins.

---

## Features

- **Authentication Flow** — Register, login, email OTP verification, and success screens with full form validation and character counting
- **Protected Routes** — Route guards redirect unauthenticated users; auth state persisted via Redux
- **Finance Dashboard** — Real-time company financial overview with live data from API
- **Project Budget Tracking** — Compare project budgets against actual revenue and expenses
- **Financial Reports** — Budget deficit/surplus highlights, accounting dimensions, balance sheets, and sales margin estimation
- **Chat (Simulated)** — In-app messaging UI powered by `localStorage` as specified in the brief
- **Pixel-perfect UI** — Built directly from Figma specs including exact dimensions, spacing, border radii, and typography
- **Responsive Design** — Optimised for desktop; graceful degradation on smaller screens

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v3 |
| State Management | Redux Toolkit + RTK Query |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| HTTP Client | RTK Query (built on Fetch API) |
| Chat Persistence | localStorage |
| Linting | ESLint + TypeScript ESLint |

---

## Project Structure

```
src/
├── assets/               # SVGs, images, logo
├── components/           # Shared/reusable UI components
│   └── ui/
├── features/             # Redux slices + RTK Query endpoints
│   ├── auth/
│   ├── projects/
│   └── chat/
├── layouts/              # Page shell layouts (AuthLayout, DashboardLayout)
├── pages/                # Route-level page components
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── RegisterOptions.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── VerifyEmail.tsx
│   │   └── RegisterSuccess.tsx
│   └── dashboard/
├── store/                # Redux store configuration
├── router/               # Route definitions and guards
├── types/                # Shared TypeScript interfaces
└── utils/                # Helper functions
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Rengkat/zojatech-assessment.git
cd zojatech-assessment

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=https://your-api-base-url.com
```

> Refer to the [Postman collection](https://documenter.getpostman.com/view/23819134/2s8YekQZzc) for all available endpoints and expected request/response shapes.

---

## Design Implementation Notes

- Layout is based on a **1400 × 1024** Figma frame
- The auth form card is **489px wide**, **50px padded**, with an **8px border radius** and **160px top offset** — implemented precisely with Tailwind arbitrary values
- The **"Get Help" button** is positioned flush with the right border of the form card, not the viewport
- The **copyright line** aligns horizontally with the bottom border of the form card on the left column
- OTP input supports **keyboard navigation**, **backspace-to-previous**, and **paste-to-fill** across all four digit boxes
- All form inputs are **controlled components** with live character counters enforced via `maxLength`

---

## Assessment Brief

> Submitted in response to the Zojatech Frontend Developer Technical Assessment issued on **19 May 2026**, with a submission deadline of **22 May 2026**.
>
> Requirements met:
> - ✅ Figma design converted to React
> - ✅ API endpoints integrated via Postman collection
> - ✅ Public GitHub repository maintained with git log
> - ✅ Application hosted at a publicly accessible URL
> - ✅ Chat section simulated with localStorage (no API available)
> - ✅ React used as the required framework

---

## Author

**Alex**
Frontend Developer
[GitHub](https://github.com/Rengkat) · Built for Zojatech Limited
