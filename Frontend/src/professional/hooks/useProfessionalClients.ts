import { useEffect, useState } from 'react'
import { ProfessionalClients } from '../../services/typescript/interface'
import { useAuth } from '../../auth/hooks/useAuth'
import { getProfessionalClients } from '../../services/api/professionalClient'

export const useProfessionalClients = () => {
	const { decodedToken } = useAuth()

	const [professionalClients, setProfessionalClients] =
		useState<ProfessionalClients | null>(null)

	useEffect(() => {
		if (!decodedToken) return
		getProfessionalClients(decodedToken).then(data =>
			setProfessionalClients(data)
		)
	}, [])

	const isThereProfessionalClients = professionalClients?.data.length

	return { professionalClients, isThereProfessionalClients }
}
