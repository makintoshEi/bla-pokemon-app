import { useEffect, useRef } from "react";

export const useFocus = () => {
    const currentRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (currentRef.current) {
            currentRef.current.focus();
        }
    }, []);

    return {
        currentRef,
    };
};
