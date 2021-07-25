import axios from "axios";
import { useEffect } from "react";

// 코로나 사이트 꾸며놓기 chart 라이브리러 알아보기

function App() {
  const callApi = async () => {
    axios.get("/api/covid-19").then((res) => console.log(res.data));
  };

  useEffect(() => {
    callApi();
  }, []);

  return <div>안녕</div>;
}

export default App;
