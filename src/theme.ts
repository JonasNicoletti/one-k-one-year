import { red, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(75,192,192,1)'
        },
        secondary: {
            main: '#FFC154'
        },
        error: {
            main: red.A400
        },
        background: {
            default: grey[900]
        }
    }
});

export default theme;