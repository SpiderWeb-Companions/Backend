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
  "FirstName" TEXT,
  "LastName" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "experience" TEXT,
  "reason" TEXT,
  "comments" TEXT
);

CREATE TABLE "ContactUS" (
  "id" SERIAL PRIMARY KEY,
  "FirstName" TEXT,
  "Email" TEXT,
  "Message" TEXT
);

CREATE TABLE "Species" (
  "id" SERIAL PRIMARY KEY,
  "SpeciesName" TEXT,
  "experience" TEXT,
  "temprement" TEXT,
  "habitat" TEXT,
  "food" TEXT
);

ALTER TABLE "SpiderProfile" ADD FOREIGN KEY ("species") REFERENCES "Species" ("id");

ALTER TABLE "SpiderProfile" ADD FOREIGN KEY ("sex") REFERENCES "SpiderSex" ("id");

ALTER TABLE "SpiderProfile" ADD FOREIGN KEY ("adoptionStatus") REFERENCES "AdoptionStatus" ("id");