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
import path from "path";

const app = express();
const PORT= ENV_VARS.PORT;
const __dirname= path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoute);
app.use("/api/v1/watchlist", protectRoute, watchlistRoute);
app.use("/api/v1/actor", protectRoute, actorRoute);

if(process.env.NODE_ENV=== "production"){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));

    app.get(/(.*)/ ,(req,res)=> {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    })
}

app.listen(PORT, ()=> {
    console.log("Server started");
    connectDB();
})