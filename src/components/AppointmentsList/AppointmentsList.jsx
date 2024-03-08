import AppointmentDetailsCard from './../AppointmentDetailsCard/AppointmentDetailsCard'

import './AppointmentsList.css'

const AppointmentsList = ({ userDetails }) => {

    return (
        <section>
            <h2>Tus citas pendientes</h2>
            <hr />

            {
                userDetails?.appointments?.map(appointment =>
                    <AppointmentDetailsCard {...appointment} key={appointment._id} />)
            }
        </section>
    )
}

export default AppointmentsList 