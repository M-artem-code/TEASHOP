import { HeaderMenu } from './header-menu/header-menu'
import { Logo } from './logo/logo'
import { SearchInput } from './search-input/search-input'

export function Header() {
	return (
		<div className='p-5 gap-x-4 h-full flex items-center  bg-white border-b'>
			<Logo />
			<div className='ml-auto hidden w-[40%] lg:block'>
				<SearchInput />
			</div>
			<HeaderMenu />
		</div>
	)
}
