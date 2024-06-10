import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

import { IconProfile } from '../Icons/IconsProfile'

export function Profile(): React.ReactElement {
	const { user, decodedToken, professionalData } = useAuth()

	return (
		<div>
			<div className='flex flex-row items-center justify-around h-full min-h-10 shadow-md gap-8 p-5 b-'>
				<IconProfile width={150} height={150} />
				<h1 className='text-4xl font-bold'>
					{user?.firstName + ' ' + user?.lastName}
				</h1>
				<div className=' w-1/3'></div>
			</div>
			<div className='flex flex-col justify-around h-full min-h-10 shadow-md p-12 gap-5'>
				<div>
					<p className='text-black font-roboto text-base font-bold leading-normal'>
						Edad
					</p>
					<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
						30-No trae del back por que no se envia fecha de nacimiento
					</span>
				</div>
				<div>
					<p className='text-black font-roboto text-base font-bold leading-normal'>
						telefono
					</p>
					<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
						1234567890- No trae del back
					</span>
				</div>
				<div>
					<p className='text-black font-roboto text-base font-bold leading-normal'>
						Mail
					</p>
					<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
						{decodedToken?.email}
					</span>
				</div>
				{professionalData ? (
					<div>
						<p className='text-black font-roboto text-base font-bold leading-normal'>
							Especialidad
						</p>
						<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
							{professionalData?.speciality}
						</span>
					</div>
				) : (
					''
				)}
				{/* <div className='w-40 h-[38px] p-2.5 bg-violet-700 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out'>
					<div className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]">
						Historial del cliente
					</div>
				</div> */}
				{!professionalData ? (
					<div>
						<div className='w-1/2 h-0.5 bg-black'></div>
						<div className='w-[257px] h-[39px] p-2.5 my-2 bg-indigo-200 rounded justify-start items-center gap-2.5 inline-flex'>
							<div className="text-black text-base font-normal font-['Roboto']">
								No tienes ningún turno agendado
							</div>
						</div>
					</div>
				) : (
					<div>
						<Link to={'/professional/edit-profile-prof'}>
							<div className='w-36 h-[38px] p-2.5 bg-violet-700 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out'>
								<div className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]">
									Editar perfil
								</div>
							</div>
						</Link>
						<div className='flex items-end justify-end'>
							<div className='w-36 h-[38px] p-2.5 bg-rose-700 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out'>
								<div className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]">
									Dar de baja
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
