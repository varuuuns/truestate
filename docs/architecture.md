# Architecture Document

## Overview
The Retail Sales Management System is a full-stack web application designed to handle large-scale sales data with advanced search, filtering, and sorting capabilities. It is built using the MERN stack principle (replacing MongoDB with Supabase/PostgreSQL) for a relational data model.

## Technology Stack
- **Frontend**: React (Vite), TailwindCSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.js.
- **Database**: Supabase (PostgreSQL).
- **Authentication**: (Planned Future Scope) Supabase Auth.

## Architecture Diagram
[Frontend (React)] <-> [API Gateway (Express)] <-> [Database (Supabase)]

## Data Flow
1.  **Client-Side**: User interacts with the UI (Filter Panel, Search Bar). State is managed via React `useState` and debounced hooks.
2.  **API Request**: Axios sends async HTTP GET requests to `/api/v1/transactions` with query parameters.
3.  **Server-Side**: Express controller parses parameters (`search`, `sort`, `filter`).
4.  **Database Query**: Supabase Client constructs a dynamic SQL query using the received parameters (Pagination `range`, Filtering `in`, `ilike`).
5.  **Response**: JSON data + Metadata (total count, pages) is returned to the client for rendering.

## Design Decisions
-   **Supabase over MongoDB**: Selected for strong relational capabilities and built-in full-text search features which are optimal for structured sales data.
-   **Server-Side Pagination**: To ensure performance with large datasets, pagination and filtering are handled on the server.
-   **TailwindCSS**: For rapid, consistent, and responsive styling.
-   **Debouncing**: Implemented on Search to reduce API load.

## Directory Structure
-   `backend/`: API logic and database configuration.
-   `frontend/`: React UI and state management.
