import { createSignal } from "solid-js"
import { useSearchParams } from "@solidjs/router"

export const [ searchResults, setSearchResults ] = createSignal<any>()
export const [ currentQuery, setCurrentQuery ] = createSignal<any>()
export const [ isMediaOpen, setIsMediaOpen ] = createSignal<boolean>(false)

export const useSearch = () => {

  const [ searchParams, setSearchParams ] = useSearchParams()

  // fetches the search
  const search = async(query: string, page: number) => {

    // set the search params to the current search
    setSearchParams({ q: query });
    setCurrentQuery(query)

    // set the actual search query
    const SEARCH_QUERY = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
    
    // make the fetch
    await fetch(SEARCH_QUERY, { method: "GET" })
    .then(response => response.json())
    .then(json => { setSearchResults(json) })
  }

  // collects the search info from the url
  const collectSearch = () => {
    if(searchParams.q){
      search(searchParams.q, 1)
      return true
    }
    else{
      return false
    }
  }

  const cancelSearch = () => {
    setSearchParams({ id: null, type: null, q: null })
    setSearchResults()
    setCurrentQuery()
  }

  return { search, collectSearch, cancelSearch }
}