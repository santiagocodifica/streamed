import { useSearch } from "../../hooks/useSearch"
import { FiSearch } from 'solid-icons/fi'
import { AiOutlineMenu } from 'solid-icons/ai'
import { setIsSearchWidgetOn } from "./SearchWidget"

const Navbar = () => {

  const { cancelSearch } = useSearch()

  return(
    <header class="fixed top-0 text-4xl p-4 md:p-8 flex w-full z-10">
      <h1 class="grow">
        <a onClick={() => cancelSearch()} class="cursor-pointer hover:opacity-50 transition-all">streamed</a>
      </h1>
      <nav class="flex gap-2 md:gap-4 place-items-center">
        <FiSearch class="cursor-pointer hover:opacity-50 transition-all" onClick={() => setIsSearchWidgetOn(true)} />
        {/* <AiOutlineMenu class="cursor-pointer hover:opacity-50 transition-all" /> */}
      </nav>
    </header>
  )
}
export default Navbar