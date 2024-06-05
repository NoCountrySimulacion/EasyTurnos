import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserProfile, Edit } from '../components/icons/Icons'

interface FormValues {
	nombre: string
	apellido: string
	edad: string
	mail: string
	tel: string
	observaciones: string
	usuarioCliente: string
	contraseñaCliente: string
	confirmarContraseñaCliente: string
}

export function AddClientForm(): JSX.Element {
	return (
		<section className='flex flex-col mt-10'>
			<header className='flex flex-col h-[289px]'>
				<img
					src='../../../public/images/Formulario.png'
					alt=''
					className='absolute top-1 z-[-1] w-[1106px] h-[289px]'
				/>
				<div className='ml-[74px] h-full w-full flex flex-col justify-around pb-[39px]'>
					<h1 className='font-semibold text-[48px] font-montserrat'>
						Agregar Cliente
					</h1>
					<p className='w-[468px] text-2xl font-roboto '>
						Aquí puedes agregar un nuevo cliente para que puedan agendar un
						turno contigo.
					</p>
				</div>
			</header>


			<section className='w-full flex flex-col'>
				<div className='flex flex-col ml-[74px] gap-[23px] mb-[18px]'>
					<div className='flex flex-row gap-3 items-center content-center '>
						<Edit width={48} height={48} />
						<p className='w-[468px] font-roboto'>
							Aquí puedes agregar un nuevo cliente para que puedan agendar un
							turno contigo.
						</p>
					</div>
					<span className='border border-solid border-[#000] w-[551.5px]'></span>
				</div>
				<Formik
					initialValues={{
						nombre: '',
						apellido: '',
						edad: '',
						mail: '',
						tel: '',
						observaciones: '',
						usuarioCliente: '',
						contraseñaCliente: '',
						confirmarContraseñaCliente: ''
					}}
					validate={values => {
						const errors: Partial<FormValues> = {}
						if (!values.nombre) {
							errors.nombre = 'El nombre es requerido'
						}
						if (!values.apellido) {
							errors.apellido = 'El apellido es requerido'
						}
						if (!values.edad) {
							errors.edad = 'La edad es requerida'
						} else if (isNaN(Number(values.edad))) {
							errors.edad = 'La edad debe ser un número'
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
						if (!values.usuarioCliente) {
							errors.usuarioCliente = 'El usuario del cliente es requerido'
						} else if (
							!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.usuarioCliente)
						) {
							errors.usuarioCliente = 'Ingrese un email válido'
						}
						if (!values.contraseñaCliente) {
							errors.contraseñaCliente =
								'La contraseña del cliente es requerida'
						}
						if (!values.confirmarContraseñaCliente) {
							errors.confirmarContraseñaCliente =
								'Confirmar la contraseña es requerido'
						} else if (
							values.contraseñaCliente !== values.confirmarContraseñaCliente
						) {
							errors.confirmarContraseñaCliente = 'Las contraseñas no coinciden'
						}
						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						// Handle form submission logic here
						console.log(values)
						setSubmitting(false)
					}}
				>
					{({ isSubmitting }) => (
						<Form className='flex flex-col flex-wrap  '>
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
										<label htmlFor='edad'>Edad</label>
										<Field
											type='text'
											name='edad'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Edad del cliente'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='edad'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>

								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='mail'>Mail</label>
										<Field
											type='text'
											name='mail'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Mail del cliente'
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
										<h4 className='font-bold'>Usuario del cliente</h4>
										<div className='flex flex-col gap-1 mt-[7px]'>
											<div className='flex flex-col gap-[8px]'>
												<label
													htmlFor='usuarioCliente'
													className='text-[#828282]'
												>
													Introduce el mail del cliente, este será el usuario
													con la cual el usuario entrará a la página para
													reservar el turno.
												</label>
												<Field
													type='text'
													name='usuarioCliente'
													className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
													placeholder='Usuario del cliente'
												/>
											</div>
											<div className='flex h-[7px]'>
												<ErrorMessage
													name='usuarioCliente'
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
									<div className='w-[466px]'>
										<div className='  mb-[2px]'>
											<div className='flex flex-col gap-1'>
												<div className='flex flex-col gap-[8px]'>
													<label
														htmlFor='confirmarContraseñaCliente'
														className=' font-bold '
													>
														Confirmar contraseña
													</label>
													<Field
														type='text'
														name='confirmarContraseñaCliente'
														className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
														placeholder='DNI del cliente'
													/>
												</div>
												<div className='flex h-[7px]'>
													<ErrorMessage
														name='confirmarContraseñaCliente'
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
								<button className='bg-[#7445C7] h-[38px] px-2 rounded-lg '>
									<span>Volver</span>
								</button>
								<div className='flex gap-5'>
									<button
										type='button'
										className='bg-[#BC4141] p-2 rounded-[4px] h-[38px] '
									>
										Cancelar
									</button>
									<button
										type='submit'
										disabled={isSubmitting}
										className='bg-[#02A95C] p-2 rounded-[4px] h-[38px]'
									>
										Dar de alta a cliente
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

// C:\Users\Facundo Pettersson\Documents\NoCountry\Programacion\EasyTurnos\Frontend\public\images\Formulario.png
