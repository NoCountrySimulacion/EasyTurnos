/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	Select,
	MenuItem,
	FormHelperText // Importa FormHelperText para mostrar el mensaje de validación
} from '@mui/material'
import moment from 'moment'

interface SlotModalProps {
	open: boolean
	onClose: () => void
	slot: any
	clients: Array<any>
	onConfirm: (title: string, clientId: string) => void // Actualizado para incluir clientId
}

const SlotModal: React.FC<SlotModalProps> = ({
	open,
	onClose,
	slot,
	clients,
	onConfirm
}) => {
	const [title, setTitle] = useState('')
	const [selectedClientId, setSelectedClientId] = useState<string>('')
	const [validationError, setValidationError] = useState<boolean>(false) // Estado para controlar la validación

	useEffect(() => {
		if (open) {
			setTitle('')
			setSelectedClientId('')
			setValidationError(false) // Reinicia la validación cuando se abre el modal
		}
	}, [open])

	const handleConfirm = () => {
		if (selectedClientId) {
			onConfirm(title, selectedClientId)
			onClose()
		} else {
			setValidationError(true) // Activa la validación si no se ha seleccionado un cliente
		}
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Detalles del Slot</DialogTitle>
			<DialogContent>
				<p>{`Hora: ${moment(slot.startDate).format('HH:mm')} - ${moment(slot.endDate).format('HH:mm')}`}</p>
				<TextField
					label='Título'
					value={title}
					onChange={e => setTitle(e.target.value)}
					fullWidth
					margin='normal'
				/>
				<Select
					value={selectedClientId}
					onChange={e => setSelectedClientId(e.target.value as string)}
					displayEmpty
					fullWidth
					margin='dense'
				>
					<MenuItem value='' disabled>
						Seleccionar Cliente
					</MenuItem>
					{clients && clients.length > 0 ? (
						clients.map(client => (
							<MenuItem key={client.id} value={client.id}>
								{client.firstName} {client.lastName}
							</MenuItem>
						))
					) : (
						<MenuItem value='' disabled>
							No hay clientes disponibles
						</MenuItem>
					)}
				</Select>
				<FormHelperText error={validationError}>
					Selecciona un cliente para continuar
				</FormHelperText>
				<Button
					onClick={handleConfirm}
					color='secondary'
					variant='contained'
					style={{ marginTop: '16px' }}
				>
					Confirmar
				</Button>
			</DialogContent>
		</Dialog>
	)
}

export default SlotModal
