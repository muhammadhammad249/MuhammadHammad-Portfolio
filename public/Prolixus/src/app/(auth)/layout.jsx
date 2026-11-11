import { ReactNode } from 'react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[100px] pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-full space-y-8">
                {children}
            </div>
        </div>
    );
}