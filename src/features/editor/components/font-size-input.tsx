import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };
  return (
    <div className="flex items-center">
      <Button
        onClick={decrement}
        variant="outline"
        className="p-2 rounded-r-none border-r-0"
        size="icon"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        className="w-[60px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
        onChange={handleChange}
        value={value}
      />
      <Button
        className="p-2 rounded-l-none border-l-0"
        variant="outline"
        size="icon"
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
