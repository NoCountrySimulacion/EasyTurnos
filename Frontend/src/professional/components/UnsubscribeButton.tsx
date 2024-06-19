import Swal from 'sweetalert2'
import { deleteClient } from '../../services/api/clientServices'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

export function UnsubscribeButton({
	clientId
}: {
	clientId: string
}): JSX.Element {
	const navigate = useNavigate()
	const { user, decodedToken } = useAuth()

	const handleDeleteClient = () => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Esta acción no se puede deshacer',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, eliminar cliente',
			cancelButtonText: 'Cancelar'
		}).then(result => {
			if (result.isConfirmed) {
				deleteClient(user?.token, decodedToken?.professionalId, clientId)
					.then(() => {
						Swal.fire({
							icon: 'success',
							title: 'Cliente eliminado',
							text: 'El cliente ha sido eliminado con éxito.'
						})
						navigate('/home')
					})
					.catch(error => {
						Swal.fire({
							icon: 'error',
							title: 'Error',
							text: 'No se pudo eliminar al cliente: ' + error.message
						})
					})
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire('Cancelado', 'No se ha eliminado al cliente.', 'info')
			}
		})
	}

	return (
		<button
			className='bg-[#BC4141] text-white flex items-center justify-center h-[38px] w-[98px] rounded-md text-[13px] leading-5 font-bold hover:bg-red-600 transition duration-300 ease-in-out'
			onClick={handleDeleteClient}
		>
			<span>Dar de baja</span>
		</button>
	)
}
