import * as Yup from 'yup'

const lowerCaseRegex = /[a-z]/g
const upperCaseRegex = /[A-Z]/g
const noSpaceAtStartRegex = /^\S/g
const noSpaceEndingRegex = /\S$/g
const noSpacesRegex = /^\S*$/g
const numberRegex = /[0-9]/g
const noNumberRegex = /^\D*$/g
const specialCharacterRegex = /[!@#$%^&_*-]/g
const noSpecialCharacterRegex = /^[a-zA-ZáéíóúñÑ\s0-9]*$/g
const phoneRegex = /^\d{10}$/

export const initialValues = {
	userName: '',
	userLastName: '',
	userEmail: '',
	userPhoneNumber: '',
	userPassword: '',
	userPasswordConfirm: ''
}

export const registerSchema = Yup.object({
	userName: Yup.string()
		.required('Requerido')
		.max(30, 'Máximo 30 caracteres')
		.matches(noSpaceAtStartRegex, 'El nombre no puede comenzar con un espacio')
		.matches(noSpaceEndingRegex, 'El nombre no puede terminar con un espacio')
		.matches(noSpecialCharacterRegex, 'No se admiten caracteres especiales')
		.matches(noNumberRegex, 'No se admiten números')
		.min(3, 'Mínimo 3 caracteres'),

	userLastName: Yup.string()
		.required('Requerido')
		.max(30, 'Máximo 30 caracteres')
		.matches(noSpaceAtStartRegex, 'No puede comenzar con un espacio')
		.matches(noSpaceEndingRegex, 'No puede terminar con un espacio')
		.matches(noSpecialCharacterRegex, 'No se admiten caracteres especiales')
		.matches(noNumberRegex, 'No se admiten números')
		.min(2, 'Mínimo 2 caracteres'),

	userEmail: Yup.string()
		.required('Requerido')
		.email('El formato no coincide con un email')
		.matches(noSpaceAtStartRegex, 'No puede comenzar con un espacio')
		.matches(noSpaceEndingRegex, 'No puede terminar con un espacio')
		.max(30, 'Máximo 40 caracteres'),

	userPhoneNumber: Yup.string()
		.required('Requerido')
		.matches(phoneRegex, '10 dígitos')
		.matches(noSpaceAtStartRegex, 'No puede comenzar con un espacio')
		.matches(noSpaceEndingRegex, 'No puede terminar con un espacio'),

	userPassword: Yup.string()
		.required('Requerido')
		.matches(noSpacesRegex, 'No se admiten espacios')
		.matches(
			lowerCaseRegex,
			'La contraseña debe tener al menos una letra minúscula'
		)
		.matches(
			upperCaseRegex,
			'La contraseña debe tener al menos una letra mayúscula'
		)
		.matches(numberRegex, 'La contraseña debe tener al menos un número')
		.matches(
			specialCharacterRegex,
			'La contraseña debe tener al menos un carácter especial'
		)
		.min(8, 'Mínimo 8 caracteres'),

	userPasswordConfirm: Yup.string()
		.required('Requerido')
		.oneOf(
			[Yup.ref('userPassword')],
			'La contraseña no corresponde con la anterior'
		)
})
