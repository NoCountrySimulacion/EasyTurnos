import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem } from '@mui/material'
import moment from 'moment'

interface SlotModalProps {
	open: boolean
	onClose: () => void
	slot: any
	clients: Array<any>
	onConfirm: (title: string, client: string) => void
}

const SlotModal: React.FC<SlotModalProps> = ({ open, onClose, slot, clients, onConfirm }) => {
	const [title, setTitle] = useState('')
	const [client, setClient] = useState('')

	const handleConfirm = () => {
		onConfirm(title, client)
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Detalles del Slot</DialogTitle>
			<DialogContent>
				<p>{`Hora: ${moment(slot.startDate).format('HH:mm')} - ${moment(slot.endDate).format('HH:mm')}`}</p>
				<TextField
					label="Título"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Select
					value={client}
					onChange={(e) => setClient(e.target.value)}
					displayEmpty
					fullWidth
					margin="normal"
				>
					<MenuItem value="" disabled>Seleccionar Cliente</MenuItem>
					{clients.map((client) => (
						<MenuItem key={client.id} value={client.id}>
							{client.name}
						</MenuItem>
					))}
				</Select>
				<Button onClick={handleConfirm} color="primary" variant="contained">
					Confirmar
				</Button>
			</DialogContent>
		</Dialog>
	)
}

export default SlotModal
