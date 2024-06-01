import { Edit, UserProfile } from '../Icons/Icons'

export function FormClients(): JSX.Element {
	return (
		<main className='flex flex-col mt-10 ml-10'>
			<section className='flex flex-col gap-[40px] mb-10 '>
				<h1 className='font-[600] text-[48px] font-montserrat'>
					Agregar Cliente
				</h1>
				<p className='w-[468px]'>
					Aquí puedes agregar un nuevo cliente para que puedan agendar un turno
					contigo.
				</p>
			</section>
			<div className='flex flex-row flex-wrap'>
				<Edit width={38} height={38} />
				<p className='w-[427px] ml-5'>
					Aquí puedes editar la información del cliente: Nombre y edad.
				</p>
			</div>
			<span className='w-[500px] border border-solid border-[#000] mt-4 mb-4'></span>

			<form className='flex flex-col flex-wrap'>
				<div className='flex flex-col'>
					<label htmlFor=''>Nombre y apellido del cliente</label>
					<input
						type='text'
						className='border border-solid border-[#828282] w-[318px] p-[5px] rounded-md mt-3 mb-3y'
						placeholder='Nombre del cliente'
					/>
				</div>

				<div>
					<label htmlFor=''>Edad del cliente</label>
					<input type='text' />
				</div>
				<div>
					<label htmlFor=''>Mail</label>
					<input type='text' />
				</div>
				<div>
					<label htmlFor=''>Tel</label>
					<input type='text' />
				</div>
				<div>
					<label htmlFor=''>Observaciones</label>
					<input type='text' />
				</div>
			</form>

			<section>
				<div>
					<UserProfile width={24} height={24} />
					<p>
						Aquí puedes editar el usuario de tu cliente: usuario y contraseña.
						Ten en cuenta que tu cliente reservará el turno con este usuario.
					</p>
				</div>
				<span></span>
				<form action=''>
					<div>
						<h4>Usuario del cliente</h4>
						<div>
							<label htmlFor=''>
								Introduce el mail del cliente, este será el usuario con la cual
								el usuario entrará a la página para reservar el turno.
							</label>
							<input type='text' placeholder='Usuario del cliente' />
						</div>
					</div>
					<div>
						<h4>Contraseña del cliente.</h4>
						<div>
							<label htmlFor=''>
								Introduce el documento del cliente, este será la contraseña con
								la cual el usuario entrará a la página para reservar el turno.
							</label>
							<input type='text' placeholder='DNI' />
						</div>
					</div>
				</form>
			</section>
		</main>
	)
}
