// utils/api.js

import axios from 'axios';

export function getGameHistory() {
  return axios
    .get(`/api/game_history`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching game history:', error);
      throw error; // Re-throw the error to handle it in the calling function
    });
}

export function getUnits() {
  return axios
    .get(`/api/units`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching game units:', error);
      throw error; // Re-throw the error to handle it in the calling function
    });
}

export function executeRoll() {
  return axios
    .post(`api/roll`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error in Roll Attempt :', error);
      throw error; // Re-throw the error to handle it in the calling function
    });
}
