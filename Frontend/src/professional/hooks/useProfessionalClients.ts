import { useEffect, useState } from 'react'
import { ProfessionalClients } from '../../services/typescript/interface'
import { useAuth } from '../../auth/hooks/useAuth'
import { getProfessionalClients } from '../../services/api/professionalClient'

export const useProfessionalClients = () => {
	const [professionalClients, setProfessionalClients] =
		useState<ProfessionalClients | null>(null)
	const { decodedToken } = useAuth()

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalClients(decodedToken).then(data =>
			setProfessionalClients(data)
		)
	}, [])

	const isThereProfessionalClients = professionalClients?.data.length

	return { professionalClients, isThereProfessionalClients }
}
