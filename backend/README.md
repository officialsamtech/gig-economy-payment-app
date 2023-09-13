# Gig Economy Payment App - Starter Branch

This is the starter branch for the Gig Economy Payment App backend. It includes the bare essentials for setting up authentication and profile management.

## Features

- User Authentication (Sign Up, Sign In, Logout)
- Profile Management (Create, Retrieve, Update)

## Tech Stack

- Node.js
- Express
- SQLite
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/officialsamtech/gig-economy-payment-app.git
    ```

2. Checkout to the starter branch:

    ```bash
    git checkout starter
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Initialize the SQLite database:

    ```bash
    npm run init-db
    ```

### Running the Server

To start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- **Sign Up**: `POST /api/signup`
- **Sign In**: `POST /api/signin`
- **Logout**: `POST /api/logout`

### Profile

- **Create Profile**: `POST /api/profile`
- **Get Profile**: `GET /api/profile`
- **Update Profile**: `PUT /api/profile`
