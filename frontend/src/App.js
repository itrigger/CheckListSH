import React, {Component} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import CbList from './components/cblist/cbList';
import theme from './components/theme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const client = new ApolloClient({
    uri: `http://localhost:3012/graphql`
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <MuiThemeProvider theme={theme}>
                <div className="App">
                   <CbList/>
                </div>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}

export default App;
