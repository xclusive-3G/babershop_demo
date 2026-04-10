// src/hooks/useToast.js
import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState({ show: false, msg: "", type: "default" });

  const showToast = useCallback((msg, type = "default") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "default" }), 3200);
  }, []);

  return { toast, showToast };
}
