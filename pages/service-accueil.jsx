import React, { useRef, useState } from 'react';
import { ServiceAccueilContent, ServiceAccueilSide } from '../service_accueil';

export default function () {
    
    const content_ref = useRef();

    const [user, setUser] = useState(undefined);
    const [req_cat, setReqCat] = useState('RI');

    function setContent(_user, _req) {
        if (_req === 'RI') {
            content_ref.current.setInitContent(_user.id);
        } else if (_req === 'RA') {
            content_ref.current.setAssignContent(_user.id);
        } else {
            content_ref.current.setRejectContent(_user.id);
        }
    }

    return (
        <div className={"app__root"}>
            <ServiceAccueilSide
                req_cat={req_cat}
                setReqCat={(re) => {
                    setReqCat(re);
                    setContent(user, re);
                }}
                onUser={(_user) => {
                    setUser(_user);
                    setContent(_user, req_cat);
                }}
                title={'Request Manager'} />
            <ServiceAccueilContent ref={content_ref} />
        </div>
    )
}