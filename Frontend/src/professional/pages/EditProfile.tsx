import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserProfile, Edit } from '../components/icons/Icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'


export interface FormValuesEdit {
	nombre: string
	apellido: string
	especialidad: string
	ubicacion: string
	tel: string
	mail: string
	descripcion: string
}

export function EditProfile(): JSX.Element {
	const {
		user,
		updateProfessionalUser,
		logout,
		professionalData,
		decodedToken
	} = useAuth()
	const navigate = useNavigate()

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
						Editar tu perfil
					</h1>
					<p className='w-[468px] text-2xl font-roboto '>
						Aquí puedes editar tu información: Nombre, apellido, tel.
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
						nombre: user?.firstName || '',
						apellido: user?.lastName || '',
						especialidad: professionalData?.speciality || '',
						ubicacion: '',
						tel: '',
						descripcion: professionalData?.description || '',
						mail: decodedToken?.email || ''
					}}
					validate={values => {
						const errors: Partial<FormValuesEdit> = {}
						if (!values.nombre) {
							errors.nombre = 'El nombre es requerido'
						}
						if (!values.apellido) {
							errors.apellido = 'El apellido es requerido'
						}
						if (!values.especialidad) {
							errors.especialidad = 'La especialidad es requerida'
						}

						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						console.log('Valores pasados a func en contexto:', values)
						updateProfessionalUser(values)
						setSubmitting(false)
						if (values.mail !== decodedToken?.email) {
							setTimeout(() => {
								logout()
								navigate('/')
							}, 3000)
						}
					}}
				>
					{({ isSubmitting }) => (
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
								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='especialidad'>Especialidad</label>
										<Field
											type='text'
											name='especialidad'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Especialidad'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='especialidad'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>
								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='ubicacion'>Ubicación</label>
										<Field
											type='text'
											name='ubicacion'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Ubicación'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='ubicacion'
											component='small'
											className='text-[#FF8682] text-[14px]'
										/>
									</div>
								</div>
								<div className='flex flex-col gap-1'>
									<div className='flex flex-col gap-[8px]'>
										<label htmlFor='descripcion'>Descripción</label>
										<Field
											component='textarea'
											name='descripcion'
											className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md'
											placeholder='Descripción'
										/>
									</div>
									<div className='flex h-[7px]'>
										<ErrorMessage
											name='descripcion'
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
										Aquí puedes editar tu mail. Ten en cuenta que al cambiar el
										mail cerrarás sesión y deberás volver a iniciarla.
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
