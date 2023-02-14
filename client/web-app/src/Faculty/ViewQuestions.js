import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import QuizIcon from '@mui/icons-material/Quiz';



export default class ViewQuestions extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            arr: this.props.questions,
            ansSize: false,
        };

    }
    componentWillMount() {

        console.log(this.state.arr)
        const len = this.state.arr.length
    }



    render() {
        return (
            <>


            </>
        );
    }
}
