import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { gotongroyong_backend } from "../../declarations/gotongroyong_backend";

function FormSubmit() {
    const [validated, setValidated] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [base64String, setBase64String] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64String(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (selectedFile) {
            convertToBase64(selectedFile);
        }
        const photos = base64String;

        const result = await gotongroyong_backend.addReport(latitude, longitude, photos);
        console.log(result);
    };

    return (
        <Row className='mt-3'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-12" controlId="formBasicEmail">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="text" placeholder="Enter longitude" value={longitude} onChange={handleLongitudeChange} required />
                </Form.Group>
                <br />
                <Form.Group className="mb-12" controlId="formBasicEmail">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="email" placeholder="Enter latitude" value={latitude} onChange={handleLatitudeChange} required />
                </Form.Group>
                <br />
                <Form.Group className="mb-12" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                </Form.Group>
                <br />
                <Button type="submit">Submit form</Button>
            </Form>
        </Row>
    );
}

export default FormSubmit;