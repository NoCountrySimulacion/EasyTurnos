import { NavLink } from 'react-router-dom'

export default function Banner(): JSX.Element {
	return (
		<div className='w-full h-[500px] relative rounded-[7.14px]'>
			<img
				src='/images/LandingBanner.webp'
				alt='Banner de Turnos Online'
				className='w-full h-full object-cover rounded-[7.14px] absolute z-0'
			/>
			<div className='h-full w-1/2 absolute  flex-col justify-center items-center inline-flex z-10'>
				<div className=' h-[193px] flex-col justify-start items-start flex'>
					<div className="grow shrink basis-0 self-stretch text-black text-4xl font-medium font-['Montserrat'] p-2.5 items-center inline-flex">
						Turnos Online
					</div>
					<div className='w-[340px] h-[136px] flex-col justify-center items-center gap-2.5 flex'>
						<div className="w-[365px] text-black text-[24px] font-normal font-['Montserrat'] self-stretch p-2.5 justify-center items-center gap-2.5 inline-flex">
							Gestiona tu agenda de forma fácil y rápida con tu asistente
							virtual
						</div>
					</div>
				</div>
				<div className='w-[340px] h-[90px] p-2.5 flex-col gap-3 flex '>
					<span className="w-[230px] h-[60px] p-2.5 bg-[#E69C58] rounded-xl shadow border-b border-black justify-center items-center inline-flex cursor-pointer text-black text-[19px] font-bold font-['Montserrat']">
						<NavLink to='/register'>Agenda Ahora</NavLink>
					</span>
				</div>
			</div>
			<div className='w-1/2 h-full absolute right-0'></div>
		</div>
	)

	return <div>Banner</div>
}
