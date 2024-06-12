import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { IconProfile } from '../Icons/IconsProfile'
import { useProfessionalData } from '../../professional/hooks/useProfessionalData'
import { useClientData } from '../../professional/hooks/useClientData'

export function Profile(): React.ReactElement {
	const { user, decodedToken } = useAuth()

	if (!decodedToken) {
		return <p>Error: Invalid token.</p>
	}
	console.log('datos: ', decodedToken.role)
	const isProfessional = decodedToken?.role === 'Professional'

	const {
		professionalData,
		loading: loadingProfessional,
		error: errorProfessional
	} = isProfessional
		? useProfessionalData(decodedToken)
		: { professionalData: null, loading: false, error: null }

	const {
		clientData,
		loading: loadingClient,
		error: errorClient
	} = !isProfessional
		? useClientData(decodedToken.clientId || '', user?.token || '')
		: { clientData: null, loading: false, error: null }

	const loading = isProfessional ? loadingProfessional : loadingClient
	const error = isProfessional ? errorProfessional : errorClient

	if (loading) {
		return (
			<div className='flex items-center justify-center h-full min-h-screen'>
				<div className='w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800'></div>
				<p className='ml-4'>Loading...</p>
			</div>
		)
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<div>
			<div className='flex flex-row items-center justify-around h-full min-h-10 shadow-md gap-8 p-5'>
				<IconProfile width={150} height={150} />
				<h1 className='text-4xl font-bold'>
					{user?.firstName + ' ' + user?.lastName}
				</h1>
				<div className='w-1/3'></div>
			</div>
			<div className='flex flex-col justify-around h-full min-h-10 shadow-md p-12 gap-5'>
				{isProfessional ? (
					<>
						<div>
							<p className='text-black font-roboto text-base font-bold leading-normal'>
								Teléfono
							</p>
							<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
								{professionalData?.phoneNumber}
							</span>
						</div>
						<div>
							<p className='text-black font-roboto text-base font-bold leading-normal'>
								Mail
							</p>
							<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
								{decodedToken.email}
							</span>
						</div>
						<div>
							<p className='text-black font-roboto text-base font-bold leading-normal'>
								Especialidad
							</p>
							<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
								{professionalData?.speciality}
							</span>
						</div>
						<div>
							<p className='text-black font-roboto text-base font-bold leading-normal'>
								Observaciones
							</p>
							<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
								{professionalData?.description}
							</span>
						</div>
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
					</>
				) : (
					<>
						<div>
							<p className='text-black font-roboto text-base font-bold leading-normal'>
								Edad
							</p>
							<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
								{clientData?.birthDate}
							</span>
						</div>
						<div>
							<p className='text-black font-roboto text-base font-bold leading-normal'>
								Mail
							</p>
							<span className='text-gray-600 font-roboto text-base font-normal leading-normal'>
								{decodedToken.email}
							</span>
						</div>
						<div>
							<div className='w-1/2 h-0.5 bg-black'></div>
							<div className='w-[257px] h-[39px] p-2.5 my-2 bg-indigo-200 rounded justify-start items-center gap-2.5 inline-flex'>
								<div className="text-black text-base font-normal font-['Roboto']">
									No tienes ningún turno agendado
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
