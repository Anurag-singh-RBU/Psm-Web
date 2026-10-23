import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ROUTE_PATHS } from './route.constants';
import { authRoutes } from './routes';
// import { HomePage } from '@/pages/home/HomePage';

export const router = createBrowserRouter([
    {
        path: ROUTE_PATHS.ROOT,
        // element: <HomePage />,
    },
    {
        element: <AuthLayout />,
        children: authRoutes,
    },
]);