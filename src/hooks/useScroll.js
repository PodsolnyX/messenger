import {useEffect, useRef} from "react";

export function useScroll(dependencies) {

    const ref = useRef()

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dependencies])

    return ref;

}