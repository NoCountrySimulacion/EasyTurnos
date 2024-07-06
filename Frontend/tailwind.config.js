/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				baloo: ['"Baloo Chettan 2"', 'sans-serif']
			},
			boxShadow: {
				search: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
			},
			gridTemplateColumns: {
				responsive: 'repeat(auto-fill, minmax(150px, 1fr))'
			}
		}
	},
	plugins: []
}
