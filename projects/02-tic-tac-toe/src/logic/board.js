import { PATTERNS } from "../components/constants";

export const checkWinnerFrom = (board) => {
    let a,b,c
    if (PATTERNS.some(pattern => {
        [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    }))
    return board[a]
}
