import app from './src/app.js'
import connectDB from './src/db/db.js'
import config from './src/config/config.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const PORT = config.PORT;

connectDB();

app.get("*name", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})