import React, {useRef, useState} from 'react';
import {Select, TextInput} from '../components/form';
import {useRouter} from "next/router";
import Constants from '../src/constants';
import InjectLoader, { httpClient, Notification } from '../src/utils/utils';

export default function () {

    const router = useRouter();
    const loader_ref = useRef();

    const [nom, setNom] = useState({ value: '', error: false });
    const [prenom, setPrenom] = useState({ value: '', error: false });
    const [filiere, setFiliere] = useState({ value: '', error: false });
    const [departement, setDepartement] = useState({ value: '', error: false });
    const [niveau, setNiveau] = useState({ value: '', error: false });
    const [matricule, setMatricule] = useState({ value: '', error: false });

    const sign_in = () => {
        if (!validate()) return;
        let data = {
            matricule: matricule.value,
            nom: nom.value,
            prenom: prenom.value,
            filiere: filiere.value,
            departement: departement.value,
            niveau: niveau.value
        }
        let loader = new InjectLoader(loader_ref.current);
        httpClient.post(Constants.REGISTER_USER, data)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    let record = response.data.record;
                    sessionStorage.setItem(Constants.APP_USER_ID, record.utilisateur.id);
                    sessionStorage.setItem(Constants.APP_USER_STATUT, record.statut);
                    router.push('/student-dashboard');
                } else {
                    new Notification({
                        title: 'Message d\'erreur',
                        message:  response.data.errors.toString(),
                        icon: 'DGfi-cancel-circle',
                        color: 'danger',
                        duration: 7000
                    });
                }
            })
            .catch(reason => new Notification({
                title: 'Message d\'erreur',
                message: reason,
                icon: 'DGfi-cancel-circle',
                color: 'danger',
                duration: 7000
            }))
            .finally(() => loader.dismiss());
    };

    const validate = () => {
        let validate = true;
        if (nom.value === '') {
            setNom(state => ({ ...state, error: true }));
            validate = false;
        }
        if (prenom.value === '') {
            setPrenom(state => ({ ...state, error: true }));
            validate = false;
        }
        if (matricule.value === '') {
            setMatricule(state => ({ ...state, error: true }));
            validate = false;
        }
        if (niveau.value === '') {
            setNiveau(state => ({ ...state, error: true }));
            validate = false;
        }
        if (filiere.value === '') {
            setFiliere(state => ({ ...state, error: true }));
            validate = false;
        }
        if (departement.value === '') {
            setDepartement(state => ({ ...state, error: true }));
            validate = false;
        }
        return validate;
    }

    return (
        <div className={"login-container"}>
            <div ref={loader_ref} className="login_wrapper">
                <div className="login_img">
                    <img src={"register.png"} alt="Analyzer register page"/>
                </div>
                <div className="login_form" style={{minWidth: '350px'}}>
                    <div className="title">{'Inscription'}</div>
                    <p className="my-20 text-dark mx-9">L'inscription ici n'est autorisé qu'à l'étudiant de l'université de Douala.</p>
                    <div className="app__form mx-9">
                        <TextInput
                            label={'Matricule : '}
                            value={matricule.value}
                            onValueChange={(value) => setMatricule({ value: value, error: false })}
                            error={matricule.error}
                        />
                        <TextInput
                            label={'Nom : '}
                            value={nom.value}
                            onValueChange={(value) => setNom({ value: value, error: false })}
                            error={nom.error}
                        />
                        <TextInput
                            label={'Prenom : '}
                            value={prenom.value}
                            onValueChange={(value) => setPrenom({ value: value, error: false })}
                            error={prenom.error}
                        />
                        <div className="row g-2 m-0 p-0 justify-content-sb">
                            <div className="col m-0 p-0">
                                <TextInput
                                    label={'Niveau : '}
                                    type="number"
                                    value={niveau.value}
                                    onValueChange={(value) => setNiveau({ value: value, error: false })}
                                    error={niveau.error}
                                />
                            </div>
                            <div className="col m-0 p-0">
                                <Select
                                    label={'Filière : '}
                                    value={filiere.value}
                                    onValueChange={(value) => setFiliere({ value: value, error: false })}
                                    error={filiere.error}
                                    content={Constants.FILIERES}
                                />
                            </div>
                        </div>
                        <Select
                            label={'Departement : '}
                            value={departement.value}
                            onValueChange={(value) => setDepartement({ value: value, error: false })}
                            error={departement.error}
                            content={Constants.DEPARTEMENTS}
                        />
                    </div>
                    <button
                        onClick={() => sign_in()}
                        style={{marginLeft: '11px'}}
                        className={"btn btn-primary mt-10"}>
                        {'Valider'}
                    </button>
                </div>
            </div>
            
        </div>
    );
}
