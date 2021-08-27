import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table';
import Plot from 'react-plotly.js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Protein() {

    const classes = useStyles();
    const location = useLocation();
    const kinaseName = location.data.kinase_name;

    const [pdtData, setPdtData] = useState([]);
    const [plotlyData, setPlotlyData] = useState({});


    // Update the the view when the value of keyword changes 
    useEffect(() => {
        // get kinase details by name
        const url = 'http://127.0.0.1:5000/kinase/' + kinaseName

        // url to get the fold change for kinase
        const foldChangeUrl = url + "/foldchange"
        // call the backend to get the foldchnage of the kinase
        fetch(foldChangeUrl)
            .then((result) => result.json())
            .then((result) => {
                // extract the Putative downstream targets from the result to displayt them in the table
                var tableData = Object.keys(result).map((value, index) => {
                    return { phosphosite: value, kinase_name: kinaseName, residue: value[0], probability: 1 }
                })
                // setPdtData to update the table
                setPdtData(tableData)

                // extract the fold change in a plotly compliant format
                var phosphositeTreatmentsFoldChange = Object.keys(result).map((phosphosite, index) => {
                    // collect the foldchange for the mcf7 tissue
                    var mcf7 = result[phosphosite].map(x => { return Math.log(x["fold_change"] + 0.0005) })
                    // create an empty array for HL60 as it is missing  
                    var hl60 = Array(mcf7.length)
                    // create an empty array for ntera2 as it is missing 
                    var ntera2 = Array(mcf7.length)
                    // Return a Plotly object with heatmap data
                    return [phosphosite, { 
                        z: [mcf7, hl60, ntera2],
                        x: result[phosphosite].map(x => { return x["treatment"] }), 
                        y: ["MCF-7", "HL-60", "NTERA-2"],
                        type: 'heatmap' }]
                })

                var plotData = Object.fromEntries(phosphositeTreatmentsFoldChange);
                setPlotlyData(plotData)
            })
    }, kinaseName);

    return <div className={classes.root}>
    <Grid container spacing={3} justifyContent="center">
        <Grid item xs={8}>
            <MaterialTable
                icons={tableIcons}
                title="Tissue inhibitors heatmaps"
                columns={[
                    { title: 'Phosphosite', field: 'phosphosite' },
                    { title: 'Protein name', field: 'kinase_name' },
                    { title: 'Residue', field: 'residue' },
                    { title: 'Probability', field: 'probability', type: "numeric" }
                ]}
                data={pdtData}
                detailPanel={[
                    {
                        tooltip: 'Show fold change Heatmap',
                        render: rowData => {
                            return (
                                <div
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >
                                    <Plot
                                        data={[plotlyData[rowData.phosphosite]]}
                                        layout={{
                                            width: "100%",
                                            height: 240,
                                            yaxis: {
                                                title: {
                                                    text: 'Log Fold change'
                                                }
                                            }
                                        }}
                                        config={{ displayModeBar: false }}
                                    />
                                </div>
                            )
                        },
                    }
                ]}
            />
        </Grid>
    </Grid>
</div>

}

export default Protein;