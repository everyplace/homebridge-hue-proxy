import express from 'express'
import { resolve } from "path"
import { config } from "dotenv"

//load .env
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, ".env") })

console.log(process.env.hue_address)
const app = express();

import proxy from './proxy.js'
import v2 from './v2.js'

app.use('/v2', v2)
app.use('/', proxy)

// listen for requests :)
const listener = app.listen(process.env.PORT, ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});
