import { useState, useEffect } from "react";
import { ShoppingCart, UserPlus, CheckCircle2 } from "lucide-react";

const activities = [
  { name: "Chioma from Lagos", action: "just started her store", icon: UserPlus },
  { name: "Abubakar from Abuja", action: "received a new order", icon: ShoppingCart },
  { name: "Blessing from PH", action: "just upgraded to Pro Seller", icon: CheckCircle2 },
  { name: "Tunde from Ibadan", action: "launched his store link", icon: UserPlus },
  { name: "Zainab from Kano", action: "made her first sale!", icon: ShoppingCart },
];

const LiveActivity = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 1000);
    }, 8000);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(interval);
    };
  }, []);

  const activity = activities[currentIdx];
  const Icon = activity.icon;

  return (
    <div 
      className={`fixed bottom-24 left-6 z-50 transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-xs animate-pulse-glow">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="text-primary" size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">
            {activity.name}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {activity.action}
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-2 text-muted-foreground hover:text-foreground"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LiveActivity;
