import React, {Component, useState} from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import usersServices from "../../services/users.services";
import adminServices from "../../services/adminServices";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,

  },

  {
    dataField: 'fullname',
    text: 'Fullname',
  },
  {
    dataField: 'email',
    text: 'Email',
  },
  {
    dataField: 'gender',
    text: 'Gender',
  },

];

class Dashboard extends  Component{

  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: null,
      statistics:0,
      users:[],
      countAll:0,
      countApp:0,
      countRec:0,
      gendersStatisticsApp:[],
      gendersStatisticsRec: [],


    };

  }




  async componentDidMount() {
    const currentUser = usersServices.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/authenticate" });
    else {
      this.setState({ currentUser: currentUser, userReady: true })
      this.setState({
        statistics : await adminServices.domination(),
        users : await adminServices.users(),
        countAll : await adminServices.countAll(),
        countApp : await adminServices.countApp(),
        countRec : await adminServices.countRec(),
        gendersStatisticsApp:await adminServices.gendersStatisticsApp(),
        gendersStatisticsRec: await adminServices.gendersStatisticsRec(),

      });

    }
  }

  render(){
    if (this.state.redirect) {
      return this.props.history.push(this.state.redirect)
    }

    let femaleApp = 0;let maleApp = 0;
    this.state.gendersStatisticsApp.map(i=>{
      if(i[1] === 'F') femaleApp = i[0];
      if(i[1] === 'M') maleApp = i[0];
    })
    let femaleRec = 0;let maleRec = 0;
    this.state.gendersStatisticsRec.map(i=>{
      if(i[1] === 'F') femaleRec = i[0];
      if(i[1] === 'M') maleRec = i[0];
    })
    const dataTable = []
    this.state.users.map(elt=>{
     dataTable.push( {
          id: elt.id,
          fullname: elt.fullname,
          email: elt.email,
          gender:elt.gender

      })

    })


    const label =  this.state.statistics ? [`${this.state.statistics[0].toFixed(2)}%`, `${this.state.statistics[1].toFixed(2)}%`, `${this.state.statistics[2].toFixed(2)}%`] : []
    const series = this.state.statistics ? [`${this.state.statistics[0].toFixed(2)}`, `${this.state.statistics[1].toFixed(2)}`, `${this.state.statistics[2].toFixed(2)}`] : []


    return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total users</p>
                      <Card.Title as="h4">{this.state.countAll}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Updated Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02  text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total applicants</p>
                      <Card.Title as="h4">{this.state.countApp}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Updated Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02  text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total recruiters</p>
                      <Card.Title as="h4">{this.state.countRec}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Updated Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02  text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total admins</p>
                      <Card.Title as="h4">{this.state.countAll-(this.state.countRec+this.state.countApp)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Updated Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Genders domination</Card.Title>
                <p className="card-category">Gender's domination for each user</p>
              </Card.Header>
              <Card.Body>
                <div  className="ct-chart" id="chartActivity">
                  <ChartistGraph

                      data={{
                        labels: [
                          "Applicants",

                          "Recruiters",
                        ],

                        series: [
                          [
                            maleApp,maleRec
                          ],
                          [
                            femaleApp,femaleRec
                          ],
                        ],

                      }}
                      type="Bar"
                      width={1300}
                      options={{
                        scales: {
                          xAxes: [{
                            barPercentage: 300
                          }]
                        },
                        seriesBarDistance: 20,
                        axisX: {
                          showGrid: false,
                        },
                        height: "250px",

                      }}
                      responsiveOptions={[
                        [
                          "screen and (max-width: 640px)",
                          {
                            seriesBarDistance: 20,
                            axisX: {
                              labelInterpolationFnc: function (value) {
                                return value[0];
                              },
                            },
                          },
                        ],
                      ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Male <i className="fas fa-circle text-danger"></i>
                  Female
                </div>

              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Statistics</Card.Title>
                <p className="card-category">Users domination</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: label,
                      series: series,
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend" >
                  <i className="fas fa-circle text-info"></i>
                  Applicants
                  <i className="fas fa-circle text-danger"></i>
                  Recruiters
                  <i className="fas fa-circle text-warning"></i>
                  Admins
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
            <Card.Header>
              <Card.Title as="h4">Users</Card.Title>
              <p className="card-category">


              </p>

            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
            <div style={{ maxHeight: '400px',overflowY: 'auto'}}>
            <BootstrapTable
                classes="table-hover table-striped"
                keyField="id"
                data={dataTable}
                columns={columns}
                filter={filterFactory()}
            />
              </div>
            </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}
}
export default Dashboard;
