import { Show } from "solid-js"
import Home from "./Home"
import Results from "./Results"
import { searchResults, useSearch } from "../../hooks/useSearch"

const Search = () => {
  const { collectSearch } = useSearch()
  return(
    <>
      <Show when={!collectSearch()}>
        <Home />
      </Show>
      <Show when={collectSearch()}>
        <Results />
      </Show>
    </>
  )
}
export default Search