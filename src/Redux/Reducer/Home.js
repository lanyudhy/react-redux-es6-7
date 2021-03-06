/**
 * Created by diaohy on 2016/7/2.
 */
// 初始化状态
import {RECEIVE_NAV, RECEIVE_BOOK} from '../../Util/const';
let initNavList = {
    navMain: [],
    bookDetails: []
};

export function home(state = initNavList, action) {
    switch (action.type) {
        case RECEIVE_NAV:
            return {
                ...state,   //三个点是展开符
                navMain: action.navMain
            };
        case RECEIVE_BOOK:
            return {
                ...state,
                bookDetails: action.bookDetails
            };
        default:
            return {...state};
    }
}