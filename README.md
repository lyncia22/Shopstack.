
ShopStack is a feature‑rich mini e‑commerce platform built with a modern, full‑stack technology set. It serves as a demonstration of end‑to‑end application development, from a dynamic user interface to a robust backend infrastructure.

## Features
- Product Catalog: Browse a wide range of products, organized by category.  
- Dynamic Search & Filtering: Easily find products by searching, sorting, and filtering by category.  
- Shopping Cart: A persistent and intuitive shopping cart to add and manage items.  
- User Authentication: Secure user registration and login functionality powered by Firebase Authentication.  
- Mock Checkout Process: A simulated checkout flow to complete an order.  
- Responsive Design: A seamless experience across desktop, tablet, and mobile devices.

## Technology Stack
- Framework: [Next.js](https://nextjs.org/) (with App Router)  
- Language: [TypeScript](https://www.typescriptlang.org/)  
- Styling: [Tailwind CSS](https://tailwindcss.com/)  
- UI Components: [ShadCN/UI](https://ui.shadcn.com/)  
- Backend & Database: [ MongoDB andFirebase](https://firebase.google.com/) 
- Form Management: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation  

## Getting Started
Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or later)  
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup
1. *Clone the repository*  
   

   git clone https://github.com/lyncia22/ShopStack.git
   cd ShopStack
   

2. Install dependencies
   npm install
   

3. Run the development server
   npm run dev
   

4. Open the application
Open http://localhost:9003 with your browser to see the result.

## Backend Setup (MongoDB + Express)
If you prefer a Node‑based backend instead of (or in addition to) Firebase, follow these steps to add a MongoDB + Express API that runs on port 4000.

1. *Create a server folder and initialise it*
   mkdir -p server
   cd server
   npm init -y
   npm i express mongoose cors dotenv
   npm i -D typescript @types/express @types/mongoose ts-node
   

2. Create server/index.ts
   import express from 'express';
   import mongoose from 'mongoose';
   import cors from 'cors';
   import dotenv from 'dotenv';
   dotenv.config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   mongoose.connect(process.env.MONGODB_URI!)
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.error('MongoDB connection error:', err));

   // Example route – replace with your own API logic
   app.get('/api/products', (req, res) => {
       res.json({ msg: 'Products will live here' });
   });

   const PORT = process.env.PORT || 4000;
   app.listen(PORT, () => console.log(Server running on :${PORT}));
   

3. *Add a .env file* at the project root (or extend an existing one) with:
   MONGODB_URI=mongodb://localhost:27017/shopstack
   

4. Add a convenience script to package.json (outside the server folder):
   "scripts": {
     // ...other scripts
     "server": "ts-node server/index.ts"
   }
   

5. Run the server (in a separate terminal):
   npm run server
   

The Next.js app will still serve on http://localhost:9003, while the Express API runs on http://localhost:4000. Update any client‑side fetches to hit the new /api/* endpoints.

## Project Structure
A brief overview of the key directories in the project:

- */src/app/*: Contains all the pages and routes of the application, following the Next.js App Router structure.
- */src/components/*: Reusable React components, including UI elements from ShadCN and custom‑built components.
- */src/lib/*: Library files, including data, utility functions, type definitions, and server‑side actions.
- */src/context/*: React Context providers, such as the CartProvider for global state management.
- */src/firebase/*: Firebase configuration, initialization, and custom hooks for interacting with Firebase services.
- */docs/*: Documentation files, including backend.json which blueprints the Firebase structure.
- */public/*: Static assets that are served directly.

## Contributing
Feel free to fork the repo, open a pull request, or submit issues. Any contributions—whether bug fixes, feature enhancements, or documentation improvements—are welcome!
