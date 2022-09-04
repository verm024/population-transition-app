import React, { useState, useEffect } from "react";

// Library
import { LineChart, XAxis, YAxis, Line } from "recharts";
import Rand from "rand-seed";

interface Props {
  data: any[];
}

function Graph({ data }: Props) {
  const [mappedData, setMappedData] = useState<any[]>([]);

  useEffect(() => {
    data.forEach((d) => {
      d.data.forEach((yearlyData: any, index: number) => {
        setMappedData((prevMappedData: any) => {
          const copy = [...prevMappedData];
          if (typeof copy[index] === "undefined") {
            copy[index] = { year: `${yearlyData.year}` };
          }
          copy[index][d.name] = yearlyData.value;
          return copy;
        });
      });
    });
  }, [data]);

  return (
    <div>
      <LineChart width={730} height={250} data={mappedData}>
        <XAxis dataKey="year" />
        <YAxis />
        {data.map((d) => {
          const seeds = [
            `${255 - d.prefCode}`,
            `${d.prefCode}`,
            `${0 + d.prefCode}`,
          ];
          const rgbval: number[] = [];
          seeds.forEach((seed) => {
            const rand = new Rand(seed);
            const val = Math.floor(rand.next() * 256);
            rgbval.push(val);
          });
          return (
            <Line
              key={d.prefCode}
              dataKey={d.name}
              type="linear"
              stroke={`rgb(${rgbval[0]}, ${rgbval[1]}, ${rgbval[2]})`}
            />
          );
        })}
      </LineChart>
    </div>
  );
}

export default Graph;
