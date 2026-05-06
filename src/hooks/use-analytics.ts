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
        },
        local_timestamp: Date.now(),
        created_at: serverTimestamp(),
      });
      console.log(`[Analytics] Tracked: ${eventType}`, metadata);
    } catch (error) {
      console.error("[Analytics] Error tracking event:", error);
    }
  };

  // Auto-track page views and heartbeat
  useEffect(() => {
    trackEvent("page_view");

    // Heartbeat every 3 minutes to keep 'Live Now' accurate for idle users
    const heartbeat = setInterval(() => {
      if (document.visibilityState === "visible") {
        trackEvent("heartbeat");
      }
    }, 180000); 

    return () => clearInterval(heartbeat);
  }, [location.pathname]);

  return { trackEvent };
};
