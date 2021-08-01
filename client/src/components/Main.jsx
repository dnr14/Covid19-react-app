import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import DeathChart from "./DeathChart";
import axios from "axios";
import "scss/main.scss";
import { ImgLoding } from "./styled";

import { Title } from "./styled";

/*
  // 요청
  API PROPERY 정보
  numOfRows 한페이지 결과 수 1
  pageNo 페이지 번호 0
  startCreateDt 데이터 생성일 시작범위 0
  endCreateDe  데이터 생성일 종료범휘 0

  // 응답 
  totalCount 전체 결과 수 1
  seq 고유 값 
  startDt 기준일
  startTime 기준시간
  decideCnt 확진 자 수
  clearCont 격리 해제 수
  examCnt 검사 진행 수
  deathCnt 사망자 수
  careCnt 치료중 환자 수
  resultLegcnt 결과 음성 수
  accExamCnt 누적 검사 수
  accExamCompCnt 누적 검사 완료
  accDefRate 누적 확진률
  createDt 등록일시분초
  updateDt 수정일시분초
*/

const optimizeAnimation = (callback) => {
  let ticking = false;
  return (e) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback(e);
        ticking = false;
      });
    }
  };
};

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

const getToday = () => {
  const day = new Date();
  const yyyy = day.getFullYear();
  const mm = `${day.getMonth() + 1}`.padStart(2, "0");
  const dd = `${day.getDate()}`.padStart(2, "0");

  const toDay = `${yyyy}-${mm}-${dd}`;

  return { startData: toDay, endData: toDay };
};

const Main = () => {
  const [apiData, setApiData] = useState([]);
  const debounce = useRef(false);
  const [data, setData] = useState(getToday());
  const [divWidth, setDivWidth] = useState(null);
  const divRef = useRef(null);
  const startInput = useRef(null);
  const endInput = useRef(null);
  const isShow = useRef(true);

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

    const callApi = async ({ startData, endData }) => {
      try {
        return await axios.post("/api/covid-19", {
          params: {
            pageNo: 1,
            numOfRows: 10,
            startCreateDt: startData,
            endCreateDt: endData,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    callApi(hyphenRemove(data)).then((res) => {
      console.log(res);
      const { header } = res.data;

      setTimeout(() => {
        isShow.current = false;
        if (header.resultCode !== 99) {
          const { body } = res.data;
          const { items } = body;
          const { item } = items;

          if (Array.isArray(item)) {
            setApiData(item);
            console.log("array", items);
          } else {
            console.log("object", items);
            setApiData([item]);
          }
        } else if (header.resultCode === 99) {
          alert(`${header.resultMsg}`);
          setApiData([]);
        }
      }, 1000);
    });
  }, [data]);

  useLayoutEffect(() => {
    setDivWidth(divRef.current.clientWidth);
    const handleResize = () => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      debounce.current = setTimeout(() => {
        setDivWidth(divRef.current.clientWidth);
      }, 100);
    };

    const clearEv = optimizeAnimation(handleResize);
    window.addEventListener("resize", clearEv);

    return () => {
      // cleanup
      window.removeEventListener("resize", clearEv);
    };
  }, []);

  return (
    <div>
      <Title>코로나 현황을 시각화로 확인해보세요.</Title>
      {isShow.current && <ImgLoding />}
      <div>
        <div className="covid--search">
          <div className="covid--apiCall">
            <span>시작 날짜</span> <input ref={startInput} type="date" defaultValue={data.startData} name="startData" />
          </div>
          <div className="covid--apiCall">
            <span>종료 날짜</span> <input ref={endInput} type="date" defaultValue={data.endData} name="endData" />
          </div>
          <div className="covid--apiCall">
            <button type="button" onClick={handleClick}>
              검색
            </button>
          </div>
        </div>
      </div>
      <div className="deth-Chart-Container">
        <div ref={divRef}>
          <DeathChart divWidth={divWidth} items={apiData}></DeathChart>
        </div>
      </div>
    </div>
  );
};

export default Main;
