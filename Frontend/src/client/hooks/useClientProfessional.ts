import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { ProfessionalsByClient } from '../../services/typescript/interface'
import { getProfessionalByClient } from '../../services/api/professional'
import { useSearch } from '../../layout/hooks/useSearch'

export const useClientProfessional = () => {
	const { decodedToken } = useAuth()
	const { setQuery } = useSearch()

	const [clientProfessional, setClientProfessional] =
		useState<ProfessionalsByClient | null>(null)

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalByClient(decodedToken).then(data =>
			setClientProfessional(data)
		)
		return setQuery(null)
	}, [decodedToken])

	const isThereClientProfessional = clientProfessional?.data.length

	return { clientProfessional, isThereClientProfessional }
}
