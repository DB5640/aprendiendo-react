import { StrictMode } from 'react';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

export function App() {
    const formatUserName = (userName) => `@${userName}`;
    
    return (
        <StrictMode>
            <section style={ { display: "flex", flexDirection: "column", gap: "15px" } }>
                <TwitterFollowCard
                    formatUserName={ formatUserName }
                    isFollowing
                    userName="david_dbz"
                    name="David Bolaños Zuluaga"
                />
                <TwitterFollowCard
                    formatUserName={ formatUserName }
                    isFollowing
                    userName="jorge_gaitan"
                    name="Jorge Eliecer Gaitán"
                />
                <TwitterFollowCard
                    formatUserName={ formatUserName }
                    userName="pedro_pepito_p"
                    name="Pedro Pepito Pérez"
                />
            </section>
        </StrictMode>
    )
}