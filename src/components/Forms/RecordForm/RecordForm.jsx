import './RecordForm.css'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/auth.context'
import { Form, Button, ProgressBar, ToggleButton, ToggleButtonGroup, Row, Col } from 'react-bootstrap'
import MoodAnimation from '../../Animations/MoodAnimation'
import { HOURSOFSLEEP, MOOD_LABELS, WEATHER_LABELS, WORRIES } from '../../../consts/record.constants'
import recordServices from '../../../services/record.services'
import { format } from "@formkit/tempo"
import WeatherAnimation from '../../Animations/WeatherAnimation'


const RecordForm = ({ onHide, getUser }) => {

    const { user } = useContext(AuthContext)

    const [step, setStep] = useState(0)
    const [recordData, setRecordData] = useState({
        date: format(new Date(), "full"),
        user: user ? user._id : '',
        mood: 'Normal',
        rateDay: 1,
        worries: [],
        didExercise: false,
        didHidrate: false,
        ateHealthy: false,
        hoursOfSleep: 0,
        hasPsyc: false,
        isMedicated: false,
        isMenstruating: false,
        hasPeriodPain: false,
        weather: 'Sol',
        reflection: ''
    })
    const [checked, setChecked] = useState({})

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(0)

    const handleStep = (count = 1) => {
        const currentStep = step + count
        setStep(currentStep)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setRecordData((prevData) => ({
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
        console.log('Submitting recordData:', recordData)

        recordServices
            .createRecord(recordData)
            .then((response) => {
                getUser()
                onHide()
            })
            .catch((err) => console.log(err))
    }

    return (
        <Form className='record-form' onSubmit={handleSubmit}>
            <ProgressBar now={(step / 6) * 100} />
            {
                step === 0 && (
                    <Form.Group controlId="formStep0">
                        <div className="animation">
                            <MoodAnimation moodValue={recordData.mood} />
                        </div>

                        <Form.Range
                            min="0"
                            max="4"
                            step="1"
                            onChange={handleInputChange}
                            value={MOOD_LABELS.indexOf(recordData.mood)}
                            name="mood"
                        />
                    </Form.Group>
                )
            }

            {
                step === 1 && (
                    <Form.Group className='form-group' controlId="formStep1">
                        <Form.Label className='label'>Pónle una nota a tu día:</Form.Label>
                        <h1 className='number'>{recordData.rateDay}</h1>
                        <Form.Range
                            as="range"
                            min="1"
                            max="10"
                            step="1"
                            name="rateDay"
                            value={recordData.rateDay}
                            onChange={(handleInputChange)}
                        />
                    </Form.Group>
                )
            }

            {
                step === 2 && (
                    <Form.Group controlId="formStep2">
                        <Form.Label className='label'>¿Cuáles son tus preocupaciones hoy?</Form.Label>
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
                )
            }

            {
                step === 3 && (
                    <Form.Group className='form-group' controlId="formStep3">
                        <Form.Label className='label'>Indica cuantas horas dormiste:</Form.Label>
                        <h1 className='number'>{recordData.hoursOfSleep}</h1>
                        <Form.Range
                            as="range"
                            min="0"
                            max="24"
                            step="1"
                            name="hoursOfSleep"
                            value={HOURSOFSLEEP.indexOf(recordData.hoursOfSleep)}
                            onChange={(handleInputChange)}
                        />
                    </Form.Group>
                )
            }

            {
                step === 4 && (
                    <Form.Group controlId="formStep4">
                        <Form.Label className='label'>Responde a estas preguntas:</Form.Label>
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
                )
            }
            {
                step === 5 && (
                    <Form.Group controlId="formStep5">

                        <div className="animation">
                            <WeatherAnimation weatherValue={recordData.weather} />
                        </div>

                        <Form.Range
                            as="range"
                            min="0"
                            max="4"
                            step="1"
                            name="weather"
                            value={WEATHER_LABELS.indexOf(recordData.weather)}
                            onChange={(handleInputChange)}
                        />
                    </Form.Group>
                )
            }
            {
                step === 6 && (
                    <Form.Group controlId="formStep6">
                        <Form.Label className='label'>Reflexión del día</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="reflection"
                            value={recordData.reflection}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                )
            }
            <div className="d-flex justify-content-between mt-3">
                {step > 0 && (
                    <Button className='btn-prev' onClick={() => handleStep(-1)}>
                        Previous
                    </Button>
                )}
                {step < 6 && (
                    <Button className="btn-next" onClick={() => handleStep()}>
                        Next
                    </Button>
                )}
                {step === 6 && (
                    <Button className="btn-submit" type="submit">
                        Submit
                    </Button>
                )}
            </div>
        </Form >
    )
}

export default RecordForm

