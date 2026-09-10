import { useState, useEffect } from 'react';

/**
 * Hook to manage smooth desktop-window drag physics with viewport collision walls
 * @param {Object} initialPosition - Starting x and y coordinates
 */
export function useDrag(initialPosition = { x: 100, y: 100 }) {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        // Only drag with left click
        if (e.button !== 0) return;

        // Find the actual structural window frame container being dragged
        const windowFrame = e.currentTarget.closest('.window-frame');
        if (!windowFrame) return;

        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
            width: windowFrame.offsetWidth,  // Capture physical layout dimensions dynamically
            height: windowFrame.offsetHeight
        });

        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            // 1. Calculate raw target location coordinates
            let newX = e.clientX - dragStart.x;
            let newY = e.clientY - dragStart.y;

            // 2. 🧱 DYNAMIC VIEWPORT MARGIN LIMIT CALCULATIONS
            // Finds the absolute maximum right and bottom pixel limits based on browser window size
            const maxLeft = 0;
            const maxTop = 0;
            const maxRight = window.innerWidth - dragStart.width;
            const maxBottom = window.innerHeight - dragStart.height;

            // 3. MATH CLAMPING: Lock the positions securely within our boundary frames
            if (newX < maxLeft) newX = maxLeft;     // Snap to Left screen edge wall
            if (newX > maxRight) newX = maxRight;   // Snap to Right screen edge wall
            if (newY < maxTop) newY = maxTop;       // Snap to Top screen edge wall
            if (newY > maxBottom) newY = maxBottom; // Snap to Bottom screen edge wall

            setPosition({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            if (isDragging) setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return { position, handleMouseDown, isDragging };
}
