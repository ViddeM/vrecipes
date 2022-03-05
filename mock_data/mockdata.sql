-- Setup a user
INSERT INTO vrecipes_user (id, name)
VALUES ('7cc2fc04-7379-4361-9f4e-079054933d2f', 'mock_user');

INSERT INTO user_email (email, provider, user_id)
VALUES ('test@test.com', 'facebook', '7cc2fc04-7379-4361-9f4e-079054933d2f');

-- Create some tags
INSERT INTO tag (id, name, description, color_red, color_green, color_blue, created_by)
VALUES ('5ba8d0db-69d1-4cab-b705-0e8287129254', 'Fish', 'Contains fish', 0, 0, 255, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO tag (id, name, description, color_red, color_green, color_blue, created_by)
VALUES ('0db80f48-66f4-41f3-a5af-b76ff4d9f715', 'Vegetables', 'Contains veggies', 0, 255, 0, '7cc2fc04-7379-4361-9f4e-079054933d2f');

-- Insert recipes
INSERT INTO recipe (id, name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', 'A recipe', 'a_recipe', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO recipe (name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES ('A recipe 2', 'a_recipe_2', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
       ('A recipe 3', 'a_recipe_3', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
       ('A recipe 4', 'a_recipe_4', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
       ('A recipe 5', 'a_recipe_5', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
       ('A recipe 6', 'a_recipe_6', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
       ('A recipe 7', 'a_recipe_7', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
       ('A recipe with a very long god damned name', 'a_recipe_with_a_very_long_god_damned_name', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');

-- Connect Recipes with tags
INSERT INTO recipe_tag (recipe_id, tag_id)
VALUES ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '0db80f48-66f4-41f3-a5af-b76ff4d9f715'),
       ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '5ba8d0db-69d1-4cab-b705-0e8287129254');
