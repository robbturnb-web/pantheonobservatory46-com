/**
 * compute-natal-chart
 *
 * Computes a real natal chart (ecliptic longitudes for Sun, Moon, and
 * inner/social planets + Ascendant) from birth data using the
 * `astronomy-engine` library — pure JS, NASA-grade precision, runs in
 * Deno via `npm:` specifier.
 *
 * No auth required. CORS open. Stateless. Soft rate-limited by IP.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "npm:zod@3.23.8";
import * as Astronomy from "npm:astronomy-engine@2.1.19";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  /** ISO date YYYY-MM-DD */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  /** 24h time HH:MM (local at birthplace) */
  time: z.string().regex(/^\d{2}:\d{2}$/, "time must be HH:MM"),
  /** Latitude in degrees, -90..90 */
  lat: z.number().min(-90).max(90),
  /** Longitude in degrees, -180..180 */
  lon: z.number().min(-180).max(180),
  /** Timezone offset in minutes from UTC (e.g. -300 for EST). */
  tzOffsetMinutes: z.number().int().min(-14 * 60).max(14 * 60),
});

const ZODIAC = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

interface PlanetPosition {
  longitude: number;
  sign: string;
  degree: number;
}

function longitudeToSign(longitude: number): PlanetPosition {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  return {
    longitude: normalized,
    sign: ZODIAC[signIndex],
    degree: normalized - signIndex * 30,
  };
}

/**
 * Convert a body's geocentric equatorial position to ecliptic longitude.
 * astronomy-engine returns equatorial coordinates by default; we use
 * Ecliptic() to project them onto the ecliptic plane.
 */
function eclipticLongitude(body: Astronomy.Body, date: Date): number {
  const equator = Astronomy.Equator(body, date, null, true, true);
  const vector = Astronomy.VectorFromEquator(equator, date);
  const ecliptic = Astronomy.Ecliptic(vector);
  return ecliptic.elon;
}

/** Compute the Ascendant (rising sign) from local sidereal time + latitude. */
function computeAscendant(date: Date, latDeg: number, lonDeg: number): number {
  // Greenwich sidereal time in hours [0, 24)
  const gst = Astronomy.SiderealTime(date);
  // Local sidereal time
  const lstHours = (gst + lonDeg / 15 + 24) % 24;
  const lstDeg = lstHours * 15;

  // Obliquity of the ecliptic (radians)
  const obliquity = (23.4392911 * Math.PI) / 180;
  const latRad = (latDeg * Math.PI) / 180;
  const ramcRad = (lstDeg * Math.PI) / 180;

  // Standard astrological Ascendant formula
  const y = -Math.cos(ramcRad);
  const x = Math.sin(ramcRad) * Math.cos(obliquity) +
            Math.tan(latRad) * Math.sin(obliquity);
  let asc = Math.atan2(y, x) * (180 / Math.PI);
  if (asc < 0) asc += 360;
  return asc;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const { date, time, lat, lon, tzOffsetMinutes } = parsed.data;

    // Compose the birth moment as a UTC Date.
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    // Local minutes since midnight, then convert to UTC by subtracting tz offset.
    const utcMs = Date.UTC(year, month - 1, day, hour, minute) - tzOffsetMinutes * 60 * 1000;
    const birth = new Date(utcMs);

    const sunLon = eclipticLongitude(Astronomy.Body.Sun, birth);
    const moonLon = eclipticLongitude(Astronomy.Body.Moon, birth);
    const mercuryLon = eclipticLongitude(Astronomy.Body.Mercury, birth);
    const venusLon = eclipticLongitude(Astronomy.Body.Venus, birth);
    const marsLon = eclipticLongitude(Astronomy.Body.Mars, birth);
    const jupiterLon = eclipticLongitude(Astronomy.Body.Jupiter, birth);
    const saturnLon = eclipticLongitude(Astronomy.Body.Saturn, birth);
    const ascLon = computeAscendant(birth, lat, lon);

    const chart = {
      sun: longitudeToSign(sunLon),
      moon: longitudeToSign(moonLon),
      mercury: longitudeToSign(mercuryLon),
      venus: longitudeToSign(venusLon),
      mars: longitudeToSign(marsLon),
      jupiter: longitudeToSign(jupiterLon),
      saturn: longitudeToSign(saturnLon),
      ascendant: longitudeToSign(ascLon),
      utc: birth.toISOString(),
    };

    return new Response(JSON.stringify({ chart }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("compute-natal-chart error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
