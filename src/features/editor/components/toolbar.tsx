"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Hint } from "@/components/hint";
import { TbColorFilter } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import * as Popover from "@radix-ui/react-popover";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "@/features/editor/utils";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash,
  Sun,
  Contrast as ContrastIcon,
  SquareSplitHorizontal,
  Copy,
} from "lucide-react";
import {
  ActiveTool,
  Editor,
  FONT_SIZE,
  FONT_WEIGHT,
} from "@/features/editor/types";
import { FontSizeInput } from "@/features/editor/components/font-size-input";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";

interface ToolbarProps {
  editor: Editor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;
  const initialBrightness = 0;
  const initialContrast = 0;

  const [isBrightnessOpen, setIsBrightnessOpen] = useState(false);
  const [isContrastOpen, setIsContrastOpen] = useState(false);

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    fontWeight: initialFontWeight,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
    brightness: initialBrightness,
    contrast: initialContrast,
  });

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const selectedObject = editor?.selectedObjects[0];
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const onChangeContrast = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!selectedObject) {
      return;
    }

    editor?.changeImageContrast(value);

    setProperties((current) => ({
      ...current,
      contrast: value,
    }));
  };

  const onChangeBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!selectedObject) {
      return;
    }

    editor?.changeImageBrightness(value);

    setProperties((current) => ({
      ...current,
      brightness: value,
    }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) {
      return;
    }
    editor?.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }
  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }
    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };
  const toggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.fontLinethrough ? false : true;

    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      fontLinethrough: newValue,
    }));
  };

  const toggleLineUnderline = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{ backgroundColor: properties.fillColor }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Color" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-color")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{ borderColor: properties.strokeColor }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Width" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="top" sideoffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="top" sideoffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="top" sideoffset={5}>
            <Button
              onClick={toggleLineUnderline}
              size="icon"
              variant="ghost"
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="strike" side="top" sideoffset={5}>
            <Button
              onClick={toggleLinethrough}
              size="icon"
              variant="ghost"
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align Left" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align Center" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align Right" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Filters" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "filter" && "bg-gray-100")}
            >
              <TbColorFilter className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Remove background" side="top" sideoffset={5}>
            <Button
              onClick={() => onChangeActiveTool("remove-bg")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "remove-bg" && "bg-gray-100")}
            >
              <SquareSplitHorizontal className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {isImage && (
        <div className="relative flex items-center h-full justify-center">
          <Popover.Root
            open={isBrightnessOpen}
            onOpenChange={setIsBrightnessOpen}
          >
            <Hint label="Brightness" side="top" sideoffset={5}>
              <Popover.Trigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(isBrightnessOpen && "bg-gray-100")}
                >
                  <Sun className="size-4" />
                </Button>
              </Popover.Trigger>
            </Hint>
            <Popover.Content
              side="bottom"
              align="center"
              className="p-2 bg-white rounded shadow"
            >
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={properties.brightness}
                onChange={onChangeBrightness}
                className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </Popover.Content>
          </Popover.Root>
        </div>
      )}
      {isImage && (
        <div className="relative flex items-center h-full justify-center">
          <Popover.Root open={isContrastOpen} onOpenChange={setIsContrastOpen}>
            <Hint label="Contrast" side="top" sideoffset={5}>
              <Popover.Trigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(isContrastOpen && "bg-gray-100")}
                >
                  <ContrastIcon className="size-4" />
                </Button>
              </Popover.Trigger>
            </Hint>
            <Popover.Content
              side="bottom"
              align="center"
              className="p-2 bg-white rounded shadow"
            >
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={properties.contrast}
                onChange={onChangeContrast}
                className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </Popover.Content>
          </Popover.Root>
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring Forward" side="top" sideoffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4 " />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send Backwards" side="top" sideoffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4 " />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="top" sideoffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4 " />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side="top" sideoffset={5}>
          <Button
            onClick={() => {
              editor?.OnCopy();
              toast.success("Copied Successfully");
              editor?.OnPaste();
            }}
            size="icon"
            variant="ghost"
          >
            <Copy className="size-4 " />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="top" sideoffset={5}>
          <Button
            onClick={() => {
              editor?.delete();
              toast.success("Deleted Successfully");
            }}
            size="icon"
            variant="ghost"
          >
            <Trash className="size-4 " />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
