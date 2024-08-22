import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function FormSubmit() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container>
            <Row className='mt-3'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-12" controlId="formBasicEmail">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" placeholder="Enter longitude" />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-12" controlId="formBasicEmail">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="email" placeholder="Enter latitude" />
                    </Form.Group>
                    <br />
                    <Button type="submit">Submit form</Button>
                </Form>
            </Row>
        </Container>
    );
}

export default FormSubmit;