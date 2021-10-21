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
import { useAccountStatus } from "hooks/useAccountStatus";
import { useDataStatus } from "hooks/useDataStatus";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from 'react-loading';
import { usePatients } from "hooks/usePatients";
import logo from "assets/img/logoknh.jpg";

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

export default function BillingReports() {
  const classes = useStyles();
  const { patients } = usePatients();

  return (
    <>
    <ToastContainer />
    <div className="pathCont">
      <div className="path">
        <p className="pathName">Dashboard / <span>Billing Reports</span></p>
      </div>
    </div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Billing Reports</h4>
            <p className={classes.cardCategoryWhite}>
              Retrieve Billing Reports
            </p>
          </CardHeader>
          <CardBody>
            <div className="repContainer">
              <div>
                <div className="formCont">
                  <div className="formIn">
                    <label className="labelPat">From</label>
                    <input type="date" className="patInput"/>
                  </div>
                  <div className="formIn">
                    <label className="labelPat">To</label>
                    <input type="date" className="patInput"/>
                  </div>
                  <div className="formBtnRep">
                    <button className="btnReport">Go</button>
                  </div>
                </div>
              </div>
              <div className="reportBody">
                <div className="reportTitle">
                  <div className="rRow">
                    <div className="imgCont">
                      <img src={logo} className="rImage"/>
                    </div>
                    <div className="imgCont">
                      <p className="rTitle">Kenyatta National Hospital</p>
                    </div>
                    <div className="imgCont">
                      <p className="rDesc">Billing Report</p>
                    </div>
                    <div className="imgCont">
                      <p className="rDate">11/12/2020 - 12/12/2021</p>
                    </div>
                  </div>
                </div>
                <div>
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Lab Test</th>
                        <th>Patient</th>
                        <th>Results</th>
                        <th>Prescription</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="trBody">12/11/2021</td>
                        <td className="trBody">Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria</td>
                        <td className="trBody">Tom</td>
                        <td className="trBody">Parasites seen</td>
                        <td className="trBody">Prescription</td>
                      </tr>
                      <tr>
                        <td className="trBody">12/11/2021</td>
                        <td className="trBody">Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria Blood sample for Malaria</td>
                        <td className="trBody">Tom</td>
                        <td className="trBody">Parasites seen</td>
                        <td className="trBody">Prescription</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="print">
                  <button className="pdf">PDF</button>
                  <button className="excel">Excel</button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
