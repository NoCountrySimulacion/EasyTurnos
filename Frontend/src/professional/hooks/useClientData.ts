import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { getClientData } from '../../services/api/professional'
import { ClientData } from '../../services/typescript/interface'

export const useClientData = (clientId: string, token: string) => {
	const [clientData, setClientData] = useState<ClientData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { user, decodedToken } = useAuth()

	useEffect(() => {
		const fetchClientData = async () => {
			try {
				const data = await getClientData(user?.token,clientId, decodedToken?.professionalId)
				console.log('LOs datos que me trae useClientData: ', data)
				setClientData(data)
			} catch (error) {
				setError((error as Error).message)
			} finally {
				setLoading(false)
			}
		}

		fetchClientData()
	}, [clientId, token, decodedToken?.professionalId])

	return { clientData, loading, error }
}
