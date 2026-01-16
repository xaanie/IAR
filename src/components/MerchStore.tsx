
import React, { useState, useMemo } from 'react';
import { STORE_PRODUCTS } from '../constants';
import { Product } from '../types';
import { ShoppingBag, Star, Package, Check, Award, Heart, Globe, ShoppingCart, ArrowRight } from 'lucide-react';

interface MerchStoreProps {
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onGoToCheckout: () => void;
}

const MerchStore: React.FC<MerchStoreProps> = ({ onAddToCart, cartCount, onGoToCheckout }) => {
  const [activeCategory, setActiveCategory] = useState('All Gear');

  const categories = [
    { name: 'All Gear', icon: ShoppingBag },
    { name: 'Apparel', icon: Star },
    { name: 'Stationery', icon: Package },
    { name: 'Tech Gear', icon: Package }
  ];

  const supporterAvatarIds = [
    'photo-1534528741775-53994a69daeb',
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1500648767791-00dcc994a43e',
    'photo-1494790108377-be9c29b29330',
    'photo-1531123897727-8f129e1688ce'
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Gear') return STORE_PRODUCTS;
    const searchCat = activeCategory === 'Tech Gear' ? 'Tech' : activeCategory;
    return STORE_PRODUCTS.filter(p => p.category === searchCat);
  }, [activeCategory]);

  return (
    <div className="space-y-12 animate-fadeIn pb-20 relative">
      {/* Floating Checkout Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 right-6 md:right-12 z-[60] animate-bounce">
          <button 
            onClick={onGoToCheckout}
            className="bg-blue-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3 hover:scale-110 transition-transform ring-4 ring-white"
          >
            <ShoppingCart className="w-5 h-5 text-yellow-400" />
            <div className="flex flex-col items-start leading-none">
               <span className="text-[10px] font-black uppercase opacity-60">Checkout</span>
               <span className="font-black text-sm">{cartCount} Items</span>
            </div>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}

      {/* MSU Store Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
           <ShoppingBag className="w-5 h-5 text-[#009fe3]" />
           <span className="text-xs font-black text-blue-900 uppercase tracking-widest">Global Shop</span>
        </div>
        <h3 className="text-5xl font-black text-blue-900 uppercase italic tracking-tighter">Global Gear</h3>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          Rep the Pride. Every purchase supports the <span className="text-[#009fe3] font-black">International Student Grant</span>, helping fellows fulfill their destiny at MSU.
        </p>
      </section>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button 
            key={cat.name} 
            onClick={() => setActiveCategory(cat.name)}
            className={`px-8 py-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center space-x-3 shadow-sm ${
              activeCategory === cat.name 
                ? 'bg-[#009fe3] text-white shadow-xl shadow-blue-200' 
                : 'bg-white text-blue-900 border-2 border-slate-50 hover:border-blue-100 hover:bg-slate-50'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
            <div className="h-72 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              {product.isExclusive && (
                <div className="absolute top-6 left-6">
                  <div className="bg-blue-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-2xl shadow-xl border border-blue-800 flex items-center space-x-2">
                    <Award className="w-3.5 h-3.5 text-[#ffcc00]" />
                    <span>Exclusive Tier</span>
                  </div>
                </div>
              )}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="bg-white p-3 rounded-full text-blue-500 shadow-xl hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                 </button>
              </div>
            </div>
            <div className="p-10 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-black text-blue-900 leading-tight tracking-tighter group-hover:text-blue-600 transition-colors">{product.name}</h4>
                <div className="text-xl font-black text-[#009fe3] bg-blue-50 px-3 py-1 rounded-xl">$ {product.price.toFixed(2)}</div>
              </div>
              <p className="text-sm text-slate-500 mb-10 leading-relaxed font-medium">{product.description}</p>
              
              <div className="mt-auto space-y-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black hover:bg-blue-800 transition shadow-2xl flex items-center justify-center space-x-3 active:scale-95 transition-transform"
                >
                  <ShoppingCart className="w-5 h-5 text-[#ffcc00]" />
                  <span>Secure Item</span>
                </button>
                {product.isExclusive && (
                  <p className="text-[9px] text-center text-slate-300 font-black uppercase tracking-widest flex items-center justify-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>Verified MSU Credentials Required</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Impact Tracker */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute bottom-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
           <Globe className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md space-y-6">
            <div className="flex items-center space-x-3 mb-2">
               <Heart className="w-7 h-7 text-[#ffcc00]" />
               <h3 className="text-3xl font-black uppercase tracking-tighter italic">Regional Impact</h3>
            </div>
            <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-90">
              Your support has enabled <span className="text-white font-black underline decoration-[#ffcc00] underline-offset-4 decoration-4">$4,250</span> in regional travel grants, ensuring our students take MSU to the world.
            </p>
            <div className="space-y-3">
               <div className="w-full h-5 bg-blue-950 rounded-full overflow-hidden shadow-inner p-1.5">
                 <div className="h-full bg-gradient-to-r from-[#ffcc00] to-yellow-400 rounded-full transition-all duration-1000 shadow-md" style={{ width: '65%' }}></div>
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-300">
                  <span>Progress: 65%</span>
                  <span>Goal: $6,500</span>
               </div>
            </div>
          </div>
          <div className="flex -space-x-4 bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
            {supporterAvatarIds.map((id, i) => (
              <div key={i} className="group relative">
                <img 
                  src={`https://images.unsplash.com/${id}?w=100&h=100&fit=crop`} 
                  className="w-14 h-14 rounded-full border-4 border-blue-900 cursor-pointer hover:scale-110 hover:-translate-y-2 transition-all z-10 shadow-xl" 
                  alt="Supporter"
                />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white text-blue-900 text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   Supporter
                </div>
              </div>
            ))}
            <div className="w-14 h-14 rounded-full bg-[#ffcc00] border-4 border-blue-900 flex items-center justify-center font-black text-blue-900 text-xs shadow-xl cursor-help" title="And many others!">
              +42
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchStore;
