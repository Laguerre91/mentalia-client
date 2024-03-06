import './RecordForm.css'
import React, { useState } from 'react'
import { Form, Button, ProgressBar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import MoodAnimation from '../../Animations/MoodAnimation'
import { WORRIES } from '../../../consts/record.constants'

const RecordForm = () => {

    const [step, setStep] = useState(0)
    const [recordData, setRecordData] = useState({
        mood: '',
        rateDay: '',
        worries: [],
        didExercise: false,
        weather: '',
        reflection: ''
    })
    const [checked, setChecked] = useState(false)

    const handleNext = () => {
        setStep(step + 1)
    }

    const handlePrevious = () => {
        setStep(step - 1)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRecordData({ ...recordData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // falta el handle del submit
    }

    return (
        <Form onSubmit={handleSubmit}>
            <ProgressBar now={(step / 5) * 100} />
            {step === 0 && (
                <Form.Group controlId="formStep0">
                    <MoodAnimation />
                    <Form.Label>Mood</Form.Label>
                    <Form.Range
                        min="0"
                        max="6"
                        step="1"
                        onChange={handleInputChange}
                        value={recordData.mood}
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
                    <ToggleButtonGroup type="checkbox" className='worries-btns'>

                        {WORRIES.map((elm, id) => (

                            <ToggleButton
                                key={id}
                                type="checkbox"
                                value={elm.value}
                                name='worries'
                                variant="outline-primary"
                                checked={checked}
                                onChange={(e) => setChecked(e.currentTarget.checked)}
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
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={recordData.didExercise}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {step === 4 && (
                <Form.Group controlId="formStep3">
                    <Form.Label>¿Qué tiempo ha hecho hoy?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="weather"
                        value={recordData.weather}
                        onChange={handleInputChange}
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

