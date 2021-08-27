import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
    },
}));

function KinaseDescription(props) {

    // get the value of kinase from the props object
    const kinase = props.kinase
    const classes = useStyles();
    // useHistory can be used to navigate to new routes 
    const history = useHistory();

    return <Card className={classes.paper}>
        <CardContent>
            <Typography className={classes.pos} color="textSecondary">
                {kinase.name}
            </Typography>
            <Typography className={classes.pos} variant="body2" component="p">
                {kinase.protein_fullname}
            </Typography>
            <Typography className={classes.pos} color="body" gutterBottom>
                <b>UniProt protein name:</b>  <Link to={{ pathname: "/protein",  data: { kinase_name: kinase.name, gene_name: kinase.gene_name } }}>{kinase.gene_name}</Link>

            </Typography>
            <Typography className={classes.pos} variant="body" component="p">
                <b>Families:</b> {kinase.family}
            </Typography>
        </CardContent>
    </Card>
}

export default KinaseDescription;
