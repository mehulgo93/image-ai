import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    // Early return if canvas is null
    if (!canvas) {
      console.log("Canvas is null, returning early from useCanvasEvents.");
      return;
    }

    const handleSelectionCreated = () => {
      const selected = canvas.getActiveObjects();
      console.log("Selected objects on selection created:", selected);
      setSelectedObjects(selected);
    };

    const handleSelectionUpdated = () => {
      const selected = canvas.getActiveObjects();
      console.log("Selected objects on selection updated:", selected);
      setSelectedObjects(selected);
    };

    const handleSelectionCleared = () => {
      console.log("Selection cleared");
      setSelectedObjects([]);
      clearSelectionCallback?.();
    };

    // Bind event listeners
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionUpdated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      // Cleanup event listeners
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionUpdated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]);  // Dependencies include canvas
};
