import PsycologistsList from "../../components/PsycologistsList/PsycologistsList"

import './PsycologistsListPage.css'

const PsycologistsListPage = () => {

    return (
        <section className="PsycologistsListPage">
            <h2 className="psyc-title">Red de psicólogos registrados</h2>
            <PsycologistsList />
        </section>
    )
}

export default PsycologistsListPage