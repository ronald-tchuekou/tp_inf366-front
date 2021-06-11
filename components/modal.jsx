import loadCustomRoutes from 'next/dist/lib/load-custom-routes';
import { useRouter } from 'next/router';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import InjectLoader from '../src/utils/utils';

const Modal = forwardRef((props, ref) => {
    const loader_ref = useRef();
    const [loader, setLoader] = useState(undefined);
    useImperativeHandle(ref, () => ({
        showLoader: () => {
            setLoader(new InjectLoader(loader_ref.current));
        },
        dismissLoader: () => {
            loader.dismiss();
        }
    }));
    return (
        <div className={`modal__root ${props.show ? 'show' : ''}`}>
            <div {...props} ref={loader_ref} className="app__card">
            {props.children}
            </div>
        </div>
    )
});

const ModalHeader = (props) => {
    return (
        <div {...props} className="card__header">
            {props.children}
        </div>
    )
};

const ModalContent = (props) => {
    return (
        <div {...props} className="card__body">
            {props.children}
        </div>
    )
};

const ModalFooter = (props) => {
    return (
        <div {...props} className="card__footer">
            {props.children}
        </div>
    )
};

export {
    Modal,
    ModalHeader,
    ModalContent,
    ModalFooter
}