import { useState, useContext } from 'react'
import { useId } from 'react'
import '@material/web/textfield/outlined-text-field.js'
import { useNavigate } from 'react-router-dom'
import {
	CloseEyePassword,
	FacebookLogo,
	GoogleLogo,
	OpenEyePassword
} from '../icons/Icons'
import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { registerSchema } from '../../utils/validation'
import { AuthContext } from '../../context/AuthProvider'
import { LoginFormValues } from '../../typescript/interface'

const { userEmail, userPassword } = registerSchema.fields

export default function Login(): React.ReactElement {
	const [showPassword, setshowPassword] = useState(false)

	const id = useId()
	const authContext = useContext(AuthContext)

	if (!authContext) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}

	const { loginUser } = authContext
	const navigate = useNavigate()

	const initialValues: LoginFormValues = {
		userEmail: '',
		userPassword: ''
	}

	const loginSchema = Yup.object({
		userEmail: userEmail,
		userPassword: userPassword
	})

	const onSubmit = async (
		values: LoginFormValues,
		{ setSubmitting }: FormikHelpers<LoginFormValues>
	) => {
		try {
			await loginUser(values.userEmail, values.userPassword)
			setSubmitting(false)
			navigate('/home')
		} catch (error) {
			console.error('Error logging in user:', error)
			setSubmitting(false)
		}
	}

	return (
		<div className='flex gap-10'>
			<div className='w-full max-w-md mx-auto'>
				<div className='mb-[2.5rem]'>
					<h2 className='text-[40px] font-semibold text-[#313131]'>
						Iniciar Sesión
					</h2>
					<p className='text-gray-500 m-0 p-0 text-[16px]'>
						Inicia sesión para acceder a tu agenda online!
					</p>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={onSubmit}
				>
					{({
						isSubmitting,
						handleChange,
						handleBlur,
						values,
						handleSubmit
					}) => (
						<form className='space-y-6' onSubmit={handleSubmit}>
							<div className='flex flex-col gap-[24px] w-full mt-[25px]'>
								<div className='w-full'>
									<md-outlined-text-field
										label='Correo Electrónico'
										id={id + 'userEmail'}
										type='email'
										name='userEmail'
										value={values.userEmail}
										onInput={handleChange}
										onBlur={handleBlur}
										class='rounded-lg w-[100%] h-[56px]'
									/>
									<div className='h-[8px] flex'>
										<ErrorMessage
											name='userEmail'
											component='small'
											className='text-[#FF8682] text-[12px] '
										/>
									</div>
								</div>
								<div className='relative w-full flex flex-col'>
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
							</div>
							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<input
										id='remember-me'
										name='remember-me'
										type='checkbox'
										className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
									/>
									<label
										htmlFor='remember-me'
										className='ml-2 block text-sm text-gray-900'
									>
										Recuérdame
									</label>
								</div>
								<div className='text-sm'>
									<a href='#' className='font-medium text-[#FF8682]'>
										¿Olvidaste tu contraseña?
									</a>
								</div>
							</div>
							<div>
								<button
									type='submit'
									disabled={isSubmitting}
									className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FD8847] hover:bg-orange-700 '
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
											Procesando...
										</>
									) : (
										'Iniciar Sesión'
									)}
								</button>
							</div>

							<div className='text-center text-sm text-gray-600'>
								<p>
									No tienes una cuenta?{' '}
									<button
										onClick={() => navigate('/register')}
										className='font-medium text-[#FF8682]'
									>
										Regístrate
									</button>
								</p>
							</div>
							<div className='flex justify-center items-start gap-3 mt-14'>
								<div className='border border-solid border-[#FD8847] pl-[5rem] pr-[5rem] pt-[.7rem] pb-[.7rem]'>
									<FacebookLogo width={25} height={25} />
								</div>
								<div className='border border-solid border-[#FD8847] pl-[5rem] pr-[5rem] pt-[.7rem] pb-[.7rem]'>
									<GoogleLogo width={25} height={25} />
								</div>
							</div>
						</form>
					)}
				</Formik>
			</div>
			<div className=' w-[416px] h-[516px]'>
				<img src='./images/LoginImg.webp' alt='login' />
			</div>
		</div>
	)
}
