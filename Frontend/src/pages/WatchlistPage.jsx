import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom'

const WatchlistPage = () => {

  const [watchlist, setWatchlist]= useState([]);

  useEffect(() => {
      const getWatchlist = async () => {
        try {
          const res = await axios.get("/api/v1/watchlist/getWatchlist");
          setWatchlist(res.data.content);
        } catch (error) {
          console.log(error.message);
          setWatchlist([]);
        }
      };
  
      getWatchlist();
  }, []);

  const handleDelete = async (content)=> {
    try {
      await axios.delete(`/api/v1/watchlist/delete/${content.contentId}`);
      setWatchlist(watchlist.filter((item)=> item.contentId !== content.contentId));
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log("Watchlist", watchlist);
  if(watchlist.length === 0){
    return(
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-8 mt-8'>My Watchlist</h1>
          <div className='flex justify-center items-center h-96'>
            <p className='text-xl'>Nothing to show here. Go and add something to your watchlist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 mt-8'>My Watchlist</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {watchlist.map((content)=> (
            <div key={content.contentId} className='bg-black p-4 flex items-start border-1'>
              <Link to={`/watch/${content.contentType}/${content.contentId}`}>
                 <img src={SMALL_IMG_BASE_URL + content.poster_path} alt="History image" className='size-16 rounded-full object-cover mr-4'/>
                 <div className='flex flex-col'>
                    <span className='text-white text-lg'>{content.title}</span>
                 </div>
              </Link>
              <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto
                ${content.contentType==="movie"? "bg-red-600": content.contentType==="tv"? "bg-blue-600":"bg-green-600"}`}>
                  {content.contentType[0].toUpperCase()+ content.contentType.slice(1)}
              </span>
              <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
               onClick={()=> handleDelete(content)}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WatchlistPage