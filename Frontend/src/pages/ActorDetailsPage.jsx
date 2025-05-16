import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';
import Navbar from '../components/Navbar';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


function formatReleaseDate(date){
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const ActorDetailsPage = () => {
    const {id}= useParams();
    const [content, setContent]= useState(null);
    const [Movies, setMovies]= useState([]);
    const [Tvs, setTvs]= useState([]);
    const [loading, setLoading]= useState(true);
    const movieSliderRef = useRef(null);
    const tvSliderRef = useRef(null);

    useEffect(()=> {
        const getActorDetails = async ()=> {
            try {
                const res= await axios.get(`/api/v1/actor/${id}/actor`);
                setContent(res.data.content);
            } catch (error) {
                if(error.message.includes("404")){
                    setContent([]);
                }
            }finally{
                setLoading(false);
            }
        };

        getActorDetails();
    }, [id]);


    useEffect(()=> {
        const getActorMovies = async ()=> {
            try {
                const res= await axios.get(`/api/v1/actor/${id}/actorMovies`);
                setMovies(res.data.actorMovies);
            } catch (error) {
                if(error.message.includes("404")){
                    setMovies([]);
                }
            }
        };

        getActorMovies();
    }, [id]);

    useEffect(()=> {
        const getActorTvs = async ()=> {
            try {
                const res= await axios.get(`/api/v1/actor/${id}/actorTvs`);
                setTvs(res.data.actorTvs);
            } catch (error) {
                if(error.message.includes("404")){
                    setMovies([]);
                }
            }
        };

        getActorTvs();
    }, [id]);


    const scrollLeft = (ref)=> {
        if(ref.current){
            ref.current.scrollBy({left:-ref.current.offsetWidth, behavior: 'smooth'});
        }
    };

    const scrollRight = (ref)=> {
        if(ref.current){
            ref.current.scrollBy({left: ref.current.offsetWidth, behavior: 'smooth'});
        }
    };

    if(loading) return(
        <div className='min-h-screen bg-black p-10'>
            <WatchPageSkeleton />
        </div>
    )

    if(!content) return(
        <div className='bg-black text-white h-screen'>
            <div className='max-w-6xl mx-auto'>
                <Navbar />
                <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                    <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😢</h2>
                </div>
            </div>
        </div>
    )

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='mx-auto container px-4 py-8 h-full'>
        <Navbar />

        <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto pt-20'>
            <div className='mb-4 md:mb-0'>
                <h2 className='text-5xl font-bold text-balance'>{content?.name}</h2>
                <p className='mt-2 text-lg'>
                    {formatReleaseDate(content?.birthday)} |{" "}
                    {content?.gender===2 ? (
                            <span className='text-red-600'>Male</span>
                      ) : (
                        <span className='text-red-600'>Female</span>
                      )}{" "}
                </p>
                <p className='mt-4 text-lg'>{content?.biography}</p>
            </div>
            <img src={ORIGINAL_IMG_BASE_URL + content.profile_path} alt={`${content.name} profile`} className='max-h-[600px] rounded-md'/>
        </div>

        {Movies.length>0 && (
            <div className='mt-12 max-w-5xl mx-auto relative'>
                <h3 className='text-3xl font-bold mb-4'>Known for Movies</h3>
                <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={movieSliderRef}>
                    {Movies.map((actorMovies)=> {
                        if(actorMovies.poster_path === null) return null;
                        return(
                            (
                             <Link key={actorMovies.id} to={`/watch/${actorMovies.media_type || "movie"}/${actorMovies.id}`} className='w-52 flex-none'>
                                <img src={SMALL_IMG_BASE_URL+actorMovies?.poster_path} alt="Poster path" className='w-full h-auto rounded-md'/>
                                <h4 className='mt-2 text-lg font-semibold'>{actorMovies.title}</h4>
                             </Link>
                            )
                        )
                    })}

                    <button className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full' onClick={()=> scrollLeft(movieSliderRef)}>
                      <ChevronLeft size={24}/>
                    </button>
                    
                    <button className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full' onClick={()=> scrollRight(movieSliderRef)}>
                      <ChevronRight size={24}/>
                    </button>
                </div>
            </div>
        )}

        {Tvs.length>0 && (
            <div className='mt-12 max-w-5xl mx-auto relative'>
                <h3 className='text-3xl font-bold mb-4'>Known for TV Shows</h3>
                <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={tvSliderRef}>
                    {Tvs.map((actorTvs)=> {
                        if(actorTvs.poster_path === null) return null;
                        return(
                            (
                             <Link key={actorTvs.id} to={`/watch/${actorTvs.media_type || "tv"}/${actorTvs.id}`} className='w-52 flex-none'>
                                <img src={SMALL_IMG_BASE_URL+actorTvs?.poster_path} alt="Poster path" className='w-full h-auto rounded-md'/>
                                <h4 className='mt-2 text-lg font-semibold'>{actorTvs.title}</h4>
                             </Link>
                            )
                        )
                    })}

                    <button className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full' onClick={()=> scrollLeft(tvSliderRef)}>
                      <ChevronLeft size={24}/>
                    </button>
                    
                    <button className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full' onClick={()=> scrollRight(tvSliderRef)}>
                      <ChevronRight size={24}/>
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default ActorDetailsPage
