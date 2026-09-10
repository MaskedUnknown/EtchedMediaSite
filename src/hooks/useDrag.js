import { useState, useEffect } from 'react';

/**
 * Hook to manage smooth desktop-window drag physics
 * @param {Object} initialPosition - Starting x and y coordinates
 */
export function useDrag(initialPosition = { x: 100, y: 100 }) {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        // Only drag with left click
        if (e.button !== 0) return;

        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });

        // Prevent default browser text selection highlighting while dragging
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            // Calculate new window boundary location
            let newX = e.clientX - dragStart.x;
            let newY = e.clientY - dragStart.y;

            // Bound the window inside the viewport limits
            if (newY < 0) newY = 0; // Prevent hiding title bar under top edge

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
