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
import { useSearch } from '../../layout/hooks/useSearch'
import { ClientButton } from '../components/ClientButton'
import { LoadingIcon } from '../../shared/components/Icons'
import { ClientsByProfessional } from '../../services/typescript/interface'
import { useProfessionalClients } from '../hooks/useProfessionalClients'

function TableClient({
	filteredProfessionalClients
}: {
	filteredProfessionalClients: ClientsByProfessional | null
}) {
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
			{filteredProfessionalClients?.data.length ? (
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
								{filteredProfessionalClients?.data.map((row, index) => (
									<CustomTableRow
										key={index}
										className={index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-white'}
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
												<UnsubscribeButton clientId={row.id} />
											</div>
										</CustomTableCell>
									</CustomTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			) : (
				<section className='flex justify-center'>
					<h1 className='text-4xl font-montserrat'>Sin resultados</h1>
				</section>
			)}
		</>
	)
}

export default function Clients() {
	const { professionalClients, isThereProfessionalClients, loading } =
		useProfessionalClients()
	const { filterClients } = useSearch()

	const filteredProfessionalClients = professionalClients?.data.length
		? filterClients(professionalClients)
		: professionalClients

	return (
		<section className='h-full w-full flex flex-col font-montserrat px-10 gap-6'>
			<section className='mb-[100px]'>
				{loading ? (
					<div className='w-full flex justify-center'>
						<LoadingIcon />
					</div>
				) : isThereProfessionalClients ? (
					<TableClient
						filteredProfessionalClients={filteredProfessionalClients}
					/>
				) : (
					<section className='flex justify-center'>
						<h1 className='text-4xl font-montserrat'>Aún no tienes clientes</h1>
					</section>
				)}
			</section>
		</section>
	)
}
