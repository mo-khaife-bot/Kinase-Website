import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

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

    return <Card className={classes.paper}>
        <CardContent>
            <Typography className={classes.pos} color="textSecondary">
                {kinase.name}
            </Typography>
            <Typography className={classes.pos} variant="body2" component="p">
                {kinase.protein_fullname}
            </Typography>
            <Typography className={classes.pos} color="body" gutterBottom>
                <b>UniProt protein name:</b> {kinase.gene_name}
            </Typography>
            <Typography className={classes.pos} variant="body" component="p">
                <b>Families:</b> {kinase.family}
            </Typography>
        </CardContent>
    </Card>
}

export default KinaseDescription;