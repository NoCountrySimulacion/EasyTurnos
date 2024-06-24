import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import LoginMobile from './LoginMobile'

const LoginModal: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const modalRef = useRef<HTMLDivElement>(null)

	const isLoginPage = location.pathname === '/login'

	const handleCloseModal = () => {
		navigate('/')
	}

	const isMobileScreen = useMediaQuery('(max-width: 920px)')

	return (
		<Modal
			open={isLoginPage}
			onClose={handleCloseModal}
			aria-labelledby='login-modal-title'
			aria-describedby='login-modal-description'
			className='flex justify-center items-center'
		>
			<Box
				ref={modalRef}
				className='flex items-center max-w-[900px] justify-center bg-white px-16 pt-16 pb-4 max-sm:px-8 rounded-xl max-md:mx-2'
			>
				{isMobileScreen ? <LoginMobile /> : <Login />}
			</Box>
		</Modal>
	)
}

export default LoginModal
