import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from "axios";

import EventIcon from '@material-ui/icons/Event';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import './main.css'

const Main = (props) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const mostPopularArticlesFetch = async () => {
        let baseURL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=`;
    
        try {
            await axios.get(baseURL + `${process.env.REACT_APP_NYT_API_KEY}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }).then(async (response) => {
                if (response.status >= 200 && response.status < 300) {
                    setResults(response.data.results);
                    setIsLoading(false);
                } else {
                    setResults(["Failed! while retrieving the articles list"]);
                    setIsLoading(false);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        mostPopularArticlesFetch();
    }, [])

    const clickHandler = (art) => {
        console.log('Redirecting to '+ art);
        window.location.href = art;
    }

    return(
        <div className="pt-4">
            {isLoading ? 
                <>
                    <h2 className="text-center">Loading...</h2>
                </> :
                <>
                    <Container>
                          {(results).map((articles) => (
                            <div key={articles.id}>  
                                <Card>
                                    <Row className="g-0 mx-1">
                                        <Col xs={12} md={2} className="align-self-center text-center">
                                            <Card.Img variant="center" className="image-background" />
                                        </Col>
                                        <Col xs={10} md={9} className="align-self-center text-start">
                                            <Card.Body>
                                                <Card.Title>
                                			        {articles.title}
                                		        </Card.Title>
                                                <Card.Text>
                                			        {articles.abstract}
                                		        </Card.Text>
                                                <Card.Footer className="d-flex justify-content-between">
                                			        <small className="text-muted">{articles.byline}</small>
                                                    <small className="text-muted ml-4"><EventIcon style={{ fontSize: 20 }}/>{articles.published_date}</small>
                                		        </Card.Footer>
                                            </Card.Body>
                                        </Col>
                                        <Col xs={2} md={1} className="align-self-center text-center">
                                            <Button onClick={() => clickHandler(articles.url)}><ChevronRightIcon style={{ fontSize: 30 }} color="action"/></Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                          ))}
                    </Container>
                </>
            }    
        </div>
    )
}

export default Main;