import {fabric} from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";


export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "remove-bg",
    "stroke-color",
    "stroke-width",
];

export const colors = [
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.deepPurple["500"],
    material.indigo["500"],
    material.blue["500"],
    material.lightBlue["500"],
    material.cyan["500"],
    material.teal["500"],
    material.green["500"],
    material.lightGreen["500"],
    material.lime["500"],
    material.yellow["500"],
    material.amber["500"],
    material.orange["500"],
    material.deepOrange["500"],
    material.brown["500"],
    material.blueGrey["500"],
    "transparent",
  ];

export type ActiveTool = 
| "select" | "shapes" | "text" | "images" | "draw" | "fill" | "stroke-color" | "stroke-width" | "font" | "opacity" | "filter" | "settings" | "ai" | "remove-bg" | "templates";


export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = []
export const FONT_FAMILY = "Arial"
export const FONT_SIZE = 32

export const TEXT_OPTIONS = {
    type: "textbox",
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
}

export const TRIANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
}

export const CIRCLE_OPTIONS = {
    radius: 225,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const RECTANGLE_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 400,
    height: 400,
    angle: 0,
}
export const DIAMOND_OPTIONS = {
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    width: 600,
    height: 600,
    angle: 0,
}

export interface EditorHookProps {
    clearSelectionCallback?: () => void;
}

export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    setFillColor: (value: string) => void;
    setStrokeColor: (value: string) => void;
    setStrokeWidth: (value: number) => void;
    selectedObjects: fabric.Object[];
    strokeDashArray: number[];
    setStrokeDashArray: (value: number[]) => void;
}

export interface Editor {
    addText: (value: string, options?: ITextboxOptions) => void;
    getWorkspace: () => fabric.Object | undefined;
    getActiveOpacity: () => number;
    changeOpacity: (value: number) => void;
    bringForward: () => void;
    sendBackwards: () => void;
    changeStrokeWidth: (value: number) => void;
    changeFillColor: (value: string) => void;
    changeStrokeColor: (value: string) => void;
    changeStrokeDashArray: (value: number[]) => void;
    addCircle: () => void;
    addSoftRectangle: () => void;
    addRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;
    canvas: fabric.Canvas;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeWidth: () => number;
    getActiveStrokeDashArray: () => number[];
    selectedObjects: fabric.Object[];
  };
  