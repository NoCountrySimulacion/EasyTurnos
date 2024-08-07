import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconProfile } from '../../layout/Icons/IconsProfile'
import { useAuth } from '../../auth/hooks/useAuth'
import { ScheduleAppointmentButton } from './ScheduleAppointmentButton'
import { Link } from 'react-router-dom'
import { useClientDataProfessional } from '../hooks/useClientDataProfessional'
import { deleteClient } from '../../services/api/clientServices'
import Swal from 'sweetalert2'

export function DataClient(): React.ReactElement {
	const navigate = useNavigate()
	const params = useParams<{ clientId?: string }>()
	const { user, decodedToken } = useAuth()
	const { clientData, loading, error } = useClientDataProfessional(
		params.clientId || '',
		user?.token || ''
	)

	if (loading)
		return (
			<div className='flex items-center justify-center h-full min-h-screen'>
				<div className='w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800'></div>
				<p className='ml-4'>Cargando...</p>
			</div>
		)

	if (error) return <p>Error: {error}</p>

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

	const handleDeleteClient = () => {
		if (clientData?.id) {
			Swal.fire({
				title: '¿Estás seguro?',
				text: 'Esta acción no se puede deshacer',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sí, eliminar cliente',
				cancelButtonText: 'Cancelar'
			}).then(result => {
				if (result.isConfirmed) {
					deleteClient(
						user?.token,
						decodedToken?.professionalId,
						clientData?.id
					)
						.then(() => {
							Swal.fire({
								icon: 'success',
								title: 'Cliente eliminado',
								text: 'El cliente ha sido eliminado con éxito.'
							})
							navigate('/professional/clients')
						})
						.catch(error => {
							Swal.fire({
								icon: 'error',
								title: 'Error',
								text: 'No se pudo eliminar al cliente: ' + error.message
							})
						})
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					Swal.fire('Cancelado', 'No se ha eliminado al cliente.', 'info')
				}
			})
		}
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
					<Link to={`/professional/edit-profile-client/${clientData?.id}`}>
						<div className='w-36 h-[38px] mb-4 p-2.5 bg-violet-700 rounded-lg justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out'>
							<div className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]">
								Editar cliente
							</div>
						</div>
					</Link>
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
						<div
							className="text-white text-[13px] font-bold font-['Montserrat'] leading-[18.20px]"
							onClick={handleDeleteClient}
						>
							Dar de baja
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
