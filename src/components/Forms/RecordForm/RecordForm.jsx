import React, { useState } from 'react'
import { Form, Button, ProgressBar } from 'react-bootstrap'
import MoodAnimation from '../../Animations/MoodAnimation'

const RecordForm = () => {

    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({})

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission
    };

    return (
        <Form onSubmit={handleSubmit}>
            <ProgressBar now={(step / 5) * 100} />
            {step === 0 && (
                <Form.Group controlId="formStep0">
                    <Form.Label>Mood</Form.Label>
                    <Form.Range />
                    <Form.Control
                        type="text"
                        name="mood"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {step === 1 && (
                <Form.Group controlId="formStep1">

                    <Form.Select aria-label="Default select example">
                        <option>¡Pónle nota a tu día!</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {step === 2 && (
                <Form.Group controlId="formStep2">
                    <Form.Label>¿Cuáles son tus preocupaciones hoy?</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {step === 3 && (
                <Form.Group controlId="formStep3">
                    <Form.Label>Responde a estas preguntas:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={formData.message}
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
                        name="message"
                        value={formData.message}
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
                        name="message"
                        value={formData.message}
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

