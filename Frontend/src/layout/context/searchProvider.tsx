/* eslint-disable indent */
import { createContext, useState } from 'react'
import {
	ClientAppointmentList,
	ClientsByProfessional,
	ProfessionalAppointmentList,
	ProfessionalsByClient
	ClientAppointmentList,
	ClientsByProfessional,
	ProfessionalAppointmentList,
	ProfessionalsByClient
} from '../../services/typescript/interface'
import { SearchValueProps } from '../typescript/interface'

export const searchContext = createContext<SearchValueProps>(
	{} as SearchValueProps
)
export const searchContext = createContext<SearchValueProps>(
	{} as SearchValueProps
)

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState<FormDataEntryValue | null>(null)
	const [query, setQuery] = useState<FormDataEntryValue | null>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { search } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		)
		setQuery(search)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { search } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		)
		setQuery(search)
	}

	const filterClientsAppointmentsList = (
		valueToFilter: ClientAppointmentList
	): ClientAppointmentList => {
		if (!valueToFilter?.data) {
			return valueToFilter
		}
	const filterClientsAppointmentsList = (
		valueToFilter: ClientAppointmentList
	): ClientAppointmentList => {
		if (!valueToFilter?.data) {
			return valueToFilter
		}

		const newValueToFilter = {
			...valueToFilter,
			data: valueToFilter.data.filter(value => {
				if (typeof query === 'string') {
					return value.name === ''
						? `${value.firstName} ${value.lastName}`
						: value.name
				}
				return false
			})
		}

		return query === null
			? newValueToFilter
			: {
					...newValueToFilter,
					data: newValueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.name.toLowerCase().includes(query.toLowerCase())
						}
						return false
					})
				}
	}

	const filterClients = (
		valueToFilter: ClientsByProfessional
	): ClientsByProfessional => {
		if (!valueToFilter?.data?.length) {
			return valueToFilter
		}

		return !query || query === '' || query === ' '
			? valueToFilter
			: {
					...valueToFilter,
					data: valueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.firstName.toLowerCase().includes(query.toLowerCase())
						}
						return false
					})
				}
	}

	const filterProfessionalsAppointmentsList = (
		valueToFilter: ProfessionalAppointmentList
	): ProfessionalAppointmentList => {
		if (!valueToFilter?.data) {
			return valueToFilter
		}
	const filterProfessionalsAppointmentsList = (
		valueToFilter: ProfessionalAppointmentList
	): ProfessionalAppointmentList => {
		if (!valueToFilter?.data) {
			return valueToFilter
		}

		const newValueToFilter = {
			...valueToFilter,
			data: valueToFilter.data.filter(value => {
				if (typeof query === 'string') {
					return `${value.firstName} ${value.lastName}`
				}
				return false
			})
		}

		return query === null
			? newValueToFilter
			: {
					...newValueToFilter,
					data: newValueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.firstName.toLowerCase().includes(query.toLowerCase())
						}
						return false
					})
				}
	}

	const filterProfessionals = (
		valueToFilter: ProfessionalsByClient
	): ProfessionalsByClient => {
		if (!valueToFilter?.data?.length) {
			return valueToFilter
		}

		return !query || query === '' || query === ' '
			? valueToFilter
			: {
					...valueToFilter,
					data: valueToFilter.data.filter(value => {
						if (typeof query === 'string') {
							return value.firstName.toLowerCase().includes(query.toLowerCase())
						}
						return false
					})
				}
	}

	return (
		<searchContext.Provider
			value={{
				query,
				setQuery,
				handleSubmit,
				filterClientsAppointmentsList,
				filterClients,
				filterProfessionalsAppointmentsList,
				filterProfessionals
			}}
		>
			{children}
		</searchContext.Provider>
	)
	return (
		<searchContext.Provider
			value={{
				query,
				setQuery,
				handleSubmit,
				filterClientsAppointmentsList,
				filterClients,
				filterProfessionalsAppointmentsList,
				filterProfessionals
			}}
		>
			{children}
		</searchContext.Provider>
	)
}
