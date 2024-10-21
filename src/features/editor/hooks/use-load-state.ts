import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { JSON_KEYS } from "@/features/editor/types";

type UseLoadStateProps = {
    autoZoom: () => void;
    canvas: fabric.Canvas | null;
    initialState: React.MutableRefObject<string> | undefined;
    canvasHistory: React.MutableRefObject<string[]>;
    setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useLoadState = ({
    autoZoom,
    canvas,
    initialState,
    canvasHistory,
    setHistoryIndex,
}: UseLoadStateProps) => {
    const initialized = useRef(false);
    useEffect(() => {
        if (initialState?.current && !initialized.current && canvas) {
            const data = JSON.parse(initialState.current);
            canvas.loadFromJSON(data, () => {
                const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));
                canvasHistory.current = [currentState];
                setHistoryIndex(0);
            });
            initialized.current = true;
        }
    }, [canvas, initialState, autoZoom, canvasHistory, setHistoryIndex]);
}