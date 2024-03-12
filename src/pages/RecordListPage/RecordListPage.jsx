import RecordsList from "../../components/RecordsList/RecordsList"
import './RecordsListPage.css'

const RecordsListPage = () => {

    return (
        <section className="RecordsListPage">
            <h2 className="record-title">Todos tus moods registrados</h2>
            <RecordsList />
        </section>
    )
}

export default RecordsListPage