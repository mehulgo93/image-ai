import { fabric } from "fabric";
import { useEffect } from "react";


interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
    setSelectedObjects: (objects: fabric.Object[]) => void;
    clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({canvas, container, setSelectedObjects, clearSelectionCallback,}: UseCanvasEventsProps) => {
    useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (e) => {
                setSelectedObjects(e.selected || []);
            });
            canvas.on("selection:updated", (e) => {
                setSelectedObjects(e.selected || []);
            });
            canvas.on("selection:cleared", () => {
                setSelectedObjects([]);
                clearSelectionCallback?.();
            });
        }
        return () => {
            if (canvas) {
                canvas.off("selection:creared");
                canvas.off("selection:updated");
                canvas.off("selection:cleared");
            }
        };
    }, [canvas, setSelectedObjects, clearSelectionCallback])
};