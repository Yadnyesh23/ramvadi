import express from 'express'
import cors from 'cors'
import logger from "./middlewares/logger.middleware.js"

const app = express()

// Middlewares
app.use(cors())
app.use(logger) 
app.use(express.json())

//Routes

import healthcheckroute from './routes/healthcheck.route.js'
import adminloginroute from './routes/auth.route.js'
import galleryRoutes from "./routes/gallery.routes.js";
import errorHandler from "./middlewares/error.middleware.js"
import eventRoutes from "./routes/event.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use('/api', healthcheckroute)
app.use('/api/admin',adminloginroute)
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app