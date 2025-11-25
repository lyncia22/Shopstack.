# ShopStack: A Modern E-commerce Platform

ShopStack is a feature-rich mini e-commerce platform built with a modern, full-stack technology set. It serves as a demonstration of end-to-end application development, from a dynamic user interface to a robust backend infrastructure.

## Features

- **Product Catalog:** Browse a wide range of products, organized by category.
- **Dynamic Search & Filtering:** Easily find products by searching, sorting, and filtering by category.
- **Shopping Cart:** A persistent and intuitive shopping cart to add and manage items.
- **User Authentication:** Secure user registration and login functionality powered by Firebase Authentication.
- **Mock Checkout Process:** A simulated checkout flow to complete an order.
- **Responsive Design:** A seamless experience across desktop, tablet, and mobile devices.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication and Firestore)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    This command will install all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start the Next.js application in development mode.
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure

Here's a brief overview of the key directories in the project:

- **/src/app/**: Contains all the pages and routes of the application, following the Next.js App Router structure.
- **/src/components/**: Home to all the reusable React components, including UI elements from ShadCN and custom-built components.
- **/src/lib/**: A collection of library files, including data, utility functions, type definitions, and server-side actions.
- **/src/context/**: Contains React Context providers, such as the `CartProvider` for global state management.
- **/src/firebase/**: Includes all Firebase configuration, initialization, and custom hooks for interacting with Firebase services.
- **/docs/**: Documentation files, including the `backend.json` which blueprints the Firebase structure.
- **/public/**: Static assets that are served directly.
