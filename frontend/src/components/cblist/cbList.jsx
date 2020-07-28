import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Preloader from "../Utils/preloader";

import withHocs from './cbListHoc';


class CbList extends React.Component {
    state = {
        anchorEl: null,
        openDialog: false,
        checked: false
    };



    handleClick = ({ currentTarget }, data) => {
        this.setState({
            anchorEl: currentTarget,
            data,
        });
    };

    handleCheckbox = (value) => {
        this.setState({
            checked: value
        })
    }


    render() {
        const { anchorEl, data: activeElem = {} } = this.state;

        const { classes } = this.props;

        console.log(this.props.data);

        return (
            <>

                <Paper className={classes.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Чеклист</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.data.loading ? <TableRow><TableCell><Preloader /></TableCell></TableRow>:
                                this.props.data.cbs.map(cb => {
                                return (
                                    <TableRow key={cb._id}>
                                        <TableCell component="th" scope="row">{cb.title}</TableCell>
                                        <TableCell>
                                            <Checkbox checked={cb.checked} onChange={(value)=>this.handleCheckbox(value)} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
};
export default withHocs(CbList);