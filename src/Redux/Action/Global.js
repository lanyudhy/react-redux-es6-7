/**
 * Created by diaohy on 2017/6/7.
 */
import {CURRENT_ANIMATE} from '../../Util/const';

export const currentAnimate = (cls) => ({
    type: CURRENT_ANIMATE,
    cls
});