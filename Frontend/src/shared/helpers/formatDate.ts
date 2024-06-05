export function formatDate(date: Date, format: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: format.includes('YYYY') ? 'numeric' : undefined,
		month: format.includes('MM') ? '2-digit' : undefined,
		day: format.includes('DD') ? '2-digit' : undefined
	}

	return new Intl.DateTimeFormat('en-US', options).format(date)
}
