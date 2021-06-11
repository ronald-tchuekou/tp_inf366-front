/**
 * Popup pour assigner une nouvelle requete.
 * @author Ronald Tcheukou
 */

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Textarea } from '../../components/form';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '../../components/modal';
import Constants from '../../src/constants';
import { httpClient, Notification } from '../../src/utils/utils';

export default forwardRef((props, ref) => {

    const loader_ref = useRef();
    const [req, setReq] = useState(undefined);
    const [index, setIndex] = useState(-1);
    const [motif, setMotif] = useState({ value: '', error: false });
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        open: (elt, index) => {
            setShow(true);
            setReq(elt);
            setIndex(index);
            setMotif({ value: '', error: false });
        }
    }));

    const save = () => {
        if (!validate()) return;
        let data = {
            motif_rejet: motif.value
        };
        console.log('data', data);
        loader_ref.current.showLoader()
        httpClient.post(Constants.REQUEST_INIT + '/rejeter/' + req.id, data)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    props.onReject(index);
                    setShow(false);
                    new Notification({
                        title: 'Message de succès',
                        message: "La requete é été renvoyée avec succès.",
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
        if (motif.value === '') {
            setMotif(state => ({ ...state, error: true }));
            validate = false;
        }
        return validate;
    }

    return (
        <Modal ref={loader_ref} show={show}>
            <ModalHeader>
                <h3>Rejet de requête</h3>
            </ModalHeader>
            <ModalContent>
                <div className="app__form">   
                    <Textarea
                        label="Indiquer la description du fichier"
                        value={motif.value}
                        error={motif.error}
                        onValueChange={(value) => setMotif({value: value, error: false})}/>
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