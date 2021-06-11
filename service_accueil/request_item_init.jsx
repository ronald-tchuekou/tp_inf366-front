import React, { useRef } from 'react';
import { BoutonIcon } from 'mirajs/dist/react';
import {FloatMenu } from '../src/utils/utils';
import Constants from '../src/constants';

/**
 * Fonction to set an item of content.
 * @param {Object} param0 
 * @returns 
 */
 const RequestItemInit = ({ item, onValidate, onAssign, onReject }) => {
    const menu_ref = useRef();
    const getLabel = elt => {
        let value = Constants.REQUEST_OBJECTS.find(item => item.value === elt);
        return value === undefined ? '' : value.label;
    }
    const setMenu = () => {
        new FloatMenu(menu_ref.current, [
            {title: 'Valider', onClick: () => onValidate(item), icon: 'DGfi-check'},
            {title: 'Assigner', onClick: () => onAssign(item), icon: 'DGfi-queue_play_next'},
            {title: 'Renvoyer', onClick: () => onReject(item), icon: 'DGfi-backspace'},
        ])
    }
    return (
        <tr>
            <td>{ item.id }</td>
            <td>{ getLabel(item.objet) }</td>
            <td>{ item.description }</td>
            <td>{ item.reponse }</td>
            <td><span className="badge badge-violet">{ item.statut }</span></td>
            <td>{item.piece_jointes.length}</td>
            <td>{item.created_at}</td>
            <td ref={menu_ref}><BoutonIcon onClick={() => setMenu()} iconName="DGfi-more_vert"/></td>
        </tr>
    )
}

export default RequestItemInit;