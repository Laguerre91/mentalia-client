import Hero from '../../components/LandingComponents/Hero/Hero'
import DescriptionSection from '../../components/LandingComponents/DescriptionSection/DescriptionSection'
import SecondDescriptionSection from '../../components/LandingComponents/SecondDescriptionSection/SecondDescriptionSection'

import './HomePage.css'

const HomePage = () => {

    return (
        <div className="HomePage">
            <Hero />
            < DescriptionSection />
            < SecondDescriptionSection />
        </div>
    )
}

export default HomePage