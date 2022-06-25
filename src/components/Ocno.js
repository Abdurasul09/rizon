import React from 'react';

const Modal = ({active, setActive, children}) => {
    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? "modal__contant active" : "modal__contant"}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;