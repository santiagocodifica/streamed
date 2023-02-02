import { useSearchParams } from "@solidjs/router"
import { createSignal } from "solid-js"

export const [ media, setMedia ] = createSignal<any>()
export const [ imdbId, setImdbId] = createSignal<any>()
export const [ streamingServices, setStreamingServices ] = createSignal<any>()

export const useMedia = () => {

  const [ searchParams, setSearchParams ] = useSearchParams()

  // fetch the media
  const getMedia = async(id: string, type: string) => {

    setSearchParams({ id: id, type: type})

    const SHOW_QUERY = `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
    
    await fetch(SHOW_QUERY, { method: "GET" })
    .then(response => response.json())
    .then(json => {
      // buscamos el streaming Availability, seteamos los datos del media actual, quitamos el scroll al sition
      getImdbId(id, type, () => getStreamingServices(imdbId()) )
      setMedia(json)
      document.body.style.overflowY = "hidden"
    })
  }

  const getImdbId = async(id: string, type: string, callback: () => void) => {
    const QUERY = `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    await fetch(QUERY, { method: "GET" })
    .then(response => response.json())
    .then(json => {
      setImdbId(json.imdb_id)
      callback()
    })
  }

  const getStreamingServices = async(imdb_id: string) => {
    const FETCH_QUERY = `https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${imdb_id}&output_language=en`
    await fetch(FETCH_QUERY, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    })
    .then(response => response.json())
    .then(json => {
      //transform into array
      if(json.streamingInfo){
        const services: any = []
        Object.entries(json.streamingInfo).forEach(([key, value]) => {
          services.push({ service: key, data: value })
        });
        setStreamingServices(services)
      }
    })
  }

  // collect the media from the url
  const collectMedia = () => {
    if(searchParams.id && searchParams.type){
      getMedia(searchParams.id, searchParams.type)
    }
  }

  const closeMedia = () => {
    setSearchParams({ id: null, type: null})
    setMedia()
    setStreamingServices()
    document.body.style.overflowY = "scroll"
  }

  return { getMedia, collectMedia, closeMedia }
}