import "./EditRecordForm.css"
import { useState, useEffect } from "react"
import { Form, Button, Container, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { HOURSOFSLEEP, MOOD_LABELS, WEATHER_LABELS, WORRIES } from '../../../consts/record.constants'
import recordServices from "../../../services/record.services"



const EditRecordForm = ({
    _id,
    user,
    date,
    mood,
    rateDay,
    worries,
    didExercise,
    didHidrate,
    ateHealthy,
    hasPsyc,
    isMedicated,
    isMenstruating,
    hasPeriodPain,
    weather,
    hoursOfSleep,
    reflection,
    getUser,
    showEditModal,
    setShowEditModal
}) => {

    const [formData, setFormData] = useState({
        _id,
        mood,
        rateDay,
        worries,
        didExercise,
        didHidrate,
        ateHealthy,
        hasPsyc,
        isMedicated,
        isMenstruating,
        hasPeriodPain,
        weather,
        hoursOfSleep,
        reflection,
    })

    const [checked, setChecked] = useState({})

    useEffect(() => {
        const initialChecked = {}
        worries.forEach((worry) => {
            initialChecked[worry] = true
        })
        setChecked(initialChecked)
    }, [worries])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'mood'
                ? MOOD_LABELS[value]
                : name === 'weather'
                    ? WEATHER_LABELS[value]
                    : name === 'hoursOfSleep'
                        ? HOURSOFSLEEP[value]
                        : value
        }))
    }

    const handleToggleWorries = (value) => {

        setChecked((prevChecked) => {

            const updatedChecked = { ...prevChecked }
            updatedChecked[value] = !prevChecked[value]

            setFormData((prevData) => {
                const updatedWorries = [...prevData.worries]

                if (updatedChecked[value]) {
                    updatedWorries.push(value)
                } else {
                    const index = updatedWorries.indexOf(value)
                    if (index !== -1) {
                        updatedWorries.splice(index, 1)
                    }
                }
                return {
                    ...prevData,
                    worries: updatedWorries,
                }
            })

            return updatedChecked
        })
    }

    const handleSwitch = (name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: !prevData[name]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(`Este es el id: ${_id}`)

        if (!_id) {
            console.error('ID no válido.');
            return;
        }

        console.log('Submitting updated formData:', formData)

        recordServices
            .updateRecord(_id, formData)
            .then(response => {
                setFormData(response.data)
                setShowEditModal(false)
                getUser()
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formMood">
                            <Form.Label>Mood = <span>{formData.mood}</span></Form.Label>
                            <Form.Range
                                min="0"
                                max="4"
                                step="1"
                                onChange={handleChange}
                                value={MOOD_LABELS.indexOf(formData.mood)}
                                name="mood"
                                placeholder={mood}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formRateDay">
                            <Form.Label>Nota del día</Form.Label>
                            <Form.Select
                                type="text"
                                name="rateDay"
                                value={formData.rateDay}
                                onChange={handleChange}>

                                <option>{rateDay}</option>

                                {[...Array(10).keys()].map((value) => (
                                    <option key={value + 1}>{value + 1}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formWorries">
                    <Form.Label>¿Cuáles son tus preocupaciones hoy?</Form.Label>
                    <ToggleButtonGroup
                        type="checkbox"
                        className='worries-btns'>

                        {WORRIES.map((elm, id) => (

                            <ToggleButton
                                key={id}
                                type="checkbox"
                                value={elm.label}
                                name='worries'
                                variant={checked[elm.label] ? "primary" : "outline-primary"}
                                onClick={() => handleToggleWorries(elm.label)}
                            >
                                {elm.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="formHoursOfSleep">
                            <Form.Label>Indica tus horas de sueño = <span>{formData.hoursOfSleep}</span></Form.Label>
                            <Form.Range
                                as="range"
                                min="0"
                                max="24"
                                step="1"
                                name="hoursOfSleep"
                                value={HOURSOFSLEEP.indexOf(formData.hoursOfSleep)}
                                onChange={(handleChange)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formStep5">

                            <Form.Label>¿Qué tiempo ha hecho hoy? - {formData.weather}</Form.Label>

                            <Form.Range
                                as="range"
                                min="0"
                                max="4"
                                step="1"
                                name="weather"
                                value={WEATHER_LABELS.indexOf(formData.weather)}
                                onChange={(handleChange)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formQuestions">
                    <Form.Label>Responde a estas preguntas:</Form.Label>
                    <div className="form-questions">
                        <Row>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="didexercize-switch"
                                    label="¿Hiciste ejercicio hoy?"
                                    value={formData.didExercise}
                                    onChange={() => handleSwitch("didExercise")}
                                    name="didExercise"
                                />
                                <Form.Check
                                    type="switch"
                                    id="didhidrate-switch"
                                    label="¿Te hidrataste bien?"
                                    value={formData.didHidrate}
                                    onChange={() => handleSwitch("didHidrate")}
                                    name="didHidrate"
                                />
                                <Form.Check
                                    type="switch"
                                    id="atehealthy-switch"
                                    label="¿Te alimentaste de manera saludable?"
                                    value={formData.ateHealthy}
                                    onChange={() => handleSwitch("ateHealthy")}
                                    name="ateHealthy"
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="haspsyc-switch"
                                    label="¿Tienes terapeuta psicológico?"
                                    value={formData.hasPsyc}
                                    onChange={() => handleSwitch("hasPsyc")}
                                    name="hasPsyc"
                                />
                                <Form.Check
                                    type="switch"
                                    id="ismedicated-switch"
                                    label="¿Estás tomando medicación?"
                                    value={formData.isMedicated}
                                    onChange={() => handleSwitch("isMedicated")}
                                    name="ateHealthy"
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="ismenstruating-switch"
                                    label="¿Estas menstruando?"
                                    value={formData.isMenstruating}
                                    onChange={() => handleSwitch("isMenstruating")}
                                    name="isMenstruating"
                                />
                                <Form.Check
                                    type="switch"
                                    id="hasperiodpain-switch"
                                    label="¿Tienes dolor?"
                                    value={formData.hasPeriodPain}
                                    onChange={() => handleSwitch("hasPeriodPain")}
                                    name="hasPeriodPain"
                                />
                            </Col>
                        </Row>
                    </div>

                </Form.Group>

                <Form.Group controlId="formReflection">
                    <Form.Label>Reflexión del día</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="reflection"
                        value={formData.reflection}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Guardar Cambios
                </Button>
            </Form>
        </Container >
    )
}

export default EditRecordForm