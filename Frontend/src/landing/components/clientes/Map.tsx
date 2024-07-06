// src/components/Map.tsx
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Opcional: ajusta el ícono del marcador si lo deseas
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'

const DefaultIcon = L.icon({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const Map: React.FC = () => {
	return (
		<MapContainer
			center={[-34.6037, -58.3816]}
			zoom={4}
			className='w-full h-96 '
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={[-34.6037, -58.3816]}>
				<Popup>Clientes Easy Turnos</Popup>
			</Marker>
		</MapContainer>
	)
}

export default Map
