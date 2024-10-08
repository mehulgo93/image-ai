import {fabric} from "fabric";


interface UseHotKeysProps {
    canvas: fabric.Canvas | null;
    undo: () => void;
    redo: () => void;
    save:(skip?: boolean) => void;
    copy: () => void;
    paste: () => void;
}


export const useHotKeys = ({canvas, undo, redo, save, copy, paste}: UseHotKeysProps) => {

}