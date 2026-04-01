import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Simple persistent visitor ID
const getVisitorId = () => {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }
  return id;
};

export const useAnalytics = () => {
  const location = useLocation();

  const trackEvent = async (eventType: string, metadata: Record<string, any> = {}) => {
    try {
      const visitorId = getVisitorId();
      const userAgent = navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

      await addDoc(collection(db, "events"), {
        visitor_id: visitorId,
        event_type: eventType,
        page: location.pathname,
        metadata,
        context: {
          userAgent,
          device: isMobile ? "mobile" : "desktop",
          referrer: document.referrer || "direct",
          timestamp: new Date().toISOString(),
        },
        created_at: serverTimestamp(),
      });
      console.log(`[Analytics] Tracked: ${eventType}`, metadata);
    } catch (error) {
      console.error("[Analytics] Error tracking event:", error);
    }
  };

  // Auto-track page views
  useEffect(() => {
    trackEvent("page_view");
  }, [location.pathname]);

  return { trackEvent };
};
