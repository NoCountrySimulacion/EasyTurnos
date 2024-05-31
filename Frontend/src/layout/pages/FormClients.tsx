import { Edit, UserProfile } from '../Icons/Icons'

export function FormClients(): JSX.Element {
    return (
        <main className=''>
            <section>
                <h1>Agregar Cliente</h1>
                <p>
                    Aquí puedes agregar un nuevo cliente para que puedan agendar un turno
                    contigo.
                </p>
            </section>
            <div>
                <Edit width={24} height={24} />
                <p>Aquí puedes editar la información del cliente: Nombre y edad.</p>
                <span className=''></span>
            </div>
            <form action=''>
                <div>
                    <label htmlFor=''>Nombre y apellido del cliente</label>
                    <input type='text' />
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
                    <p>Aquí puedes editar el usuario de tu cliente: usuario y contraseña.
                        Ten en cuenta que tu cliente reservará el turno con este usuario.
                    </p>
                </div>
                <span></span>
                <form action="">
                    <div>
                        <h4>Usuario del cliente</h4>
                        <div>
                            <label htmlFor="">Introduce el mail del cliente, este será el usuario con la cual el usuario entrará a la página para reservar el turno.</label>
                            <input type="text" placeholder='Usuario del cliente' />
                        </div>
                    </div>
                    <div>
                        <h4>Contraseña del cliente.</h4>
                        <div>
                            <label htmlFor="">Introduce el documento del cliente, este será la contraseña con la cual el usuario entrará a la página para reservar el turno.</label>
                            <input type="text" placeholder='DNI' />
                        </div>
                    </div>
                </form>

            </section>
        </main>
    )
}
