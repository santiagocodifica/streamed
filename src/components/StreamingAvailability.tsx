import { createEffect, Show } from "solid-js"
import { useStreamingAvailability } from "../../hooks/useStreamAvailability"
import { imdbId } from "../../hooks/useMedia"

const StreamingAvailability = () => {
  
  const { checkStreamingAvailability, servicesList } = useStreamingAvailability()

  createEffect(() => {
    checkStreamingAvailability(imdbId())
  })

  return(
    <Show when={servicesList()} fallback={<span>Loading...</span>}>
      <ul class="flex gap-2">
        { servicesList().map((service: any) => { return(
          <li><a target="_blank" href={service.data.us.link} class="
            flex gap-2 bg-light1 border text-dark1 p-1 rounded cursor-pointer
          hover:text-light1 hover:border-light1 hover:bg-transparent
            transition-all
          ">
            <span>Watch on {service.service}</span>
            <span>&#9654</span>
          </a></li>
        )})}
      </ul>
    </Show>
    
  )
}

export default StreamingAvailability