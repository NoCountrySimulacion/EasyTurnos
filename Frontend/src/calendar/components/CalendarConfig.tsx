import React, { useEffect, useState } from 'react'
import Slider from 'react-slider'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // Main style file
import 'react-date-range/dist/theme/default.css' // Theme CSS file
import { generateSlots } from '../utils/utils'
import { createSlot, deleteSlot } from '../../services/api/slots' // Agregamos deleteAllSlots

interface CalendarConfigProps {
	onConfigChange: (slots: any[]) => void
}

const CalendarConfig: React.FC<CalendarConfigProps> = ({ onConfigChange }) => {
	const defaultStartHour = 1
	const defaultEndHour = 23
	const [timeRange, setTimeRange] = useState<number[]>([
		defaultStartHour,
		defaultEndHour
	])
	const [interval, setInterval] = useState<number>(60)
	const [selectedRange, setSelectedRange] = useState<{
		startDate: Date | null
		endDate: Date | null
	}>({
		startDate: new Date(),
		endDate: new Date()
	})
	const [slots, setSlots] = useState<any[]>([])


	const handleTimeRangeChange = (values: number[]) => {
		setTimeRange(values)
	}

	const handleIntervalChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setInterval(Number(event.target.value))
	}

	const handleDateRangeChange = (ranges: any) => {
		if (ranges.selection) {
			setSelectedRange({
				startDate: ranges.selection.startDate,
				endDate: ranges.selection.endDate
			})
		}
	}

	const handleSendConfig = async () => {
		if (selectedRange.startDate && selectedRange.endDate) {
			const slotsToCreate = generateSlots(
				timeRange[0],
				timeRange[1],
				interval,
				selectedRange.startDate,
				selectedRange.endDate
			)

			try {
				// Enviar los slots generados como un array
				await createSlot(slotsToCreate)
				console.log('Slots creados correctamente:', slotsToCreate)
				onConfigChange(slotsToCreate)
			} catch (error) {
				console.error('Error al crear los slots:', error)

				// Si el error es un error 400, intenta obtener el mensaje de error detallado
				if (error.response && error.response.status === 400) {
					const errorMessage = await error.response.json()
					console.error('Mensaje de error detallado:', errorMessage)
				}
			}
		}
	}

	const handleDeleteAllSlots = async () => {
		try {
			await deleteSlot() // Llamamos a la función para borrar todos los slots
			console.log('Todos los slots fueron eliminados correctamente')
			setSlots([]) // Limpiamos la lista de slots en el estado local
			onConfigChange([]) // Informamos al padre que la configuración de slots ha cambiado
		} catch (error) {
			console.error('Error al eliminar todos los slots:', error)
		}
	}

	const formatHourRange = (range: number[]) => {
		return `${range[0]}:00 - ${range[1]}:00`
	}

	return (
		<div className='p-4'>
			<h2 className='text-lg font-bold mb-4'>Configuración del Calendario</h2>
			<select
				value={interval}
				onChange={handleIntervalChange}
				className='p-2 border rounded-md'
			>
				<option value={15}>15 minutos</option>
				<option value={30}>30 minutos</option>
				<option value={60}>1 hora</option>
				<option value={120}>2 horas</option>
			</select>
			<div className='text-sm text-center mt-2'>
				{formatHourRange(timeRange)}
			</div>
			<section className='flex gap-4'>
				<div className='flex flex-col'>
					<Slider
						className='w-64 mt-2'
						value={timeRange}
						min={defaultStartHour}
						max={defaultEndHour}
						step={1}
						withTracks={true}
						thumbClassName='bg-[#7445C7] h-6 w-6 rounded-full text-white flex items-center justify-center text-xs -translate-y-2'
						renderTrack={(props, { index }) => {
							let className = 'h-2 rounded '
							if (index === 0) {
								className += 'bg-gray-300'
							} else if (index === 1) {
								className += 'bg-[#7445C7]'
							} else {
								className += 'bg-gray-300'
							}
							return <div {...props} className={className} />
						}}
						renderThumb={(props, state) => (
							<div {...props}>{state.valueNow}</div>
						)}
						onChange={handleTimeRangeChange}
					/>
					<div className='text-sm text-center mt-4'>
						El rango horario es: {formatHourRange(timeRange)}
					</div>
				</div>
				<div className='flex flex-col'>
					<DateRange
						ranges={[
							{
								startDate: selectedRange.startDate,
								endDate: selectedRange.endDate,
								key: 'selection'
							}
						]}
						onChange={handleDateRangeChange}
						moveRangeOnFirstSelection={false}
						retainEndDateOnFirstSelection={true}
						rangeColors={['#7445C7']}
					/>
					<div className='text-sm text-center mt-5'>
						Rango de fechas: {selectedRange.startDate?.toLocaleDateString()} -{' '}
						{selectedRange.endDate?.toLocaleDateString()}
					</div>
				</div>
			</section>
			<div className='mt-4'>
				<button
					className='px-4 py-2 bg-[#7445C7] text-white rounded hover:bg-blue-600'
					onClick={handleSendConfig}
				>
					Guardar Configuración
				</button>
				<button
					className='px-4 py-2 ml-4 bg-red-500 text-white rounded hover:bg-red-600'
					onClick={handleDeleteAllSlots}
				>
					Eliminar Todos los Slots
				</button>
			</div>
		</div>
	)
}

export default CalendarConfig
