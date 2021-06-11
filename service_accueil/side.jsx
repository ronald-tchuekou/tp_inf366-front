import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Constants from '../src/constants';
import { useRouter } from 'next/router';
import InjectLoader, { httpClient, Notification } from '../src/utils/utils';

export default function ({ title, onUser, req_cat, setReqCat }) {

    const router = useRouter();
    const loader_ref = useRef();

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        let user_id = sessionStorage.getItem(Constants.APP_USER_ID);
        if (user_id === undefined || user_id === 'undefined' || user_id === null) {
            router.push('/login');
        } else {
            let load = new InjectLoader(loader_ref.current);
            httpClient.get(Constants.SERVICE_ACCUEIL_USER + '/' + user_id)
                .then(response => {
                    if (response.status === 200) {
                        setUser(response.data.record);
                        onUser(response.data.record.utilisateur);
                    } else {
                        new Notification({
                            title: 'Message d\'erreur',
                            message: response.data.errors.toString(),
                            duration: 7000,
                            icon: 'DGfi-cancel-circle',
                            color: 'danger'
                        });
                        
                    }
                })
                .catch(reason => new Notification({
                    title: 'Message d\'erreur',
                    message: reason,
                    duration: 7000,
                    icon: 'DGfi-cancel-circle',
                    color: 'danger'
                }))
                .finally(() => load.dismiss());
        }
    }, []);

    function logout() {
        sessionStorage.setItem(Constants.APP_USER_ID, undefined);
        sessionStorage.setItem(Constants.APP_USER_STATUT, undefined);
        router.push('/');
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={"app__side"}>
                <div ref={loader_ref} className="side__wrapper">
                    <div className="title">{'Service D\'accueil'}</div>
                    <div className="side__profile">
                        <div className="user-profile">
                            <div className="img">
                                <img src={"profile1.png"} alt="user profile"/>
                            </div>
                        </div>
                    </div>
                    {user === undefined ? <></> : (<>
                        <div className="side-profile-info">
                        <div className="user-name">
                            {`${user.utilisateur.nom} ${user.utilisateur.prenom}`}
                        </div>
                        <div>
                            <span>{ 'Matricule : ' }</span>
                            <span className="text-bold">{`${user.utilisateur.matricule}`}</span>
                        </div>
                        <div>
                            <span>{ 'Filière : ' }</span>
                            <span className="text-bold">{ `${user.filiere}` }</span>
                        </div>
                        <div>
                            <span>{ 'Département : ' }</span>
                            <span className="text-bold">{ `${user.departement}` }</span>
                        </div>
                        </div>
                    </>)}
                    <ul className="side__menu">
                        <li className={`side__menu-item ${req_cat === 'RI' ? 'active' : ''}`}>
                            <a onClick={()=>setReqCat('RI')}>
                                <i className="DGfi-event_note"> </i>
                                <span>Requêtes initiées</span>
                            </a>
                        </li>
                        <li className={`side__menu-item ${req_cat === 'RA' ? 'active' : ''}`}>
                            <a onClick={()=>setReqCat('RA')}>
                                <i className="DGfi-event_available"> </i>
                                <span>Requêtes assignées</span>
                            </a>
                        </li>
                        <li className={`side__menu-item ${req_cat === 'RR' ? 'active' : ''}`}>
                            <a onClick={()=>setReqCat('RR')}>
                                <i className="DGfi-event_busy"> </i>
                                <span>Requêtes renvoyées</span>
                            </a>
                        </li>
                        <li className={`side__menu-item`}>
                            <a onClick={()=>logout()}>
                                <i className="DGfi-logout"> </i>
                                <span>Déconnexion</span>
                            </a>
                        </li>
                        <span className="copyright">&copy; - 2021, powered by Ronald Tchuekou.</span>
                    </ul>
                </div>
            </div>
        </>
    );
}