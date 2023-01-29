import SearchBar from "./SearchBar"
import { useSearch } from "../../hooks/useSearch"

const Navbar = () => {

  const { cancelSearch } = useSearch()

  return(
    <header class="bg-dark1 fixed top-0 left-0 w-screen p-6 flex flex-wrap gap-4 z-10">
      <h1 class="inline place-self-center text-3xl w-full md:w-auto md:grow md:order-2 md:text-right">
        <a onClick={() => cancelSearch()} class="cursor-pointer transition-all hover:text-dark3">.streamed</a>
      </h1>
      <SearchBar class="grow-0 w-full md:w-auto" />
    </header>
  )
}
export default Navbar