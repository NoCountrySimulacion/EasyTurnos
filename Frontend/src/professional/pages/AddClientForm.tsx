import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserProfile, Edit } from '../components/icons/Icons'

interface FormValues {
	nombre: string
	edad: string
	mail: string
	tel: string
	observaciones: string
	usuarioCliente: string
	contraseñaCliente: string
}

export function AddClientForm(): JSX.Element {
	return (
		<main className='flex flex-col mt-10 ml-10'>
			<section className='flex flex-col gap-[40px] mb-10 '>
				<h1 className='font-[600] text-[48px] font-montserrat'>
					Agregar Cliente
				</h1>
				<div className='flex flex-row gap-3 items-center content-center'>
					<Edit width={48} height={48} />
					<p className='w-[468px] font-roboto'>
						Aquí puedes agregar un nuevo cliente para que puedan agendar un
						turno contigo.
					</p>
				</div>
				<span className='border border-solid border-[#000] w-[551.5px]'></span>
			</section>

			<Formik
				initialValues={{
					nombre: '',
					edad: '',
					mail: '',
					tel: '',
					observaciones: '',
					usuarioCliente: '',
					contraseñaCliente: ''
				}}
				validate={values => {
					const errors: Partial<FormValues> = {}
					if (!values.nombre) {
						errors.nombre = 'El nombre es requerido'
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
						errors.contraseñaCliente = 'La contraseña del cliente es requerida'
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
					<Form className='flex flex-col flex-wrap'>
						<div className='flex flex-col'>
							<label htmlFor='nombre'>Nombre y apellido del cliente</label>
							<Field
								type='text'
								name='nombre'
								className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3'
								placeholder='Nombre del cliente'
							/>
							<ErrorMessage
								name='nombre'
								component='div'
								className='text-red-500'
							/>
						</div>

						<div className='flex flex-col'>
							<label htmlFor='edad'>Edad del cliente</label>
							<Field
								type='text'
								name='edad'
								className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3'
								placeholder='Edad del cliente'
							/>
							<ErrorMessage
								name='edad'
								component='div'
								className='text-red-500'
							/>
						</div>

						<div className='flex flex-col'>
							<label htmlFor='mail'>Mail</label>
							<Field
								type='text'
								name='mail'
								className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3'
								placeholder='Mail'
							/>
							<ErrorMessage
								name='mail'
								component='div'
								className='text-red-500'
							/>
						</div>

						<div className='flex flex-col'>
							<label htmlFor='tel'>Tel</label>
							<Field
								type='text'
								name='tel'
								className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3'
								placeholder='Tel'
							/>
							<ErrorMessage
								name='tel'
								component='div'
								className='text-red-500'
							/>
						</div>

						<div className='flex flex-col mb-10'>
							<label htmlFor='observaciones'>Observaciones</label>
							<Field
								as='textarea'
								name='observaciones'
								className='border border-solid border-[#828282] w-[545px] h-[178px] p-[5px] rounded-md mt-3 mb-3 pb-3'
								placeholder='Observaciones'
							/>
							<ErrorMessage
								name='observaciones'
								component='div'
								className='text-red-500'
							/>
						</div>

						<section className='flex flex-col gap-1'>
							<div className='flex flex-row'>
								<UserProfile width={44} height={44} />
								<p className='ml-[16px] w-[465px]'>
									Aquí puedes editar el usuario de tu cliente: usuario y
									contraseña. Ten en cuenta que tu cliente reservará el turno
									con este usuario.
								</p>
							</div>
							<span className='flex mt-4 mb-4 border border-solid border-[#000] w-[551.5px]'></span>
							<div className=''>
								<h4 className='font-bold'>Usuario del cliente</h4>
								<div className='w-[466px] mb-[26px]'>
									<div className='ml-3 mt-[7px] mb-[2px]'>
										<label htmlFor='usuarioCliente' className='text-[#828282]'>
											Introduce el mail del cliente, este será el usuario con la
											cual el usuario entrará a la página para reservar el
											turno.
										</label>
									</div>
									<Field
										type='text'
										name='usuarioCliente'
										className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3'
										placeholder='Usuario del cliente'
									/>
									<ErrorMessage
										name='usuarioCliente'
										component='div'
										className='text-red-500'
									/>
								</div>
							</div>
							<div className='w-[466px]'>
								<h4 className='font-bold mb-[7px]'>Contraseña del cliente.</h4>
								<div className=''>
									<div className='ml-3 mt-[7px] mb-[2px]'>
										<label
											htmlFor='contraseñaCliente'
											className='text-[#828282]'
										>
											Introduce el documento del cliente, este será la
											contraseña con la cual el usuario entrará a la página para
											reservar el turno.
										</label>
									</div>
									<Field
										type='text'
										name='contraseñaCliente'
										className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3'
										placeholder='DNI'
									/>
									<ErrorMessage
										name='contraseñaCliente'
										component='div'
										className='text-red-500'
									/>
								</div>
							</div>
						</section>

						<div className='flex flex-row flex-wrap gap-5 mb-5 w-[60rem]  justify-end'>
							<button type='button' className='bg-[#BC4141] p-2 rounded-[4px]'>
								Cancelar
							</button>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bg-[#02A95C] p-2 rounded-[4px]'
							>
								Dar de alta a cliente
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</main>
	)
}
