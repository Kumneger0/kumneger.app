import React, { useSyncExternalStore } from "react";



function screenResize() {
    return useSyncExternalStore((subscribe) => {
        window.addEventListener('resize', subscribe)
        return () => {
            window.removeEventListener('resize', subscribe)
        }
    }, () => {
        return window.innerWidth
    })

}


export default screenResize