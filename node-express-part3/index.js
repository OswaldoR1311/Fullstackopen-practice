const app = require('./app')
const { PORT } = require('./utils/config')
const { infoLog } = require('./utils/logger')

app.listen(PORT, () => infoLog(`Server running on port ${config.PORT}`))
