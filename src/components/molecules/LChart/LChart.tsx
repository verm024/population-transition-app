import React from "react";

// Library
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  Label,
} from "recharts";

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
  xAxisLabel?: string;
  yAxisLabel?: string;
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
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
  xAxisLabel,
  yAxisLabel,
  margin = {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
}: Props) {
  return (
    <div>
      <LineChart width={width} height={height} margin={margin} data={data}>
        <XAxis dataKey={xAxisKey}>
          <Label value={xAxisLabel} position="bottom" offset={20} />
        </XAxis>
        <YAxis tick={{ fontSize: 12 }}>
          <Label value={yAxisLabel} angle={-90} position="left" offset={20} />
        </YAxis>
        {useTooltip && <Tooltip />}
        {useLegend && <Legend verticalAlign="top" />}
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
