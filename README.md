# Shop Application

A modern e-commerce application with separate frontend and backend deployments.

## Architecture

- **Frontend**: React + TypeScript + Vite (deployed on Vercel)
- **Backend**: Node.js + Express + TypeScript (deployed on Render)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Google OAuth 2.0
- **Styling**: Tailwind CSS + Radix UI

## Features

- ✅ Public browsing (no login required)
- ✅ Google OAuth authentication
- ✅ Product catalog with filtering
- ✅ Shopping cart (session-based for guests, user-based for logged-in users)
- ✅ Order management
- ✅ Admin panel
- ✅ Responsive design
- ✅ Separate frontend/backend deployment

## Project Structure

```
shop-main/
├── client/                 # Frontend (Vercel deployment)
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json
├── server/                 # Backend (Render deployment)
│   ├── index.ts
│   ├── routes.ts
│   ├── googleAuth.ts
│   ├── storage.ts
│   ├── db.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── render.yaml
└── shared/                 # Shared types and schemas
    └── schema.ts
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials

### Backend Setup (Render)

1. **Clone and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Fill in the following variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A random secret for session management
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
   - `GOOGLE_CALLBACK_URL`: Your backend URL + `/api/auth/google/callback`
   - `FRONTEND_URL`: Your frontend URL (for CORS)

4. **Set up Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `https://your-backend.onrender.com/api/auth/google/callback`

5. **Deploy to Render:**
   - Connect your GitHub repository to Render
   - Create a new Web Service
   - Set root directory to `server`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Add environment variables in Render dashboard

### Frontend Setup (Vercel)

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Set `VITE_API_URL` to your Render backend URL.

4. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set root directory to `client`
   - Add environment variable `VITE_API_URL` in Vercel dashboard

## Local Development

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

The frontend will proxy API requests to the backend during development.

## Database Setup

1. **Create database tables:**
   ```bash
   cd server
   npm run db:push
   ```

2. **Seed data (optional):**
   Create a script to populate your database with sample products and categories.

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/shop_db
SESSION_SECRET=your-super-secret-session-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Public Endpoints
- `GET /api/products` - Get products with optional filters
- `GET /api/products/:id` - Get specific product
- `GET /api/categories` - Get categories
- `POST /api/contact` - Send contact message

### Protected Endpoints (require authentication)
- `GET /api/auth/user` - Get current user
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

### Admin Endpoints (require admin role)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/categories` - Create category
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/users` - Get all users

## Authentication Flow

1. User clicks "Login" button
2. Redirected to Google OAuth
3. User authorizes the application
4. Google redirects back to `/api/auth/google/callback`
5. User is authenticated and redirected to frontend
6. Session is maintained via cookies

## Cart System

- **Guest users**: Cart items stored in session
- **Logged-in users**: Cart items associated with user account
- Cart persists across browser sessions for logged-in users

## Deployment URLs

After deployment, update the following:

1. **Google OAuth callback URL** in Google Cloud Console
2. **Frontend environment variable** `VITE_API_URL` in Vercel
3. **Backend environment variable** `FRONTEND_URL` in Render

## Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` is set correctly in backend
- Check that CORS configuration allows your frontend domain

### Authentication Issues
- Verify Google OAuth credentials
- Check callback URL matches exactly
- Ensure session secret is set

### Database Issues
- Verify `DATABASE_URL` is correct
- Run `npm run db:push` to create tables
- Check database permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License 