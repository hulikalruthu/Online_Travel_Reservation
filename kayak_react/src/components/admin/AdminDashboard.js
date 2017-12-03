import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Radar, HorizontalBar} from 'react-chartjs-2';
import {CardColumns, Card, CardHeader, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import * as AdminAPI from "../../api/admin/API";
import UserProfile from "../user/UserProfile";

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const horizontalBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const bar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const doughnut = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const radar = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

const pie = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const polar = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB'
        ],
        label: 'My dataset' // for legend
    }],
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
    ]
};

class AdminDashboard extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            clicksPerPage:{
                labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                data: [0,0,0,0,0,0,0,0]
            },
            clicksPerProperty:{
                labels: ['Hotel','Flight','Car'],
                data: [0,0,0]
            },
            areaExplored:{
                labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                data: [0,0,0,0,0,0,0,0]
            },
            top10Properties:{
                Hotel:{
                    labels: [],
                    data: []
                },
                Flight:{
                    labels: [],
                    data: []
                },
                Car:{
                    labels: [],
                    data: []
                }
            },
            citiesRevenue:[
                {
                    city: 'San Jose',
                    revenue: [10,20,30]
                },
                {
                    city: 'San Fransisco',
                    revenue: [50,60,70]
                },
            ],
            cityWiseRevenue:[
                {
                    labels: ['Hotel','Flight','Car'],
                    data: [0,0,0]
                }
            ],
            top10Hosts:{
                labels: [],
                data: []
            },
            reviewsOnProperties:{
                labels: ['Hotel','Flight','Car'],
                data: [0,0,0]
            }
        }
    }

    componentWillMount(){
        AdminAPI.logAnalyticsData()
            .then(res => {
                let sum = res.pageClicks.UserHome+res.pageClicks.SignIn+res.pageClicks.SignUp+res.pageClicks.HotelListing+res.pageClicks.CarListing+res.pageClicks.FlightListing+res.pageClicks.UserProfile+res.pageClicks.UserPaymentPage;
                // console.log("Received response - "+res.status);
                console.log("Received response Clicks - "+res.pageClicks.UserProfile);
                this.setState({
                    ...this.state,
                    clicksPerPage:{
                        labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                        data: [res.pageClicks.UserHome,res.pageClicks.SignIn,res.pageClicks.SignUp,res.pageClicks.HotelListing,res.pageClicks.CarListing,res.pageClicks.FlightListing,res.pageClicks.UserProfile,res.pageClicks.UserPaymentPage]
                        // data: [30,50,70,90,52,69,45,62]
                    },
                    clicksPerProperty:{
                        labels: ['Hotel','Flight','Car'],
                        data: [res.propertyClicks.Hotel,res.propertyClicks.Flight,res.propertyClicks.Car]
                        //data: [30,50,70]
                    },
                    areaExplored:{
                        labels: ['UserHome','SignIn','SignUp','HotelListing','CarListing','FlightListing','UserProfile','UserPaymentPage'],
                        data: [((res.pageClicks.UserHome/sum)*100).toFixed(2),((res.pageClicks.SignIn/sum)*100).toFixed(2),((res.pageClicks.SignUp/sum)*100).toFixed(2),((res.pageClicks.HotelListing/sum)*100).toFixed(2),((res.pageClicks.CarListing/sum)*100).toFixed(2),((res.pageClicks.FlightListing/sum)*100).toFixed(2),((res.pageClicks.UserProfile/sum)*100).toFixed(2),((res.pageClicks.UserPaymentPage/sum)*100).toFixed(2)]
                    }
                });
            })
            .catch(err => console.log(err));

        AdminAPI.top10Properties()
            .then(res => {
                // console.log("Received response - "+res.status);
                console.log("Top 10 Properties - Received response Clicks - "+res.Flight.labels);
                console.log("Top 10 Properties - Received response Clicks - "+res.Flight.data);
                this.setState({
                    ...this.state,
                    top10Properties: {
                        Hotel:{
                            labels: res.Hotel.labels,
                            data: res.Hotel.data
                        },
                        Flight:{
                            labels: res.Flight.labels,
                            data: res.Flight.data
                        },
                        Car:{
                            labels: res.Car.labels,
                            data: res.Car.data
                        }
                    }
                });
            })
            .catch(err => console.log(err));

        // AdminAPI.cityWiseRevenue()
        //     .then(res => {
        //          // console.log("Received response - "+res.status);
        //          console.log("Received response cityWiseRevenue - "+res.cityWiseRevenue.labels);
        //          this.setState({
        //          ...this.setState,
        //              cityWiseRevenue: res.cityWiseRevenue
        //          });
        //      })
        //     .catch(err => console.log(err));

        AdminAPI.top10Hosts()
            .then(res => {
                // console.log("Received response - "+res.status);
                console.log("Received response Clicks - "+res.top10Hosts.label);
                this.setState({
                    ...this.state,
                    top10Hosts:{
                        labels: res.top10Hosts.label,
                        data: res.top10Hosts.data
                    }
                });
            })
            .catch(err => console.log(err));

        AdminAPI.reviewsOnProperties()
            .then(res => {
                // console.log("Received response - "+res.status);
                console.log("Received response Clicks - "+res.reviewsOnProperties.data);
                this.setState({
                    ...this.state,
                    reviewsOnProperties:{
                        labels: ['Hotel','Flight','Car'],
                        data: res.reviewsOnProperties.data
                    }
                });
            })
            .catch(err => console.log(err));
    }

    loadCityRevenue = (event) => {
        let _city = event.target.value;
        this.state.citiesRevenue.forEach((city)=>{
             if(city === _city){
                 this.setState({
                     ...this.state,
                     cityWiseRevenue:{
                         labels: ['Hotel','Flight','Car'],
                         data: city.revenue
                     }
                 });
             }
        });

    };

    loadOptions = (city) => {
        console.log("In loadOptions");
        console.log(" City - "+city.city+" Revenue - "+city.revenue);
        return (<option  style={{textAlign:"center"}} value={city.city} >{city.city}</option>);
    };

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {

        // bar chart
        const clicksPerPage = {
            labels: this.state.clicksPerPage.labels,
            datasets: [
                {
                    label: 'Clicks',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.clicksPerPage.data
                }
            ]
        };

        // doughnut chart
        const clicksPerProperty = {
            labels: this.state.clicksPerProperty.labels,
            datasets: [{
                data: this.state.clicksPerProperty.data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        // pie chart
        const areaExplored = {
            labels: this.state.areaExplored.labels,
            datasets: [{
                data: this.state.areaExplored.data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                ]
            }]
        };

        // bar chart
        const top10Hotel = {
            labels: this.state.top10Properties.Hotel.labels,
            datasets: [
                {
                    label: 'Hotels',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.top10Properties.Hotel.data
                }
            ]
        };

        // bar chart
        const top10Flight = {
            labels: this.state.top10Properties.Flight.labels,
            datasets: [
                {
                    label: 'Flights',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.top10Properties.Flight.data
                }
            ]
        };

        // bar chart
        const top10Car = {
            labels: this.state.top10Properties.Car.labels,
            datasets: [
                {
                    label: 'Cars',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.top10Properties.Car.data
                }
            ]
        };

        // histogram
        const cityWiseRevenue = {
            labels: ['Hotel','Flight','Car'],
            datasets: [
                {
                    label: 'Revenue',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [25,35,69]
                }
            ]
        };

        // doughnut chart
        const top10Hosts = {
            labels: this.state.top10Hosts.labels,
            datasets: [{
                data: this.state.top10Hosts.data,
                backgroundColor: [
                    '#f7ce02',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#f90431',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                    '#db1ed8',

                ],
                hoverBackgroundColor: [
                    '#f7ce02',
                    '#36A2EB',
                    '#FFCE56',
                    '#f47442',
                    '#f90431',
                    '#7af441',
                    '#20ddea',
                    '#1f0b93',
                    '#e80b0f',
                    '#db1ed8',
                ]
            }]
        };

        // pie chart
        const reviewsOnProperties = {
            labels: this.state.reviewsOnProperties.labels,
            datasets: [{
                data: this.state.reviewsOnProperties.data,
                backgroundColor: [
                    '#7af441',
                    '#1f0b93',
                    '#e80b0f',
                ],
                hoverBackgroundColor: [
                    '#7af441',
                    '#1f0b93',
                    '#e80b0f',
                ]
            }]
        };

        return (
            // style={{position: "relative",height:"500px", width:"1000px"}}
        <div className="animated fadeIn">

            <CardColumns className="cols-2">

                <Card>
                    <CardHeader>
                        Clicks Per Page
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <br/>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Bar data={clicksPerPage}
                                 options={{
                                     maintainAspectRatio: true
                                 }}
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Clicks Per Property
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Doughnut data={clicksPerProperty}/>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        City Wise Revenue
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <br/>
                    <CardBody>
                        <div className="chart-wrapper">
                            <div style={{textAlign:"center"}} >
                                Choose City :
                                <select onChange={((event)=>{this.loadCityRevenue(event)})} >
                                    <option style={{textAlign:"center"}} value="Select" default="default">Select</option>
                                    {
                                        this.state.citiesRevenue && this.state.citiesRevenue.forEach((city)=>{
                                            {this.loadOptions(city)}
                                        })
                                    }
                                    {/*<option  style={{textAlign:"center"}} value="opel">Opel</option>*/}
                                    {/*<option  style={{textAlign:"center"}} value="audi">Audi</option>*/}
                                </select>
                            </div>
                            {/*<Dropdown style={{textAlign:"center"}} isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>*/}
                                {/*<DropdownToggle caret >*/}
                                    {/*Choose city*/}
                                {/*</DropdownToggle>*/}
                                {/*<DropdownMenu>*/}
                                    {/*/!*<DropdownItem header>Header</DropdownItem>*!/*/}
                                    {/*/!*<DropdownItem disabled>Action</DropdownItem>*!/*/}
                                    {/*<DropdownItem value="San Jose">San Jose</DropdownItem>*/}
                                    {/*<DropdownItem value="San Fransisco">San Fransisco</DropdownItem>*/}
                                    {/*<DropdownItem value="Santa Cruz">Santa Cruz</DropdownItem>*/}
                                    {/*<DropdownItem value="New York">New York</DropdownItem>*/}
                                    {/*<DropdownItem value="Los Angeles">Los Angeles</DropdownItem>*/}
                                    {/*<DropdownItem value="Seattle">Seattle</DropdownItem>*/}
                                    {/*/!*<DropdownItem divider />*!/*/}
                                    {/*/!*<DropdownItem>Another Action</DropdownItem>*!/*/}
                                {/*</DropdownMenu>*/}
                            {/*</Dropdown>*/}
                            <HorizontalBar data={cityWiseRevenue}
                                 options={{
                                     maintainAspectRatio: true
                                 }}
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Top 10 Hotels
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <br/>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Bar data={top10Hotel}
                                 options={{
                                     maintainAspectRatio: true
                                 }}
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Top 10 Flights
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <br/>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Bar data={top10Flight}
                                 options={{
                                     maintainAspectRatio: true
                                 }}
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Top 10 Cars
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <br/>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Bar data={top10Car}
                                 options={{
                                     maintainAspectRatio: true
                                 }}
                            />
                        </div>
                    </CardBody>
                </Card>


                <Card  style={{position: "relative",height:"295px"}}>
                    <CardHeader>
                        Less seen area of Website
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Pie data={areaExplored}/>
                        </div>
                    </CardBody>
                </Card>

                <Card  style={{position: "relative",height:"295px"}}>
                    <CardHeader>
                        Property Reviews
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Pie data={reviewsOnProperties}/>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        Top 10 Hosts
                        <div className="card-actions">
                            <a href="#">
                                <small className="text-muted">Enlarge</small>
                            </a>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-wrapper">
                            <Doughnut data={top10Hosts}/>
                        </div>
                    </CardBody>
                </Card>

                {/*style={{position: "relative",height:"600px", width:"800px"}}*/}

            </CardColumns>

        </div>

        )
    }
}

export default AdminDashboard;