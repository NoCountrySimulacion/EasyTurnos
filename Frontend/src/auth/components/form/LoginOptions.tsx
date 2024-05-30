import {  useContext } from 'react'
import '@material/web/textfield/outlined-text-field.js'
import { useNavigate } from 'react-router-dom'


import { AuthContext } from '../../context/AuthProvider'
import { AuthContextType } from '../../typescript/interface'

export default function LoginOptions(): React.ReactElement {
	const authContext = useContext<AuthContextType | undefined>(AuthContext)

	if (!authContext) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}

	const navigate = useNavigate()

	return (
		<div className='w-full h-[500px] flex flex-col items-center gap-7'>
			<h2 className=' text-3xl font-semibold font-["Montserrat"] p-3'>¿Cómo te gustaría Iniciar?</h2>
			<div
				onClick={() => navigate('/login')}
				className='w-3/4 h-[200px] flex flex-col items-center gap-4 cursor-pointer'
			>
				<div className='w-full max-w-4xl p-4 bg-white rounded-3xl shadow border border-t-0 flex flex-col md:flex-row justify-start items-center gap-4 md:gap-8'>
					<div className='flex justify-center items-center w-full md:w-1/2'>
						<img
							className='w-full h-auto md:h-55 rounded-2xl object-cover'
							src='/images/loginoptions-man-work.webp'
							alt='Profesionales'
						/>
					</div>
					<div className='flex flex-col justify-start items-start gap-4 md:gap-6 w-full md:w-1/2'>
						<div className='text-center md:text-left'>
							<div className="text-black text-lg font-semibold font-['Montserrat'] leading-tight">
								Soy Profesional
							</div>
						</div>
						<div className='text-center md:text-left'>
							<ul className="text-black text-base font-normal font-['Roboto'] leading-relaxed list-disc list-inside ml-4">
								<li>Quiero ofrecer mis servicios.</li>
								<li>Quiero Agendar clientes.</li>
								<li>Administrar mi negocio.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={() => navigate('/login')}
				className='w-full flex flex-col items-center gap-4 cursor-pointer'
			>
				<div className='w-3/4 max-w-4xl p-4 bg-white rounded-3xl shadow border border-t-0  flex flex-col md:flex-row justify-start items-center gap-4 md:gap-8'>
					<div className='flex justify-center items-center w-full md:w-1/2'>
						<img
							className='w-full h-auto md:h-55 rounded-2xl object-cover'
							src='/images/loginoptions-screen-hand.webp'
							alt='Clientes'
						/>
					</div>
					<div className='flex flex-col justify-start items-start gap-4 md:gap-6 w-full md:w-1/2'>
						<div className='text-center md:text-left'>
							<div className="text-black text-lg font-semibold font-['Montserrat'] leading-tight">
								Soy Cliente
							</div>
						</div>
						<div className='text-center md:text-left'>
							<ul className="text-black text-base font-normal font-['Roboto'] leading-relaxed list-disc list-inside ml-4">
								<li>Quiero reservar un turno.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
