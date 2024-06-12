import React, { useState } from 'react'
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'

// Crear un componente AccordionSummary personalizado
const CustomAccordionSummary = styled(AccordionSummary)(() => ({
	'& .MuiAccordionSummary-expandIconWrapper': {
		transform: 'rotate(0deg)',
		color: '#E69C58'
	},
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(45deg)'
	}
}))

export default function ComoFunciona(): JSX.Element {
	const [expanded, setExpanded] = useState<string | false>(false)

	const handleChange =
		(panel: string) =>
			(_event: React.ChangeEvent<object>, isExpanded: boolean) => {
				setExpanded(isExpanded ? panel : false)
			}

	return (
		<div className='justify-center flex flex-col md:flex-row gap-4 p-4 px-20 h-[500px]'>
			<div className=' text-center w-full md:w-1/2 space-y-4 flex flex-col gap-2'>
				<Typography>
					<h1 className='text-4xl font-montserrat font-semibold'>
						¡En 4 pasos, tus clientes pueden reservar su turno!
					</h1>
				</Typography>
				<Accordion
					expanded={expanded === 'panel1'}
					onChange={handleChange('panel1')}
				>
					<CustomAccordionSummary
						expandIcon={
							<div className='text-2xl font-bold text-orange-500'>+</div>
						}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography>
							<h6 className='font-bold text-xl'>Ingresa a la Web</h6>
						</Typography>
					</CustomAccordionSummary>
					<AccordionDetails>
						<Typography>Ingresa nombre, apellido y documento</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={expanded === 'panel2'}
					onChange={handleChange('panel2')}
				>
					<CustomAccordionSummary
						expandIcon={
							<div className='text-2xl font-bold text-orange-500'>+</div>
						}
						aria-controls='panel2a-content'
						id='panel2a-header'
					>
						<Typography>
							<h6 className='font-bold text-xl'>Elige el profesional</h6>
						</Typography>
					</CustomAccordionSummary>
					<AccordionDetails>
						<Typography>Selecciona el profesional en el home</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={expanded === 'panel3'}
					onChange={handleChange('panel3')}
				>
					<CustomAccordionSummary
						expandIcon={
							<div className='text-2xl font-bold text-orange-500'>+</div>
						}
						aria-controls='panel3a-content'
						id='panel3a-header'
					>
						<Typography>
							<h6 className='font-bold text-xl'>Elige la fecha</h6>
						</Typography>
					</CustomAccordionSummary>
					<AccordionDetails>
						<Typography>
							Una vez elegido el profesional, selecciona el día y la <br></br>{' '}
							hora disponible en la que desea concurrir.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={expanded === 'panel4'}
					onChange={handleChange('panel4')}
				>
					<CustomAccordionSummary
						expandIcon={
							<div className='text-2xl font-bold text-orange-500'>+</div>
						}
						aria-controls='panel4a-content'
						id='panel4a-header'
					>
						<Typography>
							<h6 className='font-bold text-xl'>Confirma la reserva</h6>
						</Typography>
					</CustomAccordionSummary>
					<AccordionDetails>
						<Typography>
							Ya para finalizar, corrobora y confirma el turno
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
			{/* 	<div className='hidden md:block md:w-1/2 bg-gray-400 h-[510px]' /> */}
		</div>
	)
}
