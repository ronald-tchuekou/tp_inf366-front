import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from "next/router";
import Constants from "../src/constants";
import Lang from "../src/lang";

export default function ({lang, title, select}) {

    const router = useRouter();

    const [selected, setSelected] = useState('');

    useEffect(() => {
        setSelected(select);
    }, [select]);

    const goTo = route => {
        router.push(route).then(r => console.log(r));
    }

    function logout() {
        // TODO
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={"app__side"}>
                <div className="side__wrapper">
                    <div className="title">{Constants.APP_NAME}</div>
                    <ul className="side__menu">
                        <li className={`side__menu-item ${selected=== 'dashboard' ? 'active' : ''}`}>
                            <a onClick={()=>goTo("/")}>
                                <i className="DGfi-home1"> </i>
                                <span>{Lang.app_side.dashboard[lang]}</span>
                            </a>
                        </li>
                        <li className={`side__menu-item ${selected=== 'add-account' ? 'active' : ''}`}>
                            <a onClick={()=>goTo("add-account")}>
                                <i className="DGfi-person_add"> </i>
                                <span>{Lang.app_side.add_account[lang]}</span>
                            </a>
                        </li>
                        <li className={`side__menu-item ${selected=== 'accounts' ? 'active' : ''}`}>
                            <a onClick={()=>goTo("accounts")}>
                                <i className="DGfi-people_alt"> </i>
                                <span>{Lang.app_side.all_accounts[lang]}</span>
                            </a>
                        </li>
                        <li className={`side__menu-item ${selected=== 'payements' ? 'active' : ''}`}>
                            <a onClick={()=>goTo("payements")}>
                                <i className="DGfi-monetization_on"> </i>
                                <span>{Lang.app_side.payements[lang]}</span>
                            </a>
                        </li>
                        <li className={`side__menu-item ${selected=== 'logout' ? 'active' : ''}`}>
                            <a onClick={() => logout()}>
                                <i className="DGfi-logout"> </i>
                                <span>{Lang.app_side.logout[lang]}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
