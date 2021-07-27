import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ImgLoding } from "components/styled";

const initialValue = {
  startData: "2021-07-01",
  endData: "2021-07-02",
};

function App() {
  const [apiData, setApiData] = useState(null);
  const [data, setData] = useState(initialValue);
  const startInput = useRef();
  const endInput = useRef();
  const isShow = useRef(true);

  const deepEquals = (target, source) => {
    let result = target;
    if (typeof target === "object" && typeof source === "object") {
      for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
          if (target[key] !== source[key]) {
            result = source;
          }
        }
      }
    }
    return result;
  };

  const hyphenRemove = (data) => {
    const regex = /-/gi;
    return Object.keys(data).reduce((acc, current) => {
      acc[current] = data[current].replaceAll(regex, "");
      return acc;
    }, {});
  };

  const validation = (data) => {
    const isFalse = false;

    const isDateCheck = (data) => Object.keys(data).reduce((acc, current) => data[acc] > data[current]);
    const isDataEmptyCheck = (data) => {
      let isFalse = false;
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if (data[key] === "") {
            isFalse = true;
          }
        }
      }
      return isFalse;
    };

    if (isDateCheck(data) || isDataEmptyCheck(data)) {
      return !isFalse;
    }
    return isFalse;
  };

  const callApi = async ({ startData, endData }) => {
    return await axios.post("/api/covid-19", {
      params: {
        pageNo: 1,
        numOfRows: 10,
        startCreateDt: startData,
        endCreateDt: endData,
      },
    });
  };

  const handleClick = () => {
    const startValue = startInput.current.value;
    const endValue = endInput.current.value;

    const currentDataObject = { [startInput.current.name]: startValue, [endInput.current.name]: endValue };

    if (validation(currentDataObject)) {
      alert("날짜를 확인하세요.");
      return;
    }

    setData((prevData) => {
      isShow.current = true;
      return deepEquals(prevData, { ...data, ...currentDataObject });
    });
  };

  useEffect(() => {
    console.log("Api Call");
    callApi(hyphenRemove(data)).then((res) => {
      const { body } = res.data;
      setTimeout(() => {
        isShow.current = false;
        setApiData(body);
      }, 1000);
    });
  }, [data]);

  return (
    <div>
      {isShow.current && <ImgLoding />}
      <div>
        <input ref={startInput} type="date" defaultValue={data.startData} name="startData" />
      </div>
      <div>
        <input ref={endInput} type="date" defaultValue={data.endData} name="endData" />
      </div>
      <button type="button" onClick={handleClick}>
        API호출
      </button>
      <div>{apiData && apiData.items.item.map(({ stateDt, seq }) => <div key={seq}>{stateDt}</div>)}</div>
    </div>
  );
}

export default App;

// form으로 관리한다
// 자고 일찍일어나서 고민해보자
// 코로나 사이트 꾸며놓기 chart 라이브리러 알아보기
