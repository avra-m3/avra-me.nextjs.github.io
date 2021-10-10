import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import {FunctionComponent} from "react";
import {Theme} from "@mui/material";

const styles = (theme: Theme) => createStyles({
    "@global": {
        "body": {
            background: theme.palette.background.default,
        },
        "*:focus": {
            outline: 0,
        },
        ".text-white": {
            color: theme.palette.common.white,
        },
        ".row": {
            display: "flex",
            flexWrap: "wrap",
            marginRight: -theme.spacing(2),
            marginLeft: -theme.spacing(2),
        },
        ".MuiContainer-root": {
            marginBottom: theme.spacing(12),
            paddingRight: theme.spacing(8),
            paddingLeft: theme.spacing(8),
            [theme.breakpoints.down('lg')]: {
                marginBottom: theme.spacing(10),
            },
            [theme.breakpoints.down('md')]: {
                marginBottom: theme.spacing(8),

            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(6),
                paddingRight: theme.spacing(4),
                paddingLeft: theme.spacing(4),
            }
        },

        ".lg-mg-top": {
            marginTop: `${theme.spacing(10)} !important`,
            [theme.breakpoints.down('lg')]: {
                marginTop: `${theme.spacing(9)} !important`,
            },
            [theme.breakpoints.down('md')]: {
                marginTop: `${theme.spacing(8)} !important`,
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: `${theme.spacing(7)} !important`,
            },
        },
        ".lg-mg-bottom": {
            marginBottom: `${theme.spacing(10)} !important`,
            [theme.breakpoints.down('lg')]: {
                marginBottom: `${theme.spacing(9)} !important`,
            },
            [theme.breakpoints.down('md')]: {
                marginBottom: `${theme.spacing(8)} !important`,
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: `${theme.spacing(7)} !important`,
            },
        },
        ".lg-p-top": {
            paddingTop: `${theme.spacing(10)} !important`,
            [theme.breakpoints.down('lg')]: {
                paddingTop: `${theme.spacing(9)} !important`,
            },
            [theme.breakpoints.down('md')]: {
                paddingTop: `${theme.spacing(8)} !important`,
            },
            [theme.breakpoints.down('sm')]: {
                paddingTop: `${theme.spacing(7)} !important`,
            },
        },
    },
});

const globalStyles: FunctionComponent<WithStyles<typeof styles>> = () => {
    return null;
}

export default withStyles(styles, {withTheme: true})(globalStyles);
