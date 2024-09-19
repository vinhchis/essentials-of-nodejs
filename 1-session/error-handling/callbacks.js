import fs from "node:fs";

fs.readFile('data.json', (err, data) => {
  if (err) {
    console.log('Error reading the file');
    throw err;
  } 
  try {
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log('Complete');
  } catch (error) {
    console.log('Cannot parse Json from file ');
    throw error;
  }
 

});

