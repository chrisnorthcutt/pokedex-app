const fetch = require('node-fetch');
const getColors = require('get-image-colors');
const fs = require('fs');

const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const outputFile = 'src/assets/pokemon-colors.json';

function hexToRgbArray(hex) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255
  ];
}

async function fetchImageBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
  return await res.buffer();
}

async function extractPokemonColors(startId = 1, endId = 10) {
  const result = {};

  for (let id = startId; id <= endId; id++) {
    const url = `${baseUrl}${id}.png`;

    try {
      const buffer = await fetchImageBuffer(url);
      const colors = await getColors(buffer, 'image/png');
      const primaryRgbArray = hexToRgbArray(colors[2].hex());

      result[id] = primaryRgbArray;

      console.log(`✅ #${id} - ${colors[0].hex()} → [${primaryRgbArray.join(', ')}]`);
    } catch (error) {
      console.error(`❌ Error with Pokémon #${id}: ${error.message}`);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log(`🎉 Colors saved to ${outputFile}`);
}

// Set your desired range here
extractPokemonColors(252, 389);