import React from 'react'
import { useParams } from 'react-router-dom'
import { IconProfile } from '../../layout/Icons/IconsProfile'
import { useClientData } from '../hooks/useClientData'
import { useAuth } from '../../auth/hooks/useAuth'
import { ScheduleAppointmentButton } from './ScheduleAppointmentButton'

export function DataClient(): React.ReactElement {
	const params = useParams<{ clientId?: string }>()
	const { user } = useAuth()
	const { clientData, loading, error } = useClientData(
		params.clientId || '',
		user?.token || ''
	)

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	// Función para calcular la edad del cliente
	const calculateAge = (birthdate: string): number => {
		const today = new Date()
		const birthDate = new Date(birthdate)
		let age = today.getFullYear() - birthDate.getFullYear()
		const month = today.getMonth() - birthDate.getMonth()

		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}

		return age
	}

	return (
		<div>
			<div className='flex flex-row items-center justify-around h-full min-h-10 shadow-md gap-8 p-5'>
				<IconProfile width={150} height={150} />
				<h1 className='text-4xl font-bold'>
					{clientData?.firstName + ' ' + clientData?.lastName}
				</h1>
				<div className='w-1/3'></div>
			</div>
			<div className='flex flex-col justify-around h-full min-h-10 shadow-md p-12 gap-5'>
				<div>
					<p className='text-black font-roboto text-base font-bold leading-normal'>
						Teléfono
					</p>
					<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
						{clientData?.phoneNumber}
					</span>
				</div>
				<div>
					<p className='text-black font-roboto text-base font-bold leading-normal'>
						Mail
					</p>
					<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
						{clientData?.email}
					</span>
				</div>
				<div>
					<p className='text-black font-roboto text-base font-bold leading-normal'>
						Edad
					</p>
					<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
						{clientData?.birthDate && calculateAge(clientData?.birthDate)}
					</span>
				</div>
				<div>
					<div className='w-1/2 h-0.5 bg-black'></div>
					<div className='w-[257px] h-[39px] p-2.5 my-2 bg-green-200 rounded justify-start items-center gap-2.5 inline-flex'>
						<div className="text-black text-base font-normal font-['Roboto']">
							No tienes cita con este cliente
						</div>
					</div>
				</div>

				<div className='flex items-end justify-end'>
					{/* <Link to={`/clients/edit/${clientId}`}>
                        <div className='w-36 h-[38px] p-2.5 bg-violet-700 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out'>
                            <div className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]">
                                Editar perfil
                            </div>
                        </div>
                    </Link> */}
					<div className=' px-10'>
						<ScheduleAppointmentButton />
					</div>
					<div className='w-36 h-[38px] p-2.5 bg-rose-700 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out'>
						<div className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]">
							Dar de baja
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
