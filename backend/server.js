require('dotenv').config()
const app = require('./app')
require('./db/setup')

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
