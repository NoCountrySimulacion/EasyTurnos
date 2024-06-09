/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'
import { getAllSlots } from '../../services/api/slots'
import { ConfigSlot } from '../typescript/interface'
import mockAppointments, { Appointment } from '../mocks/appoinmet'

const useCalendarLogic = () => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay] = useState<Moment | null>(null)
	const [slots, setSlots] = useState<ConfigSlot[]>([])
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
		useState<Appointment[]>([])

	useEffect(() => {
		const fetchSlots = async () => {
			try {
				const slotsResponse = await getAllSlots()
				setSlots(slotsResponse)
			} catch (error) {
				console.error('Error fetching slots:', error)
			}
		}

		fetchSlots()
	}, [])

	const handleDateChange = (date: Moment | null) => {
		setSelectedDate(date)
	}

	useEffect(() => {
		if (selectedDate && slots.length > 0) {
			const selectedDaySlots = slots.filter(slot =>
				moment(slot.startDate).isSame(selectedDate, 'day')
			)
			setSelectedSlots(selectedDaySlots)
			setSelectedSlot(null)
			setShowConfirmButton(false)

			const appointments = mockAppointments.data.filter(appointment =>
				moment(appointment.startDate).isSame(selectedDate, 'day')
			)
			setAppointmentsForSelectedDate(appointments)
		}
	}, [selectedDate, slots])

	const handleConfigChange = async (newSlots: ConfigSlot[]) => {
		try {
			setSlots(prevSlots => [...prevSlots, ...newSlots])
			console.log('Configuración enviada al backend:', newSlots)
		} catch (error) {
			console.error('Error enviando configuración:', error)
		}
	}

	const handleSlotClick = (slot: ConfigSlot) => {
		if (selectedSlot === slot && showConfirmButton) {
			setSelectedSlot(null)
			setShowConfirmButton(false)
		} else {
			setSelectedSlot(slot)
			setShowConfirmButton(true)
		}
	}

	// Otras funciones relacionadas con la lógica del calendario

	return {
		selectedDate,
		hoveredDay,
		slots,
		selectedSlots,
		selectedSlot,
		showConfirmButton,
		appointmentsForSelectedDate,
		handleDateChange,
		handleConfigChange,
		handleSlotClick
		// Otras funciones que quieras exponer
	}
}

export default useCalendarLogic
