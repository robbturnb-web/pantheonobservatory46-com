DELETE FROM public.user_roles r
USING auth.users u
WHERE r.user_id = u.id AND r.role = 'admin' AND u.email_confirmed_at IS NULL;