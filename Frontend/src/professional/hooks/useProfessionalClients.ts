import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { ClientsByProfessional } from '../../services/typescript/interface'
import { getClientsByProfessional } from '../../services/api/professionalClient'
import { useSearch } from '../../layout/hooks/useSearch'

export const useProfessionalClients = () => {
	const { decodedToken } = useAuth()

	const [professionalClients, setProfessionalClients] =
		useState<ClientsByProfessional | null>(null)
	const { setQuery } = useSearch()

	useEffect(() => {
		if (!decodedToken) return
		getClientsByProfessional(decodedToken).then(data =>
			setProfessionalClients(data)
		)
		return setQuery(null)
	}, [decodedToken])

	const isThereProfessionalClients = professionalClients?.data.length

	return { professionalClients, isThereProfessionalClients }
}
