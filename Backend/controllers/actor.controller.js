import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getActorDetails(req, res){
    const {id}= req.params;
    try {
      const data= await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}?language=en-US`)
      res.status(200).json({success: true, content: data})  
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success: false, message:"Internal Server Error"});
    }
}

export async function getActorMovies(req, res){
    const {id}= req.params;
    try {
      const data= await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`)
      res.status(200).json({success: true, actorMovies: data.cast})  
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success: false, message:"Internal Server Error"});
    }
}

export async function getActorTvs(req, res){
    const {id}= req.params;
    try {
      const data= await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`)
      res.status(200).json({success: true, actorTvs: data.cast})  
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success: false, message:"Internal Server Error"});
    }
}