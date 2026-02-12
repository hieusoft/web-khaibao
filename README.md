# React + Shadcn UI Authentication App

A modern React application with secure authentication featuring automatic access token refresh mechanism.

## Features

- 🔐 **Secure Authentication**: JWT-based authentication with access and refresh tokens
- 🔄 **Auto Token Refresh**: Automatically refreshes access tokens before expiration
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Protected Routes**: Route protection for authenticated users
- 📊 **Dashboard**: View user profile and token status

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layout/         # Layout components
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── ui/            # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── hooks/             # Custom hooks
│   └── useTokenRefresh.ts
├── lib/               # Utilities and API client
│   ├── api.ts         # Axios instance with interceptors
│   └── utils.ts       # Utility functions
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   └── ProfilePage.tsx
├── routes/            # Route configuration
│   └── index.tsx
├── types/             # TypeScript types
│   └── auth.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## How Token Refresh Works

1. **Initial Login**: User provides credentials, server returns access token and refresh token
2. **Token Storage**: Tokens are stored in localStorage
3. **API Requests**: Access token is automatically added to request headers
4. **Token Expiration Check**: 
   - Before each request, the token is checked for expiration
   - A periodic check runs every 5 minutes
   - Token is refreshed 5 minutes before expiration
5. **Automatic Refresh**: 
   - When 401 error occurs, axios interceptor attempts to refresh the token
   - Failed requests are queued and retried after successful refresh
   - If refresh fails, user is redirected to login

## API Endpoints Expected

Your backend should implement these endpoints:

- `POST /api/auth/login` - Returns `{ user, accessToken, refreshToken }`
- `POST /api/auth/register` - Returns `{ user, accessToken, refreshToken }`
- `POST /api/auth/refresh` - Accepts `{ refreshToken }`, returns new `{ accessToken, refreshToken }`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Radix UI** - Accessible UI primitives

## License

MIT
