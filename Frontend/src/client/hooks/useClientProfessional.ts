import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { ProfessionalsByClient } from '../../services/typescript/interface'
import { getProfessionalByClient } from '../../services/api/professional'
import { useSearch } from '../../layout/hooks/useSearch'

export const useClientProfessional = () => {
	const { decodedToken } = useAuth()
	const { setQuery } = useSearch()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [clientProfessional, setClientProfessional] =
		useState<ProfessionalsByClient | null>(null)

	useEffect(() => {
		const fetchClientProfessional = async () => {
			try {
				setLoading(true)
				setError(null)
				if (!decodedToken) return
				getProfessionalByClient(decodedToken).then(data =>
					setClientProfessional(data)
				)
			} catch (error) {
				setError((error as Error).message)
				console.log('Getting professional by client error:', error)
			}
		}
		fetchClientProfessional
		return setQuery('')
	}, [decodedToken])

	const isThereClientProfessional = clientProfessional?.data.length

	return { clientProfessional, isThereClientProfessional, loading, error }
}
