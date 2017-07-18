import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, HashRouter as Router} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import createHistory from 'history/createHashHistory'
const history = createHistory();

/*
 全局导入less
 如果你发现你的样式没有起作用，那么很可能是没有在这里导入样式
 */

import './Style/app.less'
import './Style/home.less'
import './Style/search.less'

import * as globalActions from './Redux/Action/Global'
import { asyncComponent } from './AsyncComponent'

import HomeContainer from './Container/Home/HomeContainer'

const BookList = asyncComponent(() => import("./Container/BookList/BookListContainer"));
const NotFoundPage = asyncComponent(() => import("./Container/NotFoundPage/NotFoundPageContainer"));
@connect (
    state => state,
    dispatch => bindActionCreators(globalActions, dispatch)
)
export default class App extends React.Component {

    componentDidMount() {
        window.addEventListener('hashchange', () => {
           this.props.currentAnimate('normal')
        })
    }
    
  render() {
      const { animateCls } = this.props.global;
      console.log(animateCls);
      return (
          <Router history={history}>
              <Route render={({ location }) => {
                  return(
                      <CSSTransitionGroup
                          transitionName={animateCls}
                          transitionEnter={true}
                          transitionLeave={true}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}
                      >
                          <div key={location.pathname}>
                              <Route location={location} exact path="/" component={HomeContainer} />
                              <Route location={location} path="/bookList/:bookId" component={BookList} />
                              {/*<Route path='/404' component={NotFoundPage} />*/}
                              {/*<Redirect path="*" to='/404'/>*/}
                          </div>
                      </CSSTransitionGroup>
                  )
              }}/>
          </Router>
    );
  }
}