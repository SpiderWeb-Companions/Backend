CREATE TABLE "SpiderProfile" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "age" integer,
  "story" TEXT,
  "heatlh" TEXT,
  "photo" TEXT,
  "species" INTEGER,
  "sex" INTEGER,
  "adoptionStatus" INTEGER
);

CREATE TABLE "SpiderSex" (
  "id" SERIAL PRIMARY KEY,
  "sex" TEXT
);

CREATE TABLE "AdoptionStatus" (
  "id" SERIAL PRIMARY KEY,
  "status" TEXT
);

CREATE TABLE "UserProfile" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT,
  "ProfilePicture" TEXT,
  "address" TEXT,
  "spiders" INTEGER[]
);


CREATE TABLE "AdoptionForm" (
    "id" SERIAL PRIMARY KEY,
    "user" INTEGER,
    "reason" TEXT,
    "comments" TEXT
);

CREATE TABLE "Species" (
  "id" SERIAL PRIMARY KEY,
  "SpeciesName" TEXT,
  "experience" TEXT,
  "temprement" TEXT,
  "habitat" TEXT,
  "food" TEXT
);

CREATE OR REPLACE FUNCTION adopt_spider(
    email TEXT,
    reason TEXT,
    comment TEXT,
    spider_id INTEGER
)
    RETURNS VOID
AS $$
DECLARE
    user_id INTEGER;
BEGIN
    -- Get the user ID based on the provided email
    SELECT id INTO user_id
    FROM "UserProfile"
    WHERE "username" = email;

    IF user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', email;
    END IF;

    -- Insert a new record into the AdoptionForm table with the user_id
    INSERT INTO "AdoptionForm" ("user", "reason", "comments")
    VALUES (user_id, reason, comment);

    -- Add the spider ID to the user's spiders array
    UPDATE "UserProfile"
    SET "spiders" = array_append("spiders", spider_id)
    WHERE "id" = user_id;

    -- Update the spider's adoption status to "adopted"
    UPDATE "SpiderProfile"
    SET "adoptionStatus" = (SELECT "id" FROM "AdoptionStatus" WHERE "status" = 'adopted')
    WHERE "id" = spider_id;
END;
$$
    LANGUAGE plpgsql;

ALTER TABLE "AdoptionForm" ADD FOREIGN KEY ("user") REFERENCES "UserProfile" ("id");

ALTER TABLE "SpiderProfile" ADD FOREIGN KEY ("species") REFERENCES "Species" ("id");

ALTER TABLE "SpiderProfile" ADD FOREIGN KEY ("sex") REFERENCES "SpiderSex" ("id");

ALTER TABLE "SpiderProfile" ADD FOREIGN KEY ("adoptionStatus") REFERENCES "AdoptionStatus" ("id");