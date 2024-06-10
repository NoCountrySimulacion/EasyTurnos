import { useAuth } from '../../auth/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getProfessionalAppointments } from '../../services/api/appointment'
import {
	ClientAppointmentList,
	ProfessionalAppointmentList
} from '../../services/typescript/interface'

type AppointmentList = ClientAppointmentList | ProfessionalAppointmentList

export const useAppointments = () => {
	const { decodedToken } = useAuth()

	const [appointmentList, setAppointmentList] =
		useState<AppointmentList | null>(null)

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalAppointments(decodedToken).then(data =>
			setAppointmentList(data)
		)
	}, [decodedToken])

	const isThereAppointments = appointmentList?.data?.length ?? 0

	return { appointmentList, isThereAppointments }
}
