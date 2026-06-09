
DROP FUNCTION IF EXISTS public.unlock_achievement(text);
DROP FUNCTION IF EXISTS public.increment_echo_usage(uuid, text, integer);
DROP FUNCTION IF EXISTS public.is_premium(text);
DROP FUNCTION IF EXISTS public.has_active_subscription(uuid, text);

DROP TABLE IF EXISTS public.daily_cosmos_pulse CASCADE;
DROP TABLE IF EXISTS public.observer_achievements CASCADE;
DROP TABLE IF EXISTS public.observer_field_notes CASCADE;
DROP TABLE IF EXISTS public.echo_usage CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
