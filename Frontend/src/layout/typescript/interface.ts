import {
	AllProfessionals,
	AppointmentList,
	ProfessionalClients
} from '../../services/typescript/interface'

export interface NavButtonProps {
	text: string
	onClick?: () => void
}

export interface SearchValueProps {
	query: FormDataEntryValue | null
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	filterProfessionalAppointments: (
		valueToFilter: AppointmentList
	) => AppointmentList
	filterClients: (valueToFilter: ProfessionalClients) => ProfessionalClients
	filterClientAppointments: (valueToFiler: AppointmentList) => AppointmentList
	filterProfessionals: (valueToFilter: AllProfessionals) => AllProfessionals
}
