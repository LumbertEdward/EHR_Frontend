/* eslint-disable */
import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ToastContainer, toast } from "react-toastify";
import { usePatients } from "hooks/usePatients";
import logo from "assets/img/logoknh.jpg";
import { CSVLink, CSVDownload } from "react-csv";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useDepartments } from "hooks/useDepartments";

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
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState("");
  const base = useBaseUrl()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [cost, setCost] = useState("0");
  const date = new Date()
  const { departments } = useDepartments();
  const today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()


  const searchBilling = (e) => {
    e.preventDefault()
    rows.filter((item) => item.patient_id == search)
  }

  const allBillings = () => {
    fetch(`${base}/KNH/patient/billing/completedbills/report/all`)
      .then(response => response.json())
      .then((data) => {
          if (data.message == "Found") {
              setRows(data.data);
              console.log(data.data)
          }
          else{
            toast.error(" No Record found")
              console.log("no data");
          }
      })
  }

  useEffect(() => {
    fetch(`${base}/KNH/patient/billing/completedbills/report/all`)
          .then(response => response.json())
          .then((data) => {
              if (data.message == "Found") {
                  setRows(data.data);
                  console.log(data.data)
                  let total = 0;
                  for (let index = 0; index < data.data.length; index++) {
                    total = parseInt(data.data[index].service_cost) + total;
                  }

                  setCost(total.toString());
              }
              else{
                  console.log("no data");
              }
          })
  }, [])

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
                    <input type="date" className="patInput" onChange={(e) => setFrom(e.target.value)}/>
                  </div>
                  <div className="formIn">
                    <label className="labelPat">To</label>
                    <input type="date" className="patInput" onChange={(e) => setTo(e.target.value)}/>
                  </div>
                  <div className="formBtnRep">
                    <button className="btnReport" onClick={allBillings}>Go</button>
                  </div>
                </div>
              </div>
              {rows.length > 0 ? 
              <>
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
                      <p className="rDate">1/12/2021 - {today}</p>
                    </div>
                  </div>
                </div>
                <div>
                  {rows.length > 0 ? 
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Patient ID</th>
                        <th>Treatment ID</th>
                        <th>Service Name</th>
                        <th>Service Department</th>
                        <th>Service Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length > 0 ? rows.map((item) => (
                         <tr>
                            <td className="trBody">{item.added_on}</td>
                            <td className="trBody">{item.patient_id}</td>
                            <td className="trBody">{item.treatment_id}</td>
                            <td className="trBody">{item.service_name}</td>
                            <td className="trBody">{departments.filter((e) => e.department_id == item.service_department)[0].department_name}</td>
                            <td className="trBody">Ksh {item.service_cost}</td>
                          </tr>
                      ))
                      :
                      null }
                      <tr>
                        <td className="trBody" style={{ fontWeight: "bold", fontSize: "15px", color: "#11b8cc" }}>Total</td>
                        <td className="trBody"></td>
                        <td className="trBody"></td>
                        <td className="trBody"></td>
                        <td className="trBody"></td>
                        <td className="trBody" style={{color: "#11b8cc"}}>Ksh {cost}</td>
                      </tr>
                    </tbody>
                  </table>
                  :
                  null }
                </div>
              </div>
              <div className="print">
                  <CSVLink data={rows} className="excel">Excel</CSVLink>
              </div>
              </>
              :
              null }
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </>
  );
}
