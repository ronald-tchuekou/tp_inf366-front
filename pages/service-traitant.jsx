import React, { useRef, useState } from 'react';
import { ServiceTraitantContent, ServiceTraitantSide } from '../service_traitant';

export default function () {
    
    const content_ref = useRef();

    const [user, setUser] = useState(undefined);
    const [req_cat, setReqCat] = useState('RA');

    function setContent(_user, _req) {
        if (_req === 'RA') {
            content_ref.current.setAssignedContent(_user.id);
        } else if (_req === 'RT') {
            content_ref.current.setFinishContent(_user.id);
        } else {
            content_ref.current.setRejectContent(_user.id);
        }
    }

    return (
        <div className={"app__root"}>
            <ServiceTraitantSide
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
            <ServiceTraitantContent ref={content_ref} />
        </div>
    )
}