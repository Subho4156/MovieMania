import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";


export async function addToWatchlist(req, res){
    const {contentId, contentType}= req.body;

    try {
        const user = await User.findById(req.user._id);
        const alreadyExists= user.watchlist.some(item => item.contentId === contentId);
        if(alreadyExists){
          return res.status(200).json({success: true, message: 'Already in watchlist', watchlist: user.watchlist });
        }

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${ENV_VARS.TMDB_API_KEY}`);
        const title = contentType === 'movie' ? response.title : response.name;
        const poster_path = response.poster_path;

        user.watchlist.push({ contentId, contentType, title, poster_path });
        await user.save();

        res.status(200).json({ success: true, message: "Movie added to the Watchlist", watchlist: user.watchlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export async function getWatchlist(req, res){
    try {
        res.status(200).json({success: true, content: req.user.watchlist});
    } catch (error) {
        res.status(500).json({success: false, message:"Internal Server Error"});
    }
}

export async function deleteFromWatchlist(req, res) {
  const { contentId } = req.params;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        watchlist: { contentId: contentId },
      },
    });

    res.status(200).json({ success: true, message: "Item removed from watchlist" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}