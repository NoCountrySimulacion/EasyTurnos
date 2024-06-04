// src/components/AddEvent.tsx
import React, { useState } from 'react'
import {
	DatePicker,
	TimePicker,
	LocalizationProvider
} from '@mui/x-date-pickers'
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
	const [title, setTitle] = useState('')
	const [start, setStart] = useState<DateTime>(
		DateTime.fromJSDate(initialStart)
	)
	const [end, setEnd] = useState<DateTime>(DateTime.fromJSDate(initialEnd))

	const handleAddEvent = () => {
		onAddEvent(title, start.toJSDate(), end.toJSDate())
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Añadir Turno</DialogTitle>
			<DialogContent>
				<TextField
					label='Titulo'
					fullWidth
					value={title}
					onChange={e => setTitle(e.target.value)}
					margin='normal'
				/>
				<LocalizationProvider dateAdapter={AdapterLuxon}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<DatePicker
							label='Fecha de inicio'
							value={start}
							onChange={newValue => setStart(newValue as DateTime)}
							renderInput={props => (
								<TextField {...props} fullWidth margin='normal' />
							)}
						/>
						<TimePicker
							label='Hora de inicio'
							value={start}
							onChange={newValue => setStart(newValue as DateTime)}
							renderInput={props => (
								<TextField {...props} fullWidth margin='normal' />
							)}
						/>
						<DatePicker
							label='Fecha de fin'
							value={end}
							onChange={newValue => setEnd(newValue as DateTime)}
							renderInput={props => (
								<TextField {...props} fullWidth margin='normal' />
							)}
						/>
						<TimePicker
							label='Hora de fin'
							value={end}
							onChange={newValue => setEnd(newValue as DateTime)}
							renderInput={props => (
								<TextField {...props} fullWidth margin='normal' />
							)}
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
