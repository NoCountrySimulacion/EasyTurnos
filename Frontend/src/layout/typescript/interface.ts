import {
	ClientAppointmentList,
	ClientsByProfessional,
	ProfessionalAppointmentList,
	ProfessionalsByClient
} from '../../services/typescript/interface'

export interface NavButtonProps {
	text: string
	onClick?: () => void
}

export interface SearchValueProps {
	query: FormDataEntryValue | null
	setQuery: React.Dispatch<React.SetStateAction<FormDataEntryValue | null>>
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	filterClientsAppointmentsList: (
		valueToFilter: ClientAppointmentList
	) => ClientAppointmentList
	filterClients: (valueToFilter: ClientsByProfessional) => ClientsByProfessional
	filterProfessionalsAppointmentsList: (
		valueToFiler: ProfessionalAppointmentList
	) => ProfessionalAppointmentList
	filterProfessionals: (
		valueToFilter: ProfessionalsByClient
	) => ProfessionalsByClient
}
