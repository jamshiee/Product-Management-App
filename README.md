# Product Management App

A web application for managing products, categories, and inventory.

## Quick Start

1. Install dependencies:

   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```

2. Set up environment variables:

   Backend `.env`:

   ```
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your_secret
   PORT=5050

   ```



3. Run the app:

   ```bash
   # Terminal 1
   cd backend && npm rrun dev

   # Terminal 2
   cd frontend && npm run dev
   ```

Visit `http://localhost:5173` in your browser.

## Features

- Product management with variants
- Category and subcategory organization
- Search and filter functionality
- Pagination
- Image upload with Cloudinary

## Tech Stack

- Frontend: React, Zustand, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Auth: JWT
- Storage: Cloudinary
