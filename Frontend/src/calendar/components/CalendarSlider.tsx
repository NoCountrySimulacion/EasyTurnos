import React from 'react'
import Slider from 'react-slider'
import { CalendarConfigProps } from '../typescript/interface'


const CalendarSlider: React.FC<CalendarConfigProps> = ({
	timeRange,
	onTimeRangeChange
}) => {
	return (
		<div className='mb-4'>
			<h2 className='text-lg font-bold mb-2'>Seleccionar horario de trabajo</h2>
			<div className='flex flex-col'>
				<Slider
					className='w-64 mt-2'
					value={timeRange}
					onChange={onTimeRangeChange}
					min={0}
					max={23}
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
					renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
				/>
			</div>
			<div className='mt-4'>
				<p className='text-sm'>
					Horario seleccionado: <span className='text-[#7445C7] font-bold'>{timeRange[0]}:00 - {timeRange[1]}:00</span> 
				</p>
			</div>
		</div>
	)
}

export default CalendarSlider
