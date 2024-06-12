import { useAuth } from '../../auth/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getProfessionalAppointments } from '../../services/api/appointment'
import {
	ClientAppointmentList,
	ProfessionalAppointmentList
} from '../../services/typescript/interface'
import { useSearch } from '../../layout/hooks/useSearch'

type AppointmentList = ClientAppointmentList | ProfessionalAppointmentList

export const useAppointments = () => {
	const { decodedToken } = useAuth()
	const { setQuery } = useSearch()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [appointmentList, setAppointmentList] =
		useState<AppointmentList | null>(null)

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				setLoading(true)
				if (!decodedToken) return
				const data = await getProfessionalAppointments(decodedToken)
				setAppointmentList(data)
				setError(null)
			} catch (error) {
				setError((error as Error).message)
				console.log('Getting appointments error:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchAppointments()
		return setQuery('')
	}, [decodedToken])

	const isThereAppointments = appointmentList?.data?.length ?? 0

	return { appointmentList, isThereAppointments, loading, error }
}
