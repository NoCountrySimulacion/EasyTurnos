/* eslint-disable indent */
import { createContext, useState } from 'react'
import {
	ClientAppointmentList,
	ClientsByProfessional,
	ProfessionalAppointmentList,
	ProfessionalsByClient
} from '../../services/typescript/interface'
import { SearchValueProps } from '../typescript/interface'

export const searchContext = createContext<SearchValueProps>(
	{} as SearchValueProps
)

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState<FormDataEntryValue | null>(null)
	const [todayAppointmentsCount, setTodayAppointmentsCount] =
		useState<number>(0)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { search } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		)
		setQuery(search)
	}

	function capitalizeFirstLetter(string: string | undefined): string {
		if (typeof string !== 'string') return ''
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
	}

	const filterClientsAppointmentsList = (
		valueToFilter: ClientAppointmentList
	): ClientAppointmentList => {
		if (!valueToFilter?.data) {
			return valueToFilter
		}

		const today = new Date()
		today.setHours(0, 0, 0, 0)

		const isSameDay = (dateString: string) => {
			const date = new Date(dateString)
			date.setHours(0, 0, 0, 0)
			return date.getTime() === today.getTime()
		}

		const filteredData = valueToFilter.data.filter(value => {
			const matchesDate = isSameDay(value.startDate) || isSameDay(value.endDate)

			if (typeof query === 'string') {
				const nameToCheck =
					value.name === ''
						? `${capitalizeFirstLetter(value.firstName)}{' '} ${capitalizeFirstLetter(value.lastName)}`
						: value.name
				return (
					matchesDate && nameToCheck.toLowerCase().includes(query.toLowerCase())
				)
			}

			return matchesDate
		})

		const filteredList = {
			...valueToFilter,
			data: filteredData
		}
		console.log('FilterData: ,', filteredData.length)

		setTodayAppointmentsCount(filteredData.length)

		return filteredList
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
				todayAppointmentsCount,
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
