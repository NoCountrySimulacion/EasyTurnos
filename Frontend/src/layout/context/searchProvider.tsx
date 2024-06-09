/* eslint-disable indent */
import { createContext, useState } from 'react'
import {
	AllProfessionals,
	AppointmentList,
	ProfessionalClients
} from '../../services/typescript/interface'
import { SearchValueProps } from '../typescript/interface'

export const searchContext = createContext<SearchValueProps | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState<FormDataEntryValue | null>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { search } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		)
		setQuery(search)
	}

	const filterProfessionalAppointments = (
		valueToFilter: AppointmentList
	): AppointmentList => {
		const newValueToFilter = {
			...valueToFilter,
			data: valueToFilter.data.filter(value => {
				if (typeof query === 'string') {
					return value.name === ''
						? value.firstName + ' ' + value.lastName
						: value.name
				}
			})
		}

		return query === null
			? newValueToFilter
			: {
					...newValueToFilter,
					data: newValueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.name
								.toLowerCase()
								.includes(query?.toLowerCase() || '')
						}
					})
				}
	}

	const filterClients = (
		valueToFilter: ProfessionalClients
	): ProfessionalClients => {
		return query === null
			? valueToFilter
			: {
					...valueToFilter,
					data: valueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.firstName
								.toLowerCase()
								.includes(query?.toLowerCase() || '')
						}
					})
				}
	}

	const filterClientAppointments = (valueToFilter: AllProfessionals) => {
		const newValueToFilter = {
			...valueToFilter,
			data: valueToFilter.data.filter(value => {
				if (typeof query === 'string') {
					return value.firstName + ' ' + value.lastName
				}
			})
		}
		return query === null
			? newValueToFilter
			: {
					...newValueToFilter,
					data: newValueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.firstName
								.toLowerCase()
								.includes(query?.toLowerCase() || '')
						}
					})
				}
	}

	const filterProfessionals = (valueToFilter: AllProfessionals) => {
		return query === null
			? valueToFilter
			: {
					...valueToFilter,
					data: valueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.firstName
								.toLowerCase()
								.includes(query?.toLowerCase() || '')
						}
					})
				}
	}

	return (
		<searchContext.Provider
			value={{
				query,
				handleSubmit,
				filterProfessionalAppointments,
				filterClients,
				filterClientAppointments,
				filterProfessionals
			}}
		>
			{children}
		</searchContext.Provider>
	)
}
