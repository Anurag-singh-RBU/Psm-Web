import { Outlet } from 'react-router-dom';
import { BrandLogo } from '@ui/BrandLogo';
import { SoftSpotlightBackground } from '@ui/Background';

export const AuthLayout = () => {
    return (
        <SoftSpotlightBackground className="flex min-h-dvh flex-col">
            <header className="hidden px-8 pt-7 sm:block">
                <BrandLogo />
            </header>

            <main className="flex-center flex-1 px-5 py-20 mb-8 sm:mb-25 sm:p-0">
                <Outlet />
            </main>
        </SoftSpotlightBackground>
    );
};