import React, { useState } from 'react'
import Slider from 'react-slider'
import { generateSlots } from '../utils/utils'

interface CalendarConfigProps {
	onConfigChange: (slots: any[]) => void
}

const CalendarConfig: React.FC<CalendarConfigProps> = ({ onConfigChange }) => {
	const defaultStartHour = 1
	const defaultEndHour = 23
	const [timeRange, setTimeRange] = useState([defaultStartHour, defaultEndHour])
	const [interval, setInterval] = useState(60)
	const [selectedDaysRange, setSelectedDaysRange] = useState([0, 6]) // Rango de todos los días por defecto
	const [configurations, setConfigurations] = useState<any[]>([])

	const handleTimeRangeChange = (values: number[]) => {
		setTimeRange(values)
	}

	const handleIntervalChange = (value: number) => {
		setInterval(value)
	}

	const handleDaysRangeChange = (values: number[]) => {
		setSelectedDaysRange(values)
	}

	const handleSendConfig = () => {
		const selectedDays = Array.from(
			{ length: selectedDaysRange[1] - selectedDaysRange[0] + 1 },
			(_, i) => i + selectedDaysRange[0]
		)
		const slots = generateSlots(
			timeRange[0],
			timeRange[1],
			interval,
			selectedDays
		)

		// Obtener la configuración existente del localStorage o inicializar como un array vacío
		const existingConfigs =
			JSON.parse(localStorage.getItem('calendarConfig')) || []

		// Generar un ID único para la nueva configuración
		const newId = Math.random().toString(36).substr(2, 9)

		// Crear un nuevo objeto con el ID y la configuración
		const newConfig = { id: newId, slots }

		// Agregar la nueva configuración al array existente
		existingConfigs.push(newConfig)

		// Guardar la nueva configuración en el localStorage
		localStorage.setItem('calendarConfig', JSON.stringify(existingConfigs))

		// Actualizar el estado con la nueva configuración
		setConfigurations(existingConfigs)

		setTimeout(() => {
			console.log('Configuración enviada al backend:', slots)
			onConfigChange(slots)
		}, 1000)
	}

	const formatDayRange = (range: number[]) => {
		const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
		return `${daysOfWeek[range[0]]} - ${daysOfWeek[range[1]]}`
	}

	const formatHourRange = (range: number[]) => {
		return `${range[0]}:00 - ${range[1]}:00`
	}

	return (
		<div className='p-4'>
			<h2 className='text-lg font-bold mb-4'>Configuración del Calendario</h2>
			<select
				value={interval}
				onChange={e => handleIntervalChange(Number(e.target.value))}
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
				<div className=' '>
					<Slider
						className='w-64 mt-2'
						value={selectedDaysRange}
						min={0}
						max={6}
						step={1}
						withTracks={true}
						pearling={true}
						pearlingInterval={1}
						thumbClassName='bg-[#7445C7] h-6 w-6 rounded-full text-white flex items-center justify-center text-xs -translate-y-2'
						renderTrack={(props, { index }) => {
							let className = 'h-2 rounded '
							if (
								index >= selectedDaysRange[0] &&
								index <= selectedDaysRange[1]
							) {
								className += 'bg-[#7445C7]'
							} else {
								className += 'bg-gray-300'
							}
							return <div {...props} className={className} />
						}}
						renderThumb={(props, state) => (
							<div className='' {...props}>
								{
									['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][
										state.valueNow
									]
								}
							</div>
						)}
						onChange={handleDaysRangeChange}
					/>
					<div className='text-sm text-center mt-5'>
						El rango semanal es: {formatDayRange(selectedDaysRange)}
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
			</div>
		</div>
	)
}

export default CalendarConfig
