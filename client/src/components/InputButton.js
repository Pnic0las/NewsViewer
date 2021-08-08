import React from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


export default function InputButton() {
const addtab = () => {

}

    return (
        <Button
            variant="contained"
            color="black"
            startIcon={<AddIcon />}
            // className={classes.add}
            size="small"
            onClick={addtab}
        >
            Create a new board
        </Button>
    )
}