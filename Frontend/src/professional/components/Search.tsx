import { AddClientIcon, SearchIcon } from './icons/Icons'

export function Search(): React.ReactElement {
	return (
		<header className='flex gap-[22px] items-center mt-[20px]'>
			<form className='relative w-[833px] h-[65px] gap-[18px] rounded-[26px] shadow-search '>
				<div className='flex items-center h-full ml-[19px] gap-[10px]'>
					<button className='relative' type='submit'>
						<SearchIcon height={34} width={34} />
					</button>
					<input
						id='search'
						type='text'
						placeholder='Buscar cliente'
						className='h-[23px]'
					/>
				</div>
			</form>
			<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-[161px] rounded-lg text-[13px] font-bold'>
				<AddClientIcon height={18} width={18} />
				<span>Agregar cliente</span>
			</button>
		</header>
	)
}
