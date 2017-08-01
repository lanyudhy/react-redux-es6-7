/**
 * Created by diaohy on 2017/6/7.
 */
import {CURRENT_ANIMATE, USER_INFO} from '../../Util/const';
import instance from '../../Util/instance'
import * as util from '../../Util/util'
import NProgress from 'nprogress'


export const serUser = (response) =>({
    type: USER_INFO,
    id:response.id,
    username:response.loginName || response.username,
    password:response.password || ""
});

export const login = (args, sb, fb) => async (dispatch, getState) => {
    try {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        let response = await instance.post(`/user/login`,args);
        if(response.status == 200 && response.data.success){
            await dispatch(serUser(response.data.data));
        }
        NProgress.done();
        return response;
    } catch (error) {
        NProgress.done();
        util.showAlert();
    }
};

export const updateUser = (user) => (dispatch, getState)=>{
    dispatch(serUser(user));
};