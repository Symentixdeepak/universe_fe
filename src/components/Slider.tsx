import React, { useState } from "react";
import "../styles/slider.css";
import { useThemeColors } from "@/hooks";

interface CustomSliderProps {
  steps?: number;
  value?: number;
  onChange?: (value: number) => void;
  labelLeft?: string;
  labelRight?: string;
  disabled?: boolean;
}

export default function CustomSlider({
  steps = 5,
  value,
  onChange,
  labelLeft = "Very Low",
  labelRight = "Very High",
  disabled = false,
}: CustomSliderProps) {
  const [internalValue, setInternalValue] = useState(2);
  const theme = useThemeColors()
  const displayValue = typeof value === "number" ? value : internalValue;

  const handleClick = (idx: number) => {
    if (disabled) return; // Don't allow clicks when disabled
    if (onChange) onChange(idx);
    if (value === undefined) setInternalValue(idx);
  };

  return (
    <div className={`slider-container${disabled ? " slider-disabled" : ""}`}>
      <div className={theme.isDark ? "slider-labels-dark" : "slider-labels"}>
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>
      <div className="slider-bar">
        <div className="slider-track" />
        {Array.from({ length: steps }).map((_, i) => (
          <div
            key={i}
            className={`slider-step${i === displayValue ? " active" : ""}`}
            style={{
              "--i": i,
              "--steps": steps - 1,
            } as React.CSSProperties}
            onClick={() => handleClick(i)}
          >
            {i === displayValue && <div className="slider-highlight" />}
          </div>
        ))}
      </div>
    </div>
  );
}
