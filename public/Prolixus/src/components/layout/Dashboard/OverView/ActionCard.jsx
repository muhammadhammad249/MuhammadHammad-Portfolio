import { FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ActionCard({
    icon,
    title,
    description,
    actionLabel,
    value,
    href = "#",
}) {
    return (
        <Link href={href} className="block group h-full">
            <div className="bg-white dark:bg-background-dark/30 rounded-2xl p-6 shadow-sm border border-divider group-hover:shadow-xl group-hover:border-accent/40 transition-all duration-500 overflow-hidden relative h-full flex flex-col">
                {/* Hover Background Accent */}
                <div className="absolute -right-10 -bottom-10 size-32 bg-accent/5 rounded-full blur-3xl transition-all duration-700 group-hover:bg-accent/10 group-hover:scale-150"></div>
                
                <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                        <div className="p-3.5 bg-secondary/50 dark:bg-white/5 rounded-xl text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                            <span className="text-xl flex items-center justify-center size-6">{icon}</span>
                        </div>
    
                        <div className="flex-1 pt-1">
                            <h3 className="text-lg font-accent font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                {title}
                            </h3>
                            <p className="text-sm text-text/60 font-default mt-1 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
    
                    {value && (
                        <div className="mb-4">
                            <p className="text-2xl font-bold text-primary font-default">{value}</p>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-divider relative z-10">
                    <Button
                        variant="link"
                        size="xs"
                        rightIcon={<FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />}
                        className="p-0 h-auto font-bold group-hover:text-accent"
                    >
                        {actionLabel}
                    </Button>
                </div>
            </div>
        </Link>
    );
}