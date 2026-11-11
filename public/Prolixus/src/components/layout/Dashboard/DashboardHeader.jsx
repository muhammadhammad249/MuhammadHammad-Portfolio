import Button from "@/components/ui/Button";

export default function DashboardHeader({
    title,
    subtitle,
    action,
    showBorder = true,
    children,
}) {
    return (
        <header
            className={`flex flex-col md:flex-row justify-between md:items-end gap-4 pb-6 ${showBorder ? "border-b border-divider" : ""
                }`}
        >
            <div className="flex flex-col gap-2">
                <h1 className="font-accent italic text-3xl sm:text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.02em] text-primary lg:text-6xl">
                    {title}
                </h1>

                {subtitle && (
                    <p className="max-w-[620px] font-default text-base leading-relaxed text-text/80 lg:text-lg">
                        {subtitle}
                    </p>
                )}

                {children}
            </div>

            {action && (
                <div className="flex items-center">
                    {action}
                </div>
            )}
        </header>
    );
}