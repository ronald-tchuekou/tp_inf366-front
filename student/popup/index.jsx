/**
 * Popup pour initialiser une nouvelle requete.
 * @author Ronald Tcheukou
 */

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Select, Textarea, TextInput } from '../../components/form';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '../../components/modal';
import Constants from '../../src/constants';
import { httpClient, Notification } from '../../src/utils/utils';

export default forwardRef((props, ref) => {

    const loader_ref = useRef();
    const [index, setIndex] = useState(-1);
    const [edited, setEdited] = useState(false);
    const [requete, setRequete] = useState(undefined);
    const [description, setDescription] = useState({ value: '', error: false });
    const [destination, setDestination] = useState({ value: '', error: false });
    const [object, setObject] = useState({ value: '', error: false });
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setDescription({ value: '', error: false });
            setDestination({ value: '', error: false });
            setObject({ value: '', error: false });
            setIndex(-1);
            setRequete(undefined);
            setShow(true);
            setEdited(false);
        },
        edit: (elt, index) => {
            setDescription({ value: elt.description, error: false });
            setDestination({ value: elt.destination, error: false });
            setObject({ value: elt.objet, error: false });
            setIndex(index);
            setRequete(elt);
            setEdited(true);
            setShow(true);
        }
    }));

    const save = () => {
        if (!validate()) return;
        let data = {
            etudiant_id: sessionStorage.getItem(Constants.APP_USER_ID),
            objet: object.value,
            destination: destination.value,
            description: description.value,
            service_accueil_id: 1,
        }
        console.log('data', data);
        loader_ref.current.showLoader();
        httpClient.post(Constants.REQUEST_INIT, data)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    props.onAdded(response.data.record);
                    setShow(false);
                    new Notification({
                        title: 'Message de succès',
                        message: "Vous venez d'initialiser une nouvelle requete",
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

    function saveEdited() {
        if (!validate()) return;
        let data = {
            etudiant_id: sessionStorage.getItem(Constants.APP_USER_ID),
            objet: object.value,
            destination: destination.value,
            description: description.value,
            service_accueil_id: 1,
        }

        console.log('data', data);
        loader_ref.current.showLoader();
        httpClient.post(Constants.REQUEST_INIT + "/" + requete.id, data)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    props.onEdited(response.data.record, index);
                    setShow(false);
                    new Notification({
                        title: 'Message de succès',
                        message: "Vous venez de modifier requete.",
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

    /**
     * Fonction qui permet de faire la validation des champs.
     * @returns 
     */
    const validate = () => {
        let validate = true;
        if (description.value === '') {
            setDescription(state => ({ ...state, error: true }));
            validate = false;
        }
        if (destination.value === '') {
            setDestination(state => ({ ...state, error: true }));
            validate = false;
        }
        if (object.value === '') {
            setObject(state => ({ ...state, error: true }));
            validate = false;
        }
        return validate;
    }

    function handleClick() {
        if (edited)
            saveEdited();
        else
            save();
    }

    return (
        <Modal ref={loader_ref} show={show}>
            <ModalHeader>
                <h3>Initialisation d'une nouvelle requête</h3>
            </ModalHeader>
            <ModalContent>
                <div className="app__form">
                    <Select
                        label={'Selectionner l\'objet'}
                        content={Constants.REQUEST_OBJECTS}
                        value={object.value}
                        error={object.error}
                        onValueChange={(value) => setObject({value: value, error: false})}
                        />
                    <Textarea
                        label="Description de la requete"
                        value={description.value}
                        error={description.error}
                        onValueChange={(val) => setDescription({value: val, error: false})}/>   
                    <TextInput
                        label="Indiquer la destination"
                        value={destination.value}
                        error={destination.error}
                        onValueChange={(value) => setDestination({value: value, error: false})}/>
                </div>
            </ModalContent>
            <ModalFooter>
                <button onClick={() => handleClick()} className="btn btn-primary btn-sm mr-10">
                    Valider
                </button>
                <button onClick={() => setShow(false)} className="btn btn-danger btn-sm">
                    Annuler
                </button>
            </ModalFooter>
        </Modal>
    ) 
});