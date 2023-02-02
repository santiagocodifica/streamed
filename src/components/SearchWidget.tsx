import { VsChromeClose } from 'solid-icons/vs'
import { createEffect, createSignal } from 'solid-js'
import { useSearch } from '../../hooks/useSearch'
import { FiArrowRight } from 'solid-icons/fi'

export const [ isSearchWidgetOn, setIsSearchWidgetOn ] = createSignal<any>(false)

const SearchWidget = () => {

  let input: any

  const { search } = useSearch()

  createEffect(() => {
    isSearchWidgetOn() ? input.focus() : input.blur()
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    search(input.value,1)
    setIsSearchWidgetOn(false)
    input.value = ""
  }

  return(
    <div class={`
      fixed w-screen h-screen p-4 md:p-8 flex z-20 top-0 place-content-center
      ${isSearchWidgetOn() ? "opacity-100" : "hidden opacity-0"}
      transition duration-400 bg-dark1 text-4xl
    `}>
      <VsChromeClose onClick={() => setIsSearchWidgetOn(false)} class='absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-50 transition-all' />
      <form class="place-self-center w-full md:w-1/2 border-b flex text-light1" onSubmit={(e) => handleSubmit(e)}>
        <input ref={input} type='text' placeholder='Type Here...' class="w-full pb-4 bg-transparent text-3xl placeholder:text-dark2 focus:outline-none" />
        <button class='hover:opacity-50 transition-all'><FiArrowRight /></button>
      </form>
    </div>
  )
}
export default SearchWidget