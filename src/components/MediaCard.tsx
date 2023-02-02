import { Show } from "solid-js"
import { useMedia } from "../../hooks/useMedia";

interface MediaCardInterface {
  imageUrl: string,
  title: string,
  type: string,
  id: number,
  year: string
}

const MediaCard = (props: MediaCardInterface) => {

  const { getMedia } = useMedia()

  return(
    <Show when={props && props.imageUrl}>
      <li onClick={() => getMedia(`${props.id}`, props.type)} class="group relative cursor-pointer border-2 border-transparent rounded md:hover:scale-95 md:hover:border-light1 transition-all">
        <Show when={props.imageUrl}>
          <img src={`https://image.tmdb.org/t/p/w500/${props.imageUrl}`} class="md:group-hover:opacity-20 transition-all" />
        </Show>
        <div class="hidden md:hidden md:group-hover:flex absolute w-full h-full top-0 transition-all">
          <ul class="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2">
            <li class="bg-light1/75 text-dark1 text-xs uppercase font-medium p-1 rounded">{props.type}</li>
            <li class="bg-light1/75 text-dark1 text-xs uppercase font-medium p-1 rounded">{props.year && props.year.split("-",1)}</li>
          </ul>
          <h3 class="w-full text-center text-xl place-self-center p-2">{props.title}</h3>
        </div>
        <ul class="absolute top-2 left-2 flex gap-2 md:hidden">
          <li class="bg-light1/75 text-dark1 text-xs uppercase font-medium p-1 rounded">{props.type}</li>
          <li class="bg-light1/75 text-dark1 text-xs uppercase font-medium p-1 rounded">{props.year && props.year.split("-",1)}</li>
        </ul>
      </li>
    </Show>
  )
}
export default MediaCard