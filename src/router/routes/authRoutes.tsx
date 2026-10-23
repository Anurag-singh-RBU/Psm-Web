
import type { RouteObject } from 'react-router-dom';
import { ROUTE_PATHS } from '../route.constants';
import { LoginForm } from '@containers/Login';
import { SignupForm } from '@containers/Signup';
import { CompleteSignup } from '@containers/CompleteSignup';
import { VerifyEmail } from '@containers/VerifyEmail';

export const authRoutes: RouteObject[] = [
    {
        path: ROUTE_PATHS.LOGIN,
        element: <LoginForm />,
    },
    {
        path: ROUTE_PATHS.SIGNUP,
        element: <SignupForm />,
    },
    {
        path: ROUTE_PATHS.COMPLETE_SIGNUP,
        element: <CompleteSignup />,
    },
    //     {
    //         path: ROUTE_PATHS.FORGOT_PASSWORD,
    //         element: <ForgotPasswordPage />,
    //     },
    //     {
    //         path: ROUTE_PATHS.RESET_PASSWORD,
    //         element: <ResetPasswordPage />,
    //     },
    {
        path: ROUTE_PATHS.VERIFY_EMAIL,
        element: <VerifyEmail />,
    },
    //     {
    //         path: ROUTE_PATHS.COMPLETE_GOOGLE_SIGNUP,
    //         element: <CompleteGoogleSignupPage />,
    //     },
];
