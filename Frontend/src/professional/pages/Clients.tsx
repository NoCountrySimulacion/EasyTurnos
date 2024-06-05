import { Search } from '../components/Search'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'
import { ScheduleAppointmentButton } from '../components/ScheduleAppointmentButton'
import { UnsubscribeButton } from '../components/UnsubscribeButton'
import { styled } from '@mui/system'
import { rowsMock } from '../mocks/rowsMock'

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
							<CustomTableCellHeader>Nombre</CustomTableCellHeader>
							<CustomTableCellHeader>Apellido</CustomTableCellHeader>
							<CustomTableCellHeader>Teléfono</CustomTableCellHeader>
							<CustomTableCellHeader>Acciones</CustomTableCellHeader>
						</CustomTableRow>
					</TableHead>
					<TableBody>
						{rowsMock
							// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => (
								<CustomTableRow
									key={index}
									className={index % 2 == 0 ? 'bg-[#F7F6FE]' : 'bg-white'}
								>
									<CustomTableCell className='w-[15%]'>
										{row.name}
									</CustomTableCell>
									<CustomTableCell className='w-[15%]'>
										{row.lastName}
									</CustomTableCell>
									<CustomTableCellTel className='w-[40%]'>
										{row.tel}
									</CustomTableCellTel>
									<CustomTableCell align='right'>
										<div className='flex gap-[16.75px] justify-start'>
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

export default function Clients() {
	return (
		<section className='h-full w-full flex flex-col font-montserrat px-10 gap-6 '>
			<Search />
			<section className='mb-[100px]'>
				<TableClient />
			</section>
		</section>
	)
}
