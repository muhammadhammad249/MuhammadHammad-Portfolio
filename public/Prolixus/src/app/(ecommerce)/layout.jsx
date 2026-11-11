import MainFooter from '@/components/layout/Footer';
import CartFAB from '@/components/layout/CartFAB';
import React from 'react';


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
    title: 'PROLIXUS - Shop',
    description: 'Shop and browse our products',
};

export default function EcommerceLayout({ children }) {
    return (
        <>

            <main className="ecommerce-container pt-[80px]">
                {children}
            </main>
            <MainFooter />
            <CartFAB />
        </>
    );
}