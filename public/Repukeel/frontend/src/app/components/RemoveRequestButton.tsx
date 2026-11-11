/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  phone: string;
  postUrl: string;
  details: string;
};

interface RemoveRequestButtonProps {
  serviceName: string;
  ctaText?: string;
  modalTitle?: string;
  modalSubtitle?: string;
  inputPlaceholder?: string;
}

export default function RemoveRequestButton({
  serviceName,
  ctaText,
  modalTitle,
  modalSubtitle,
  inputPlaceholder,
}: RemoveRequestButtonProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [open]);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/remove-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service: serviceName }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
    }
  };

  const displayCta = ctaText || `Get ${serviceName} Removed`;
  const displayTitle = modalTitle || `Request ${serviceName}`;
  const displaySubtitle = modalSubtitle || "Fill out the details below and our team will get to work.";
  const displayPlaceholder = inputPlaceholder || "Link to the post, content, or review";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto bg-[#1e3a8a] text-white font-bold uppercase px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#152c6e] transition-all text-[14px] sm:text-[15px] mb-8 inline-flex items-center justify-center gap-2 group tracking-wide"
      >
        <span>{displayCta}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 transition-transform group-hover:translate-x-1">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg p-6 sm:p-8 relative border border-[var(--border-light)] max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setOpen(false);
                setStatus("idle");
              }} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" 
              aria-label="Close"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received</h3>
                <p className="text-gray-600 font-medium">
                  Thank you — your request has been received. Our team will contact you shortly.
                </p>
                <button onClick={() => setOpen(false)} className="mt-6 text-[#1e3a8a] font-semibold hover:underline">Close Window</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0a152e]">{displayTitle}</h3>
                  <p className="text-sm text-gray-500 mt-1">{displaySubtitle}</p>
                </div>

                <div>
                  <input {...register("name", { required: true })} placeholder="Full Name" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition-all text-black" />
                  {errors.name && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">Name is required</p>}
                </div>

                <div>
                  <input {...register("email", { required: true })} type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition-all text-black" />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">Valid email required</p>}
                </div>

                <div>
                  <input {...register("phone")} placeholder="Phone (optional)" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition-all text-black" />
                </div>

                <div>
                  <input {...register("postUrl", { required: true })} placeholder={displayPlaceholder} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition-all text-black" />
                  {errors.postUrl && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">This link/field is required</p>}
                </div>

                <div>
                  <textarea {...register("details")} placeholder="Additional details or context..." className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition-all text-black resize-none" rows={4} />
                </div>

                <button type="submit" disabled={status === "loading"} className="w-full bg-[var(--gold)] hover:bg-[#c19b2e] text-[#0a152e] font-[800] text-[16px] py-4 rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === "loading" ? "Submitting..." : displayCta}
                </button>

                {status === "error" && <p className="text-red-500 text-sm font-semibold text-center mt-2">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
