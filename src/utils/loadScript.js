import React from "react";
import { useEffect } from "react";
export const loadScript = ({ src, onLoad, onError }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            if (onLoad) onLoad(true);
        };
        script.onerror = () => {
            if (onError) onError(false);
        };
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, [src, onLoad, onError]);

    return null; // This component doesn't render anything visually
};
