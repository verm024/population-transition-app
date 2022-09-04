import React from "react";

// Library
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";

interface Props {
  data: {
    [key: string]: number | string;
    year: string;
  }[];
  type?: string;
  width?: number;
  height?: number;
  lines?: {
    strokeColor?: string;
    key: string;
  }[];
  xAxisKey?: string;
  useTooltip?: boolean;
  useLegend?: boolean;
}

function LChart({
  data,
  type = "linear",
  width = 100,
  height = 100,
  lines = [],
  xAxisKey = "name",
  useTooltip = false,
  useLegend = false,
}: Props) {
  return (
    <div>
      <LineChart width={width} height={height} data={data}>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        {useTooltip && <Tooltip />}
        {useLegend && <Legend />}
        {lines.map((line, index) => (
          <Line
            key={index}
            dataKey={line.key}
            type={type}
            stroke={line.strokeColor || "#000000"}
          />
        ))}
      </LineChart>
    </div>
  );
}

export default LChart;
