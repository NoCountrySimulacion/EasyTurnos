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

import { ScheduleAppointmentButton } from '../../professional/components/ScheduleAppointmentButton'
import { UnsubscribeButton } from '../../professional/components/UnsubscribeButton'
import { useSearch } from '../../layout/hooks/useSearch'
import { useClientProfessional } from '../hooks/useClientProfessional'

function TableClient() {
	const { filterProfessionals } = useSearch()
	const { clientProfessional, isThereClientProfessional } =
		useClientProfessional()

	// console.log(
	// 	'Estos son los profesionales que llegan del fetch: ',
	// 	clientProfessional
	// )
	const filteredProfessionals = clientProfessional?.data.length
		? filterProfessionals(clientProfessional)
		: clientProfessional

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
		<>
			{isThereClientProfessional ? (
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
								{filteredProfessionals?.data.map((row, index) => (
									<CustomTableRow
										key={index}
										className={index % 2 == 0 ? 'bg-[#F7F6FE]' : 'bg-white'}
									>
										<CustomTableCell className='w-[25%]'>
											{row.firstName} {row.lastName}
										</CustomTableCell>

										<CustomTableCell className='w-[20%]'>
											{row.specialty}
										</CustomTableCell>
										<CustomTableCellTel className='w-[25%]'>
											{row.phoneNumber}
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
			) : (
				<section className='flex justify-center '>
					<h1 className='text-4xl font-montserrat'>
						Aún no tienes profesionales
					</h1>
				</section>
			)}
		</>
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
