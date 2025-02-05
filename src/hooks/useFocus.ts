import { useEffect, useRef } from "react";

export const useFocus = <T extends HTMLElement>() => {
    const currentRef = useRef<T | null>(null);

    useEffect(() => {
        if (currentRef.current) {
            currentRef.current.focus();
        }
    }, []);

    return {
        currentRef,
    };
};
