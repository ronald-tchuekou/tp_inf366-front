import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import InjectLoader, { httpClient, Notification, FloatMenu } from '../src/utils/utils';
import Constants from '../src/constants';
import { InitializeRequest, PieceJointe } from '.';
import RequestItem from './request_item';

export default forwardRef((props, ref) => {

    const load_content = useRef();
    const pj_ref = useRef();
    const add_ref = useRef();
    const [tab, setTab] = useState([]);

    useImperativeHandle(ref, () => ({
        setContent: (user_id) => {
            let load = new InjectLoader(load_content.current);
            httpClient.get(Constants.REGISTER_USER + '/requetes/' + user_id)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        setTab(response.data.record);
                    } else {
                        new Notification({
                            title: "Message d'erreur",
                            message: response.data.errors.toString(),
                            duration: 5000,
                            icon: 'DGfi-cancel_circle',
                            color: 'danger'
                        });
                    }
                })
                .catch(reason => new Notification({
                    title: "Message d'erreur",
                    message: reason,
                    duration: 5000,
                    icon: 'DGfi-cancel_circle',
                    color: 'danger'
                }))
                .finally(() => load.dismiss());
        }
    }));
    function deleteR(elt, index) {
        let lo = new InjectLoader(load_content.current);
        httpClient.get(Constants.REQUEST_INIT + '/delete/' + elt.id)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                setTab(state => [...state.slice(0, index),
                ...state.slice(index + 1)]);
                new Notification({
                    title: "Message de succès",
                    message: 'Requete supprimée avec succès.',
                    duration: 3000,
                    icon: 'DGfi-check_circle',
                    color: 'success'
                });
            } else {
                new Notification({
                    title: "Message d'erreur",
                    message: response.record.errors.toString(),
                    duration: 5000,
                    icon: 'DGfi-cancel_circle',
                    color: 'danger'
                });
            }
        })
        .catch(reason => new Notification({
            title: "Message d'erreur",
            message: reason,
            duration: 5000,
            icon: 'DGfi-cancel_circle',
            color: 'danger'
        }))
        .finally(() => lo.dismiss());
    }
    function editR(elt, index) {
        add_ref.current.edit(elt, index);
    }
    function addPJR(elt, index) {
        pj_ref.current.open(elt, index);
    }
    function addNewRequest(elt) {
        setTab(state => [elt, ...state]);
    }
    function addEditRequest(elt, index) {
        setTab(state => [...state.slice(0, index), elt, ...state.slice(index + 1)]);
    }
    function addPJRCount(elt, index) {
        setTab(state => [...state.slice(0, index), elt, ...state.slice(index + 1)]);
    }
    return (
        <div className={"app__content"}>
            <div ref={load_content} className="app__card">
                <div className="card__header">
                    <h3 className="text-dark">Liste des derniéres requêtes enregistrées</h3>
                    <button onClick={() =>  add_ref.current.open()} className="btn btn-sm btn-violet btn-round"><i className="DGfi-add"></i>&nbsp;&nbsp;Nouveau</button>
                </div>
                <div className="card__body">
                    <div className="table__wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Objet</th>
                                    <th>Description</th>
                                    <th>Réponse</th>
                                    <th>Status</th>
                                    <th>Motif</th>
                                    <th>Nb pièces J.</th>
                                    <th>Initié le</th>
                                    <th className="w-50"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tab.length === 0 ? <EmptyContent/> :  tab.map((item, i) => <RequestItem
                                    item={item}
                                    key={i}
                                    onDelete={(elt) => deleteR (elt, i)}
                                    onEdit={(elt) => editR(elt, i)}
                                    addPJ={(elt) => addPJR(elt, i)}
                                />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PieceJointe onPJAdded={(elt, index) => addPJRCount(elt, index)} ref={pj_ref} />
            <InitializeRequest
                onEdited={(elt, index) => addEditRequest(elt, index)}
                onAdded={(elt) => addNewRequest(elt)}
                ref={add_ref} />
        </div>
    );
});

/**
 * Fonction that display empty content.
 * @returns 
 */
const EmptyContent = () => {
    return (
        <tr>
            <td className="align-center p-15" colSpan="8">Vous n'avez initialisé aucune requetes pour le moment.</td>
        </tr>
    )
}
