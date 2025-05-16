import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";
import toast from "react-hot-toast";


const WatchlistButton = ({contentId}) => {

  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const {contentType}= useContentStore();

  const handleWatchlist= async() =>{
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/watchlist/add", { contentId, contentType });
      if (res.data.success) {
        setInWatchlist(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add to watchlist');
    }
    setLoading(false);
  }

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const res = await axios.get("/api/v1/watchlist/getWatchlist");
        const exists = res.data.content.some(item => item.contentId === contentId);
        setInWatchlist(exists);
      } catch (error) {
        console.error("Error checking watchlist:", error);
      }
    };

    checkWatchlist();
  }, [contentId]);


  return (
    <button className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
     onClick={handleWatchlist} disabled={loading || inWatchlist}>
      {inWatchlist ? 'In Watchlist' : loading ? 'Adding...' : 'Add to Watchlist'}
    </button>
  )
}

export default WatchlistButton
