import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Modal, Button, Row, Col, Form } from "react-bootstrap";

import Layout from './components/Layout';
import GlobalStyle from './styles/GlobalStyles';

import { Container, Header, NewOrderButton } from './styles';

const App: React.FC = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const hideOrderDetails = () => setShowDetails(false);
  const showOrderDetails = () => setShowDetails(true);

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categorys, setCategorys] = useState<any>([]);
  const [ordemOne, setOrdemOne] = useState<any>([]);
  const[ordem, setOrdems]=useState<any>([]);
 
  useEffect(()=>{
    //To get Categories
      axios.get<any>("http://localhost:8082/refera/categories")
      .then((res)=>{
          setCategorys(res.data)
        }).catch(()=>{
          console.log("Erro")
        })


        // To get Ordem
        axios.get<any>("http://localhost:8082/refera/ordems")
        .then((res)=>{
            setOrdems(res.data)
            console.log(res.data)
          }).catch((e)=>{
            console.log(e)
          })
          
  },[])
  //Create new ordem
  async function saveOrdem(env: any) {

    env.preventDefault()
    const name= document.getElementById('name') as HTMLInputElement;
    const contact=document.getElementById('contact') as HTMLInputElement;
    const company=document.getElementById('company') as HTMLInputElement;
    const estateAgency=document.getElementById('estateAgency') as HTMLInputElement;
    const categoria=document.getElementById('categoria') as HTMLSelectElement;
    const deadline=document.getElementById('deadline') as HTMLInputElement;
    const description=document.getElementById('description') as HTMLInputElement;

    const create={
      name:name.value,
      categoriaId:categoria.value,
      contact:contact.value,
      company:company.value,
      estateAgency:estateAgency.value,
      description:description.value,
      deadline:deadline.value
    }
    const response=await axios.post<any>("http://localhost:8082/refera/ordems/create", { ...create })
    console.log(response.statusText)

    if (response.statusText === "Created") {
      alert('Sucesso')
    }
    
  }
  return (
    <>
      <GlobalStyle />
      <Layout>
      <Container>
        <Header>
          <NewOrderButton outlined onClick={handleShow}>
            Open new order
          </NewOrderButton>
        </Header>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr onClick={showOrderDetails}>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Contact</th>
              <th>Agency</th>
              <th>Company</th>
              <th>Deadline</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {
              ordem?.map((ord: any, index: number) => (
                <tr key={index}>
                  <td>{ord.id}</td>
                  <td>{ord.name}</td>
                  <td>{ord.categoriaId}</td>
                  <td>{ord.contact}</td>
                  <td>{ord.estateAgency}</td>
                  <td>{ord.company}</td>
                  <td>{ord.deadline}</td>
                  <td>
                    
                  <a style={{ color: "black", fontWeight: 700, textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                       axios.get<any>(`http://localhost:8082/refera/${ord.id}/ordems`)
                       .then((res)=>{
                         setOrdemOne(res.data)
                         console.log(res.data)
                       }).catch((e)=>{
                         console.log(e)
                       })
                       
                        }}>Ver Detalhes</a>
                    
                   
                    </td>
                </tr>
              ))
            }
        </tbody>
        </Table> 
        {
          ordemOne.map((o: any, i: number) =>(
            <p key={i}>{o.id}  {o.name}  {o.categoriaId}  {o.contact}  {o.estateAgency}  {o.company}  {o.deadline}</p>
            ))
        }
            
          
        {/* Order Details */}
        <Modal
          show={showDetails}
          centered
          size="lg"
          onHide={hideOrderDetails}
          // backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Row className='mb-3'>
                  <Col sm={7} className='order-details'>
                    <label>Contact Name</label>
                    <strong>Alcides</strong>
                  </Col>
                  <Col sm={5} className='order-details'>
                    <label>Contact Phone</label>
                    <span>29002-022-21</span>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col sm={12} className='order-details'>
                    <label>Order Description</label>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio libero eaque quibusdam magni repellendus assumenda enim error dolor quasi quaerat.</p>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col sm={12} className='order-details'>
                    <label>Category</label>
                    <p>Hidraulica</p>
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row className='mb-3'>
                  <Col sm={12} className='order-details'>
                    <label>Real Estate Agency</label>
                    <strong>Imobiliarios Loza</strong>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} className='order-details mb-4'>
                    <label>Company</label>
                    <strong>Reparos S.A.</strong>
                  </Col>
                </Row>
                <Row className='mt-4'>
                  <Col sm={12} className='order-details mt-4'>
                    <label>Deadline</label>
                    <span>10/11/2021</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        <Modal
          show={show}
          centered
          size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='form-register' onSubmit={saveOrdem}>
              <Row>
                <Col sm={8}>
                  <Row>
                    <Col sm={7}>
                      <Form.Group className="mb-3 " controlId="formName">
                        <Form.Label>Contact Name</Form.Label>
                        <Form.Control type="text" id='name' placeholder="" />
                      </Form.Group>
                    </Col>
                    <Col sm={5}>
                      <Form.Group className="mb-3"  controlId="formContact">
                        <Form.Label>Contact Phone</Form.Label>
                        <Form.Control
                          type="text" id="contact"
                          placeholder="() xxxxx - xxxx"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Form.Group className="mb-3 " controlId="formDescription">
                        <Form.Label>Order Description</Form.Label>
                        <Form.Control id='description'
                          as="textarea"
                          aria-label="With textarea"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Form.Group controlId="formCategory">
                        <Form.Label>Select the order category</Form.Label>
                        <Form.Select id='categoria' aria-label="" className="mb-3">
                          {/* <option value="0">Select</option>
                          <option value="1">Infiltracao</option>
                          <option value="2">Electrica</option>
                          <option value="3">Retirada de mobilia</option> */}

                          {
                            categorys.map((cate:any, index:number) => (
                              <option value={cate.id} key={"chave"+index}>{cate.name}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                
                <Col sm={4}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group className="mb-3 " controlId="formAgency">
                        <Form.Label>Real Estate Agency</Form.Label>
                        <Form.Control type="text" id='estateAgency' placeholder="" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Form.Group className="mb-4 " controlId="formCompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" id='company' placeholder="" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Form.Group className="mt-3 " controlId="formDeadline">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type="date" id='deadline' placeholder="" />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col size={12} className="sendButton">
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      </Layout>
    </>
  );
}

export default App;