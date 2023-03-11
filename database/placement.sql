CREATE DATABASE vetDB;

CREATE TABLE placements(
    Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    /*whether it is EMS or SPAs*/
    PracticeType TEXT,
    AnimalType TEXT,
    ProviderName TEXT,
    FullAddress TEXT,
    GeneralLocation TEXT, /*Only for SPAs, eg. The West, Greater London, etc*/
    County TEXT,
    Country TEXT,
    Postcode VARCHAR(10),
    Telephone TEXT,
    Mobile TEXT,
    ContactName TEXT,
    Email TEXT,
    Website TEXT,
    Accommodation BOOLEAN,
    AccommodationDetail TEXT,
    Expiry DATE /*only for SPA practices*/
);
