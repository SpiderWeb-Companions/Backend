INSERT INTO "SpiderSex" ("sex")
VALUES ('male'), ('female');


INSERT INTO "AdoptionStatus" ("status")
VALUES ('available'), ('pending'), ('adopted');

INSERT INTO "Species" ("SpeciesName", "experience", "temprement", "habitat", "food")
VALUES 
  ('Tarantula', 'Venomous', 'Aggressive', 'Rainforest', 'Insects'),
  ('Jumping Spider', 'Harmless', 'Docile', 'Grasslands', 'Small Insects'),
  ('Black Widow', 'Poisonous', 'Territorial', 'Dark Corners', 'Small Animals');

INSERT INTO "SpiderProfile" ("name", "age", "story", "heatlh", "photo", "species", "sex", "adoptionStatus")
VALUES 
  ('Fluffy', 5, 'Fluffy is a friendly tarantula looking for a new home.', 'Good', 'fluffy.jpg', 1, 1, 1),
  ('Spidey', 2, 'Spidey is a playful jumping spider.', 'Excellent', 'spidey.jpg', 2, 2, 1),
  ('Midnight', 3, 'Midnight is a mysterious black widow.', 'Fair', 'midnight.jpg', 3, 2, 2);
