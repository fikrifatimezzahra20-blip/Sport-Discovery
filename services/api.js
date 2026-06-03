import axios from "axios";

const API_URL =
  "https://6a1d9403bcc4f20d5ca4d1a8.mockapi.io/sport-discovery/api/v1/sports";

export const fetchSports = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.log("API ERROR:", error);

    throw error;
  }
};