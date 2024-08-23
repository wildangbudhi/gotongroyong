import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { Button, ListGroup, Col } from "react-bootstrap";
import { gotongroyong_backend } from "../../declarations/gotongroyong_backend";
import Header from './Header';

function Maps() {
    const [result, setResult] = React.useState([]);

    useEffect(() => {
        const getReport = async () => {
            const maps = await gotongroyong_backend.getReportMaps();
            setResult([...maps]);
        };

        getReport();
    }, []);

    const openMapInNewTab = (lat, long) => {
        const url = `https://www.google.com/maps?q=${lat},${long}`;
        window.open(url, "_blank");
    };

    return (
        <>
            <Header />
            <Row className='mt-3'>
                {result.length > 0 &&
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1 className="text-center my-4">Map Locations</h1>
                        <ListGroup>
                            {result.map((location, index) => (
                                <ListGroup.Item key={index}>
                                    <Row className="align-items-center">
                                        <Col xs={8}>
                                            <strong>Latitude:</strong> {location.lat},{" "}
                                            <strong>Longitude:</strong> {location.long}
                                        </Col>
                                        <Col xs={4} className="text-right">
                                            <Button
                                                variant="primary"
                                                onClick={() => openMapInNewTab(location.lat, location.long)}
                                            >
                                                Open in Map
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                }
            </Row>
        </>
    );
}

export default Maps;