import { Show } from "solid-js"
import Home from "./Home"
import SearchResults from "./SearchResults"
import { useSearch } from "../../hooks/useSearch"
import SearchWidget from "../components/SearchWidget"

const Main = () => {
  
  const { collectSearch } = useSearch()

  return(
    <>
      <SearchWidget />
      <Show when={!collectSearch()}>
        <Home />
      </Show>
      <Show when={collectSearch()}>
        <SearchResults />
      </Show>
    </>
  )
}
export default Main