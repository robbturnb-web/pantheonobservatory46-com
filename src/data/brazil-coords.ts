/**
 * Geographic coordinates for each Brazil UAP dossier case.
 * Used by the interactive map on /brazil.
 */
export const brazilCoords: Record<string, { lat: number; lng: number; pinLabel: string }> = {
  'noite-ovnis':       { lat: -23.2237, lng: -45.9009, pinLabel: 'Noite Oficial dos OVNIs · 1986' },
  'varginha':          { lat: -21.5556, lng: -45.4297, pinLabel: 'Varginha Incident · 1996' },
  'colares':           { lat:  -0.9333, lng: -48.2833, pinLabel: 'Operação Prato · Colares · 1977' },
  'trindade':          { lat: -20.5042, lng: -29.3147, pinLabel: 'Trindade Island Photos · 1958' },
  'vilas-boas':        { lat: -19.8728, lng: -49.7714, pinLabel: 'Vilas-Boas Abduction · 1957' },
  'chupa-chupa-amazon':{ lat:  -1.4558, lng: -48.5039, pinLabel: 'Chupa-Chupa Wave · 1977–81' },
};
