
INSERT INTO public.source_health (source_name, url, category, verification_status) VALUES
  ('NASA DONKI (Solar Flares)', 'https://api.nasa.gov/DONKI/FLR', 'official', 'pending'),
  ('NASA DONKI (CME)', 'https://api.nasa.gov/DONKI/CME', 'official', 'pending'),
  ('NASA APOD', 'https://api.nasa.gov/planetary/apod', 'official', 'pending'),
  ('NASA Image Library', 'https://images-api.nasa.gov/search', 'official', 'pending'),
  ('NOAA SWPC (Space Weather)', 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json', 'official', 'pending'),
  ('NOAA SWPC (Aurora)', 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json', 'official', 'pending'),
  ('USGS Earthquakes', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson', 'official', 'pending'),
  ('National Weather Service', 'https://api.weather.gov/alerts/active', 'official', 'pending'),
  ('Open Notify (ISS)', 'http://api.open-notify.org/iss-now.json', 'community', 'pending'),
  ('STScI (Webb)', 'https://mast.stsci.edu/api/v0.1/', 'academic', 'pending'),
  ('Open Topography', 'https://portal.opentopography.org/API/', 'academic', 'pending'),
  ('Stellarium Web', 'https://stellarium-web.org/', 'community', 'pending')
ON CONFLICT (url) DO NOTHING;
