import './RecordForm.css'
import React, { useState } from 'react'
import { Form, Button, ProgressBar, ToggleButton, ToggleButtonGroup, Row, Col } from 'react-bootstrap'
import MoodAnimation from '../../Animations/MoodAnimation'
import { WORRIES } from '../../../consts/record.constants'
import axios from 'axios'

const API_BASE_URL = "http://localhost:5005"

const RecordForm = () => {

    const [step, setStep] = useState(0)
    const [recordData, setRecordData] = useState({
        mood: '',
        rateDay: '',
        worries: [],
        didExercise: false,
        didHidrate: false,
        ateHealthy: false,
        hasPsyc: false,
        isMedicated: false,
        isMenstruating: false,
        hasPeriodPain: false,
        weather: '',
        reflection: ''
    })
    const [checked, setChecked] = useState({})

    const handleNext = () => {
        setStep(step + 1)
    }

    const handlePrevious = () => {
        setStep(step - 1)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setRecordData((prevData) => ({
            ...prevData,
            [name]: name === 'mood' ? moodLabels[value] : name === 'weather' ? weatherLabels[value] : value
        }))
    }

    const handleToggleWorries = (value) => {
        setChecked((prevChecked) => {
            const updatedChecked = { ...prevChecked }
            updatedChecked[value] = !prevChecked[value]

            setRecordData((prevData) => {
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
        setRecordData((prevData) => ({
            ...prevData,
            [name]: !prevData[name]
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // axios
        //     .put(`${API_BASE_URL}/api/usuarios/:id`, recordData)
        //     .then(() => console.log(`${recordData}`))
        //     .catch(err => )
    }

    const moodLabels = ['Muy mal', 'Mal', 'Algo mal', 'Normal', 'Algo bien', 'Bien', 'Muy bien']
    const weatherLabels = ['Sol', 'Nubes', 'Lluvia', 'Tormenta', 'Nieve']

    return (
        <Form onSubmit={handleSubmit}>
            <ProgressBar now={(step / 5) * 100} />
            {step === 0 && (
                <Form.Group controlId="formStep0">
                    <MoodAnimation />
                    <Form.Label>Mood = <span>{recordData.mood}</span></Form.Label>
                    <Form.Range
                        min="0"
                        max="6"
                        step="1"
                        onChange={handleInputChange}
                        value={moodLabels.indexOf(recordData.mood)}
                        name="mood"
                    />
                </Form.Group>
            )}
            {step === 1 && (
                <Form.Group controlId="formStep1">

                    <Form.Select
                        aria-label="Default select example"
                        onChange={handleInputChange}
                        name='rateDay'
                        value={recordData.rateDay}>

                        <option>¡Pónle nota a tu día!</option>

                        {[...Array(10).keys()].map((value) => (
                            <option key={value + 1}>{value + 1}</option>
                        ))}
                    </Form.Select>

                </Form.Group>
            )}
            {step === 2 && (
                <Form.Group controlId="formStep2">
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
            )}

            {step === 3 && (
                <Form.Group controlId="formStep3">
                    <Form.Label>Responde a estas preguntas:</Form.Label>
                    <div className="form-questions">
                        <Form.Check
                            type="switch"
                            id="didexercize-switch"
                            label="¿Hiciste ejercicio hoy?"
                            value={recordData.didExercise}
                            onChange={() => handleSwitch("didExercise")}
                            name="didExercise"
                        />
                        <Form.Check
                            type="switch"
                            id="didhidrate-switch"
                            label="¿Te hidrataste bien?"
                            value={recordData.didHidrate}
                            onChange={() => handleSwitch("didHidrate")}
                            name="didHidrate"
                        />
                        <Form.Check
                            type="switch"
                            id="atehealthy-switch"
                            label="¿Te alimentaste de manera saludable?"
                            value={recordData.ateHealthy}
                            onChange={() => handleSwitch("ateHealthy")}
                            name="ateHealthy"
                        />
                        <br />
                        <Form.Check
                            type="switch"
                            id="haspsyc-switch"
                            label="¿Tienes terapeuta psicológico?"
                            value={recordData.hasPsyc}
                            onChange={() => handleSwitch("hasPsyc")}
                            name="hasPsyc"
                        />
                        <Form.Check
                            type="switch"
                            id="ismedicated-switch"
                            label="¿Estás tomando medicación?"
                            value={recordData.isMedicated}
                            onChange={() => handleSwitch("ateHealthy")}
                            name="ateHealthy"
                        />
                        <br />
                        <Row>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="ismenstruating-switch"
                                    label="¿Estas menstruando?"
                                    value={recordData.isMenstruating}
                                    onChange={() => handleSwitch("isMenstruating")}
                                    name="isMenstruating"
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="hasperiodpain-switch"
                                    label="¿Tienes dolor?"
                                    value={recordData.hasPeriodPain}
                                    onChange={() => handleSwitch("hasPeriodPain")}
                                    name="hasPeriodPain"
                                />
                            </Col>
                        </Row>

                    </div>
                </Form.Group>
            )}
            {step === 4 && (
                <Form.Group controlId="formStep3">

                    <h1>Aqui irán imágenes chulis del tiempo :)</h1>

                    <Form.Label>¿Qué tiempo ha hecho hoy? - {recordData.weather}</Form.Label>

                    <Form.Range
                        as="range"
                        min="0"
                        max="4"
                        step="1"
                        name="weather"
                        value={weatherLabels.indexOf(recordData.weather)}
                        onChange={(handleInputChange)}
                    />
                </Form.Group>

            )}
            {step === 5 && (
                <Form.Group controlId="formStep3">
                    <Form.Label>Reflexión del día</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="reflection"
                        value={recordData.reflection}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            <div className="d-flex justify-content-between">
                {step > 0 && (
                    <Button variant="secondary" onClick={handlePrevious}>
                        Previous
                    </Button>
                )}
                {step < 5 ? (
                    <Button variant="primary" onClick={handleNext}>
                        Next
                    </Button>
                ) : (
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                )}
            </div>
        </Form>
    )
}

export default RecordForm

