import React from 'react';

const SearchModal = ({active, setActive, children}) => {
    return (
        <div
            className={active ? "searchModal active" : "searchModal"}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? "searchModal__contant active" : "searchModal__contant"}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default SearchModal;