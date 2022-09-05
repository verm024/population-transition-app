import React, { useState, useEffect } from "react";

// Molecules
import { LChart } from "../../molecules";

// Library
import Rand from "rand-seed";
import { ResponsiveContainer } from "recharts";

interface Data {
  prefCode: string;
  data: { year: number; value: number }[];
  name: string;
}

interface Line {
  strokeColor: string;
  key: string;
}

interface MappedData {
  [key: string]: number | string;
  year: string;
}

interface Props {
  data: Data[];
}

function PopulationChart({ data }: Props) {
  const [mappedData, setMappedData] = useState<MappedData[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (data.length === 0) {
      return setMappedData([]);
    }
    data.forEach((d) => {
      d.data.forEach(
        (yearlyData: { year: number; value: number }, index: number) => {
          setMappedData((prevMappedData: MappedData[]) => {
            const copy = [...prevMappedData];
            if (typeof copy[index] === "undefined") {
              copy[index] = { year: `${yearlyData.year}` };
            }
            copy[index][d.name] = yearlyData.value;
            return copy;
          });
        }
      );
    });
  }, [data]);

  useEffect(() => {
    setLines([]);
    data.forEach((d, index) => {
      const seeds = [
        `${255 - parseInt(d.prefCode)}`,
        `${d.prefCode}`,
        `${0 + parseInt(d.prefCode)}`,
      ];
      const rgbval: number[] = [];
      seeds.forEach((seed) => {
        const rand = new Rand(seed);
        const val = Math.floor(rand.next() * 256);
        rgbval.push(val);
      });
      const strokeColor = `rgb(${rgbval[0]}, ${rgbval[1]}, ${rgbval[2]})`;
      setLines((prevLines: Line[]) => {
        const copy = [...prevLines];
        copy[index] = { strokeColor, key: d.name };
        return copy;
      });
    });
  }, [mappedData]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LChart
        data={mappedData}
        lines={lines}
        height={0}
        width={0}
        xAxisKey="year"
        useLegend
        xAxisLabel="年度"
        yAxisLabel="人口数"
        margin={{ top: 0, bottom: 40, left: 40, right: 0 }}
      />
    </ResponsiveContainer>
  );
}

export default PopulationChart;
