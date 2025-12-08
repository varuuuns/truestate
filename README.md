# Retail Sales Management System

## Overview
A high-performance dashboard for managing retail sales data. Features advanced filtering, server-side pagination, and real-time search, built with a modern implementation of the MERN stack + Supabase.

## Tech Stack
-   **Frontend**: React, TailwindCSS, Framer Motion
-   **Backend**: Node.js, Express
-   **Database**: Supabase (PostgreSQL)

## Search Implementation Summary
Full-text search is implemented on the backend using PostgreSQL's `ilike` operator (via Supabase) across `customer_name`, `product_name`, and `phone` fields. The frontend uses a custom `useDebounce` hook to optimize API calls.

## Filter Implementation Summary
Multi-select filters are supported for `region`, `category`, and `gender`. The backend constructs dynamic queries to handle any combination of these filters using `AND` logic.

## Sorting Implementation Summary
Sorting is supported for `date`, `quantity`, `final_amount`, and `customer_name`. Both ascending and descending orders are toggled via the UI table headers.

## Pagination Implementation Summary
Server-side pagination is implemented using Supabase's `range()` modifier. The API returns metadata (`total`, `page`, `totalPages`) to drive the frontend pagination controls.

## Setup Instructions

### Prerequisites
1.  Node.js installed.
2.  A Supabase project created.

### Backend Setup
1.  Navigate to `backend`: `cd backend`
2.  Install dependencies: `npm install`
3.  Create `.env` file with your credentials (see `.env.example`).
4.  Place your `sales_data.csv` in `backend/data/`.
5.  Run data import: `node src/scripts/importData.js`
6.  Start server: `npm run dev`

### Frontend Setup
1.  Navigate to `frontend`: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start dev server: `npm run dev`
4.  Open `http://localhost:5173`
