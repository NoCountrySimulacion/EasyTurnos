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
import { useMediaQuery } from '../../shared/hooks/useMediaQuery'
import { NavLink } from 'react-router-dom'
import { AddClientIcon, CalendarIcon } from '../components/icons/Icons'
import { useAuth } from '../../auth/hooks/useAuth'

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
	const { decodedToken } = useAuth()

	const filteredProfessionalClients = professionalClients?.data.length
		? filterClients(professionalClients)
		: professionalClients

	const isSmallScreen = useMediaQuery('(max-width: 764px)')
	return (
		<section className='w-full flex flex-col font-montserrat gap-10 px-10 max-sm:px-5 mb-[50px] relative'>
			<section>
				{loading ? (
					<div className='w-fullflex justify-center items-center'>
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
			{isSmallScreen && (
				<NavLink
					to={
						decodedToken?.role === 'Professional'
							? '/professional/add-client'
							: '/client/calendar'
					}
					className='bg-[#7445C7] w-[166px] mx-auto text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] px-2 rounded-lg text-[13px] font-bold '
				>
					{decodedToken?.role === 'Professional' ? (
						<AddClientIcon height={24} width={22} />
					) : (
						<CalendarIcon height={24} width={22} />
					)}
					<span>
						{decodedToken?.role === 'Professional'
							? 'Agregar cliente'
							: 'Agendar turno'}
					</span>
				</NavLink>
			)}
		</section>
	)
}
