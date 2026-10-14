import express from "express"
import {connectDB} from "./src/db/connections.js"
import {bootStrap} from "./src/app.controller.js"
const app = express()
await bootStrap(app,express);