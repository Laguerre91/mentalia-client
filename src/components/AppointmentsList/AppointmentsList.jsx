import AppointmentDetailsCard from './../AppointmentDetailsCard/AppointmentDetailsCard'

import './AppointmentsList.css'

const AppointmentsList = ({ userDetails, getUser }) => {

    return (
        <section className='AppointmentsList'>
            {userDetails?.appointments && userDetails.appointments.length > 0 ? (
                <>
                    <h2 className='appointmentsList-title'>Citas pendientes</h2>
                    <hr />
                    {userDetails.appointments.map(appointment => (
                        <AppointmentDetailsCard {...appointment} key={appointment._id} getUser={getUser} />
                    ))}
                </>
            ) : (
                <h2 className='appointmentsList-title'>Aún no has programado ninguna cita</h2>
            )}
        </section>
    )
}

export default AppointmentsList 