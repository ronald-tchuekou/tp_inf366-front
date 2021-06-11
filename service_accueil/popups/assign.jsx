/**
 * Popup pour assigner une nouvelle requete.
 * @author Ronald Tcheukou
 */

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Select } from '../../components/form';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '../../components/modal';
import Constants from '../../src/constants';
import { httpClient, Notification } from '../../src/utils/utils';

export default forwardRef((props, ref) => {

    const loader_ref = useRef();
    const [req, setReq] = useState(undefined);
    const [index, setIndex] = useState(-1);
    const [service_traitant, setServiceTraitant] = useState({ value: '', error: false });
    const [STTab, setSTTab] = useState([]);
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        open: (elt, index) => {
            setShow(true);
            setReq(elt);
            setIndex(index);
            setServiceTraitant({ value: '', error: false });
            getServiceTraitant();
        }
    }));

    function getServiceTraitant() {
        loader_ref.current.showLoader() 
        httpClient.get(Constants.SERVICE_TRAITANT_USER)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    setSTTab(response.data.record.map(item => ({
                        label: item.utilisateur.nom + ' ' + item.utilisateur.prenom + ' - ' + item.role,
                        value: item.utilisateur.id
                    })));
                } else {
                    new Notification({
                        title: 'Message d\'erreur',
                        message: response.data.errors.toString(),
                        icon: 'DGfi-cancel',
                        color: 'danger',
                        duration: 5000
                    });
                }
            })
            .catch(reason => new Notification({
                title: 'Message d\'erreur',
                message: reason,
                icon: 'DGfi-cancel',
                color: 'danger',
                duration: 5000
            }))
            .finally(() => loader_ref.current.dismissLoader());
    }

    const save = () => {
        if (!validate()) return;
        let data = {
            requete_id: req.id,
            service_traitant_id: service_traitant.value
        }
        console.log('data', data);
        loader_ref.current.showLoader()
        httpClient.post(Constants.REQUEST_INIT + '/assign/' +req.id, data)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    props.onAssign(index);
                    setShow(false);
                    new Notification({
                        title: 'Message de succès',
                        message: "La à été assignée avec succès.",
                        icon: 'DGfi-check_circle',
                        color: 'success',
                        duration: 3000
                    });
                } else {
                    new Notification({
                        title: 'Message d\'erreur',
                        message: response.data.errors.toString(),
                        icon: 'DGfi-cancel',
                        color: 'danger',
                        duration: 7000
                    });
                }
            })
            .catch(reason => new Notification({
                title: 'Message d\'erreur',
                message: reason,
                icon: 'DGfi-cancel',
                color: 'danger',
                duration: 7000
            }))
            .finally(() => loader_ref.current.dismissLoader());
    }

    /**
     * Fonction qui permet de faire la validation des champs.
     * @returns 
     */
    const validate = () => {
        let validate = true;
        if (service_traitant.value === '') {
            setServiceTraitant(state => ({ ...state, error: true }));
            validate = false;
        }
        return validate;
    }

    return (
        <Modal ref={loader_ref} show={show}>
            <ModalHeader>
                <h3>Assignation de requête</h3>
            </ModalHeader>
            <ModalContent>
                <div className="app__form" style={{width: '400px'}}>   
                    <Select
                        label="Indiquer la description du fichier"
                        value={service_traitant.value}
                        error={service_traitant.error}
                        content={[{label: '....', value: ''}, ...STTab]}
                        onValueChange={(value) => setServiceTraitant({value: value, error: false})}/>
                </div>
            </ModalContent>
            <ModalFooter>
                <button onClick={() => save()} className="btn btn-primary btn-sm mr-10">
                    Valider
                </button>
                <button onClick={() => setShow(false)} className="btn btn-danger btn-sm">
                    Annuler
                </button>
            </ModalFooter>
        </Modal>
    ) 
});