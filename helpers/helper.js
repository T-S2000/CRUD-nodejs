
const fs = require('fs');
const path = require('path');

const directoryPath = `./uploads`;

module.exports = {
    emptyDirectory: () => {

        // Read the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            // Iterate through all files in the directory
            for (const file of files) {
                const filePath = path.join(directoryPath, file);

                // Delete each file in the directory
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                        console.log(`Deleted file: ${filePath}`);
                    }
                });
            }
        });
    }
}