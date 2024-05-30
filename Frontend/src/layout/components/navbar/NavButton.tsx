// src/components/navbar/NavButton.tsx
import { NavButtonProps } from '../../typescript/interface'

export default function NavButton({ text, onClick }: NavButtonProps): JSX.Element {
	return (
		<button
			onClick={onClick}
			className='w-[155.85px] h-[49px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-400 shadow-md hover:bg-orange-500 border-none cursor-pointer'
		>
			<span className='text-black font-bold font-roboto leading-normal text-sm '>
				{ text }
			</span>
		</button>
	)
}
