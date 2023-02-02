import { useMedia, media, streamingServices } from "../../hooks/useMedia"
import { createEffect, Show, createSignal } from "solid-js"
import { FiExternalLink } from 'solid-icons/fi'
import { VsChromeClose } from 'solid-icons/vs'
import { useSearchParams } from "@solidjs/router"

const MediaWidget = () => {

  const { collectMedia, closeMedia } = useMedia()
  const [ isExpanded, setIsExpanded ] = createSignal<boolean>(false)
  const [ searchParams ] = useSearchParams()

  createEffect(() => {
    collectMedia()
    setIsExpanded(false)
  })

  return(
    <Show when={media()}>
      <div class="md:fixed flex justify-center overflow-y-scroll w-screen h-screen top-0 left-0 bg-dark1/75 z-20">
        <div onClick={() => { closeMedia() }} class="absolute top-0 left-0 w-full h-full" />
        <div class="
          fixed md:static top-0 left-0 z-20
          bg-dark1 overflow-y-scroll
          md:mt-20 md:mb-20
          w-screen md:w-[640px] h-screen md:h-fit md:min-h-0"
        >
          {/* IMAGE */}
          <section class="relative overflow-hidden max-h-64">
            <VsChromeClose onClick={() => { closeMedia() }} class='absolute text-4xl right-4 top-4 cursor-pointer hover:opacity-50 transition-all z-20' />
            <img src={`https://image.tmdb.org/t/p/w500/${media().backdrop_path}`} class="w-full" />
            <div class="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-dark1 via-transparent" />
          </section>

          <section class="p-4">
            {/* YEAR AND TYPE */}
            <ul class="flex gap-2">
              <li class="bg-dark2 text-light1 text-md uppercase font-medium p-1 rounded">{ searchParams.type }</li>
              <li class="bg-dark2 text-light1 text-md uppercase font-medium p-1 rounded">
                { media().release_date ? media().release_date.split("-",1) : media().first_air_date.split("-",1) }
              </li>
            </ul>

            <div class="mt-10">
              {/* GENRES */}
              <ul class="flex gap-2 uppercase text-dark3">
                { media().genres.map((genre: any) => {return(
                  <li>{genre.name}</li>
                )})}
              </ul>
              {/* TITLE */}
              <h4 class="mt-4 mb-4 text-4xl">
                { media().title || media().name }
              </h4>
              {/* OVERVIEW */}
              <div class="text-xl text-dark3">
                <Show when={isExpanded()}>
                  <p class="mt-4 mb-4">{media().overview}</p>
                </Show>
                <Show when={!isExpanded()}>
                  <button class="text-dark3 underline" onClick={() => setIsExpanded(true)}>Expand overview</button>
                </Show>
                <Show when={isExpanded()}>
                  <button class="text-light1 underline" onClick={() => setIsExpanded(false)}>Close overview</button>
                </Show>
              </div>
            </div>
          </section>

          {/* STREAMING */}
          <section class="flex flex-col md:flex-row md:items-center m-4 p-2 md:p-4 bg-dark2 rounded">
            <h5 class="text-xl mb-4 md:mb-0 grow">Streaming on:</h5>
            <Show when={streamingServices()} fallback={<span>Loading...</span>}>
              <ul class="flex gap-2 text-dark1">
                { streamingServices().map((service: any) => { return(
                  <li class="p-2 text-xl hover:text-light1 bg-light1 hover:bg-dark1 transition-all rounded cursor-pointer">
                    <a href={service.data.us.link} target="_blank" class="flex gap-6 place-items-center">
                      <p>{service.service}</p>
                      <FiExternalLink />
                    </a>
                  </li>
                )})}
              </ul>
            </Show>
          </section>
        </div>
      </div>
    </Show>
  )
}
export default MediaWidget