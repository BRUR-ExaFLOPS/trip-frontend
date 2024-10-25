# Next.js Frontend Application Documentation

This document explains how to run the Next.js frontend application locally and in a production environment. Below are the steps and requirements to set up the application, including the necessary environment variables and the services used.

## Prerequisites

Before starting, ensure that you have the following installed:

- **Node.js** (LTS version recommended)
- **Yarn** or **npm** for dependency management
- A text editor or IDE for code editing (e.g., VSCode)

## Environment Variables

Create a `.env.local` file at the root of the project and set up the following environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: This is the publishable key for Clerk, which handles authentication in the app. It is exposed to the frontend.
- **CLERK_SECRET_KEY**: This is the secret key for Clerk, used for server-side operations related to authentication.
- **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY**: The API key for integrating Google Maps in the app.
- **NEXT_PUBLIC_BACKEND_URL**: The URL for the backend service that the frontend app interacts with. For local development, it should point to the local server (e.g., `http://localhost:3000`).

## Running the Application

### 1. Local Development

To run the application locally, follow these steps:

1. **Install Dependencies**  
   If you haven't already, install the required dependencies by running the following command:

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

2. **Start the Development Server**  
   Run the development server with the following command:

   ```bash
   yarn dev
   ```

   or

   ```bash
   npm run dev
   ```

   This will start the Next.js development server on [http://localhost:3000](http://localhost:3000).

3. **Access the Application**  
   Open your browser and go to `http://localhost:3000` to view the app. The environment variables you configured will be available during development.

### 2. Running in Production

For production, you can build and run the optimized version of the application.

1. **Build the Application**  
   Build the Next.js app for production with the following command:

   ```bash
   yarn build
   ```

   or

   ```bash
   npm run build
   ```

2. **Start the Production Server**  
   After the build is complete, you can start the production server by running:

   ```bash
   yarn start
   ```

   or

   ```bash
   npm run start
   ```

   This will start the Next.js production server on the specified port (default: `http://localhost:3000`).

3. **Environment Configuration in Production**  
   Ensure that the environment variables mentioned above are correctly set on your production server. You can use environment variable management tools like **dotenv** or configure the environment variables directly on your hosting service.

### 3. Deploying to Production

To deploy the Next.js app to a cloud service (e.g., Vercel, AWS, or DigitalOcean), ensure that the environment variables are configured in the deployment environment.

For example, when deploying to **Vercel**, you can set these variables directly in the Vercel dashboard:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_BACKEND_URL`

Vercel automatically handles the build process, so no need to manually run `yarn build` or `npm run build`.

## Services Overview

### 1. Clerk (Authentication)
Clerk is used for authentication in the app. It provides:

- User login and registration
- User session management
- Secure access to protected routes

You need to set up your Clerk publishable and secret keys in the environment variables to use this service. 

Learn more: [Clerk Documentation](https://clerk.dev/docs)

### 2. Google Maps API
The Google Maps API is integrated to provide map services in the app. This could be used for showing locations, geocoding, or implementing map-based features.

To use it, you need to create a Google Maps API key and add it to the environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

Learn more: [Google Maps API Documentation](https://developers.google.com/maps/documentation)

### 3. Backend API
The app interacts with a backend service, which is accessible via the `NEXT_PUBLIC_BACKEND_URL` environment variable. This is the base URL of the API endpoints the frontend consumes. For local development, this is typically set to `http://localhost:3000`.

Ensure the backend server is running before accessing it from the frontend.

## Troubleshooting

If you encounter issues while running the application, check the following:

- Ensure the environment variables are correctly set.
- Verify that all services (backend, Google Maps API, Clerk) are properly configured and accessible.
- Check the browser console for any frontend errors.
- Use the Next.js logs to troubleshoot server-side issues.

## Conclusion

This documentation covers how to run the frontend application in both development and production environments. By setting up the required services and configuring the environment variables, you can ensure that the application functions correctly.

