const fs = require("fs");
const path = require("path");
const data = require("../Surah.js");
// Assuming 'data' is the array of objects you fetched from the API
console.log(data);

const newData = data.map((item) => {
  return {
    name: item.name,
    name_ar: "سورة " + item.name_ar, // Add "سورة " before the Arabic name
    name_translation: item.name_translation,
    number: item.number,
  };
});

// Convert the array of objects to JSON
const newDataJSON = JSON.stringify(newData, null, 2);

// Specify the file path where you want to write the new data
const filePath = path.join(__dirname, "file.json");

// Write the JSON data to the new file
fs.writeFile(filePath, newDataJSON, "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Data has been written to the new file successfully.");
  }
});
