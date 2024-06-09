import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'
import { styled } from '@mui/system'

import { Link } from 'react-router-dom'
import { ScheduleAppointmentButton } from '../../professional/components/ScheduleAppointmentButton'
import { UnsubscribeButton } from '../../professional/components/UnsubscribeButton'
import { professionalsMock } from '../mocks/professionalsMock'

function TableClient() {
	const CustomTableCell = styled(TableCell)({
		borderBottom: 'none',
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 'medium'
	})

	const CustomTableCellTel = styled(TableCell)({
		borderBottom: 'none',
		fontFamily: 'Montserrat, sans-serif',
		fontWeight: 'medium'
	})

	const CustomTableCellHeader = styled(TableCell)({
		borderBottom: 'none',
		fontFamily: 'Montserrat, sans-serif',
		fontWeight: 'bold'
	})

	const CustomTableRow = styled(TableRow)({
		'&:last-child td, &:last-child th': { border: 0 }
	})

	return (
		<Paper elevation={0}>
			<TableContainer>
				<Table>
					<TableHead>
						<CustomTableRow>
							<CustomTableCellHeader>
								Nombre del profesional
							</CustomTableCellHeader>
							<CustomTableCellHeader>Especialidad</CustomTableCellHeader>
							<CustomTableCellHeader>Teléfono</CustomTableCellHeader>
							<CustomTableCellHeader>Acciones</CustomTableCellHeader>
						</CustomTableRow>
					</TableHead>
					<TableBody>
						{professionalsMock.map((row, index) => (
							<CustomTableRow
								key={index}
								className={index % 2 == 0 ? 'bg-[#F7F6FE]' : 'bg-white'}
							>
								<CustomTableCell className='w-[25%]'>
									<Link to={row.to}>
										{row.name} {row.lastName}
									</Link>
								</CustomTableCell>

								<CustomTableCell className='w-[20%]'>
									<Link to={row.to}>{row.specialty}</Link>
								</CustomTableCell>
								<CustomTableCellTel className='w-[25%]'>
									<Link to={row.to}>{row.tel}</Link>
								</CustomTableCellTel>
								<CustomTableCell align='right'>
									<div className='flex gap-[20.75px] justify-start'>
										<ScheduleAppointmentButton />
										<UnsubscribeButton />
									</div>
								</CustomTableCell>
							</CustomTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default function Professionals() {
	return (
		<section className='h-full w-full flex flex-col font-montserrat px-10 gap-6 '>
			<section className='mb-[100px]'>
				<TableClient />
			</section>
		</section>
	)
}
