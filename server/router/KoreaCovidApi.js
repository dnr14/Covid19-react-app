const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const URL = process.env.URL;
const SERVICE_KEY = process.env.OPENAPI_KEY;

const callCovidApi = async (_params) => {
  let response;
  console.log("client ====> server\n", _params);
  try {
    response = await axios.get(URL, {
      params: {
        ServiceKey: SERVICE_KEY,
        ..._params,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log(response.data);
  }
  return response.data;
};

router.post("/covid-19", (req, res) => {
  const { params } = req.body;
  //   //이러면 문제가 있다
  //   //API서버가 고장나거나 요청이많아 데이터가 안오면
  //   //클라이언트는 아무것도 못받는다.
  const response = callCovidApi(params);
  response.then((_res) => res.send(_res.response));
});

module.exports = router;
