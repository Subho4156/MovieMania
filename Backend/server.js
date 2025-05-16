import express from 'express';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";
import watchlistRoute from "./routes/watchlist.route.js";
import actorRoute from "./routes/actor.route.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';

const app = express();
const PORT= ENV_VARS.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoute);
app.use("/api/v1/watchlist", protectRoute, watchlistRoute);
app.use("/api/v1/actor", protectRoute, actorRoute);

app.listen(PORT, ()=> {
    console.log("Server started");
    connectDB();
})