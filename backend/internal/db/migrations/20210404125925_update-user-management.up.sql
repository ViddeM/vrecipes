CREATE TABLE IF NOT EXISTS user_email (
    user_id BIGINT REFERENCES vrecipes_user(id),
    email TEXT NOT NULL UNIQUE,
    provider TEXT NOT NULL
);

INSERT INTO user_email(user_id,email,provider)
SELECT id,email,provider FROM vrecipes_user;

ALTER TABLE vrecipes_user
    DROP COLUMN email,
    DROP COLUMN provider;