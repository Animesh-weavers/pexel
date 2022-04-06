import React, { useRef } from 'react'
import { Nav, Navbar, Container, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NavigationBar.css';

const NavigationBar = (props) => {
    const searchInputRef = useRef();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const enteredSearchInput = searchInputRef.current.value;
        props.navSearchQueryHandler(enteredSearchInput);
        searchInputRef.current.value = "";
        searchInputRef.current.blur();

    }
    return (
        <>
            <Navbar className="navbar-container">
                <Container >
                    <Navbar.Brand as={Link} to='/' style={{ color: 'white' }} >PEXEL</Navbar.Brand>
                    {props.isShowSearchedPhotos && <Form className="d-flex" onSubmit={formSubmitHandler}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            ref={searchInputRef}
                        />
                    </Form>}
                    <Nav className="justify-content-end" >
                        <Nav.Link as={Link} to='/' style={{ color: 'white', minWidth: '5rem', textAlign: 'center', marginRight: '1rem' }}>Home</Nav.Link>
                        <Nav.Link as={Link} to='/career' style={{ color: 'white', minWidth: '5rem', textAlign: 'center', marginRight: '1rem' }}>Career</Nav.Link>
                        <Nav.Link as={Link} to='/signin' style={{ color: 'white', backgroundColor: '#05a081', borderRadius: '5px', minWidth: '6rem', textAlign: 'center', marginRight: '1rem' }}>Signin</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar