/**
 * lang.js
 * -------
 *
 * File to manage the language  of this application.
 *
 * @author Ronald Tchuekou
 *
 */

import login from './login';
import main from './main';
import app_side from './app_side';
import add_account from "./add_account";

/**
 * @type {{}}
 */
const Lang = {
    login: login,
    main: main,
    app_side: app_side,
    add_account: add_account,
};

export default Lang;
