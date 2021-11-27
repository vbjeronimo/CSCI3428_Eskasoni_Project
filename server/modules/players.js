//===== VARIABLES =================================================================================
const playersList = [];       // List of players currently on the server

/**
 * @author Vitor Jeronimo <vitor.bently@hotmail.com>
 *
 * Defines a Player object, which holds an user id, username, room name, score
 * and an array of words entered by the player during the current round of
 * the game.
 */
class Player {
    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Instantiates a Player object.
     * 
     * @param   {string} id       The user's socket.id provided by Socket.io
     * @param   {string} userName Username provided by the user at login 
     * @param   {string} roomName Room ID provided by the user at login 
     */
    constructor(id, userName, roomName) {
        this._id = id;
        this._userName = userName;
        this._roomName = roomName;
        this._score = 0;
        this._words = [];
    }
    
    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "id" property.
     *
     * @returns {string} The user's ID provided by socket.io
     */
    get id() {
        return this._id;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "userName" property.
     *
     * @returns {string} User name
     */
    get userName() {
        return this._userName;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "roomName" property.
     *
     * @returns {string} Current room ID
     */
    get roomName() {
        return this._roomName;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "score" property.
     *
     * @returns {number} Total score for current player
     */
    get score() {
        return this._score;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "words" property.
     *
     * @returns {object} List of all words entered by the user during
     *                   the current round.
     */
    get words() {
        return this._words;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Setter method for "score" property.
     *
     * @param {number} newScore New score for current player 
     */
    set score(newScore) {
        if (newScore > 0) {
            this._score = newScore;
        }
    }

    /**
     * Setter method for "words" property.
     *
     * @param {object} newWords List of words given by the player
     *                          during the current round of the game
     */
    set words(newWords) {
        this._words = newWords;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Returns a player object whose id matches the id passed into the method.
     * Otherwise, returns null.
     * 
     * @param   {string} id The user's id provided by Socket.io
     * @returns {object}    Player object or null
     */
    static getCurrentPlayer(id) {
        // Search player's index by its id
        const index = playersList.findIndex(player => player._id === id);

        // If the player was found, return it
        if (index !== -1) {
            return playersList[index];
        }

        return null;
        }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Removes the player from the players list.
     * 
     * @param {object} id   The user's id provided by Socket.io
     */
    static playerDisconnects(id) {
        // Search the player's index by its id
        const index = playersList.findIndex(player => player._id === id);

        // If the player was found, remove it from the players array
        if (index !==-1) {
            playersList.splice(index);
        }
    }
}

//===== EXPORTS ===================================================================================

module.exports = {
    playersList,
    Player
}
