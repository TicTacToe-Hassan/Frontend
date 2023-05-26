export interface IGame {
    id: number,
    player1: string,
    player2: string,
    counter1: number,
    counter2: number,
    cap?: number
    create?: boolean
}