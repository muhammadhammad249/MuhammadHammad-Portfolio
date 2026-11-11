"use client";

import dynamic from "next/dynamic";

const OrderDetailContent = dynamic(() => import("./OrderDetailContent"), {
    ssr: false,
});

export default function OrderClientWrapper() {
    return <OrderDetailContent />;
}
