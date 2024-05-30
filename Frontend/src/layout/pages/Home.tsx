import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthProvider' // Asegúrate de que la ruta es correcta

const Home: React.FC = (): JSX.Element => {
	const navigate = useNavigate()
	const authContext = useContext(AuthContext)

	if (!authContext) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}

	const { logout } = authContext

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<h1 className='text-2xl font-bold mb-4'>
				Hola Rosi, El equipo de Front te quiere!  ❤️
			</h1>
			<button
				onClick={handleLogout}
				className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
			>
				Logout
			</button>
		</div>
	)
}

export default Home
