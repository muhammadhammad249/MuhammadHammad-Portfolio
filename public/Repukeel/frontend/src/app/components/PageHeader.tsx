import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="pt-[120px] pb-10 px-6 max-w-[1000px] mx-auto w-full">
      <div className="bg-[#111827] rounded-[24px] border-b-[6px] border-[#eab308] px-6 py-12 md:py-16 text-center shadow-lg relative z-0">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#eab308] rounded-2xl mb-6 shadow-md relative z-10">
          {icon}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 relative z-10">{title}</h1>
        <p className="text-[#a9b3c9] text-[14px] md:text-base leading-relaxed max-w-2xl mx-auto relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}
