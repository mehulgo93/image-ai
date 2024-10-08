import {fabric} from "fabric";
import { useCallback, useRef, useState } from "react"


interface useHistoryProps {
    canvas: fabric.Canvas | null;
}

export const useHistory = ({canvas}: useHistoryProps) => {
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
        console.log("save");
    }, []);

    return {save}
}