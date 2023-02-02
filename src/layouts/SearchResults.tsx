import { For, Show, createEffect } from "solid-js"
import MediaCard from "../components/MediaCard"
import { searchResults, currentQuery } from "../../hooks/useSearch"
import ShowWidget from "../components/ShowWidget"
import { useSearch } from "../../hooks/useSearch"
import MediaWidget from "../components/MediaWidget"

const SearchResults = () => {

  const { collectSearch } = useSearch()

  createEffect(() => {
    collectSearch()
  })

  return(
    <div class="p-4 md:p-8 mt-40">
      <Show when={ searchResults() }>
        <header class="md:w-2/3">
          <span class="text-dark3 mb-2 block">Showing { searchResults().results.length } results for:</span>
          <h2 class="text-4xl sm:text-5xl md:text-7xl">{currentQuery()}</h2>
        </header>
        <ul class="mt-10 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl-grid-columns-8">
          <For each={searchResults().results}>{(result) => {
            if(result.media_type === "movie" || result.media_type === "tv"){ return (
              <MediaCard imageUrl={result.poster_path} title={result.title || result.name} type={result.media_type} id={result.id} year={result.release_date || result.first_air_date} />
            )}
          }}</For>
        </ul>
      </Show>
      {/* <ShowWidget /> */}
      <MediaWidget />
    </div>
  )
}
export default SearchResults