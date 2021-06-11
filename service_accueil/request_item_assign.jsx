import React, { useRef } from 'react';
import { BoutonIcon } from 'mirajs/dist/react';
import {FloatMenu } from '../src/utils/utils';
import Constants from '../src/constants';

/**
 * Fonction to set an item of content.
 * @param {Object} param0 
 * @returns 
 */
 const RequestItemAssign = ({ item, onDelete, onEdit, addPJ }) => {
    const menu_ref = useRef();
    const getLabel = elt => {
        let value = Constants.REQUEST_OBJECTS.find(item => item.value === elt);
        return value === undefined ? '' : value.label;
    }
    // const setMenu = () => {
    //     new FloatMenu(menu_ref.current, [
    //         {title: 'Supprimer', onClick: () => onDelete(item), icon: 'DGfi-delete'},
    //         {title: 'Modifier', onClick: () => onEdit(item), icon: 'DGfi-createmode_editedit'},
    //         {title: 'Ajout PJ', onClick: () => addPJ(item), icon: 'DGfi-attach_file'},
    //     ])
    // }
    return (
        <tr>
            <td className="py-10">{ item.id }</td>
            <td>{ getLabel(item.objet) }</td>
            <td>{ item.description }</td>
            <td>{ item.reponse }</td>
            <td><span className="badge badge-primary">{ item.statut }</span></td>
            <td>{item.piece_jointes.length}</td>
            <td>{item.updated_at}</td>
            <td ref={menu_ref}>
                {/* <BoutonIcon onClick={() => setMenu()} iconName="DGfi-more_vert" /> */}
            </td>
        </tr>
    )
}

export default RequestItemAssign;