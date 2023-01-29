import { useSearch, currentQuery } from "../../hooks/useSearch"

const SearchBar = (props: any) => {

  const { search } = useSearch()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    search(e.target.search.value, 1)
  }

	return(
    <form class={`flex gap-2 ${props.class}`} onSubmit={(e: any) => handleSubmit(e)}>
      <input
        class="
          p-2 w-full min-w-[300px] text-xl text-light1 bg-transparent
          border-2 border-dark2 rounded-md
          focus:outline-none placeholder:text-light1 focus:border-light1
        "
        type="text"
        name="search"
        placeholder="Search..."
        value={ currentQuery() || "" }
      />
      <button class="hidden md:inline-block p-2 text-xl bg-light1 text-dark1 rounded-md border-2 transition-all hover:bg-transparent hover:text-light1">Search</button>
    </form>
  )
}
export default SearchBar