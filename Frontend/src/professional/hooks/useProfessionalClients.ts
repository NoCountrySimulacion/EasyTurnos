import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { ClientsByProfessional } from '../../services/typescript/interface'
import { getClientsByProfessional } from '../../services/api/professionalClient'
import { useSearch } from '../../layout/hooks/useSearch'

export const useProfessionalClients = () => {
	const { decodedToken } = useAuth()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [professionalClients, setProfessionalClients] =
		useState<ClientsByProfessional | null>(null)
	const { setQuery } = useSearch()

	useEffect(() => {
		const fetchProfessionalClients = async () => {
			setLoading(true)
			try {
				if (!decodedToken) return
				const data = await getClientsByProfessional(decodedToken)
				setProfessionalClients(data)
				setError(null)
			} catch (error) {
				setError((error as Error).message)
				console.log('Getting professional clients error:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchProfessionalClients()
		setQuery('')
	}, [decodedToken, setQuery])

	const isThereProfessionalClients = professionalClients?.data.length

	return { professionalClients, isThereProfessionalClients, loading, error }
}
