import fs from "node:fs/promises";

// async function loadData() {
//   try {
//     const data = await fs.readFile('data.json', 'utf-8');
//     console.log('File Load 1');
//     await fs.readFile('data.json', 'utf-8');
//     console.log('File Load 2');
//     await fs.readFile('data.json', 'utf-8');
//     console.log('File Load 3');
//     const dataObj = JSON.parse(data);
//     console.log(dataObj);
//     console.log('Conplete');
//   } catch (error) {
//     console.log("Could not load and parse file");
//     throw error;
//   }

// }

// loadData().then(() => console.log('Promises Complete')); 

// Top-level await 
try {
  const data = await fs.readFile('data.json', 'utf-8');
  console.log('File Load 1');
  await fs.readFile('data.json', 'utf-8');
  console.log('File Load 2');
  await fs.readFile('data.json', 'utf-8');
  console.log('File Load 3');
  const dataObj = JSON.parse(data);
  console.log(dataObj);
  console.log('Conplete');
} catch (error) {
  console.log("Could not load and parse file");
  throw error;
}