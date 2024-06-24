import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import LoginOptions from './LoginOptions'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import LoginOptionsMobile from './LoginOptionsMobile'

const LoginOptionsModal: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const modalRef = useRef<HTMLDivElement>(null)

	const isLoginPage = location.pathname === '/loginOptions'

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
				className='flex items-center justify-center bg-white p-10 py-12 max-sm:p-7  rounded-xl '
			>
				{isMobileScreen ? <LoginOptionsMobile /> : <LoginOptions />}
			</Box>
		</Modal>
	)
}

export default LoginOptionsModal
