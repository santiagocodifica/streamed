import { useSearchParams } from "@solidjs/router"
import { createSignal } from "solid-js"

export const [ media, setMedia ] = createSignal<any>()
export const [ mediaType, setMediaType ] = createSignal<any>()
export const [ imdbId, setImdbId] = createSignal<any>()

export const useMedia = () => {

  const [ searchParams, setSearchParams ] = useSearchParams()

  // fetch the media
  const getMedia = async(id: string, type: string) => {
    setSearchParams({ id: id, type: type})
    setMediaType(type) // INNECESARIO
    const SHOW_QUERY = `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
    await fetch(SHOW_QUERY, { method: "GET" })
    .then(response => response.json())
    .then(json => {
      getImdbId(id,type)
      setMedia(json)
      document.body.style.overflowY = "hidden"
    })
  }

  const getImdbId = async(id: string, type: string) => {
    const QUERY = `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    await fetch(QUERY, { method: "GET" })
    .then(response => response.json())
    .then(json => { setImdbId(json.imdb_id) })
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
    setMediaType()
    document.body.style.overflowY = "scroll"
  }

  return { getMedia, collectMedia, closeMedia }
}