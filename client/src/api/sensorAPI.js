import Papa from 'papaparse';
import mockData from './mockSensorData.csv';

export const fetchSensorData = async () => {
  try {
    return mockData.map(row => ({
      time: row.time,
      value: parseFloat(row.value)
    }));
  } catch (error) {
    console.error('Error fetching mock data:', error);
    return [];
  }
};