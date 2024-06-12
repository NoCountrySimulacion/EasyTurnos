/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Calendar, IconGeneral } from '../components/icons/Icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

export function UserViewInd(): JSX.Element {
	const [turno] = useState(false)

	const { user } = useAuth()

	return (
		<main className='ml-4 mt-2'>
			<section className='w-full'>
				<div className='flex items-center content-center gap-4 border shadow-2xl'>
					<IconGeneral width={160} height={167} />
					<h2 className='font-montserrat font-[600] text-[26px] w-[300px]'>
						Informacion sobre {user?.firstName} {user?.lastName}
					</h2>
				</div>
			</section>
			<section className='w-[65%] mt-[32px] ml-4'>
				<section className='mb-1 mt-1'>
					<h4 className='font-roboto font-[400]'>Edad</h4>
					<h4 className='text-[#828282] font-roboto '>56</h4>
				</section>
				<section className='mb-1 mt-1'>
					<h4 className='font-roboto font-[400]'>Tel.</h4>
					<h4 className='text-[#828282] font-roboto '>49583254654</h4>
				</section>
				<section className='mb-1 mt-1'>
					<h4 className='font-roboto font-[400]'>Mail.</h4>
					<h4 className='text-[#828282] font-roboto '>
						mail.cliente@gmail.com
					</h4>
				</section>
				<section className='mb-3 mt-1'>
					<h4 className='font-roboto font-[400]'>Observaciones</h4>
					<h4 className='text-[#828282] font-roboto '>Ninguna.</h4>
				</section>
				<section className='flex flex-col gap-2'>
					<button className='bg-[#7445C7] p-2 rounded-md w-[180px] text-[#fff] font-montserrat font-[700]'>
						Historia del cliente
					</button>
					<button className='bg-[#7445C7] p-2 rounded-md w-[150px] text-[#fff] font-montserrat font-[700]'>
						Editar cliente
					</button>
					<span className='flex mt-4 mb-4 border border-solid border-[#000] w-[551.5px'></span>
				</section>
				<section className='flex flex-col gap-2'>
					{turno === true ? (
						<div className='flex gap-2 flex-col justify-start'>
							<p className='bg-[#D3CAFF] p-2 rounded-md font-roboto w-[33rem]'>
								Tienes cita de servicio con nombre y apellido del cliente el día
								6 de junio
							</p>
							<button className='border border-solid rounded-md mt-1 border-[#BC4141] hover:bg-[#BC4132] duration-500 p-1 w-[150px]'>
								Cancelar turno
							</button>
						</div>
					) : (
						<button className='border border-solid rounded-md mt-1  bg-[rgba(65,188,99,0.5)] p-1 w-[300px] mb-10'>
							No tienes cita con este cliente
						</button>
					)}
				</section>
			</section>

			<section className='flex mt-1  justify-end'>
				<div className='flex flex-row justify-end w-[30rem] gap-2 mb-10 mr-4'>
					<button className='flex justify-center item-center content-center bg-[#7445C7] font-montserrat font-[700] p-2 rounded-md text-[#fff] '>
						<span className='pr-1 pt-[.5px]'>
							<Calendar width={20} height={20} />
						</span>
						Agendar turno
					</button>
					<button className='flex bg-[#BC4141] p-2 rounded-md text-[#fff] font-montserrat font-[700]'>
						Dar de baja
					</button>
				</div>
			</section>
			<section className='relative bottom-[83.9px] ml-5'>
				<div>
					<Link to={'/clients'}>
						<button className='bg-[#7445C7] p-[10px] rounded-md font-montserrat font-[700] text-[#fff] '>
							Volver
						</button>
					</Link>
				</div>
			</section>
		</main>
	)
}
