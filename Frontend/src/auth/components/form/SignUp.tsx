import React, { useState } from 'react'
import { useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '@material/web/textfield/outlined-text-field.js'
import {
	CloseEyePassword,
	FacebookLogo,
	GoogleLogo,
	OpenEyePassword
} from '../icons/Icons'
import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import { initialValues, registerSchema } from '../../utils/validation'
import { FormValues } from '../../typescript/interface'
import Swal from 'sweetalert2'
import { useAuth } from '../../hooks/useAuth'

interface SignUpProps {
	onRegisterSuccess: () => void
}

function SignUp({ onRegisterSuccess }: SignUpProps): React.ReactElement {
	const [showPassword, setshowPassword] = useState(false)
	const [showConfirmPassword, setshowConfirmPassword] = useState(false)

	const navigate = useNavigate()
	const id = useId()
	const { registerUser } = useAuth()

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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
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
		<section className='flex font-montserrat gap-[60px]'>
			<section className=' w-1/2 h-auto flex items-center justify-center rounded-lg'>
				<img src='/images/RegisterImg.webp' alt='registro' />
			</section>
			<section className='w-2/3 flex flex-col justify-center'>
				<header>
					<h2 className='text-[#313131] text-[40px] font-semibold'>
						Comienza ahora
					</h2>
					<p className=' mb-2 text-[13px] opacity-75'>
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
							<div className='flex gap-3'>
								<div className='w-full'>
									<md-outlined-text-field
										label='Nombre'
										id={id + 'name'}
										type='text'
										name='userName'
										value={values.userName}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center text-[12px]'
									/>
									<div className='h-[8px] flex '>
										<ErrorMessage
											name='userName'
											component='small'
											className='text-[#FF8682] text-[12px]'
										/>
									</div>
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
										class='w-full flex items-center text-[12px]'
									/>
									<div className='h-[8px] flex '>
										<ErrorMessage
											name='userLastName'
											component='small'
											className='text-[#FF8682] text-[12px]'
										/>
									</div>
								</div>
							</div>
							<div className='flex gap-3'>
								<div className='w-full'>
									<md-outlined-text-field
										label='Email'
										id={id + 'email'}
										type='email'
										name='userEmail'
										value={values.userEmail}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center text-[12px]'
									/>
									<div className='h-[8px] flex '>
										<ErrorMessage
											name='userEmail'
											component='small'
											className='text-[#FF8682] text-[12px]'
										/>
									</div>
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
										class='w-full flex items-center text-[12px]'
									/>
									<div className='h-[8px] flex '>
										<ErrorMessage
											name='userPhoneNumber'
											component='small'
											className='text-[#FF8682] text-[12px]'
										/>
									</div>
								</div>
							</div>
							<div className='relative w-full flex flex-col '>
								<div className='h-full flex items-center justify-center'>
									<md-outlined-text-field
										label='Contraseña'
										id={id + 'password'}
										type={showPassword ? 'text' : 'password'}
										name='userPassword'
										value={values.userPassword}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center text-[12px]'
									/>
									<button
										type='button'
										onClick={() => setshowPassword(!showPassword)}
										className='absolute right-3'
									>
										{showPassword ? (
											<OpenEyePassword width={18} height={18} />
										) : (
											<CloseEyePassword width={18} height={18} />
										)}
									</button>
								</div>
								<div className='h-[8px] flex '>
									<ErrorMessage
										name='userPassword'
										component='small'
										className='text-[#FF8682] text-[12px]'
									/>
								</div>
							</div>
							<div className='w-full relative flex flex-col '>
								<div className='flex items-center justify-center'>
									<md-outlined-text-field
										label='Confirmar Contraseña'
										id={id + 'confirm-password'}
										type={showConfirmPassword ? 'text' : 'password'}
										name='userPasswordConfirm'
										value={values.userPasswordConfirm}
										onInput={handleChange}
										onBlur={handleBlur}
										class='w-full flex items-center text-[12px]'
									/>
									<button
										type='button'
										onClick={() => setshowConfirmPassword(!showConfirmPassword)}
										className='absolute right-3'
									>
										{showConfirmPassword ? (
											<OpenEyePassword width={18} height={18} />
										) : (
											<CloseEyePassword width={18} height={18} />
										)}
									</button>
								</div>
								<div className='h-[6px] flex '>
									<ErrorMessage
										name='userPasswordConfirm'
										component='small'
										className='text-[#FF8682] text-[12px]'
									/>
								</div>
							</div>
							<div className='flex items-center '>
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
										className='ml-2 text-[12px] text-[#313131] font-medium'
									>
										Estoy de acuerdo con los{' '}
										<Link
											to='#'
											className='text-[#FF8682] font-medium text-[12px]'
										>
											Términos
										</Link>{' '}
										y{' '}
										<Link
											to='#'
											className='text-[#FF8682] font-medium text-[12px]'
										>
											Políticas de Privacidad
										</Link>
									</label>
								</small>
							</div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full h-[40px] rounded-[4px] bg-[#FD8847] text-[14px] flex justify-center items-center text-white hover:bg-orange-700 '
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
									<span className='font-semibold'>Crear Cuenta</span>
								)}
							</button>
						</form>
					)}
				</Formik>
				<footer className='flex flex-col gap-2 mt-2 items-center w-full'>
					<small className='text-[12px] font-medium'>
						Ya tienes una cuenta?{' '}
						<button
							onClick={() => {
								navigate('/login')
							}}
							className='text-[#FF8682] font-medium text-[12px]'
						>
							Inicia sesión
						</button>
					</small>
					<div className='flex items-center justify-between w-full'>
						<hr className='w-[100px]' />
						<small className='text-[12px] font-medium opacity-50'>
							O regístrate con
						</small>
						<hr className='w-[100px]' />
					</div>
					<div className='flex w-full gap-4'>
						<button className='w-1/2 border border-[#FD8847] rounded-[4px] flex justify-center items-center py-2 px-4'>
							<div className='h-[24px]'>
								<FacebookLogo width={25} height={25} />
							</div>
						</button>
						<button className='w-1/2 border border-[#FD8847] rounded-[4px] flex justify-center items-center py-2 px-4'>
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
