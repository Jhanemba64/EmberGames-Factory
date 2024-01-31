/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("DELETE FROM product");
    await database.query("ALTER TABLE product AUTO_INCREMENT=1");
    await database.query("DELETE FROM category");
    await database.query("ALTER TABLE category AUTO_INCREMENT=1");

    // Add categories in database
    await database.query(
      "INSERT INTO category (name) VALUES ('strategy'),('cooperative'),('Deck-Building'),('Role-Playing'),('Adventure'),('Puzzle'),('Family'),('Trivia'),('War'),('Fantasy'),('Educational'),('Horror'),('Simulation')"
    );

    await database.query(
      "INSERT INTO product (name, quantity, price, category_id) VALUES ('Ticket to Ride', 10, 40, 1), ('Carcassonne', 8, 35, 1), ('Risk', 5, 45, 1), ('Codenames', 12, 20, 2), ('Secret Hitler', 6, 25, 2), ('The Resistance', 7, 25, 2), ('Gloomhaven', 4, 60, 3), ('Star Realms', 10, 15, 3), ('7 Wonders', 9, 45, 3), ('Pathfinder', 5, 35, 4), ('Warhammer 40k', 3, 50, 4), ('Betrayal at Baldurs Gate', 6, 40, 4), ('Arkham Horror', 4, 55, 5), ('Tomb Raider: Legends', 7, 40, 5), ('Jumanji', 8, 30, 5), ('Rubiks Cube', 20, 15, 6), ('Sudoku Board Game', 15, 20, 6), ('Tetris', 10, 25, 6), ('Monopoly', 10, 30, 7), ('Cluedo', 12, 35, 7)"
    );
    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
