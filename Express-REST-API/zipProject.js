// zipProject.js
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream('projectFile.zip');
const archive = archiver('zip', {
  zlib: { level: 7 }, // Sets the compression level
});

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log(
    'Archiver has been finalized and the output file descriptor has closed.',
  );
});

archive.on('warning', (err) => {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Append the entire project directory to the archive
const projectDirectory = path.resolve(__dirname, '.'); // Adjust the path if necessary
archive.directory(projectDirectory, false);

// Finalize the archive (i.e., we are done appending files but streams have to finish yet)
archive.finalize();
