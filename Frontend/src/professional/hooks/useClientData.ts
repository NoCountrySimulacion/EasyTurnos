import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { getClientData } from '../../services/api/professional'
import { ClientData } from '../../services/typescript/interface'
import { useClientProfessional } from '../../client/hooks/useClientProfessional'
import { useSearch } from '../../layout/hooks/useSearch'

export const useClientData = (clientId: string, token: string) => {
	const [clientData, setClientData] = useState<ClientData | null>(null)
	const { filterProfessionals } = useSearch()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { user, decodedToken } = useAuth()
	const { clientProfessional } = useClientProfessional()
	const filteredProfessionals = clientProfessional?.data.length
		? filterProfessionals(clientProfessional)
		: clientProfessional

	useEffect(() => {
		const fetchClientData = async () => {
			try {
				const promises = (filteredProfessionals?.data ?? []).map(async row => {
					if (!row) return null // Si `row` es undefined, retorna null
					return await getClientData(user?.token, clientId, row.id)
				})

				// Espera a que todas las promesas se resuelvan
				const data = await Promise.all(promises)

				console.log('Los datos que me trae useClientData: ', data)
				setClientData(data[0])
			} catch (error) {
				setError((error as Error).message)
			} finally {
				setLoading(false)
			}
		}

		fetchClientData()
	}, [
		clientId,
		token,
		decodedToken?.professionalId,
		filteredProfessionals?.data,
		user?.token
	])

	return { clientData, loading, error }
}
