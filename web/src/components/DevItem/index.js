import React from 'react';

import './styles.css';

function DevItem({ dev, handleDestroyDev }) {

    async function handleDelete() {
        await handleDestroyDev(dev._id);
    }

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <div>
                <a href={`https://github.com/${dev.github_username}`}>Access GitHub profile</a>
                <button onClick={handleDelete} className="delete-buttom">Delete</button>
            </div>
        </li>
    );
}

export default DevItem;