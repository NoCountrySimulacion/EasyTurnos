import React, {  useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

const LoginModal: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const modalRef = useRef<HTMLDivElement>(null)
	
	const isLoginPage = location.pathname === '/login'

	const handleCloseModal = () => {
		navigate('/')
	}


	return (
		<Modal
			open={isLoginPage} 
			onClose={handleCloseModal} 
			aria-labelledby='login-modal-title'
			aria-describedby='login-modal-description'
			className='flex justify-center items-center'
		>
			<Box ref={modalRef} className='flex items-center justify-center bg-white p-10 rounded-xl '>
				<Login />
			</Box>
		</Modal>
	)
}

export default LoginModal
