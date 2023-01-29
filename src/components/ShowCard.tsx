import { Show } from "solid-js"
import { useMedia } from "../../hooks/useMedia";

interface ShowCardInterface {
  imageUrl: string,
  title: string,
  type: string,
  id: number
}

const ShowCard = (props: ShowCardInterface) => {

  const { getMedia } = useMedia()

  return(
    <Show when={props && props.imageUrl}>
      <li
        onClick={() => getMedia(`${props.id}`, props.type)}
        class="
          group self-start relative overflow-y-hidden
          transition-all duration-300
          bg-gray-800 rounded
          cursor-pointer hover:bg-black hover:scale-[0.98]
        "
      >
        <Show when={props.imageUrl}>
          <img src={`https://image.tmdb.org/t/p/w500/${props.imageUrl}`} />
        </Show>
        
        <div class="
          absolute top-[-45%] w-full p-2 h-2/5 grid
          transition-all duration-300
        bg-light1 text-dark1 rounded
          group-hover:top-0
        ">
          <span class="text-dark3">{props.type}</span>
          <h3 class="self-end text-xl font-medium">{props.title || "No title"}</h3>
        </div>
      </li>
    </Show>
  )

}
export default ShowCard