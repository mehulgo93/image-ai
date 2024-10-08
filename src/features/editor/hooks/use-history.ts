import { fabric } from "fabric";
import { useCallback, useRef, useState } from "react"


interface useHistoryProps {
    canvas: fabric.Canvas | null;
    saveCallback?: (values: {
        json: string;
        height: number;
        width: number;
      }) => void;
    };


export const useHistory = ({canvas, saveCallback}: useHistoryProps) => {
    const [historyIndex, setHistoryIndex] = useState(0);
    const canvasHistory = useRef<string[]>([]);
    const skipSave = useRef(false);

    const canUndo = useCallback(() => {
        return historyIndex > 0;
    }, [historyIndex])

    const canRedo = useCallback(() => {
        return historyIndex < canvasHistory.current.length -1;
    }, [historyIndex]);


    const save = useCallback(() => {
        if (!canvas) return;

        const currentState = canvas.toJSON();
        const json = JSON.stringify(currentState);


    }, []);

    return {save}
}