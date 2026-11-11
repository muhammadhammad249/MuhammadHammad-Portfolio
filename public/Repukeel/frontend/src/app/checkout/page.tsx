/* eslint-disable */
"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'Selected Plan';

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (step === 1 && method) setStep(2);
    else if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
      }, 2500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-2">Checkout</h1>
        <p className="text-slate-400">You are purchasing: <span className="text-[#e0ac2f] font-bold">{planParam}</span></p>
      </div>

      <div className="bg-[#16223c] border border-[#22304d] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Step 1: Select Method */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-white mb-6">Select Payment Method</h2>
            <div className="space-y-4 mb-8">
              <label className={`block p-5 border-2 rounded-xl cursor-pointer transition-colors ${method === 'card' ? 'border-[#e0ac2f] bg-[#e0ac2f]/10' : 'border-[#22304d] hover:border-slate-500'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="w-5 h-5 accent-[#e0ac2f]" />
                  <div>
                    <div className="text-white font-bold text-lg">Credit / Debit Card</div>
                    <div className="text-sm text-slate-400">Visa, Mastercard, Amex, Discover</div>
                  </div>
                </div>
              </label>

              <label className={`block p-5 border-2 rounded-xl cursor-pointer transition-colors ${method === 'easypaisa' ? 'border-[#e0ac2f] bg-[#e0ac2f]/10' : 'border-[#22304d] hover:border-slate-500'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="method" value="easypaisa" checked={method === 'easypaisa'} onChange={() => setMethod('easypaisa')} className="w-5 h-5 accent-[#e0ac2f]" />
                  <div>
                    <div className="text-white font-bold text-lg">EasyPaisa</div>
                    <div className="text-sm text-slate-400">Direct mobile wallet transfer</div>
                  </div>
                </div>
              </label>

              <label className={`block p-5 border-2 rounded-xl cursor-pointer transition-colors ${method === 'jazzcash' ? 'border-[#e0ac2f] bg-[#e0ac2f]/10' : 'border-[#22304d] hover:border-slate-500'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="method" value="jazzcash" checked={method === 'jazzcash'} onChange={() => setMethod('jazzcash')} className="w-5 h-5 accent-[#e0ac2f]" />
                  <div>
                    <div className="text-white font-bold text-lg">JazzCash</div>
                    <div className="text-sm text-slate-400">Direct mobile wallet transfer</div>
                  </div>
                </div>
              </label>

              <label className={`block p-5 border-2 rounded-xl cursor-pointer transition-colors ${method === 'bank' ? 'border-[#e0ac2f] bg-[#e0ac2f]/10' : 'border-[#22304d] hover:border-slate-500'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="method" value="bank" checked={method === 'bank'} onChange={() => setMethod('bank')} className="w-5 h-5 accent-[#e0ac2f]" />
                  <div>
                    <div className="text-white font-bold text-lg">Bank Transfer</div>
                    <div className="text-sm text-slate-400">Direct deposit to our bank account</div>
                  </div>
                </div>
              </label>
            </div>
            <button onClick={handleNext} disabled={!method} className="w-full bg-[#e0ac2f] hover:bg-[#f2c94c] text-black font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Continue to Payment &rarr;
            </button>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {step === 2 && !isProcessing && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white">&larr; Back</button>
              <h2 className="text-xl font-bold text-white">Enter Details</h2>
            </div>
            
            {method === 'card' && (
              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Cardholder Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#080e1c] border border-[#22304d] rounded-lg p-3 text-white focus:outline-none focus:border-[#e0ac2f]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#080e1c] border border-[#22304d] rounded-lg p-3 text-white focus:outline-none focus:border-[#e0ac2f]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-[#080e1c] border border-[#22304d] rounded-lg p-3 text-white focus:outline-none focus:border-[#e0ac2f]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">CVC</label>
                    <input type="password" placeholder="123" className="w-full bg-[#080e1c] border border-[#22304d] rounded-lg p-3 text-white focus:outline-none focus:border-[#e0ac2f]" />
                  </div>
                </div>
              </div>
            )}

            {['easypaisa', 'jazzcash', 'bank'].includes(method) && (
              <div className="bg-[#080e1c] border border-[#22304d] rounded-xl p-8 text-center mb-8">
                <p className="text-slate-300 mb-4">
                  Transfer the total amount via <span className="font-bold text-white capitalize">{method}</span> to the following account:
                </p>
                <div className="p-4 bg-slate-800 rounded-lg text-sm text-[#e0ac2f] font-bold border border-slate-700 mb-6">
                  (Account details will be provided by Admin soon)
                </div>
                
                <div className="text-left space-y-2">
                  <label className="block text-sm font-medium text-slate-400">Upload Payment Screenshot / Receipt</label>
                  <input type="file" className="w-full bg-[#16223c] border border-[#22304d] rounded-lg p-2 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0ac2f] file:text-black hover:file:bg-[#f2c94c]" />
                </div>
              </div>
            )}

            <button onClick={handleNext} className="w-full bg-[#e0ac2f] hover:bg-[#f2c94c] text-black font-bold py-4 rounded-xl transition-colors">
              Process Payment
            </button>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="py-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-16 h-16 border-4 border-[#22304d] border-t-[#e0ac2f] rounded-full animate-spin mb-6"></div>
            <h2 className="text-xl font-bold text-white mb-2">Processing Payment...</h2>
            <p className="text-slate-400">Please do not close this window.</p>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="py-12 text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Payment Successful!</h2>
            <p className="text-slate-400 mb-8">Thank you for your purchase. We have received your payment for <span className="text-white font-semibold">{planParam}</span>. An invoice has been sent to your email.</p>
            <a href="/" className="inline-block bg-[#e0ac2f] hover:bg-[#f2c94c] text-black font-bold px-8 py-3 rounded-xl transition-colors">
              Return to Homepage
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#080e1c] pt-24 pb-20 px-4">
      <Suspense fallback={<div className="text-center text-white mt-20">Loading...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
