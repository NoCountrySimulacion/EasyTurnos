/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import Slider from 'react-slider'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // Main style file
import 'react-date-range/dist/theme/default.css' // Theme CSS file
import { generateSlots } from '../utils/utils'
import { createSlot, deleteAllSlots } from '../../services/api/slots'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface CalendarConfigProps {
	onConfigChange: (slots: any[]) => void
}

interface NumberDotProps {
	num: string
}

function NumberDot({ num }: NumberDotProps): React.ReactElement {
	return (
		<figure className='w-[24px] h-[24.5px] pb-[0.5px] flex flex-col justify-center items-center rounded-[24px] border border-[#7445C7] bg-[#D3CAFF] text-[#313131] text-[12px] font-semibold leading-[24px]'>
			{num}
		</figure>
	)
}

const MySwal = withReactContent(Swal)

const CalendarConfig: React.FC<CalendarConfigProps> = ({ onConfigChange }) => {
	const defaultStartHour = 1
	const defaultEndHour = 23
	const [timeRange, setTimeRange] = useState<number[]>([
		defaultStartHour,
		defaultEndHour
	])
	const [interval, setInterval] = useState<number>(60)
	const [selectedRange, setSelectedRange] = useState<{
		startDate: Date | undefined
		endDate: Date | undefined
	}>({
		startDate: undefined,
		endDate: undefined
	})

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
				await createSlot(slotsToCreate)
				console.log('Slots creados correctamente:', slotsToCreate)
				onConfigChange(slotsToCreate)
			} catch (error: any) {
				console.error('Error al crear los slots:', error)

				if (error.response && error.response.status === 400) {
					const errorMessage = await error.response.json()
					console.error('Mensaje de error detallado:', errorMessage)
				}
			}
		}
	}

	const handleDeleteAllSlots = async () => {
		try {
			await deleteAllSlots()
			console.log('Todos los slots han sido eliminados correctamente')
			onConfigChange([])
			MySwal.fire({
				icon: 'success',
				title: '¡Configuración eliminada!',
				text: 'Se han eliminado todos los slots correctamente.'
			})
		} catch (error) {
			console.error('Error al eliminar todos los slots:', error)
			MySwal.fire({
				icon: 'error',
				title: 'Error al eliminar slots',
				text: 'Hubo un error al intentar eliminar todos los slots.'
			})
		}
	}

	const formatHourRange = (range: number[]) => {
		return `${range[0]}:00 - ${range[1]}:00`
	}

	return (
		<div className='p-4'>
			<h2 className='text-xl font-bold mb-4'>Configuración del Calendario</h2>
			<div>
				<h3 className=' mb-2 font-roboto text-[#828282]'>Duración</h3>
				<select
					value={interval}
					onChange={handleIntervalChange}
					className='p-2 border rounded-md mb-4'
				>
					<option value={15}>15 minutos</option>
					<option value={30}>30 minutos</option>
					<option value={60}>1 hora</option>
					<option value={120}>2 horas</option>
				</select>
			</div>
			<section>
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

								const { key, ...restProps } = props

								return <div key={key} {...restProps} className={className} />
							}}
							renderThumb={(props, state) => {
								const { key, ...restProps } = props

								return (
									<div key={state.valueNow} {...restProps}>
										{state.valueNow}
									</div>
								)
							}}
							onChange={handleTimeRangeChange}
						/>
						<div className='text-sm text-center mt-5'>
							El rango horario es: {formatHourRange(timeRange)}
						</div>
						<div className='mt-10'>
							<h3 className='mb-10 font-roboto text-[#828282] text-[20px]'>
								Para Configurar tu calendario
							</h3>
							<ol className='font-roboto text-[#828282] flex flex-col gap-8 pl-3'>
								<li className='flex items-center gap-2 '>
									<NumberDot num='1' />
									<span>Elige Cuanto durará tu Cita.</span>
								</li>
								<li className='flex items-center gap-2 '>
									<NumberDot num='2' />
									<span>Seleciona el rango horario.</span>
								</li>
								<li className='flex items-center gap-2 '>
									<NumberDot num='3' />
									<span>Seleciona el rango de días en el més.</span>
								</li>
								<li className='flex items-center gap-2 '>
									<NumberDot num='4' />
									<span>Guarda la Configuración.</span>
								</li>
							</ol>
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
			</section>
		</div>
	)
}

export default CalendarConfig
