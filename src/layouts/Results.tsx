import { For, Show, createEffect } from "solid-js"
import ShowCard from "../components/ShowCard"
import { searchResults, useSearch, currentQuery } from "../../hooks/useSearch"
import ShowWidget from "../components/ShowWidget"
import { useMedia } from "../../hooks/useMedia"

const Results = () => {

  const { collectSearch } = useSearch()

  createEffect(() => {
    collectSearch()
  })

  return(
    <div class="p-6 mt-40">
      <Show when={ searchResults() }>
        <header class="mb-20">
          <span class="text-xl text-dark3 mb-2 block">Showing { searchResults().results.length } results for:</span>
          <h2 class="text-6xl">{currentQuery()}</h2>
        </header>

        <ul class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
          <For each={searchResults().results}>{ (result) => {
            if(result.media_type === "movie" || result.media_type === "tv"){return (
              <ShowCard
                imageUrl={result.poster_path}
                title={result.title || result.name}
                type={result.media_type}
                id={result.id}
              />
            )}
          }}</For>
        </ul>
      </Show>
      <ShowWidget />
    </div>
  )
}
export default Results