import { useAuth } from '../../auth/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getProfessionalAppointments } from '../../services/api/appointment'
import { AppointmentList } from '../../services/typescript/interface'

export const useAppointments = () => {
	const { decodedToken } = useAuth()

	const [appointmentList, setAppointmentList] =
		useState<AppointmentList | null>(null)

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalAppointments(decodedToken).then(data =>
			setAppointmentList(data)
		)
	}, [])

	const isThereAppointments = appointmentList?.data.length

	return { appointmentList, isThereAppointments }
}
