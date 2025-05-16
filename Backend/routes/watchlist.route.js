import express from "express";
import { addToWatchlist, deleteFromWatchlist, getWatchlist } from "../controllers/watchlist.controller.js";

const router= express.Router();

router.post('/add', addToWatchlist);
router.get('/getWatchlist', getWatchlist);
router.delete('/delete/:contentId', deleteFromWatchlist);


export default router;