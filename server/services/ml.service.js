const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

const predictHeartDisease = async (data) => {
  try {
    const response = await axios.post(
      `${ML_SERVICE_URL}/predict/heart`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Heart prediction service unavailable."
    );
  }
};

const predictDiabetes = async (data) => {
  try {
    const response = await axios.post(
      `${ML_SERVICE_URL}/predict/diabetes`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Diabetes prediction service unavailable."
    );
  }
};

module.exports = {
  predictHeartDisease,
  predictDiabetes,
};