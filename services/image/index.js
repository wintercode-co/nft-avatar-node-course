// 1. Generate a random image
const { createCanvas} = require('canvas')
const fs = require('fs');
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')
const express = require('express')
const app = express()

app.post('/generate', (req, res) => {
    generateImage()
    res.send('Success from generate endpoint')
})

app.listen(4000, () => {
    console.log(`server listening on port ${4000}`);
})

const generateImage = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          const x = 25 + j * 50; // x coordinate
          const y = 25 + i * 50; // y coordinate
          const radius = 20; // Arc radius
          const startAngle = 0; // Starting point on circle
          const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
          const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise
      
          ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
      
          if (i > 1) {
            const rando = Math.floor(Math.random()*16777215).toString(16);
            ctx.fillStyle = `#${rando}`;
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      }
    // 2. Save it to the filesystem
    const imgName = `/images/test_${Date.now()}.jpeg`;
    
    const out = fs.createWriteStream(__dirname + imgName)
    const stream = canvas.createJPEGStream({
        quality: 0.95,
        chromaSubsampling: false
      })
    stream.pipe(out)
    
    out.on('finish', async () =>  {
        console.log('image was generated')
    })
}

// 3. Send the image to the IPFS service