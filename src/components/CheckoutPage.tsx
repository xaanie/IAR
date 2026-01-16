
import React, { useState, useRef } from 'react';
import { CartItem } from '../types';
import { ShoppingBag, CreditCard, Truck, ShieldCheck, Heart, Trash2, Plus, Minus, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  updateQuantity: (productId: string, delta: number) => void;
  onComplete: () => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, updateQuantity, onComplete, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const globalGrantDonation = subtotal * 0.15; // 15% goes to the grant
  const shipping = 5.00;
  const total = subtotal + globalGrantDonation + shipping;

  const handleProcessOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-3">
          <h3 className="text-4xl font-black text-blue-900 uppercase italic tracking-tighter">Order Complete!</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Your Global Gear order has been received. More importantly, your purchase contributed <span className="text-blue-900 font-black">${globalGrantDonation.toFixed(2)}</span> to the International Student Grant.
          </p>
        </div>
        <button 
          onClick={onComplete}
          className="px-12 py-5 bg-blue-900 text-white rounded-2xl font-black shadow-xl hover:scale-105 transition"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition shadow-sm group">
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-900 transition-colors" />
        </button>
        <h3 className="text-3xl font-black text-blue-900 uppercase italic tracking-tighter">Secure Checkout</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Global Kit Summary</span>
              <span className="text-xs font-black text-blue-900">{cart.reduce((a, b) => a + b.quantity, 0)} Items</span>
            </div>
            <div className="divide-y divide-slate-50">
              {cart.map(item => (
                <div key={item.product.id} className="p-8 flex flex-col sm:flex-row items-center gap-8 group">
                  <img src={item.product.image} className="w-24 h-24 rounded-2xl object-cover shadow-md" alt={item.product.name} />
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h4 className="font-black text-blue-900 text-lg leading-tight">{item.product.name}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.product.category}</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:text-blue-900 transition"><Minus className="w-4 h-4" /></button>
                    <span className="font-black text-blue-900 w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:text-blue-900 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="text-xl font-black text-blue-900 min-w-[80px] text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button onClick={() => updateQuantity(item.product.id, -item.quantity)} className="p-2 text-slate-300 hover:text-red-500 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="p-20 text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest">Your kit is empty</p>
                </div>
              )}
            </div>
            
            {/* Mobile Helper: Proceed to Checkout Button */}
            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100 lg:hidden text-center">
                 <button 
                  onClick={scrollToSummary}
                  className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-sm flex items-center justify-center space-x-3 shadow-lg"
                 >
                   <span>Proceed to Payment</span>
                   <ChevronDown className="w-4 h-4" />
                 </button>
              </div>
            )}
          </div>

          {/* Shipping Form (Visual Only) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-8">
            <div className="flex items-center space-x-4 border-b border-slate-50 pb-6">
              <Truck className="w-6 h-6 text-[#009fe3]" />
              <h4 className="text-xl font-black text-blue-900 uppercase tracking-tighter italic">Regional Shipping</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                <input type="text" placeholder="Leader Moyo" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">MSU Campus / Address</label>
                <input type="text" placeholder="Main Campus Residence" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8" ref={summaryRef}>
          <div className="bg-blue-900 rounded-[2.5rem] p-10 text-white shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <ShieldCheck className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <h4 className="text-xl font-black uppercase italic tracking-tighter">Order Summary</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between text-blue-200 font-bold text-sm">
                  <span>Kit Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#ffcc00] font-black text-sm items-center">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Global Grant (15%)</span>
                  </div>
                  <span>+${globalGrantDonation.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-blue-200 font-bold text-sm">
                  <span>Hub Logistics</span>
                  <span>+${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-px bg-white/10"></div>
              
              <div className="flex justify-between items-end">
                <span className="text-blue-300 font-black uppercase text-[10px] tracking-widest">Total Value</span>
                <span className="text-4xl font-black text-white">${total.toFixed(2)}</span>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-5 h-5 text-[#ffcc00]" />
                  <input type="text" placeholder="**** **** **** 4242" className="bg-transparent border-none outline-none flex-1 text-sm font-black placeholder:text-white/20" />
                </div>
              </div>

              <button 
                onClick={handleProcessOrder}
                disabled={isProcessing || cart.length === 0}
                className={`w-full py-5 bg-[#ffcc00] text-blue-900 rounded-[1.5rem] font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-3 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ShieldCheck className="w-6 h-6" />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center space-y-4">
             <Heart className="w-10 h-10 text-red-500 mx-auto fill-red-50" />
             <p className="text-xs font-bold text-slate-500 leading-relaxed px-4">
               Every MSU Global Gear purchase powers the dreams of our international students via the <span className="text-blue-900 font-black italic">Destiny Fund</span>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
