import axios from 'axios';
import { useEffect, useState } from 'react';
import { hyphenRemove } from 'util/DateUtil';

const API_URL = "/api/covid-19"

const InitalState = {
  data: [],
  isShow: true,
  isError: false
}
const useCovidApiCall = (date) => {

  const [apiData, setApiData] = useState(InitalState);

  const handleError = () => {
    setApiData({ ...apiData, isShow: false, isError: true });
  };

  useEffect(() => {
    console.debug("💥💥 Api Call 💥💥");
    console.debug("useCovidApiCall", date);

    const callApi = async ({ startData, endData }) => {
      try {
        return await axios.post(API_URL, {
          params: { 
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
        const { header, body } = res.data;
        const { item = [] } = body?.items;
        if (header.resultCode === "00") {
          Array.isArray(item)
            ? setApiData({ ...apiData, data: item, isShow: false, isError: false })
            : setApiData({ ...apiData, data: [item], isShow: false, isError: false });
          // 12시 막 지나면 업데이트가 안되어있으면 공백으로 넘어온다.
        } else if (header.resultCode === "99") {
          alert(`${header.resultMsg}`);
          handleError();
        }
      } else {
        handleError();
      }
    });
  }, [date]);

  return apiData;
};

export default useCovidApiCall;