import express from "express";
import { getActorDetails, getActorMovies, getActorTvs } from "../controllers/actor.controller.js";


const router= express.Router();

router.get("/:id/actor", getActorDetails);
router.get("/:id/actorMovies", getActorMovies);
router.get("/:id/actorTvs", getActorTvs);

export default router;