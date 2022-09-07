import React, { useState, useEffect } from "react";

// Atom
import { Header } from "./components/atom";

// Molecules
import { Checkboxes, Loading } from "./components/molecules";

// Organism
import { PopulationChart } from "./components/organism";

// Config
import { axios as axiosInstance } from "./config";

// Constants
const resasBaseURL = process.env.REACT_APP_RESAS_BASE_URL || "";
const resasApiKey = process.env.REACT_APP_API_KEY || "";

// Redux
import { RootState } from "./store";
import { setLoading } from "./store/reducers/globalReducer";
import { useSelector, useDispatch } from "react-redux";

// CSS
import "./App.css";

const api = axiosInstance(resasBaseURL);
api.defaults.headers.common["X-API-KEY"] = resasApiKey;

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
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populationData, setPopulationData] = useState<Population[]>([]);

  useEffect(() => {
    const getPrefectures = async () => {
      dispatch(setLoading(true));
      const res = await api.get("api/v1/prefectures");
      const data = res.data.result;
      setPrefectures(
        data.map((prefecture: { prefCode: number; prefName: "string" }) => {
          return {
            label: prefecture.prefName,
            value: `${prefecture.prefCode}`,
            checked: false,
          };
        })
      );
      dispatch(setLoading(false));
    };
    getPrefectures();
  }, [dispatch]);

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
    const removeUncheckedPopulation = (checkedPrefectures: Prefecture[]) => {
      setPopulationData((prevPopulationData) =>
        prevPopulationData.filter((population) =>
          checkedPrefectures.some(
            (prefecture) => prefecture.value === population.prefCode
          )
        )
      );
    };

    const getPopulation = async (checkedPrefectures: Prefecture[]) => {
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
      if (checkedPrefectures.length > 0) {
        dispatch(setLoading(false));
      }
    };

    const checkedPrefectures = prefectures.filter(
      (prefecture) => prefecture.checked
    );

    removeUncheckedPopulation(checkedPrefectures);

    if (checkedPrefectures.length > 0) {
      dispatch(setLoading(true));
      getPopulation(checkedPrefectures);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefectures, dispatch]);

  // Change app Title
  useEffect(() => {
    document.title = "人口推移アプリ";
  }, []);

  return (
    <div className="App">
      {loading && <Loading />}
      <Header>人口推移アプリ</Header>
      <div className="app-container">
        <section className="prefecture">
          <h4 className="subtitle">都道府県</h4>
          <Checkboxes
            cy-name="prefecture"
            items={prefectures}
            onChange={handleChangeCheckbox}
          />
        </section>
        {populationData.length > 0 && (
          <section className="chart" data-cy="section-chart">
            <h4 className="subtitle">人口数グラフ</h4>
            <PopulationChart data={populationData} />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
