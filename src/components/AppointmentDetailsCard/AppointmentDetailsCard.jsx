
const AppointmentDetailsCard = ({ _id, date, time, psycologist, client, comments }) => {

    return (
        <article className="AppointmentDetailsCard">
            <p>Tienes fecha para el día {date} a la hora {time}</p>
        </article>
    )
}

export default AppointmentDetailsCard