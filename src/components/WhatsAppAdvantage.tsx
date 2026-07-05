import { MessageSquare, ShoppingCart, CheckCircle2 } from "lucide-react";

const WhatsAppAdvantage = () => {
  return (
    <section className="py-24 bg-foreground text-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] -ml-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-6 inline-block bg-primary/10 px-4 py-2 rounded-full">The WhatsApp Edge</span>
            <h2 className="text-3xl md:text-6xl font-black font-heading mb-8 leading-[1.1] tracking-tight">
              Turn WhatsApp chats <br />
              <span className="text-green-500 underline decoration-green-500/30 underline-offset-8 italic">into daily sales</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              Your customers are already on WhatsApp. They browse → click → message you → buy. 
              No complicated checkout. No drop-offs. Just direct sales.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Browse & Click", desc: "Customers browse your stunning storefront and click the items they love." },
                { title: "Direct Order", desc: "No cart abandonment. The order goes straight to your private WhatsApp chat." },
                { title: "Close with a Chat", desc: "Handle payments, confirm delivery, and build a relationship—all in one place." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 bg-green-500/20 p-1.5 rounded-full text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg md:text-xl mb-1 text-white">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a href="/pricing" className="btn-primary inline-flex items-center gap-2 group text-lg py-4 px-8">
                Build My Store Today
                <ShoppingCart className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card bg-white/5 border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
               {/* Mockup UI for WhatsApp Order */}
               <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-green-600 text-white p-4 rounded-3xl rounded-tr-none max-w-[80%] shadow-xl">
                       <p className="text-sm font-bold mb-1">Customer Order:</p>
                       <p className="text-xs opacity-90 leading-relaxed mb-3">
                         "Hello! I just saw these Sneakers on your site. I'd like to order them in Size 43."
                       </p>
                       <div className="bg-white/10 p-3 rounded-xl flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-lg" />
                          <div>
                             <p className="text-xs font-bold font-heading">Luxury Sneakers</p>
                             <p className="text-[10px] opacity-70">₦45,000.00</p>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white p-4 rounded-3xl rounded-tl-none max-w-[80%]">
                       <p className="text-xs leading-relaxed">
                         "Great choice! We have that in stock. Send your delivery address and I'll send the payment link now. ✅"
                       </p>
                    </div>
                  </div>
               </div>
               {/* Interactive Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent flex items-end justify-center pb-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg font-bold text-white bg-green-500 px-6 py-2 rounded-full shadow-2xl animate-bounce">Total: ₦45,000.00 Paid! 💰</span>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary animate-pulse blur-[80px] opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500 animate-pulse blur-[80px] opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppAdvantage;
