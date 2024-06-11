import { useState, useEffect } from 'react'
import {  DecodedToken, ProfessionalData } from '../../auth/typescript/interface'
import { getProfessionalData } from '../../services/api/professional'
// Asegúrate de actualizar el import con la ruta correcta

export function useProfessionalData(decodedToken: DecodedToken) {
	const [professionalData, setProfessionalData] =
		useState<ProfessionalData | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProfessionalData = async () => {
			try {
				setLoading(true)
				const data = await getProfessionalData(decodedToken)
				setProfessionalData(data.data)
				setError(null)
			} catch (error) {
				setError((error as Error).message)
				setProfessionalData(null)
			} finally {
				setLoading(false)
			}
		}

		fetchProfessionalData()
	}, [decodedToken])

	return { professionalData, loading, error }
}
