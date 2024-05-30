import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SignUp from './SignUp'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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
				className='bg-white w-full max-w-3xl p-8 rounded-xl shadow-lg overflow-auto'
			>
				<SignUp onRegisterSuccess={handleRegisterSuccess} />
			</Box>
		</Modal>
	)
}

export default SignUpModal
