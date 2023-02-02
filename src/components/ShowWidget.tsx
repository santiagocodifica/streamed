import { Show, createEffect } from "solid-js"
import { useMedia, media } from "../../hooks/useMedia"
import StreamingAvailability from "./StreamingAvailability"

const ShowWidget = () => {

  const { collectMedia, closeMedia } = useMedia()

  createEffect(() => {
    collectMedia()
  })

  return(
    <Show when={media()}>
      <div class="fixed z-20 flex overflow-y-scroll place-content-center w-screen h-screen bg-transparent top-0 left-0">
        <div class="absolute w-full h-full bg-dark1 opacity-90" onClick={() => closeMedia()} />
        <main class="w-full md:w-1/2 h-full md:h-2/3 overflow-y-scroll bg-dark1 rounded z-10 self-center justify-self-center">
          <section class="w-full h-60 relative">
            <span class="absolute top-4 right-4 text-2xl text-light1 cursor-pointer z-20 hover:text-dark3" onClick={() => closeMedia()}>&#9587</span>
            <div class="absolute w-full h-full bg-gradient-to-t from-dark1" />
            <img class="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w500/${media().backdrop_path}`} />
            <ul class="absolute bottom-4 left-4 text-dark3">
              { media().genres.map((genre: any) => { return <li class="inline">{genre.name + " - "}</li>})}
              { media().release_date ? media().release_date.split("-",1) : media().first_air_date.split("-",1) }
            </ul>
          </section>
          <section class="w-full p-4">
            <h2 class="text-4xl mb-6">{ media().title || media().name }</h2>
            <p>{ media().overview }</p>
          </section>
          <section class="w-full p-4">
            <h3 class="text-dark3 mb-4">Streaming Availability</h3>
            <StreamingAvailability />
          </section>
        </main>
      </div>
      
    </Show>
  )
}
export default ShowWidget