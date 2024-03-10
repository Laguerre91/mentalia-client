import AppointmentDetailsCard from './../AppointmentDetailsCard/AppointmentDetailsCard'

import './AppointmentsList.css'

const AppointmentsList = ({ userDetails, getUser }) => {

    return (
        <section>
            <h2>Tus citas pendientes</h2>
            <hr />

            {
                userDetails?.appointments?.map(appointment =>
                    <AppointmentDetailsCard {...appointment} key={appointment._id} getUser={getUser} />)
            }
        </section>
    )
}

export default AppointmentsList 