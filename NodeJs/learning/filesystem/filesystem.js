const fs = require('fs');

//// Asynchronous read
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log(data);
});

console.log('This runs first!');


// Synchronous read
try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }


// Asynchronous write (creates new or overwrites existing)
fs.writeFile('output.txt', 'Hello, World!', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File written successfully');
  });


// Synchronous write
try {
    fs.writeFileSync('output.txt', 'Hello, World!');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }

  // Asynchronous append
fs.appendFile('example.txt', '\nNew line added', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
      return;
    }
    console.log('Content appended successfully');
  });
  
  // Synchronous append
  try {
    fs.appendFileSync('example.txt', '\nNew line added');
    console.log('Content appended successfully');
  } catch (err) {
    console.error('Error appending to file:', err);
  }

  // Asynchronous delete
fs.unlink('fileToDelete.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    console.log('File deleted successfully');
  });
  
  // Synchronous delete
  try {
    fs.unlinkSync('fileToDelete.txt');
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting file:', err);
  }


  // Asynchronous rename
fs.rename('oldname.txt', 'newname.txt', (err) => {
    if (err) {
      console.error('Error renaming file:', err);
      return;
    }
    console.log('File renamed successfully');
  });
  
  // Synchronous rename
  try {
    fs.renameSync('oldname.txt', 'newname.txt');
    console.log('File renamed successfully');
  } catch (err) {
    console.error('Error renaming file:', err);
  }
 
  // Open file for reading and writing
fs.open('input.txt', 'r+', (err, fd) => {
    if (err) {
      console.error('Error opening file:', err);
      return;
    }
    console.log('File opened successfully');
    
    // Read from the opened file
    const buffer = Buffer.alloc(1024);
    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      console.log(bytes + ' bytes read');
      if (bytes > 0) {
        console.log(buffer.slice(0, bytes).toString());
      }
    });
  });
  

  const fs = require('fs');

// Check if file exists
fs.access('example.txt', fs.constants.F_OK, (err) => {
  if (err) {
    console.log('File does not exist');
    return;
  }
  console.log('File exists');
});

// Synchronous check
try {
  fs.accessSync('example.txt');
  console.log('File exists');
} catch (err) {
  console.log('File does not exist');
}

// Get file stats
fs.stat('example.txt', (err, stats) => {
    if (err) {
      console.error('Error getting file stats:', err);
      return;
    }
    console.log('File size:', stats.size);
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
    console.log('Creation time:', stats.birthtime);
  });


  const fs = require('fs');

// Asynchronous create directory
fs.mkdir('new-directory', { recursive: true }, (err) => {   
    if (err) {
      console.error('Error creating directory:', err);
      return;
    }
    console.log('Directory created successfully');
  });
  
  // Synchronous create directory
  try {
    fs.mkdirSync('new-directory', { recursive: true });
    console.log('Directory created successfully');
  } catch (err) {
    console.error('Error creating directory:', err);
  }