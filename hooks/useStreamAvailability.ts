import { createSignal } from "solid-js"

export const useStreamingAvailability = () => {

  const [ servicesList, setServicesList ] = createSignal<any>()

  const checkStreamingAvailability = async(imdb_id: any) => {

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
        setServicesList(services)
      }
    })
  }

  return { checkStreamingAvailability, servicesList }
}