/**
 * Created by diaohy on 2017/6/7.
 */
import {CURRENT_ANIMATE, USER_INFO} from '../../Util/const';
const initState = {
    animateCls: 'normal', //过渡动画样式
};

export const global = (state = initState, action) => {
    switch (action.type) {
        case CURRENT_ANIMATE:
            return {
                ...state,
                animateCls: action.cls
            };
        default:
            return state
    }
};

export const user = (state={id:"",username:"dhy",password:"111111"}, action) => {
    switch (action.type) {
        case USER_INFO:
            return {
                ...state,   //三个点是展开符
                id:action.id,
                username:action.username,
                password:action.password
            };
        default:
            return state
    }
};