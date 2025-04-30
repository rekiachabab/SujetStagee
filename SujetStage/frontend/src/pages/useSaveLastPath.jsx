import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function useSaveLastPath() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location]);
}

export default useSaveLastPath;