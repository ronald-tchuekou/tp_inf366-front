/*
 * Copyright (c) 15/05/2021 16:04
 * @author Ronald Tchuekou
 * @email  ronaldtchuekou@gmail.com
 */

import React, {useState} from 'react';
import {AddUser, AppSide, Dashboard} from "../components";
import Constants from "../src/constants";

const title = {
    fr: 'Ajouter un compte | ' + Constants.APP_NAME,
    en: 'Add account | ' + Constants.APP_NAME
}

export default function (){

    const [lang, setLang] = useState('fr');

    return(
        <div className={"app__root"}>
            <AppSide lang={lang} select={'add-account'} title={title[lang]}/>
            <AddUser lang={lang} />
        </div>
    );
}
