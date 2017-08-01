/**
 * Created by diaohy on 2016/7/1.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//关于import什么时候用{}，什么时候不用大括号，通过那个插件或者组件是否包含default来判断，如果包含，则不需要{}

/*actions*/
import * as globalActions from '../../Redux/Action/Global';
import * as userActions from '../../Redux/Action/User'
import SubLogin from '../../Component/SubLogin/SubLogin';

import * as util from '../../Util/util'
import {USER_INFO} from '../../Util/const';
import AppBar from 'material-ui/AppBar';

/*files*/

/**
 * connect中间件
 * connect一定要写在需要传递参数的组件头部，因为这是语法规则，只对当前关联的组件生效，和java的原理是一致的
 * state用法：state => state（传递全部state）
 * dispatch用法：（单个action）bindActionCreators(navActions, dispatch)，（多个action）bindActionCreators({...action1, ...action2}, dispatch)
 */
@connect(
    state => state,
    dispatch => bindActionCreators({...globalActions, ...userActions}, dispatch)
)
export default class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.user.id,
            username: this.props.user.username,
            password:this.props.user.password
        };
        this.login = function (e) {
            let {username, password} = this.state;
            this.props.login({loginName:username,password:password}).then((res)=>{
                if(!res){
                    util.showAlert();
                    return;
                }
                if(res.status == 200 && res.data.success){
                    this.props.history.push("/");
                }else{
                    util.showAlert(res.data.msg);
                }
            });
        };
        this.handleChange = (type, event) => {
            let value = event.target.value;
            switch (type){
                case "username":
                    this.setState({
                        username:value
                    });
                    // this.props.setUser
                    this.props.updateUser({...this.state, username:value});
                    break;
                case "password":
                    this.setState({
                        password:value
                    });
                    break;
            }
        };
    }
    
    componentWillMount() {
        // console.log(this.props);
    }
    
    render() {
        let {username, password} = this.state;
        return(
            <div className="login-container">
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    style={{backgroundColor:'#31646b'}}
                />
                <input type="text" className="username" maxLength= "10" value={username} onChange={this.handleChange.bind(this, 'username')}/>
                <input type="password" className="password" maxLength= "10" value={password} onChange={this.handleChange.bind(this, 'password')}/>
                <button ref="loginButton" onClick={this.login.bind(this)}>登录</button>
                <SubLogin></SubLogin>
            </div>
        );
    }
}

LoginContainer.propTypes = {
    user:PropTypes.object
};