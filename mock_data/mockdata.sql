-- Setup a user
INSERT INTO vrecipes_user (id, name)
VALUES ('7cc2fc04-7379-4361-9f4e-079054933d2f', 'mock_user');

INSERT INTO user_email (email, provider, user_id)
VALUES ('test@test.com', 'facebook', '7cc2fc04-7379-4361-9f4e-079054933d2f');


-- Insert recipes
INSERT INTO recipe (id, name, unique_name, description, oven_temp, estimated_time, deleted, created_by)
VALUES  ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', 'A recipe', 'a_recipe', 'A long nice description of something fun that this recipe intails, very good yes. I dont really know what we can put in here but lets try everything!', 200, 35, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1e538581-9e9a-4da7-80f6-3127f246c17f', 'A recipe 2', 'a_recipe_2', 'Desc', 190, 20, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('bddb104d-a28e-4bec-97bf-14ad93fc4b20', 'A recipe 3', 'a_recipe_3', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('4213b5e5-0c63-4d31-ba96-f54a574bb040', 'A recipe 4', 'a_recipe_4', 'Desc', 0, 30, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dca1bc12-0cf0-49e9-b0f9-714f9e0c2975', 'A recipe 5', 'a_recipe_5', 'Desc', 100, 45, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1281fa39-3209-4cbf-b359-7554e232f323', 'A recipe 6', 'a_recipe_6', 'Desc', 150, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('ff9373ea-c5d1-4d05-a299-e0856833131d', 'A recipe 7', 'a_recipe_7', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dfed936b-8e2a-458c-a2d7-1c13c14079d6', 'A recipe with a very long god damned name', 'a_recipe_with_a_very_long_god_damned_name', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        
        ('4213b5e5-0c63-4d31-ba96-a54a574bb040', 'A recipe 9', 'a_recipe_9', 'Desc', 0, 30, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dca1bc12-0cf0-49e9-b0f9-a14f9e0c2975', 'A recipe 11', 'a_recipe_11', 'Desc', 100, 45, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1281fa39-3209-4cbf-b359-a554e232f323', 'A recipe 12', 'a_recipe_12', 'Desc', 150, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('ff9373ea-c5d1-4d05-a299-a0856833131d', 'A recipe 13', 'a_recipe_13', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('4213b5e5-0c63-4d31-ba96-b54a574bb040', 'A recipe 14', 'a_recipe_14', 'Desc', 0, 30, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dca1bc12-0cf0-49e9-b0f9-b14f9e0c2975', 'A recipe 15', 'a_recipe_15', 'Desc', 100, 45, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1281fa39-3209-4cbf-b359-b554e232f323', 'A recipe 16', 'a_recipe_16', 'Desc', 150, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('ff9373ea-c5d1-4d05-a299-b0856833131d', 'A recipe 17', 'a_recipe_17', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('4213b5e5-0c63-4d31-ba96-c54a574bb040', 'A recipe 18', 'a_recipe_18', 'Desc', 0, 30, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dca1bc12-0cf0-49e9-b0f9-c14f9e0c2975', 'A recipe 19', 'a_recipe_19', 'Desc', 100, 45, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1281fa39-3209-4cbf-b359-c554e232f323', 'A recipe 20', 'a_recipe_20', 'Desc', 150, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('ff9373ea-c5d1-4d05-a299-c0856833131d', 'A recipe 21', 'a_recipe_21', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('4213b5e5-0c63-4d31-ba96-d54a574bb040', 'A recipe 31', 'a_recipe_31', 'Desc', 0, 30, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dca1bc12-0cf0-49e9-b0f9-d14f9e0c2975', 'A recipe 32', 'a_recipe_32', 'Desc', 100, 45, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1281fa39-3209-4cbf-b359-d554e232f323', 'A recipe 33', 'a_recipe_33', 'Desc', 150, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('ff9373ea-c5d1-4d05-a299-d0856833131d', 'A recipe 34', 'a_recipe_34', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('a213b5e5-0c63-4d31-ba96-c54a574bb040', 'A recipe 35', 'a_recipe_35', 'Desc', 0, 30, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('dca1bc12-0cf0-49e9-b0f9-114f9e0c2975', 'A recipe 37', 'a_recipe_37', 'Desc', 100, 45, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('1281fa39-3209-4cbf-b359-1554e232f323', 'A recipe 39', 'a_recipe_39', 'Desc', 150, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f'),
        ('ff9373ea-c5d1-4d05-a299-10856833131d', 'A recipe 40', 'a_recipe_40', 'Desc', 0, 0, false, '7cc2fc04-7379-4361-9f4e-079054933d2f');


-- Create some tags
INSERT INTO tag (id, name, description, color_red, color_green, color_blue, created_by)
VALUES ('5ba8d0db-69d1-4cab-b705-0e8287129254', 'Fish', 'Contains fish', 0, 0, 255, '7cc2fc04-7379-4361-9f4e-079054933d2f');

INSERT INTO tag (id, name, description, color_red, color_green, color_blue, created_by)
VALUES ('0db80f48-66f4-41f3-a5af-b76ff4d9f715', 'Vegetables', 'Contains veggies', 0, 255, 0, '7cc2fc04-7379-4361-9f4e-079054933d2f');

-- Connect Recipes with tags
INSERT INTO recipe_tag (recipe_id, tag_id)
VALUES ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '0db80f48-66f4-41f3-a5af-b76ff4d9f715'),
       ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '5ba8d0db-69d1-4cab-b705-0e8287129254');

-- Create some units
INSERT INTO unit (name)
VALUES  ('st'),
        ('l'),
        ('kg');

-- Create some ingredients
INSERT INTO ingredient (name)
VALUES 	('socker'),
	    ('ägg'),
	    ('mjölk'),
	    ('vete');

-- Connect recipes with ingredients & units
INSERT INTO recipe_ingredient (ingredient_name, unit_name, amount, number, recipe_id)
VALUES  ('socker', 'kg', 2, 0, '133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b'),
        ('mjölk', 'l', 1, 1, '133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b'),
        ('ägg', 'st', 9, 2, '133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b');


INSERT INTO recipe_step (number, step, recipe_id)
VALUES  (0, 'Put thing in thing', '133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b'),
        (1, 'Put other thing in the other thing', '133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b');

-- Insert images
INSERT INTO image   (id, name)
VALUES              ('0d9828df-f640-4e2e-8c4d-c826321ff7eb', 'Sachertorte.jpg'),
                    ('0fd8e893-6f17-4aa6-99e6-5c35bc1988a0', 'bbq_sauce.jpg'),
                    ('1eadf68b-4e03-4197-8e13-83673acaae6d', 'ballgren.png'),
                    ('5d321c96-61c6-45a0-8c1f-129fd221e817', 'hentie.jpg'),
                    ('60019da2-4da9-470d-8aa0-df55d94d2e8b', 'book.jpg');

-- Connect images to recipes
INSERT INTO recipe_image    (recipe_id, image_id)
VALUES                      ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '0d9828df-f640-4e2e-8c4d-c826321ff7eb'),
                            ('1e538581-9e9a-4da7-80f6-3127f246c17f', '0fd8e893-6f17-4aa6-99e6-5c35bc1988a0'),
                            ('4213b5e5-0c63-4d31-ba96-f54a574bb040', '1eadf68b-4e03-4197-8e13-83673acaae6d'),
                            ('dfed936b-8e2a-458c-a2d7-1c13c14079d6', '5d321c96-61c6-45a0-8c1f-129fd221e817');

-- Create recipebooks
INSERT INTO recipe_book     (name, unique_name, author, deleted, id, created_by)
VALUES                      ('A book', 'a_book', 'Vidde', false, '828adce0-a887-41ce-afdf-5c0bc7124252', '7cc2fc04-7379-4361-9f4e-079054933d2f'),
                            ('Another book', 'another_book', 'PEDRO', false, '14f6d4de-c2c3-4a9f-8f8d-1c1550fd198f', '7cc2fc04-7379-4361-9f4e-079054933d2f'),
                            ('A third book', 'a_third_book', 'That other guy', false, '63fb8fd4-cf5b-4384-8c57-aae06d57cd6e', '7cc2fc04-7379-4361-9f4e-079054933d2f'),
                            ('Spices of the ancient lands of the north', 'spices', 'Lost to history', false, '59c3885a-4cc7-4f9c-99fb-df1290d704cc', '7cc2fc04-7379-4361-9f4e-079054933d2f');

-- Connect recipebooks to images
INSERT INTO recipe_book_image   (recipe_book_id, image_id)
VALUES                          ('828adce0-a887-41ce-afdf-5c0bc7124252', '60019da2-4da9-470d-8aa0-df55d94d2e8b');

-- Connect recipes to recipebooks
INSERT INTO recipe_book_recipe  (recipe_id, recipe_book_id)
VALUES                          ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '828adce0-a887-41ce-afdf-5c0bc7124252'),
                                ('1e538581-9e9a-4da7-80f6-3127f246c17f', '828adce0-a887-41ce-afdf-5c0bc7124252'),
                                ('bddb104d-a28e-4bec-97bf-14ad93fc4b20', '828adce0-a887-41ce-afdf-5c0bc7124252'),
                                ('bddb104d-a28e-4bec-97bf-14ad93fc4b20', '14f6d4de-c2c3-4a9f-8f8d-1c1550fd198f'),
                                ('4213b5e5-0c63-4d31-ba96-f54a574bb040', '63fb8fd4-cf5b-4384-8c57-aae06d57cd6e'),
                                ('dca1bc12-0cf0-49e9-b0f9-714f9e0c2975', '63fb8fd4-cf5b-4384-8c57-aae06d57cd6e'),
                                ('1281fa39-3209-4cbf-b359-7554e232f323', '63fb8fd4-cf5b-4384-8c57-aae06d57cd6e'),
                                ('ff9373ea-c5d1-4d05-a299-e0856833131d', '63fb8fd4-cf5b-4384-8c57-aae06d57cd6e'),
                                ('dfed936b-8e2a-458c-a2d7-1c13c14079d6', '63fb8fd4-cf5b-4384-8c57-aae06d57cd6e');

-- Add a recipe to mock users favorites
INSERT INTO favorite_recipe (recipe_id, user_id)
VALUES                      ('1e538581-9e9a-4da7-80f6-3127f246c17f', '7cc2fc04-7379-4361-9f4e-079054933d2f'),
                            ('133cdcc3-5b5b-440e-95f5-0d5dd4f8f78b', '7cc2fc04-7379-4361-9f4e-079054933d2f'),
                            ('828adce0-a887-41ce-afdf-5c0bc7124252', '7cc2fc04-7379-4361-9f4e-079054933d2f');

