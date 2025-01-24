#!/usr/bin/env node

// Import the 'process' module to handle command-line arguments
const process = require("node:process");

// Get the arguments passed from the command line (ignoring the first two)
const args = process.argv.slice(2);

// Default values for password settings
let length = 8; // Default password length is 8
let customizeArg = ""; // By default, the password only has lowercase letters

// Function to show the help menu when the user asks for it
function printHelp() {
  console.log(`
Usage:
  npx pass-gen [options]



Options:
  --help                Show this help message
  --length <number>     Set how long the password should be (default: 8)
  --customize <flags>   Add specific character types:
                        a - include all characters (uppercase, numbers, symbols)
                        c - include uppercase letters
                        n - include numbers
                        s - include symbols
                        l - include lowercase letters (default if none specified)

Examples:
  npx pass-gen --length 12 --customize acn
  npx pass-gen --length 10
  `);
}

// Function to check if the length provided is valid
function validateLength(value) {
  const num = parseInt(value, 10); // Convert the value to a number
  if (isNaN(num) || num <= 0) {
    // If it's not a valid number or less than 1, show an error
    console.error("Error: Invalid length. Please provide a positive number.");
    process.exit(1); // Stop the program
  }
  return num; // Return the valid number
}

// Function to create a random password
function generatePassword(length, characterSet) {
  let password = ""; // Start with an empty password
  for (let i = 0; i < length; i++) {
    // Add random characters to the password
    const randomIndex = Math.floor(Math.random() * characterSet.length); // Pick a random spot in the character set
    password += characterSet[randomIndex]; // Add the character at that spot
  }
  return password; // Return the final password
}

// Loop through the arguments to handle user inputs
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--help") {
    // If the user wants help, show the help menu and stop the program
    printHelp();
    process.exit(0);
  } else if (args[i] === "--length") {
    // If the user specifies a password length
    if (args[i + 1]) {
      length = validateLength(args[i + 1]); // Validate and set the length
      i++; // Skip the next argument since it's the length
    } else {
      console.error("Error: You need to specify a value for --length."); // Show an error if no value is given
      process.exit(1);
    }
  } else if (args[i] === "--customize") {
    // If the user wants to customize the password
    if (args[i + 1]) {
      customizeArg = args[i + 1]; // Save the customization flags
      i++; // Skip the next argument since it's the customization flags
    } else {
      console.error("Error: You need to specify a value for --customize."); // Show an error if no flags are given
      process.exit(1);
    }
  }
}

// Define character sets
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "!@#$%^&*()<>?[]=-+_/,?:'|";

// Build the character set based on user input
let characterSet = ""; // Start with an empty character set
if (customizeArg.includes("a")) {
  // If the user wants "all characters," include everything
  characterSet = lowercase + uppercase + numbers + symbols;
} else {
  // Otherwise, add specific types based on the user's flags
  if (customizeArg.includes("l") || customizeArg === "")
    characterSet += lowercase; // Add lowercase letters (default)
  if (customizeArg.includes("c")) characterSet += uppercase; // Add uppercase letters
  if (customizeArg.includes("n")) characterSet += numbers; // Add numbers
  if (customizeArg.includes("s")) characterSet += symbols; // Add symbols
}

// Error handling: Ensure a valid character set is built
if (characterSet === "") {
  console.error(
    "Error: No valid character types specified. Use --customize with a, c, n, s, or l."
  );
  process.exit(1);
}

// Debugging: Display the character set being used (optional, for testing purposes)
console.log("Character set being used:", characterSet);

// Generate and display the password
console.log("Password:", generatePassword(length, characterSet));
