import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { FinishPopup, RejectPopup } from '.';
import { Select } from '../components/form';
import Constants from '../src/constants';
import InjectLoader, { httpClient, Notification } from '../src/utils/utils';
import RequestItemAssigned from './request_item_assigned';
import RequestItemFinish from './request_item_finished';
import RequestItemReject from './request_item_reject';

export default forwardRef((props, ref) => {

    const load_content = useRef();
    const assign_ref = useRef();
    const reject_ref = useRef();

    const [tab, setTab] = useState([]);
    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('');

    useImperativeHandle(ref, () => ({
        setAssignedContent: (user_id) => {
            setCat('RA');
            setTitle('Liste des requêtes qui vous ont été assignées');
            setContent(Constants.SERVICE_TRAITANT_USER + '/requetes/' + user_id);
        },
        setFinishContent: (user_id) => {
            setCat('RT');
            setTitle('Liste des requêtes traitées');
            setContent(Constants.SERVICE_TRAITANT_USER + '/requetes/finish/' + user_id);

        },
        setRejectContent: (user_id) => {
            setCat('RR');
            setTitle('Liste des requêtes rejetées');
            setContent(Constants.SERVICE_TRAITANT_USER + '/requetes/reject/' + user_id);

        }
    }));

    function setContent(url) {
        let load = new InjectLoader(load_content.current);
            httpClient.get(url)
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

    /**
     * Fonction qui permet de faire la validation d'une requete.
     */
    function validate(req, index) {
        let load = new InjectLoader(load_content.current);
        httpClient.get(Constants.REQUEST_INIT + "/valider/" + req.id)
            .then(response => {
                console.log(response.data);
                if (response.status) {
                    setTab(state => [...state.slice(0, index), response.data.record, ...state.slice(index + 1)]);
                    new Notification({
                        title: "Message de succès",
                        message: 'La requete à été validé avec succès.',
                        duration: 3000,
                        icon: 'DGfi-check_circle',
                        color: 'success'
                    });
                } else {
                    new Notifiction({
                        title: "Message d'erreur",
                        message: response.data.errors.toString(),
                        duration: 5000,
                        icon: 'DGfi-cancel',
                        color: 'danger'
                    });
                }
            })
            .catch(reason => new Notification({
                title: "Message d'erreur",
                message: reason,
                duration: 5000,
                icon: 'DGfi-cancel',
                color: 'danger'
            }))
        .finally(() => load.dismiss())
    }
    function reject(elt, index) {
        reject_ref.current.open(elt, index);
    }
    function assign(elt, index) {
        assign_ref.current.open(elt, index);
    }

    return (
        <div className={"app__content"}>
            <div ref={load_content} className="app__card">
                <div className="card__header">
                    <h3 className="text-dark">{title}</h3>
                </div>
                <div className="card__body">
                    <div className="row g-2 app__form m-0 mb-10 p-0 justify-content-sb align-items-center">
                        <div className="col row g-2">
                            <div className="col">
                                <Select
                                    label=''
                                    value=''
                                    content={[{label: 'Par Filière', value: ''}, ...Constants.FILIERES]}
                                    onValueChange={(val) => console.log(val)}
                                />
                            </div>
                            <div className="col">
                                <Select
                                    label=''
                                    value=''
                                    content={[
                                        { label: 'Par Niveau', value: '' },
                                        { label: '....', value: '' },
                                        { label: 'Niveau 1', value: '1' },
                                        { label: 'Niveau 2', value: '2' },
                                        { label: 'Niveau 3', value: '3' },
                                        { label: 'Niveau 4', value: '4' },
                                        { label: 'Niveau 5', value: '5' },
                                    ]}
                                    onValueChange={(val) => console.log(val)}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm btn-primary"><i className="DGfi-filter_list_alt"></i></button>
                        </div>
                    </div>
                    <div className="table__wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Objet</th>
                                    <th>Description</th>
                                    <th>{cat === 'RR' ? 'Motif rejet' : 'Réponse'}</th>
                                    <th>Status</th>
                                    <th>Nb pièces J.</th>
                                    <th>Date</th>
                                    <th className="w-50"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tab.length === 0 ? <EmptyContent cat={cat} /> : cat === 'RA' ?
                                    tab.map((item, i) => <RequestItemAssigned item={item}
                                        key={i}
                                        onValidate={(elt) => validate (elt, i)}
                                        onAssign={(elt) => assign(elt, i)}
                                        onReject={(elt) => reject(elt, i)} />) : cat === 'RT' ?
                                        tab.map((item, i) => <RequestItemFinish item={item}
                                            key={i}/>) :
                                            tab.map((item, i) => <RequestItemReject item={item}
                                                key={i}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FinishPopup onFinish={(index) => setTab(state => [...state.slice(0, index), ...state.slice(index + 1)])} ref={assign_ref}/>
            <RejectPopup onReject={(index) => setTab(state => [...state.slice(0, index), ...state.slice(index + 1)])} ref={reject_ref}/>
        </div>
    );
});

/**
 * Fonction that display empty content.
 * @returns 
 */
const EmptyContent = ({cat}) => {
    return (
        <tr>
            <td className="align-center p-15" colSpan="8">
                {cat === 'RA' ? 'Il n\'existe aucune requêtes assignées pour le moment.' : 
                    cat === 'RT' ? 'Il n\'existe aucune requêtes traitées pour le moment.' :
                        'Il n\'existe aucune requêtes rejetées pour le moment.'}
            </td>
        </tr>
    )
}
