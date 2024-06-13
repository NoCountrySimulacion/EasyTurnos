import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button
} from '@mui/material'
import { styled } from '@mui/system'
import { LoadingIcon } from '../../shared/components/Icons'
import { Appointment } from '../../services/typescript/interface'
import { useAppointments } from '../../shared/hooks/useAppointments'
import { FaTrashAlt } from 'react-icons/fa'

function TableClient({ appointments }: { appointments: Appointment[] | null }) {
	const CustomTableCell = styled(TableCell)({
		borderBottom: 'none',
		fontFamily: 'Roboto, sans-serif',
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

	function formatTime(dateTime: string): string {
		const options: Intl.DateTimeFormatOptions = {
			hour: '2-digit',
			minute: '2-digit'
		}
		return new Date(dateTime).toLocaleTimeString('es-ES', options)
	}

	function formatDate(dateTime: string): string {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}
		return new Date(dateTime).toLocaleDateString('es-ES', options)
	}

	function capitalizeFirstLetter(string: string): string {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
	}

	return (
		<>
			{appointments?.length ? (
				<Paper elevation={0}>
					<TableContainer>
						<Table>
							<TableHead>
								<CustomTableRow>
									<CustomTableCellHeader className='whitespace-nowrap'>
										Nombre del profesional
									</CustomTableCellHeader>
									<CustomTableCellHeader>
										Hora de Inicio y Fin
									</CustomTableCellHeader>
									<CustomTableCellHeader>Día, Mes y Año</CustomTableCellHeader>
									<CustomTableCellHeader></CustomTableCellHeader>
								</CustomTableRow>
							</TableHead>
							<TableBody>
								{appointments.map((appointment, index) => (
									<CustomTableRow
										key={index}
										className={index % 2 === 0 ? 'bg-[#F7F6FE]' : 'bg-white'}
									>
										<CustomTableCell className='w-[25%]'>
											{capitalizeFirstLetter(appointment.firstName)}{' '}
											{capitalizeFirstLetter(appointment.lastName)}
										</CustomTableCell>
										<CustomTableCell className='w-[25%]'>
											{formatTime(appointment.startDate)} -{' '}
											{formatTime(appointment.endDate)}
										</CustomTableCell>
										<CustomTableCell className='w-[25%]'>
											{formatDate(appointment.startDate)}
										</CustomTableCell>
										<CustomTableCell className='w-[25%]' align='right'>
											<Button
												variant='contained'
												color='secondary'
												onClick={() =>
													console.log('Delete appointment', appointment.id)
												}
											>
												<FaTrashAlt />
											</Button>
										</CustomTableCell>
									</CustomTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			) : (
				<section className='flex justify-center '>
					<h1 className='text-4xl font-montserrat'>Sin resultados</h1>
				</section>
			)}
		</>
	)
}

export function Appointments() {
	const { appointmentList, loading } = useAppointments()

	return (
		<section className='h-full w-full flex flex-col font-montserrat px-10 gap-6 '>
			<section className='mb-[100px]'>
				{loading ? (
					<div className='flex justify-center'>
						<LoadingIcon />
					</div>
				) : appointmentList?.data?.length ? (
					<TableClient appointments={appointmentList.data} />
				) : (
					<section className='flex justify-center '>
						<h1 className='text-4xl font-montserrat'>Aún no tienes citas</h1>
					</section>
				)}
			</section>
		</section>
	)
}
