-- Setup a user
INSERT INTO vrecipes_user (id, name)
VALUES ('7cc2fc04-7379-4361-9f4e-079054933d2f', 'mock_user');

INSERT INTO user_email (email, provider, user_id)
VALUES ('test@test.com', 'facebook', '7cc2fc04-7379-4361-9f4e-079054933d2f');

-- Insert recipes
INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe', 'a_recipe', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 2', 'a_recipe_2', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 2', 'a_recipe_3', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 4', 'a_recipe_4', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 5', 'a_recipe_5', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 6', 'a_recipe_6', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 7', 'a_recipe_7', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe with a very long god damned name', 'a_recipe_with_a_very_long_god_damned_name', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

