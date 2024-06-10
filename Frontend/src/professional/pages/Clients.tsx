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
import { useProfessionalClients } from '../hooks/useProfessionalClients'
import { ClientButton } from '../components/ClientButton'
function TableClient() {
	const { professionalClients, isThereProfessionalClients } =
		useProfessionalClients()
	console.log(professionalClients)

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
			{isThereProfessionalClients ? (
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
								{professionalClients?.data.map((row, index) => (
									<CustomTableRow
										key={index}
										className={index % 2 == 0 ? 'bg-[#F7F6FE]' : 'bg-white'}
									>
										<CustomTableCell className='w-[15%]'>
											<span>{row.firstName}</span>
										</CustomTableCell>

										<CustomTableCell className='w-[15%]'>
											<span>{row.lastName}</span>
										</CustomTableCell>
										<CustomTableCellTel className='w-[30%]'>
											<span>{row.phoneNumber}</span>
										</CustomTableCellTel>
										<CustomTableCell align='right'>
											<div className='flex gap-[20.75px] justify-start'>
												<ScheduleAppointmentButton />
												<ClientButton clientId={row.id} />
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
					<h1 className='text-4xl font-montserrat'>Aún no tienes clientes</h1>
				</section>
			)}
		</>
	)
}

export default function Clients() {
	return (
		<section className='h-full w-full flex flex-col font-montserrat px-10 gap-6 '>
			<section className='mb-[100px]'>
				<TableClient />
			</section>
		</section>
	)
}
