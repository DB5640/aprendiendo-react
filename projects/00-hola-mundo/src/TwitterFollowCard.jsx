import './TwitterFollowCard.css';
import { useState } from 'react';



export function TwitterFollowCard({ formatUserName, userName, name, initalIsFollowing = false }) {

    const [isFollowing, setIsFollowing] = useState(initalIsFollowing);
    const handleClick = () => setIsFollowing(!isFollowing);

    const buttonClassName = isFollowing ? 'tw-followCard-button isFollowing' : 'tw-followCard-button';

    console.log(`Estoy renderizando el componente con el nombre ${name} y el usuario ${userName}`);

    return (<>
        <article>
            <header>
                <img alt="avatar" src={ `src\\assets\\1677248886508.png` } />
                <div>
                    <strong>{ name }</strong>
                    <span>{ formatUserName(userName) }</span>
                </div>
            </header>
            <aside>
                <button onClick={handleClick} className={ buttonClassName }></button>
            </aside>
        </article>
    </>

    )
}