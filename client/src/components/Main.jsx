import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ImgLoding, Title, Row, Col, MaxWidthContainer } from "./styled";
import DeathChart from "./DeathChart";
import axios from "axios";
import "scss/main.scss";

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

  const is7DayDifferenceChecked = (data) => {
    const _7DayTime = 518400000;
    const { startData, endData } = data;
    const startTime = new Date(startData).getTime();
    const endTime = new Date(endData).getTime();
    const difference = endTime - startTime;

    if (difference > _7DayTime) {
      return true;
    }
    return false;
  };
  const isDateCheck = (data) => Object.keys(data).reduce((acc, current) => data[acc] > data[current]);
  const isDataEmptyCheck = (data) => {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (data[key] === "" || data[key] === undefined || data[key] === null) {
          return true;
        }
      }
    }
    return false;
  };

  if (is7DayDifferenceChecked(data) || isDateCheck(data) || isDataEmptyCheck(data)) {
    return !isFalse;
  }
  return isFalse;
};

const getDateStr = (date) => {
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate() - 1}`.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const lastWeek = () => {
  const day = new Date();
  const dayOfMonth = day.getDate();
  day.setDate(dayOfMonth - 6);
  return getDateStr(day);
};

const getInitialDate = () => {
  const toDay = new Date();
  return { startData: lastWeek(), endData: getDateStr(toDay) };
};

const Main = () => {
  const [apiData, setApiData] = useState([]);
  const [date, setDate] = useState(getInitialDate());
  const [divWidth, setDivWidth] = useState(null);
  const debounce = useRef(false);
  const divRef = useRef(null);
  const startInput = useRef(null);
  const endInput = useRef(null);
  const isShow = useRef(true);
  const isApiError = useRef(false);

  const handleError = () => {
    isShow.current = false;
    setApiData([]);
  };

  const handleClick = () => {
    const startValue = startInput.current.value;
    const endValue = endInput.current.value;

    const currentDataObject = { [startInput.current.name]: startValue, [endInput.current.name]: endValue };

    if (validation(currentDataObject)) {
      alert(" 날짜를 확인하세요. \n 최대 7일까지 \n 빈값 입력 확인");
      return;
    }

    setDate((prevData) => {
      isShow.current = true;
      if (isApiError.current) {
        return { ...prevData };
      }
      return deepEquals(prevData, { ...date, ...currentDataObject });
    });
  };

  useEffect(() => {
    console.debug("💥💥 Api Call 💥💥");

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
        return error;
      }
    };

    callApi(hyphenRemove(date)).then((res) => {
      if (res instanceof Error) {
        handleError();
        return;
      } else {
        const { header } = res.data;
        setTimeout(() => {
          isShow.current = false;
          if (header.resultCode === "00") {
            const { item = [] } = res.data?.body?.items;
            // 12시 막 지나면 업데이트가 안되어있으면 공백으로 넘어온다.
            if (isApiError.current) isApiError.current = false;
            Array.isArray(item) ? setApiData(item) : setApiData([item]);
          } else if (header.resultCode === 99) {
            alert(`${header.resultMsg}`);
            isApiError.current = true;
            setApiData([]);
          }
        }, 1000);
      }
    });
  }, [date]);

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
    <section id="Main">
      <Row>
        <Col>
          <MaxWidthContainer>
            <Title>코로나 현황을 시각화로 확인해보세요.</Title>
            {isShow.current && <ImgLoding />}
            <div className="covid--search">
              <div className="covid--apiCall">
                <span>시작 날짜</span> <input ref={startInput} type="date" defaultValue={date.startData} name="startData" />
              </div>
              <div className="covid--apiCall">
                <span>종료 날짜</span> <input ref={endInput} type="date" defaultValue={date.endData} name="endData" />
              </div>
              <div className="covid--apiCall">
                <button type="button" onClick={handleClick}>
                  검색
                </button>
              </div>
            </div>
            <div className="chart--Container" ref={divRef}>
              <DeathChart divWidth={divWidth} items={apiData} />
            </div>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Main;
