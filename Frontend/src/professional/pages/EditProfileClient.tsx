import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserProfile, Edit } from '../components/icons/Icons'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useClientData } from '../hooks/useClientData'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { updateClient } from '../../services/api/clientServices'

export interface FormValuesEditClient {
	nombre: string
	apellido: string
	birthDate: Date | null | string
	tel: string
	mail: string
	contraseñaCliente: string
}

export function EditProfileClient(): JSX.Element {
	const { decodedToken } = useAuth()
	const [fecha, setFecha] = useState<Dayjs | null>(null) // Estado para almacenar la fecha parseada
	useEffect(() => {
		// Parsear la fecha del backend a un objeto Dayjs
		const fechaParseada = dayjs(clientData?.birthDate)
		setFecha(fechaParseada.isValid() ? fechaParseada : null) // Si la fecha parseada es válida, asignarla; de lo contrario, asignar null
	}, [])

	const params = useParams<{ clientId?: string }>()
	const {
		user
		// updateProfessionalUser,
		// logout,
		// professionalData,
		// decodedToken
	} = useAuth()
	const { clientData, loading, error } = useClientData(
		params.clientId || '',
		user?.token || ''
	)
	console.log('Datos del cliente en editar perfil:', clientData?.birthDate)
	if (loading)
		return (
			<div className='flex items-center justify-center h-full min-h-screen'>
				<div className='w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800'></div>
				<p className='ml-4'>Cargando...</p>
			</div>
		)

	if (error) return <p>Error: {error}</p>

	return (
		<section className='flex flex-col mt-10'>
			<header className='flex flex-col h-[289px]'>
				<img
					src='/images/Formulario.png'
					alt=''
					className='absolute top-1 z-[-1] w-[1106px] h-[289px]'
				/>
				<div className='ml-[74px] h-full w-full flex flex-col justify-around pb-[39px]'>
					<h1 className='font-semibold text-[48px] font-montserrat'>
						Editar Cliente
					</h1>
				</div>
			</header>

			<section className='w-full flex flex-col'>
				<div className='flex flex-col ml-[74px] gap-[23px] mb-[18px]'>
					<div className='flex flex-row gap-3 items-center content-center '>
						<Edit width={48} height={48} />
						<p className='w-[468px] font-roboto'>
							Aquí puedes editar la información del cliente: Nombre y edad.
						</p>
					</div>
					<span className='border border-solid border-[#000] w-[551.5px]'></span>
				</div>
				<Formik
					initialValues={{
						nombre: clientData?.firstName || '',
						apellido: clientData?.lastName || '',
						birthDate: clientData?.birthDate || null,
						tel: clientData?.phoneNumber || '',
						mail: clientData?.email || '',
						contraseñaCliente: ''
					}}
					validate={values => {
						const errors: Partial<FormValuesEditClient> = {}
						if (!values.nombre) {
							errors.nombre = 'El nombre es requerido'
						}
						if (!values.apellido) {
							errors.apellido = 'El apellido es requerido'
						}
						if (!values.birthDate) {
							errors.birthDate = 'La fecha de nacimiento es requerida'
						}
						if (!values.mail) {
							errors.mail = 'El email es requerido'
						} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.mail)) {
							errors.mail = 'Ingrese un email válido'
						}
						if (!values.tel) {
							errors.tel = 'El teléfono es requerido'
						} else if (!/^\d{10}$/.test(values.tel)) {
							errors.tel = 'El teléfono debe tener 10 números'
						}

						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						console.log('Valores pasados a func en contexto:', values)
						alert('Se actualizaron los datos del cliente')
						if (params.clientId && values) {
							updateClient(
								user?.token,
								params.clientId,
								decodedToken?.professionalId,
								values
							)
						}
						alert('Se actualizaron los datos del cliente')

						setSubmitting(false)
					}}
				>
					{({ isSubmitting, setFieldValue }) => (
						<Form className='flex flex-col flex-wrap'>
							<section className='mb-[65px] gap-[18px] flex flex-col ml-[74px]'>
								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='nombre'>Nombre</label>
										<Field
											type='text'
											name='nombre'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Nombre del cliente'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='nombre'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>

								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='apellido'>Apellido</label>
										<Field
											type='text'
											name='apellido'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Apellido del cliente'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='apellido'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>

								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='tel'>Teléfono</label>
										<Field
											type='text'
											name='tel'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Teléfono del cliente'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='tel'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>
								<div className='flex flex-col gap-1 w-1/6'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='birthDate'>Fecha de Nacimiento</label>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												value={fecha}
												onChange={date => setFieldValue('birthDate', date)}
											/>
										</LocalizationProvider>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='birthDate'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>
							</section>

							<section className='flex flex-col ml-[74px]'>
								<div className='flex flex-row'>
									<UserProfile width={44} height={44} />
									<p className='ml-[16px] w-[465px]'>
										Aquí puedes editar el usuario de tu cliente: usuario y
										contraseña. Ten en cuenta que tu cliente reservará el turno
										con este usuario.
									</p>
								</div>
								<span className='flex mt-4 mb-4 border border-solid border-[#000] w-[551.5px]'></span>
								<section className='flex flex-col gap-[26px]'>
									<div className='w-[466px]'>
										<h4 className='font-bold'>Mail</h4>
										<div className='flex flex-col gap-1 mt-[7px]'>
											<div className='flex flex-col gap-[8px]'>
												<label htmlFor='mail'></label>
												<Field
													type='text'
													name='mail'
													className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
													placeholder='Pon tu email nuevo'
												/>
											</div>
											<div className='flex h-[7px]'>
												<ErrorMessage
													name='mail'
													component='small'
													className='text-[#FF8682] text-[14px]'
												/>
											</div>
										</div>
									</div>
									<div className='w-[466px]'>
										<h4 className='font-bold '>Contraseña del cliente.</h4>
										<div className='mt-[7px]'>
											<div className='flex flex-col gap-1'>
												<div className='flex flex-col gap-[8px]'>
													<label
														htmlFor='contraseñaCliente'
														className='text-[#828282]'
													>
														Introduce el documento del cliente, este será la
														contraseña con la cual el usuario entrará a la
														página para reservar el turno.
													</label>
													<Field
														type='text'
														name='contraseñaCliente'
														className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
														placeholder='DNI del cliente'
													/>
												</div>
												<div className='flex h-[7px]'>
													<ErrorMessage
														name='contraseñaCliente'
														component='small'
														className='text-[#FF8682] text-[14px]'
													/>
												</div>
											</div>
										</div>
									</div>
								</section>
							</section>

							<footer className='flex mb-5 mt-10 w-[60rem] justify-between text-[13px] font-bold text-[#F8F9FA] ml-[42px]'>
								<Link
									to='/home'
									className='bg-[#7445C7] h-[38px] px-2 rounded-lg flex items-center justify-center '
								>
									<span>Volver</span>
								</Link>
								<div className='flex gap-5'>
									<Link to={'/profile'}>
										<button
											type='button'
											className='bg-[#BC4141] p-2 rounded-[4px] h-[38px] '
										>
											Cancelar
										</button>
									</Link>
									<button
										type='submit'
										disabled={isSubmitting}
										className='bg-[#02A95C] p-2 rounded-[4px] h-[38px]'
									>
										Modificar datos
									</button>
								</div>
							</footer>
						</Form>
					)}
				</Formik>
			</section>
		</section>
	)
}
