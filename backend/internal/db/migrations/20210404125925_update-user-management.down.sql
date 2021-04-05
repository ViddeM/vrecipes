ALTER TABLE vrecipes_user
    ADD COLUMN email TEXT NOT NULL DEFAULT '',
    ADD COLUMN provider TEXT NOT NULL DEFAULT '';

UPDATE vrecipes_user
SET vrecipes_user.email = user_email.email,
SET vrecipes_user.provider = user_email.provider
FROM user_email
WHERE vrecipes.id = user_email.user_id;

DROP TABLE IF EXISTS user_email;