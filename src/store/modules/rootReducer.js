import { combineReducers } from 'redux';

import login from './login/reducer';
import home from './home/reducer';
import common from './common/reducer';

export default combineReducers({
  login,
  home,
  common,
});
