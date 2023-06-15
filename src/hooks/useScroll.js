import {useEffect, useRef, useState} from "react";

export function useScroll(dependencies, depPageSize, depPageCount, callback) {

    const anchor = useRef()
    const [callbackWasCall, setCallbackWasCall] = useState(false);

    useEffect(() => {
        if (anchor.current && dependencies.length <= depPageSize) {
            anchor.current.scrollTop = anchor.current.scrollHeight;
        }
        else setCallbackWasCall(false)
    }, [dependencies])

    const isEndOfDependenciesList = (dep) => {
        return Math.ceil(dep.length / depPageSize) >= depPageCount;
    }
    const isTopOfScrollContainer = (container) => {
        return Math.round(container.scrollHeight - (container.scrollHeight - container.scrollTop)) < 300;
    }

    const onScroll = (event) => {
        if (!isEndOfDependenciesList(dependencies) && isTopOfScrollContainer(event.target) && !callbackWasCall) {
            callback();
            setCallbackWasCall(true);
        }
    }

    return { anchor, onScroll};

}