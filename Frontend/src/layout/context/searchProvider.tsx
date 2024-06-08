import { createContext, useState } from 'react'

interface SearchValueProps {
	query: FormDataEntryValue | null
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	filterResults: (query: string) => string
}

export const searchContext = createContext<SearchValueProps | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState<FormDataEntryValue | null>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { search } = Object.fromEntries(
			new FormData(e.target as HTMLFormElement)
		)
		console.log(search)
		setQuery(search)
	}

	const filterResults = (query: string) => {
		return query === null
			? query
			: query.filter(value => {
					if (typeof query === 'string') {
						return value.name.toLowerCase().includes(query?.toLowerCase() || '')
					}
				})
	}

	return (
		<searchContext.Provider value={{ query, handleSubmit, filterResults }}>
			{children}
		</searchContext.Provider>
	)
}
