declare namespace JSX {
	interface IntrinsicElements {
		'md-outlined-text-field': React.HTMLAttributes<HTMLInputElement> & {
			label?: string
			id?: string
			type?: string
			name?: string
			class?: string
			required?: boolean
			style?: string
			value?: string
		}
	}
}
