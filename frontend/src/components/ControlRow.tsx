// src/components/ControlRow.tsx
import React from 'react';

// Propsの型定義
interface ControlRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void; // 数値を受け取って何もしない(void)関数
}

const ControlRow: React.FC<ControlRowProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}) => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}
    >
      <label
        style={{ width: '150px', marginRight: '10px', fontWeight: 'bold' }}
      >
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ cursor: 'pointer', flex: 1, width: '100%' }}
      />
    </div>
  );
};

export default ControlRow;
