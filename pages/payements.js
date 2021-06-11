/*
 * Copyright (c) 15/05/2021 16:04
 * @author Ronald Tchuekou
 * @email  ronaldtchuekou@gmail.com
 */

import React, {useState} from 'react';
import {AppSide, Payement} from "../components";
import Constants from "../src/constants";

const title = {
    fr: 'Paiements | ' + Constants.APP_NAME,
    en: 'Payements | ' + Constants.APP_NAME
}

export default function (){

    const [lang, setLang] = useState('fr');

    return(
        <div className={"app__root"}>
            <AppSide lang={lang} select={'payements'} title={title[lang]}/>
            <Payement lang={lang} />
        </div>
    );
}
