import React, { useContext } from 'react'
import { useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '@material/web/textfield/outlined-text-field.js'
import { FacebookLogo, GoogleLogo } from '../icons/Icons'
import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import { initialValues, registerSchema } from '../../utils/validation'
import { AuthContext } from '../../context/AuthProvider'
import { AuthContextType, FormValues } from '../../typescript/interface'
import Swal from 'sweetalert2'

interface SignUpProps {
	onRegisterSuccess: () => void
}

function SignUp({ onRegisterSuccess }: SignUpProps): React.ReactElement {
	const navigate = useNavigate()
	const id = useId()
	const authContext = useContext<AuthContextType | undefined>(AuthContext)

	if (!authContext) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}

	const { registerUser } = authContext

	const onSubmit = async (
		values: FormValues,
		{ setSubmitting }: FormikHelpers<FormValues>
	) => {
		try {
			await registerUser(
				values.userName,
				values.userLastName,
				values.userEmail,
				values.userPhoneNumber,
				values.userPassword,
				values.userPasswordConfirm
			)
			setSubmitting(false)
			onRegisterSuccess()
		} catch (error) {
			console.error('Error registering user:', error)
			setSubmitting(false)
			Swal.fire({
				title: 'Registro Fallido',
				text: error.message,
				icon: 'error',
				confirmButtonText: 'OK'
			})
		}
	}

	return (
		<section className='flex font-montserrat gap-6'>
			<section className=' w-2/3 flex items-center justify-center rounded-lg'>
				<img src="/images/RegisterImg.webp" alt="registro" />
			</section>
			<section className='w-2/3 flex flex-col justify-center'>
				<header>
					<h2 className='text-[#313131] text-[24px] font-semibold'>
						Comienza ahora
					</h2>
					<p className=' mb-2 text-[10px] opacity-75'>
						Vamos a prepararte para que puedas acceder a tu cuenta personal.
					</p>
				</header>
				<Formik
					initialValues={initialValues}
					validationSchema={registerSchema}
					onSubmit={onSubmit}
				>
					{({
						isSubmitting,
						handleChange,
						handleBlur,
						values,
						handleSubmit
					}) => (
						<form className='space-y-4 text-[#1C1B1F]' onSubmit={handleSubmit}>
							<div className='flex gap-[12px]'>
								<div className='w-full'>
									<md-outlined-text-field
										label='Nombre'
										id={id + 'name'}
										type='text'
										name='userName'
										value={values.userName}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center rounded-lg text-[12px]'
									/>
									<ErrorMessage
										name='userName'
										component='div'
										className='text-red-500 text-sm'
									/>
								</div>
								<div className='w-full'>
									<md-outlined-text-field
										label='Apellido'
										id={id + 'lastName'}
										type='text'
										name='userLastName'
										value={values.userLastName}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center rounded-lg text-[12px]'
									/>
									<ErrorMessage
										name='userLastName'
										component='div'
										className='text-red-500 text-sm'
									/>
								</div>
							</div>
							<div className='flex gap-[12px]'>
								<div className='w-full'>
									<md-outlined-text-field
										label='Email'
										id={id + 'email'}
										type='email'
										name='userEmail'
										value={values.userEmail}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center rounded-lg text-[12px]'
									/>
									<ErrorMessage
										name='userEmail'
										component='div'
										className='text-red-500 text-sm'
									/>
								</div>
								<div className='w-full'>
									<md-outlined-text-field
										label='Número de Teléfono'
										id={id + 'tel'}
										type='tel'
										name='userPhoneNumber'
										value={values.userPhoneNumber}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center rounded-lg text-[12px]'
									/>
									<ErrorMessage
										name='userPhoneNumber'
										component='div'
										className='text-red-500 text-sm'
									/>
								</div>
							</div>
							<div className='w-full'>
								<md-outlined-text-field
									label='Contraseña'
									id={id + 'password'}
									type='password'
									name='userPassword'
									value={values.userPassword}
									onInput={handleChange}
									onBlur={handleBlur}
									class='w-full flex items-center rounded-lg text-[12px]'
								/>
								<ErrorMessage
									name='userPassword'
									component='div'
									className='text-red-500 text-sm'
								/>
							</div>
							<div className='w-full'>
								<md-outlined-text-field
									label='Confirmar Contraseña'
									id={id + 'confirm-password'}
									type='password'
									name='userPasswordConfirm'
									value={values.userPasswordConfirm}
									onInput={handleChange}
									onBlur={handleBlur}
									class='w-full flex items-center rounded-lg text-[12px]'
								/>
								<ErrorMessage
									name='userPasswordConfirm'
									component='div'
									className='text-red-500 text-sm'
								/>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id={id + 'terms'}
									name='terms'
									className='rounded-lg'
									required
								/>
								<small>
									<label
										htmlFor={id + 'terms'}
										className='ml-2 text-[10px] text-[#313131] font-medium'
									>
										Estoy de acuerdo con los{' '}
										<Link
											to='#'
											className='text-[#FF8682] font-semibold text-[10px]'
										>
											Términos
										</Link>{' '}
										y{' '}
										<Link
											to='#'
											className='text-[#FF8682] font-semibold text-[10px]'
										>
											Políticas de Privacidad
										</Link>
									</label>
								</small>
							</div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full h-[40px] rounded-[4px] bg-[#FD8847] text-[14px] flex justify-center items-center'
							>
								{isSubmitting ? (
									<>
										<svg
											className='animate-spin h-5 w-5 mr-3 text-white'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											></path>
										</svg>
										<span className='font-semibold text-[#F3F3F3]'>
											Procesando...
										</span>
									</>
								) : (
									<span className='font-semibold text-[#F3F3F3]'>
										Crear Cuenta
									</span>
								)}
							</button>
						</form>
					)}
				</Formik>
				<footer className='flex flex-col gap-6 mt-4 items-center w-full'>
					<small className='text-[12px] font-medium'>
						Ya tienes una cuenta?{' '}
						<button
							onClick={() => {
								navigate('/login')
							}}
							className='text-[#FF8682] font-semibold text-[12px]'
						>
							Inicia sesión
						</button>
					</small>
					<div className='flex items-center justify-between w-full'>
						<hr className='w-[100px]' />
						<small className='text-[12px] font-medium opacity-50'>
							O inicia sesión con
						</small>
						<hr className='w-[100px]' />
					</div>
					<div className='flex gap-4'>
						<button className='w-[140px] border border-[#FD8847] rounded-[4px] flex justify-center items-center py-2 px-4'>
							<div className='h-[24px]'>
								<FacebookLogo width={25} height={25} />
							</div>
						</button>
						<button className='w-[140px] border border-[#FD8847] rounded-[4px] flex justify-center items-center py-2 px-4'>
							<div className='h-[24px]'>
								<GoogleLogo width={25} height={25} />
							</div>
						</button>
					</div>
				</footer>
			</section>
		</section>
	)
}

export default SignUp
