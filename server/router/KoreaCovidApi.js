const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config({ path: ".env" });

const BASE_URL = process.env.BASE_URL;
const SERVICE_KEY = process.env.OPENAPI_KEY;

const getCovid = (_params) =>
  axios.get(BASE_URL, {
    params: {
      ServiceKey: SERVICE_KEY,
      ..._params,
    },
  });

router.post("/covid-19", async (req, res) => {
  const { params } = req.body;
  //   //이러면 문제가 있다
  //   //API서버가 고장나거나 요청이많아 데이터가 안오면
  //   //클라이언트는 아무것도 못받는다.
  console.log("client ====> server\n", params);
  const { data } = await getCovid(params);
  res.send(data.response);
});

module.exports = router;
