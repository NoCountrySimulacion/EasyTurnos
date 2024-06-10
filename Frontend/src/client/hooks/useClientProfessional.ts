import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { ProfessionalsByClient } from '../../services/typescript/interface'
import { getProfessionalByClient } from '../../services/api/professional'

export const useClientProfessional = () => {
	const { decodedToken } = useAuth()

	const [clientProfessional, setClientProfessional] =
		useState<ProfessionalsByClient | null>(null)

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalByClient(decodedToken).then(data =>
			setClientProfessional(data)
		)
	}, [decodedToken])

	const isThereClientProfessional = clientProfessional?.data.length

	return { clientProfessional, isThereClientProfessional }
}
