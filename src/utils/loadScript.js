import React from "react";
import { useEffect } from "react";
export const useLoadScript = (src) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async=true;
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, [src]);

    return null; // This component doesn't render anything visually
};
