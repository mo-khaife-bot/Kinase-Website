import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Home() {

  const classes = useStyles();

  // observe the state of kinases and update the view on change
  const [kinases, setKinases] = useState([]);
  // observe the state of keyword and update the view on change
  const [keyword, setKeyword] = useState("");

  // Update the the view when the value of keyword changes
  useEffect(() => {
    // If the size of keyword is larger than 1 then fetch new results
    if (keyword && keyword.length > 1) {
      const url = "http://127.0.0.1:5000/kinase/search/" + keyword;
      // call the backend to search for the keyword, then update the value of kinases
      fetch(url)
        .then((result) => result.json())
        .then((result) => {
          // set the new value of Kinases with the returned result
          setKinases(result);
        });
    }
  }, [keyword]);

  // On change update the value of keyword to trigger a view update
  const onChange = ({ target }) => setKeyword(target.value);
  // useHistory can be used to navigate to new routes 
  const history = useHistory();

  // Render the view
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xl={2} lg={2} md={4} sm={4} xs={8}>
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={kinases}
            onInputChange={onChange}
            onChange={(e, value) => history.push("/kinase", { name: value.name })}
            getOptionLabel={(option) => option.name}
            style={{ width: 600 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by Kinase name"
                variant="standard"
                size='medium'
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
