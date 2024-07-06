// src/components/navbar/NavButton.tsx
import { NavButtonProps } from '../../typescript/interface'

export default function NavButton({
	text,
	onClick
}: NavButtonProps): JSX.Element {
	return (
		<button
			onClick={onClick}
			className=' h-[49px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-400 shadow-md hover:bg-orange-500 transition duration-300 ease-in-out border-none cursor-pointer'
		>
			<span className='text-black font-bold font-roboto leading-normal max-md:text-xl  '>
				{text}
			</span>
		</button>
	)
}
