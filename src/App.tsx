import React, { useState, useEffect } from "react";

// Molecules
import { Checkboxes } from "./components/molecules";

// Organism
import { PopulationChart } from "./components/organism";

// Config
import { axios as axiosInstance } from "./config";

// Constants
const resasBaseURL = process.env.REACT_APP_RESAS_BASE_URL || "";
const resasApiKey = process.env.REACT_APP_API_KEY || "";

interface Prefecture {
  checked: boolean;
  label: string;
  value: string;
}

interface Population {
  prefCode: string;
  data: { year: number; value: number }[];
  name: string;
}

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populationData, setPopulationData] = useState<Population[]>([]);

  const api = axiosInstance(resasBaseURL);
  api.defaults.headers.common["X-API-KEY"] = resasApiKey;

  useEffect(() => {
    const getPrefectures = async () => {
      const res = await api.get("api/v1/prefectures");
      const data = res.data.result;
      setPrefectures(
        data.map((prefecture: any) => {
          return {
            label: prefecture.prefName,
            value: `${prefecture.prefCode}`,
            checked: false,
          };
        })
      );
    };
    getPrefectures();
  }, []);

  const handleChangeCheckbox = (value: string) => {
    setPrefectures((prevPrefectures) => {
      return prevPrefectures.map((prevPrefecture) =>
        prevPrefecture.value === value
          ? { ...prevPrefecture, checked: !prevPrefecture.checked }
          : prevPrefecture
      );
    });
  };

  useEffect(() => {
    const getPopulation = async () => {
      const checkedPrefectures = prefectures.filter(
        (prefecture) => prefecture.checked
      );
      setPopulationData(
        populationData.filter((population) => {
          return checkedPrefectures.some(
            (prefecture) => prefecture.value === population.prefCode
          );
        })
      );
      for await (const prefecture of checkedPrefectures) {
        if (
          !populationData.some(
            (population) => population.prefCode === prefecture.value
          )
        ) {
          const res = await api.get("api/v1/population/composition/perYear", {
            params: {
              prefCode: prefecture.value,
              cityCode: "-",
            },
          });
          const data = res.data.result.data[0].data;
          setPopulationData((prevPopulationData) => {
            return [
              ...prevPopulationData,
              { prefCode: prefecture.value, data, name: prefecture.label },
            ];
          });
        }
      }
    };
    getPopulation();
  }, [prefectures]);

  return (
    <div className="App">
      <Checkboxes items={prefectures} onChange={handleChangeCheckbox} />
      <PopulationChart data={populationData} />
    </div>
  );
}

export default App;
