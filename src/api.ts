// utils/api.ts

import axios, { AxiosResponse } from 'axios';

// Define the structure of a unit based on the provided example
interface Unit {
  _id: string;
  race: 'protoss' | 'zerg' | 'terran';
  name: string;
  mins: number;
  gas: number;
  __v: number;
}

// For game history, assuming the earlier provided structure:
interface GameHistoryItem {
  _id: string;
  races: [string, string][];
  victory: boolean;
}

// Define the structure for RollResult
interface RollResult {
  name: string;
  race: 'protoss' | 'zerg' | 'terran';
  units: string[]; // Using string here because it seems like the units are referred by name in the roll result.
}

export function getGameHistory(): Promise<GameHistoryItem[]> {
  return axios
    .get<GameHistoryItem[]>(`/api/game_history`)
    .then((response: AxiosResponse<GameHistoryItem[]>) => response.data)
    .catch((error: Error) => {
      console.error('Error fetching game history:', error);
      throw error;
    });
}

export function getUnits(): Promise<Unit[]> {
  return axios
    .get<Unit[]>(`/api/units`)
    .then((response: AxiosResponse<Unit[]>) => response.data)
    .catch((error: Error) => {
      console.error('Error fetching game units:', error);
      throw error;
    });
}

export function executeRoll(): Promise<RollResult[]> {
  return axios
    .post<RollResult[]>(`api/roll`)
    .then((response: AxiosResponse<RollResult[]>) => response.data)
    .catch((error: Error) => {
      console.error('Error in Roll Attempt:', error);
      throw error;
    });
}
