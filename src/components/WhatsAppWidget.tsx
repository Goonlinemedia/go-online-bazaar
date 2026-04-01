import { useState } from "react";
import { X, Send } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { trackEvent } = useAnalytics();

  const phoneNumber = "2348035826698";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    trackEvent("whatsapp_click", { 
      name: name || "anonymous",
      message: message.substring(0, 100), // Log preview
      phone: phoneNumber
    });

    const text = `Hello! My name is ${name || "a website visitor"}.\n\n${message}`;
    const escapedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${escapedText}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in origin-bottom-right transition-all">
          {/* Header */}
          <div className="bg-[#1e4c40] text-white p-4 font-semibold text-lg">
            Go Online
          </div>
          
          {/* Body area */}
          <div className="bg-[#e4ddd5] p-4">
            <form onSubmit={handleSend} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#25D366] text-sm text-gray-800"
              />
            </form>
          </div>
          
          {/* Footer area / message input */}
          <div className="bg-white p-4">
            <form onSubmit={handleSend} className="flex gap-2 items-end">
              <textarea
                placeholder="Your Text Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none outline-none focus:border-[#25D366] min-h-[80px] text-gray-800"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="bg-[#25D366] hover:bg-[#20b858] text-white p-3 rounded-lg flex-shrink-0 disabled:opacity-50 transition-colors"
              >
                <Send size={20} className="transform rotate-45" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20b858] rounded-full text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95 z-50"
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
