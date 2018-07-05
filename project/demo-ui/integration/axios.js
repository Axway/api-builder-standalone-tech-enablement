const https = require('https');
const axios = require('axios');
const defaultLocation = 'http://localhost:8080/api/v1/';
const config = {
  baseURL: defaultLocation,
  timeout: 100000,
  auth: {
    username: '',
    password: ''
  },
  httpsAgent: new https.Agent({ 
    rejectUnauthorized: false 
  })
};

export default () => {
  return {
    get: get
  }
}

async function get(resourceLocation, apiKey, serviceLocation) {
    config.auth.username = apiKey
    if (serviceLocation) {
      //Override default location
      config.baseURL = serviceLocation
    }
    let res 
    try {
      res = await axios(resourceLocation, config)
    } catch(e) {
      console.log(e)
      return null
    }
    return res.data;
}