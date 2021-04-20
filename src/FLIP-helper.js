import { useLayoutEffect, useRef } from "react";

/**
 * Helper hook to simplify FLIP animation implementation
 * Created by Farrel R
 * 
 * @param {Array} dependencies
 * @returns {[() => void, Object]}
 */
export function useFLIP(dependencies) {
    const lastBoundingClientRectRef = useRef();
    const currentElementRef = useRef();

    function captureLastElementPosition() {
        if (currentElementRef.current) {
            lastBoundingClientRectRef.current = currentElementRef.current.getBoundingClientRect();
        }
    }

    useLayoutEffect(function () {
        const currentBoundingClientRect = currentElementRef.current.getBoundingClientRect();

        if (lastBoundingClientRectRef.current) {
            // Contoh penerapan object destructuring pada Javascript
            // yang disertai dengan renaming nama variabelnya
            const {
                left: lastXPos,
                top: lastYPos,
                width: lastWidth,
                height: lastHeight
            } = lastBoundingClientRectRef.current;

            const {
                left: currentXPos,
                top: currentYPos,
                width: currentWidth,
                height: currentHeight
            } = currentBoundingClientRect;

            const deltaX = lastXPos - currentXPos;
            const deltaY = lastYPos - currentYPos;
            const deltaWidth = lastWidth / currentWidth;
            const deltaHeight = lastHeight / currentHeight;

            const transformOriginFix = "top left";

            const cancellingTransformation = `
                translate(${deltaX}px, ${deltaY}px)
                scale(${deltaWidth}, ${deltaHeight})
            `;

            const animationKeyframes = [
                {
                    transform: cancellingTransformation,
                    transformOrigin: transformOriginFix
                },
                {
                    transform: "none",
                    transformOrigin: transformOriginFix
                }
            ];
            const animationOptions = {
                duration: 500,
                easing: "ease"
            };

            currentElementRef.current.animate(animationKeyframes, animationOptions);
        }
        // eslint-disable-next-line
    }, dependencies);

    return [captureLastElementPosition, currentElementRef];
}