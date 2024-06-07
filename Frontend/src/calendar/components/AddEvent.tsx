// src/components/AddEvent.tsx
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { DateTime } from 'luxon'

interface AddEventProps {
	open: boolean
	onClose: () => void
	onAddEvent: (title: string, start: Date, end: Date) => void
	initialStart: Date
	initialEnd: Date
}

const AddEvent: React.FC<AddEventProps> = ({
	open,
	onClose,
	onAddEvent,
	initialStart,
	initialEnd
}) => {
	const [title, setTitle] = useState<string>('')
	const [start] = useState<DateTime>(DateTime.fromJSDate(initialStart))
	const [end] = useState<DateTime>(DateTime.fromJSDate(initialEnd))

	const handleAddEvent = () => {
		onAddEvent(title, start.toJSDate(), end.toJSDate())
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Añadir Turno</DialogTitle>
			<DialogContent>
				<TextField
					label='Título'
					fullWidth
					value={title}
					onChange={e => setTitle(e.target.value)}
					margin='normal'
				/>
				<LocalizationProvider dateAdapter={AdapterLuxon}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<TextField
							label='Fecha'
							fullWidth
							margin='normal'
							value={start.toFormat('dd-MM-yyyy')}
							InputProps={{
								readOnly: true
							}}
							variant="filled"
						/>
						<TextField
							label='Horario'
							fullWidth
							margin='normal'
							value={`${start.toFormat('HH:mm')} - ${end.toFormat('HH:mm')}`}
							InputProps={{
								readOnly: true
							}}
							variant="filled"
						/>
					</Box>
				</LocalizationProvider>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>
				<Button onClick={handleAddEvent} color='primary' variant='contained'>
					Añadir
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddEvent
