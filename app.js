import { Application } from './src/server/Application.server.js'
import connectDatabase from './src/database/database.js'

connectDatabase()
const app = new Application()
app.start()
