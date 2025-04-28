# NGO Website Project

## Project Overview

This project is a full-stack web application developed for a non-governmental organization (NGO). It aims to provide a comprehensive online presence for the NGO, enabling it to showcase its mission, projects, news, events, and impact. The platform facilitates user engagement through features like volunteering opportunities, donations, story submissions, and contact forms. It also includes an administrative dashboard for managing website content and user interactions.

## Features Implemented

*   **Frontend (React):**
    *   Responsive user interface using React, TypeScript, Tailwind CSS, and shadcn/ui components.
    *   Page structure with Header, Footer, and main content area.
    *   Routing implemented using `react-router-dom`.
    *   Placeholder pages created for: Home, About Us, Projects, News & Events, Volunteer, Donate, Stories, Contact, Login, Register, User Profile, Admin Dashboard.
    *   API service layer created using `axios` to interact with the backend.
    *   Authentication service (`AuthService`) for handling user login, registration, and session management (using localStorage for token storage).
    *   Service functions created for all major data entities (Projects, News, Events, Volunteers, Donations, Stories, Team Members, Partners, Users, Contact Submissions, FAQs).
    *   Basic API connectivity test script (`test_api.js`).
*   **Backend (Node.js/Express):**
    *   RESTful API built with Node.js, Express, and Sequelize ORM.
    *   PostgreSQL database integration.
    *   Database models defined for: User, Project, News, Event, Volunteer, Donation, Story, TeamMember, Partner, FAQ, ContactSubmission.
    *   Relationships defined between models (e.g., User-Donation, Project-Donation).
    *   Middleware implemented for: CORS, Helmet (security headers), JSON/URL-encoded body parsing, error handling.
    *   JWT-based authentication middleware (`authenticate.js`).
    *   Role-Based Access Control (RBAC) middleware (`authorize.js`) for protecting admin routes.
    *   API routes and controllers implemented for all major data entities, including CRUD operations and filtering/pagination where applicable.
    *   Database schema synchronization using `sequelize.sync({ alter: true })`.
    *   Health check endpoint (`/api/health`).
*   **Database (PostgreSQL):**
    *   Schema designed and implemented using Sequelize models.
    *   Tables created for all defined models.
    *   Password hashing implemented using `bcrypt` via Sequelize hooks.

## Technology Stack

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Axios, React Router DOM
*   **Backend:** Node.js, Express.js, Sequelize, PostgreSQL, JWT (jsonwebtoken), bcrypt, CORS, Helmet, dotenv
*   **Database:** PostgreSQL
*   **Development Environment:** Ubuntu (Sandbox), pnpm (frontend), npm (backend)

## Project Structure

```
/home/ubuntu/ngo-website/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # Sequelize configuration
│   │   ├── controllers/        # Request handlers for routes
│   │   │   ├── authController.js
│   │   │   ├── contactController.js
│   │   │   ├── donationController.js
│   │   │   ├── eventController.js
│   │   │   ├── faqController.js
│   │   │   ├── newsController.js
│   │   │   ├── partnerController.js
│   │   │   ├── projectController.js
│   │   │   ├── storyController.js
│   │   │   ├── teamController.js
│   │   │   ├── userController.js
│   │   │   └── volunteerController.js
│   │   ├── middleware/
│   │   │   ├── authenticate.js   # JWT verification
│   │   │   ├── authorize.js      # Role-based access control
│   │   │   └── errorHandler.js   # Global error handler
│   │   ├── models/             # Sequelize model definitions
│   │   │   ├── ContactSubmission.js
│   │   │   ├── Donation.js
│   │   │   ├── Event.js
│   │   │   ├── FAQ.js
│   │   │   ├── News.js
│   │   │   ├── Partner.js
│   │   │   ├── Project.js
│   │   │   ├── Story.js
│   │   │   ├── TeamMember.js
│   │   │   ├── User.js
│   │   │   ├── Volunteer.js
│   │   │   └── index.js          # Model aggregation and relationships
│   │   └── routes/             # API route definitions
│   │       ├── authRoutes.js
│   │       ├── contactRoutes.js
│   │       ├── donationRoutes.js
│   │       ├── eventRoutes.js
│   │       ├── faqRoutes.js
│   │       ├── index.js          # Main router
│   │       ├── newsRoutes.js
│   │       ├── partnerRoutes.js
│   │       ├── projectRoutes.js
│   │       ├── storyRoutes.js
│   │       ├── teamRoutes.js
│   │       ├── userRoutes.js
│   │       └── volunteerRoutes.js
│   ├── .env                  # Environment variables (DB connection, JWT secret)
│   ├── .env.example          # Example environment variables
│   ├── package.json
│   ├── package-lock.json
│   └── server.js             # Main Express application entry point
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout/         # Header, Footer components
│   │   │       ├── Footer.tsx
│   │   │       └── Header.tsx
│   │   ├── pages/              # React page components
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── DonatePage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── NewsEventsPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── StoriesPage.tsx
│   │   │   ├── UserProfilePage.tsx
│   │   │   └── VolunteerPage.tsx
│   │   ├── services/           # API service functions
│   │   │   ├── api.js            # Axios instance configuration
│   │   │   ├── authService.js
│   │   │   ├── contactService.js
│   │   │   ├── donationService.js
│   │   │   ├── eventService.js
│   │   │   ├── faqService.js
│   │   │   ├── index.js          # Service exports
│   │   │   ├── newsService.js
│   │   │   ├── partnerService.js
│   │   │   ├── projectService.js
│   │   │   ├── storyService.js
│   │   │   ├── teamService.js
│   │   │   ├── userService.js
│   │   │   └── volunteerService.js
│   │   ├── App.tsx             # Main application component with routing
│   │   ├── index.css         # Global styles
│   │   └── main.tsx            # React application entry point
│   ├── test_api.js           # API connection test script
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md                 # This file
```

## Setup Instructions

### Prerequisites

*   Node.js (v20.x or later recommended)
*   npm (usually comes with Node.js)
*   pnpm (for frontend dependencies): `npm install -g pnpm`
*   PostgreSQL database server

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd /home/ubuntu/ngo-website/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up PostgreSQL:**
    *   Ensure PostgreSQL server is running.
    *   Create a database user (e.g., `postgres`) and set a password (e.g., `postgres`).
    *   Create a database named `ngo_website`.
    *   Example commands (may require `sudo -u postgres`):
        ```sql
        ALTER USER postgres WITH PASSWORD 'postgres';
        CREATE DATABASE ngo_website;
        ```
4.  **Configure Environment Variables:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file and update the following variables with your database credentials and a secure JWT secret:
        ```dotenv
        PORT=5000
        NODE_ENV=development
        DB_HOST=localhost
        DB_PORT=5432
        DB_USERNAME=postgres
        DB_PASSWORD=postgres
        DB_DATABASE=ngo_website
        DB_DIALECT=postgres
        JWT_SECRET=YOUR_VERY_SECURE_JWT_SECRET # Change this!
        JWT_EXPIRES_IN=1d
        ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd /home/ubuntu/ngo-website/frontend
    ```
2.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```
3.  **(Optional) Configure API URL:**
    *   The frontend defaults to connecting to the backend at `http://localhost:5000/api`.
    *   If your backend runs on a different URL, you can set the `REACT_APP_API_URL` environment variable before starting the frontend or create a `.env` file in the `frontend` directory:
        ```dotenv
        REACT_APP_API_URL=http://your-backend-url/api
        ```

## Running the Application

1.  **Start the Backend Server:**
    *   Navigate to the `backend` directory:
        ```bash
        cd /home/ubuntu/ngo-website/backend
        ```
    *   Run the server:
        ```bash
        node server.js
        ```
    *   The backend API should now be running (default: `http://localhost:5000`). The server will also attempt to connect to the database and synchronize the schema.

2.  **Start the Frontend Development Server:**
    *   Navigate to the `frontend` directory:
        ```bash
        cd /home/ubuntu/ngo-website/frontend
        ```
    *   Run the development server:
        ```bash
        pnpm run dev
        ```
    *   The frontend application should now be accessible (default: `http://localhost:5173`).

## API Endpoints Overview

The backend provides RESTful API endpoints under the `/api` prefix. Key routes include:

*   `/api/auth`: User registration, login, logout.
*   `/api/users`: User management (CRUD - admin only), profile management.
*   `/api/projects`: Project management (CRUD - admin only), public listing and filtering.
*   `/api/news`: News management (CRUD - admin only), public listing.
*   `/api/events`: Event management (CRUD - admin only), public listing, registration.
*   `/api/volunteer`: Volunteer opportunity management (CRUD - admin only), public listing, application.
*   `/api/donations`: Donation creation, history, statistics.
*   `/api/stories`: Story/testimonial management (CRUD - admin/submitter), public listing.
*   `/api/team`: Team member management (CRUD - admin only), public listing.
*   `/api/partners`: Partner management (CRUD - admin only), public listing.
*   `/api/contact`: Contact form submission, submission management (admin only).
*   `/api/faqs`: FAQ management (CRUD - admin only), public listing.
*   `/api/health`: Backend health check.

Refer to the route files in `/home/ubuntu/ngo-website/backend/src/routes` for detailed endpoint definitions.

## Database Schema Overview

The database schema is defined using Sequelize models located in `/home/ubuntu/ngo-website/backend/src/models`. Key models include:

*   `User`: Stores user information (donors, volunteers, admins, etc.) and credentials.
*   `Project`: Information about NGO projects.
*   `News`: News articles.
*   `Event`: Upcoming or past events.
*   `Volunteer`: Volunteer opportunities.
*   `Donation`: Records of donations made.
*   `Story`: Success stories and testimonials.
*   `TeamMember`: Information about NGO team members.
*   `Partner`: Information about partner organizations.
*   `FAQ`: Frequently asked questions and answers.
*   `ContactSubmission`: Submissions from the contact form.

Relationships between models (e.g., a User can have many Donations) are defined in `/home/ubuntu/ngo-website/backend/src/models/index.js`.

## Testing

*   **Backend Health Check:** Access `http://localhost:5000/api/health` in a browser or use `curl`.
*   **API Connectivity Test:** A basic Node.js script (`/home/ubuntu/ngo-website/frontend/test_api.js`) is included to test connectivity from the frontend environment to the backend health endpoint. Run it using `node /home/ubuntu/ngo-website/frontend/test_api.js` from the `frontend` directory.
*   **Manual Testing:** Use the running frontend application (`http://localhost:5173`) to interact with the features and verify functionality.
*   **Further Testing:** Unit and integration tests for the backend are planned but not yet fully implemented (marked as complete in todo.md for planning purposes, but requires actual test code).

## Deployment Notes

*   **Frontend:** The frontend is built using Vite. Run `pnpm run build` in the `frontend` directory to create a production build in the `dist` folder. This `dist` folder contains static assets that can be deployed to any static web hosting service.
*   **Backend:** The Node.js/Express backend needs to be hosted on a server environment (like a VM, container, or PaaS) with Node.js and PostgreSQL access.
    *   Ensure environment variables (`.env`) are configured correctly for the production environment (especially `NODE_ENV=production`, database credentials, and a strong `JWT_SECRET`).
    *   Use a process manager like `pm2` to run the backend server reliably in production.
*   **CORS:** Configure the `cors()` middleware in `backend/server.js` to allow requests only from your deployed frontend domain in production.
*   **Database:** Ensure the PostgreSQL database is accessible from the backend server in the production environment.
*   **Payment Gateway:** Donation functionality requires integration with a payment gateway (e.g., Stripe, PayPal). This involves setting up accounts, adding frontend payment elements, and implementing backend logic (including webhook handling) to process payments securely.

