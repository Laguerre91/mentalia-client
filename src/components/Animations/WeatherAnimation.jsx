import storm from "../../assets/thunder.svg"
import cloudy from "../../assets/cloudy.svg"
import snowy from "../../assets/snowy-6.svg"
import sunny from "../../assets/day.svg"
import rainy from "../../assets/rainy-6.svg"

const WeatherAnimation = ({ weatherValue }) => {
    let weatherImage

    switch (weatherValue) {
        case 'Sol':
            weatherImage = sunny
            break
        case 'Nubes':
            weatherImage = cloudy
            break
        case 'Lluvia':
            weatherImage = rainy
            break
        case 'Tormenta':
            weatherImage = storm
            break
        case 'Nieve':
            weatherImage = snowy
            break
        default:
            weatherImage = null
            break
    }

    return (
        <div className="weather-icons">
            <img src={weatherImage} alt={weatherValue} />
        </div>
    )
}

export default WeatherAnimation