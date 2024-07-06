import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SignUp from './SignUp'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import SignUpMobile from './SignUpMobile'

const SignUpModal: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const modalRef = useRef<HTMLDivElement>(null)

	const isRegisterPage = location.pathname === '/register'

	const handleCloseModal = () => {
		navigate('/')
	}

	const handleRegisterSuccess = () => {
		handleCloseModal()
		Swal.fire({
			title: 'Registro Exitoso',
			text: 'Te has registrado exitosamente!',
			icon: 'success',
			confirmButtonText: 'OK'
		})
	}

	const isMobileScreen = useMediaQuery('(max-width: 920px)')

	return (
		<Modal
			open={isRegisterPage}
			onClose={handleCloseModal}
			aria-labelledby='signup-modal-title'
			aria-describedby='signup-modal-description'
			className='flex justify-center items-center'
		>
			<Box
				ref={modalRef}
				className='bg-white max-w-[900px] px-8 py-8 rounded-xl shadow-lg overflow-auto max-md:mx-2 max-sm:px-6 '
			>
				{isMobileScreen ? (
					<SignUpMobile onRegisterSuccess={handleRegisterSuccess} />
				) : (
					<SignUp onRegisterSuccess={handleRegisterSuccess} />
				)}
			</Box>
		</Modal>
	)
}

export default SignUpModal
