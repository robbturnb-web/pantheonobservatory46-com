/**
 * noaaService — NOAA space-weather + earth-systems feed wrappers.
 */
import {
  fetchKp,
  fetchSwpcAlerts,
  fetchEarthquakes,
  fetchNwsAlerts,
  type LiveResult,
  type KpReading,
  type SwpcAlert,
  type QuakeSummary,
  type NwsSummary,
} from '@/lib/live-data';

export const getKpIndex = (): Promise<LiveResult<KpReading>> => fetchKp();
export const getSwpcAlerts = (): Promise<LiveResult<SwpcAlert[]>> => fetchSwpcAlerts();
export const getEarthquakes = (): Promise<LiveResult<QuakeSummary>> => fetchEarthquakes();
export const getActiveWeatherAlerts = (): Promise<LiveResult<NwsSummary>> => fetchNwsAlerts();

export const NOAA_PUBLIC_LINKS = {
  swpc: 'https://www.swpc.noaa.gov/',
  weather: 'https://www.weather.gov/',
  usgsEarthquakes: 'https://earthquake.usgs.gov/',
};
