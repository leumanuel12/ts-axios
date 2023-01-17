import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';

export default function Header(props: any) {


    const links = [
        { "link":"/","name":"Line Chart" },
        { "link":"/piechart","name":"Pie Chart" },
    ]

  return (<>
    <Navbar bg="light" expand="lg">
      <Container className='max-w-6xl mx-auto'>
        <h5 className='m-3 mx-3'>Crypto Charts</h5>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links?.map( (x: any) => 
                <NavLink
                    to={x.link}
                    className={ ({isActive}) => {
                        return (
                            "px-2 p-2 no-underline "+
                            (isActive ? "font-bold text-blue-500 max-[600px]:bg-blue-100" : "text-black")
                        )
                    } }
                    >{x.name}</NavLink>
             )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='max-w-6xl mx-auto border-x border-gray-300 min-h-screen'>{props.children}</div>
    </>
  );
}