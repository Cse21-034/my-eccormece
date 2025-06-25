# Deployment Guide

This guide will help you deploy the shop application to Render (backend) and Vercel (frontend).

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Google OAuth Credentials**: Set up Google OAuth 2.0
3. **PostgreSQL Database**: Set up a database (Neon, Supabase, or any PostgreSQL provider)

## Step 1: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-backend.onrender.com/api/auth/google/callback`
7. Note down your Client ID and Client Secret

## Step 2: Deploy Backend to Render

### 2.1 Connect Repository
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set the following configuration:
   - **Name**: `shop-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 2.2 Environment Variables
Add these environment variables in Render:

```env
NODE_ENV=production
DATABASE_URL=your-postgresql-connection-string
SESSION_SECRET=your-super-secret-session-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-frontend.vercel.app
```

### 2.3 Deploy
1. Click "Create Web Service"
2. Wait for the build to complete
3. Note your backend URL (e.g., `https://shop-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

### 3.1 Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: The project will automatically detect the Vite configuration from the root `vercel.json`
5. No additional configuration needed - Vercel will use the root configuration

### 3.2 Environment Variables
Add this environment variable in Vercel:

```env
VITE_API_URL=https://your-backend.onrender.com
```

### 3.3 Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Note your frontend URL (e.g., `https://your-project.vercel.app`)

## Step 4: Update Google OAuth Callback URL

1. Go back to Google Cloud Console
2. Update the authorized redirect URI to your production backend URL:
   ```
   https://your-backend.onrender.com/api/auth/google/callback
   ```

## Step 5: Update Environment Variables

### Backend (Render)
Update the `FRONTEND_URL` to your Vercel frontend URL:
```env
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
Update the `VITE_API_URL` to your Render backend URL:
```env
VITE_API_URL=https://your-backend.onrender.com
```

## Step 6: Database Setup

1. Connect to your PostgreSQL database
2. Run the database migration:
   ```bash
   cd server
   npm run db:push
   ```

## Step 7: Test the Application

1. Visit your frontend URL
2. Test browsing products (should work without login)
3. Test login with Google OAuth
4. Test adding items to cart
5. Test checkout process

## Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check that the URL includes the protocol (https://)

### Authentication Issues
- Verify Google OAuth credentials are correct
- Ensure callback URL matches exactly
- Check that session secret is set

### Database Issues
- Verify `DATABASE_URL` is correct
- Ensure database is accessible from Render
- Run migrations if needed

### Build Issues
- Check that all dependencies are in the correct package.json files
- Verify TypeScript compilation
- Check build logs for specific errors

### Vercel Build Issues
- The root `vercel.json` automatically handles the client build
- Make sure the client folder contains all necessary dependencies
- Check that the build command works locally: `cd client && npm install && npm run build`

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your-super-secret-session-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-frontend.vercel.app
PORT=10000
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com
```

## Monitoring

### Render
- Check build logs in Render dashboard
- Monitor application logs
- Set up alerts for downtime

### Vercel
- Check build logs in Vercel dashboard
- Monitor function execution
- Set up analytics if needed

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **Session Secret**: Use a strong, random session secret
3. **CORS**: Only allow your frontend domain
4. **Database**: Use connection pooling and SSL
5. **HTTPS**: Both Render and Vercel provide HTTPS by default

## Performance Optimization

1. **Database**: Use connection pooling
2. **Caching**: Implement Redis for session storage in production
3. **CDN**: Vercel provides global CDN automatically
4. **Images**: Optimize product images
5. **Code Splitting**: Vite handles this automatically

## Support

If you encounter issues:
1. Check the logs in both Render and Vercel dashboards
2. Verify all environment variables are set correctly
3. Test locally first
4. Check the README.md for additional troubleshooting steps 