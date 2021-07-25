const express = require("express");
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ path: "../.env" })


const URL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
const SERVICE_KEY = process.env.OPENAPI_KEY;

router.get("/covid-19", (req, res) => {
  console.debug('💥💥💥 request 💥💥💥');
  const { query } = req;
  const full_url = getApi();
  axios.get(full_url)
    .then(axios_res => {
      const { body } = axios_res.data.response;
      res.send(body);
    });
});


function getApi() {
  let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + SERVICE_KEY; /*Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200310'); /**/
  queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200315'); /**/
  return URL + queryParams;
}

module.exports = router;