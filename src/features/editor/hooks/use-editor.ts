import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";

import { 
  Editor, 
  FILL_COLOR,
  STROKE_WIDTH,
  STROKE_COLOR,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  TRIANGLE_OPTIONS,
  BuildEditorProps, 
  RECTANGLE_OPTIONS,
  EditorHookProps,
  STROKE_DASH_ARRAY,
  TEXT_OPTIONS,
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
} from "@/features/editor/types";
import { 
  createFilter,
  isTextType,
} from "@/features/editor/utils";
import { useHistory } from "@/features/editor/hooks/use-history";
import { useClipboard } from "@/features/editor/hooks/use-clipboard";
import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";

const buildEditor = ({
  autoZoom,
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
  fontFamily, 
  setFontFamily,
  copy,
  paste
}: BuildEditorProps): Editor => {

  const getWorkspace = () => {
    return canvas
    .getObjects()
    .find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    save: () => {},
    autoZoom,
    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += 0.05;
      const center = canvas.getCenter();
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio > 1 ? 1 : zoomRatio
      );
    },
    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= 0.05;
      const center = canvas.getCenter();
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio < 0.2 ? 0.2 : zoomRatio,
      );
    },
    changeSize: (value: {width: number, height: number}) => {
      const workspace = getWorkspace();

      workspace?.set(value);
      autoZoom();
    },
    changeBackground: (value: string) => {
      const workspace = getWorkspace();
      workspace?.set({fill: value});
      canvas.renderAll()
    },
    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll()
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;
    },
    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },
    OnCopy: () => copy(),
    OnPaste: () => paste(),
    changeImageContrast: (value: number) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          const imageObject = object as fabric.Image;

          // Ensure filters array exists
          imageObject.filters = imageObject.filters || [];

          // Find existing contrast filter
          let contrastFilter = imageObject.filters.find(
            //@ts-ignore
            (filter) => filter.type === "Contrast"
          ) as fabric.IBaseFilter;

          if (contrastFilter) {
            // Update the contrast value
            //@ts-ignore
            contrastFilter.contrast = value;
          } else {
            // Create a new contrast filter
            // @ts-ignore
            const newContrastFilter = new fabric.Image.filters.Contrast({
              contrast: value,
            });
            imageObject.filters.push(newContrastFilter);
          }

          // Apply filters and re-render the canvas
          imageObject.applyFilters();
          canvas.requestRenderAll();
        }
      });
    },
    changeImageBrightness: (value: number) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          const imageObject = object as fabric.Image;

          // Ensure filters array exists
          imageObject.filters = imageObject.filters || [];

          // Find existing brightness filter
          let brightnessFilter = imageObject.filters.find(
            //@ts-ignore
            (filter) => filter.type === "Brightness"
            //@ts-ignore
          ) as fabric.Image.filters.Brightness;

          if (brightnessFilter) {
            // Update the brightness value
            brightnessFilter.brightness = value;
          } else {
            // Create a new brightness filter
            brightnessFilter = new fabric.Image.filters.Brightness({
              brightness: value,
            });
            imageObject.filters.push(brightnessFilter);
          }

          // Apply filters and re-render the canvas
          imageObject.applyFilters();
          canvas.requestRenderAll();
        }
      });
    },
    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects();
      objects.forEach((object) => {
        if (object.type === "image") {
          const imageObject = object as fabric.Image;

          const effect = createFilter(value);
          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
          canvas.renderAll();

        }
      })
    },
    addImage: (value: string) => {
      fabric.Image.fromURL(
        value, 
        (image) => {
          const workspace = getWorkspace();
          image.scaleToWidth(workspace?.width || 0)
          image.scaleToHeight(workspace?.height || 0);

          addToCanvas(image);
        },
        {
          crossOrigin: "anonymous",
        },
      )
    },
    delete: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.remove(object);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    getWorkspace,
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });

      addToCanvas(object);
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const value = selectedObject.get("opacity") || 1;

      return value;
    },
    changeFontStyle: (value: string) => {
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)) {
                //@ts-ignore
                //Faulty TS library fontStyle exists
          object.set({ fontStyle: value });
            }
        });
        canvas.renderAll();
      },
      changeFontLinethrough: (value: boolean) => {
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)) {
                //@ts-ignore
                //Faulty TS library linethrough exists
          object.set({ linethrough: value });
            }
        });
        canvas.renderAll();
      },
      getActiveFontLinethrough: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
            return false;
        }
        //@ts-ignore
        //Faulty TS library linethrough exists
        const value = selectedObject.get("linethrough") || false;

         return value;
      },
      changeFontUnderline: (value: boolean) => {
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)) {
                //@ts-ignore
                //Faulty TS library underline exists
          object.set({ underline: value });
            }
        });
        canvas.renderAll();
      },
      getActiveFontUnderline: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
            return false;
        }
        //@ts-ignore
        //Faulty TS library underline exists
        const value = selectedObject.get("underline") || false;

         return value;
      },
      changeTextAlign: (value: string) => {
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)) {
                //@ts-ignore
                //Faulty TS library textAlign exists
          object.set({ textAlign: value });
            }
        });
        canvas.renderAll();
      },
      getActiveTextAlign: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
            return "left";
        }
        //@ts-ignore
        //Faulty TS library underline exists
        const value = selectedObject.get("textAlign") || "left";

         return value;
      },
      changeFontSize: (value: number) => {
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)) {
                //@ts-ignore
                //Faulty TS library fontSize exists
          object.set({ fontSize: value });
            }
        });
        canvas.renderAll();
      },
      getActiveFontSize: () => {
        const selectedObject = selectedObjects[0];

        if (!selectedObject) {
            return FONT_SIZE
        }
        //@ts-ignore
        //Faulty TS library fontSize exists
        const value = selectedObject.get("fontSize") || FONT_SIZE;

         return value;

      },
    changeFontWeight: (value: number) => {
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)) {
                //@ts-ignore
                //Faulty TS library fontWeight exists
          object.set({ fontWeight: value });
            }
        });
        canvas.renderAll();
      },
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringForward(object);
      });

      canvas.renderAll();
      
      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendBackwards(object);
      });

      canvas.renderAll();
      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    changeFontFamily: (value: string) => {
        setFontFamily(value);
        canvas.getActiveObjects().forEach((object) => {
            if (isTextType(object.type)){
                //@ts-ignore
                // Faulty TS library fontFamily exists
          object._set("fontFamily", value);
            }
        });
        canvas.renderAll();
      },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      });
      canvas.freeDrawingBrush.color = value;
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.freeDrawingBrush.width = value;
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },
    canvas,
    getActiveFontFamily: () => {
        const selectedObject = selectedObjects[0];
  
        if (!selectedObject) {
          return fontFamily;
        }
        //@ts-ignore
        //Faulty TS library, fontFamily exisits.
        const value = selectedObject.get("fontFamily") || fontFamily;
  
        // Currently, gradients & patterns are not supported
        return value
      },
      getActiveFontWeight: () => {
        const selectedObject = selectedObjects[0];
  
        if (!selectedObject) {
          return FONT_WEIGHT;
        }
       //@ts-ignore
        const value = selectedObject.get("fontWeight") || FONT_WEIGHT;
  
        // Currently, gradients & patterns are not supported
        return value
      },
      getActiveFontStyle: () => {
        const selectedObject = selectedObjects[0];
  
        if (!selectedObject) {
          return "normal"
        }
       //@ts-ignore
        const value = selectedObject.get("fontStyle") || FONT_WEIGHT;
  
        // Currently, gradients & patterns are not supported
        return value
      },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get("fill") || fillColor;

      // Currently, gradients & patterns are not supported
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get("stroke") || strokeColor;

      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.get("strokeWidth") || strokeWidth;

      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get("strokeDashArray") || strokeDashArray;

      return value;
    },
    selectedObjects,
  };
};

export const useEditor = ({
  clearSelectionCallback,
}: EditorHookProps) => {

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY)
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

const {copy, paste} = useClipboard({canvas});

const { save } = useHistory();

 const { autoZoom } = useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    save,
    canvas,
    setSelectedObjects,
  });


  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        autoZoom,
        canvas,
        fillColor,
        strokeWidth,
        strokeColor,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        strokeDashArray,
        selectedObjects,
        setStrokeDashArray,
        fontFamily, 
        setFontFamily,
        copy,
        paste
      });
    }

    return undefined;
  }, 
  [
    canvas,
    fillColor,
    strokeWidth,
    strokeColor,
    selectedObjects,
    strokeDashArray,
    fontFamily,
    copy,
    paste,
    autoZoom,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900, 
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },[]);

  return { init, editor };
};
