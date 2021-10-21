/* eslint-disable */
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useDataStatus } from "hooks/useDataStatus";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function DoctorPendingAppointments() {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])
  const [blocked, setBlocked] = useState([])
  const { loading } = useDataStatus(rows);

  useEffect(() => {
    fetch("https://ehrsystembackend.herokuapp.com/KNH/staff/all")
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setRows(data.data);
                  setPending(rows.filter((row) => (row.status == "pending")));
                  setApproved(rows.filter((row) => (row.status == "activated")));
                  setBlocked(rows.filter((row) => (row.status == "suspended")));
              }
              else{
                  console.log("no data");
              }
          })
  }, [])

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Pending Appointments</h4>
            <p className={classes.cardCategoryWhite}>
              Appointments
            </p>
          </CardHeader>
          <CardBody>
            <div className="searchOut">
                  <div className="searchCont">
                    <input type="text" className="searchInput" placeholder="Search Appointment"/>
                    <button className="btnSearch">Search</button>
                  </div>
                </div>
                {loading ?
                <table className="styled-table">
                  <thead>
                    <tr style={{marginBottom: "20px"}}>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Qualification</th>
                      <th>Status</th>
                      <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows ? rows.map((item) => (
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>
                          <td>{item.username}</td>
                          <td>{item.qualification}</td>
                          <td>{item.status}</td>
                          <td>
                            <div className="editContainer">
                              <p className="editP" style={{backgroundColor: "green"}} onClick={() => {
                                fetch(`https://ehrsystembackend.herokuapp.com/KNH/staff/suspend?username=${item.username}`)
                                .then(response => response.json())
                                .then((data) => {
                                    if (data.message == "Suspended") {
                                      toast.success("Account Suspended");
                                      setUpdated(true);
                                      console.log("Suspended")
                                    }
                                    else{
                                      toast.error("Account Not Suspended");
                                      setUpdated(false)
                                    }
                                })
                                }}>Approve</p>
                            </div>
                          </td>
                      </tr>
                    )) : null}
                  </tbody>
                </table>
                : 
                  <div className="noData">
                  <p className="txtNo">No Pending Appointment</p>
                </div>
                }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}