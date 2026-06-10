/**
 * nasaService — NASA-specific feed wrappers.
 *
 * Reuses the existing `live-data.ts` Supabase Edge Function proxy so we keep
 * one cache layer + one source-of-truth for all upstream APIs. Adding a real
 * NASA_API_KEY only requires updating the proxy.
 */
import {
  fetchFlare,
  fetchSolarWind,
  fetchCMEs,
  fetchFlareEvents,
  fetchGSTs,
  fetchISS,
  type LiveResult,
  type FlareReading,
  type WindReading,
  type CmeSummary,
  type FlareEventSummary,
  type GstSummary,
  type IssReading,
} from '@/lib/live-data';

export const getSolarFlare = (): Promise<LiveResult<FlareReading>> => fetchFlare();
export const getSolarWind = (): Promise<LiveResult<WindReading>> => fetchSolarWind();
export const getCMEs = (): Promise<LiveResult<CmeSummary>> => fetchCMEs();
export const getFlareEvents = (): Promise<LiveResult<FlareEventSummary>> => fetchFlareEvents();
export const getGeomagneticStorms = (): Promise<LiveResult<GstSummary>> => fetchGSTs();
export const getISSPosition = (): Promise<LiveResult<IssReading>> => fetchISS();

export const NASA_PUBLIC_LINKS = {
  sdo: 'https://sdo.gsfc.nasa.gov/',
  soho: 'https://soho.nascom.nasa.gov/',
  neo: 'https://cneos.jpl.nasa.gov/',
  iss: 'https://www.nasa.gov/international-space-station/',
  webb: 'https://webb.nasa.gov/',
};
