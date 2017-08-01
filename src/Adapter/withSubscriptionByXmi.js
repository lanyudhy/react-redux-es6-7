/**
 * Created by Diaohy on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

/*actions*/
import * as globalActions from '../../Redux/Action/Global';

@connect(
    state => state,
    dispatch => bindActionCreators({...globalActions}, dispatch)
)

function withSubscriptionByXmi(WrappedComponent, selectData){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                data: selectData()
            };
        }
        
        componentDidMount(){
            // ... that takes care of the subscription...
        }
        
        componentWillUnmount(){
        
        }
        
        render(){
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}
export default withSubscriptionByXmi;