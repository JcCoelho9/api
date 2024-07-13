const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Endpoint para obter uma lista de imagens disponíveis
app.get('/api/images', (req, res) => {
  const imagesDirectory = path.join(__dirname, 'img'); // Atualize para 'img'
  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error('Error reading images directory:', err);
      return res.status(500).send('Error reading images');
    }
    const images = files.map(file => ({
      name: file,
      url: `http://localhost:${port}/api/images/${file}`
    }));
    res.json(images);
  });
});

// Endpoint para servir imagens estáticas
app.use('/api/images', express.static(path.join(__dirname, 'img'))); // Atualize para 'img'

// Iniciando o servidor
app.listen(port, () => {
  console.log(`API de imagens está rodando em http://localhost:${port}`);
});
