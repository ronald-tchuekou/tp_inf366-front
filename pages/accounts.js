/*
 * Copyright (c) 15/05/2021 16:04
 * @author Ronald Tchuekou
 * @email  ronaldtchuekou@gmail.com
 */

import React, {useState} from 'react';
import {AllUser, AppSide} from "../components";
import Constants from "../src/constants";

const title = {
    fr: 'Tous les utilisateurs | ' + Constants.APP_NAME,
    en: 'All users | ' + Constants.APP_NAME
}

export default function (){

    const [lang, setLang] = useState('fr');

    return(
        <div className={"app__root"}>
            <AppSide lang={lang} select={'accounts'} title={title[lang]}/>
            <AllUser lang={lang} />
        </div>
    );
}
