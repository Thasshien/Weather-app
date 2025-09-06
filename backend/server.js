const express = require('express');
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000;

app.use('/api/weather',require('./routes/weatherRouter'))

app.get("/", (req, res) => {
  res.send("API Working")
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
