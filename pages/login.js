import React, {useRef, useState} from 'react';
import {TextInput} from '../components/form';
import {useRouter} from "next/router";
import InjectLoader, { httpClient, Notification } from '../src/utils/utils';
import Constants from '../src/constants';

export default function () {

    const router = useRouter();
    const loader_ref = useRef();
    const [matricule, setMatricule] = useState({ value: '', error: false });
    const [password, setPassword] = useState({ value: '', error: false });

    const sign_in = () => {
        if (!validate()) return;
        let loader = new InjectLoader(loader_ref.current);
        httpClient.post(Constants.CHECK_USER, {
            matricule: matricule.value,
            password: password.value
        })
            .then(response => {
                console.log(response.data.record)
                if (response.status === 200) {
                    let data = response.data.record;
                    if (data == null) {
                        new Notification({
                            title: 'Message d\'erreur',
                            message: 'Votre matricule ou mot de passe est incorrect.',
                            duration: 7000,
                            icon: 'DGfi-info_outline',
                            color: 'danger'
                        });
                        return;
                    }
                    sessionStorage.setItem(Constants.APP_USER_ID, data.id);
                    sessionStorage.setItem(Constants.APP_USER_STATUT, data.statut);
                    if (data.statut === 'Student') {
                        router.push('/student-dashboard');
                    }
                    else if(data.statut === 'Home_service') {
                        router.push('/service-accueil');
                    } else if(data.statut === 'Traite_service') {
                        router.push('/traite-service');
                    } else {
                        new Notification({
                            title: 'Message d\'erreur',
                            message: 'Une erreur s\'est produite, veuillez réssayer.',
                            duration: 7000,
                            icon: 'DGfi-info_outline',
                            color: 'accent'
                        });
                    }
                } else {
                    new Notification({
                        title: 'Message d\'erreur',
                        message: response.data.errors,
                        duration: 7000,
                        icon: 'DGfi-info_outline',
                        color: 'accent'
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
            .finally(() => loader.dismiss());
    };

    const validate = () => {
        let validate = true;
        if (matricule.value === '') {
            setMatricule(state => ({ ...state, error: true }));
            validate = false;
        }
        if (password.value === '') {
            setPassword(state => ({ ...state, error: true }));
            validate = false;
        }
        return validate;
    }

    return (
        <div className={"login-container"}>
            <div ref={loader_ref} className="login_wrapper">
                <div className="login_img">
                    <img src={"login.png"} alt="Analyzer login page"/>
                </div>
                <div className="login_form" style={{minWidth: '350px'}}>
                    <div className="title">{'Connexion'}</div>
                    <div className="app__form mx-9">
                        <TextInput
                            label={'Matricule : '}
                            type="text"
                            value={matricule.value}
                            onValueChange={(value) => setMatricule({ value: value, error: false })}
                            error={matricule.error}
                        />
                        <TextInput
                            type="password"
                            label={'Mot de passe : '}
                            value={password.value}
                            onValueChange={(value) => setPassword({ value: value, error: false })}
                            error={password.error}
                        />
                    </div>
                    <div className="d-flex justify-content-sb align-items-center">
                        <button
                            onClick={() => sign_in()}
                            style={{marginLeft: '11px'}}
                            className={"btn btn-primary mt-10"}>
                            {'Valider'}
                        </button>
                        <span onClick={() => router.push('/register')} className="text-primary text-bold mr-10 cursor-pointer">S'inscrire</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
