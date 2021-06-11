import React, { useRef } from 'react';
import { StudentContent, StudentSide } from '../student';

export default function () {
    
    const content_ref = useRef();

    return (
        <div className={"app__root"}>
            <StudentSide
                onUser={(user) => content_ref.current.setContent(user.id)}
                title={'Request Manager'} />
            <StudentContent ref={content_ref} />
        </div>
    )
}