const { createCanvas, loadImage } = require('canvas');
const fs = require("fs");
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');


async function createRecursiveImage(imageFilePath) {
    const image = await loadImage(imageFilePath);

    const deltaX = 20; // The amount by which to move each level of recursion to the right

    function drawImageRecursively(level, x, y, size, deltaX) {
        // Draw the image at the current position and size
        ctx.drawImage(image, x, y, size, size);

        // Check if we should continue drawing recursively
        if (level > 1) {
            // Calculate the size and position of the next image
            const nextSize = size / 2;
            const nextX = x + size / 4 + deltaX;
            const nextY = y + size / 4;

            // Draw the next image recursively
            drawImageRecursively(level - 1, nextX, nextY, nextSize, deltaX + 10);
        }
    }

    drawImageRecursively(4, 0, 0, canvas.width, deltaX);

    const fs = require('fs');
    const out = fs.createWriteStream(__dirname + '/finish.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
}

createRecursiveImage('img.png')
    .then(() => {
        console.log("Success")
    })
