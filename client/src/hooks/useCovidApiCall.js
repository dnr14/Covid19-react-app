import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { hyphenRemove } from 'util/DateUtil';

//테스트 자료
import deathData from "deathDummy.json";
import decideData from "decideDummy.json";

const API_URL = "/api/covid-19"

const useCovidApiCall = (date) => {

  console.log("useCovidApiCall", date);

  // 객체로 만들지 생각해보자
  const [apiData, setApiData] = useState([]);

  const handleError = () => {
    setApiData([]);
  };

  useEffect(() => {
    console.debug("💥💥 Api Call 💥💥");

    const callApi = async ({ startData, endData }) => {
      try {
        return await axios.post(API_URL, {
          params: {
            pageNo: 2,
            numOfRows: 10,
            startCreateDt: startData,
            endCreateDt: endData,
          },
        });
      } catch (error) {
        const { status, statusText } = error.response;
        if (status) console.error(`Error ${status}. ${statusText}`);
      }
    };

    callApi(hyphenRemove(date)).then((res) => {
      if (res) {
        setTimeout(() => {
          const { header, body } = res.data;
          const { item = [] } = body?.items;
          if (header.resultCode === "00") {
            Array.isArray(item) ? setApiData(item) : setApiData([item]);
            // 12시 막 지나면 업데이트가 안되어있으면 공백으로 넘어온다.
          } else if (header.resultCode === "99") {
            alert(`${header.resultMsg}`);
            handleError();
          }
        }, 1000);
      } else {
        handleError();
      }
    });
  }, [date]);

  return apiData;
};

export default useCovidApiCall;