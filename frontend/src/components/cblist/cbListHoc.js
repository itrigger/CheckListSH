import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { cbQuery } from './query';
import { styles } from './styls';


export default compose(withStyles(styles), graphql(cbQuery));