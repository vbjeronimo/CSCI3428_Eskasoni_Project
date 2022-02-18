const GameState = require('./gamestate');
const Player = require('./player');

class Lobby {
    static activeLobbies = new Map();
    static playerToLobbyMapping = new Map();

    constructor(lobbyId) {
        this.lobbyId = lobbyId;
        this.players = [];
        // Generate new gamestate when lobby is created
    }

    /**
     * Retrieves admin player object associated with this lobby.
     * @returns {Player} lobby admin.
     */
    getLobbyAdmin() {
        if (this.players.length === 0) {
            return null;
        }
        return this.players[0];
    }

    /**
     * Creates a player object and appends it to the collection of players
     * in this lobby.
     * @param {string}  playerId - unique string that identifies the player.
     * @param {string}  username - player username.
     */ 
    addPlayerToLobby(playerId, username) {
        const player = Player.createNewPlayer(playerId, username);
        this.players.push(player)

        Lobby.playerToLobbyMapping.set(playerId, this.lobbyId)
    }
    
    /**
     * Removes player from the collection of players in this lobby.
     * @param {string}   playerId - unique string that identifies the player.
     */
    removePlayerFromLobby(playerId) {
        const index = this.players.findIndex(player => player.getPlayerId() === playerId);

        if (index === -1) {
            // TODO: implement custom error
            console.log(`ERROR: ${playerId} not found in ${this.lobbyId}`)
            return
        }

        this.players.splice(index, 1);
        Lobby.playerToLobbyMapping.delete(playerId);
    }

    /**
     * Creates a Lobby object.
     * @param {string}   lobbyId - unique string that identifies the lobby.
     * @returns {Lobby}  empty Lobby object with a pre-generated game state.
     */
    static createLobby(lobbyId) {
        const gameState = GameState.createGameState();
        const newLobby = new Lobby(lobbyId, gameState);
        Lobby.activeLobbies.set(lobbyId, newLobby);

        return newLobby;
    }

    /**
     * Returns whether there exists a Lobby object with the specified ID.
     * @param {string}   lobbyId - unique string that identifies the lobby.
     * @returns {boolean}   true if there exists such object; false otherwise.
     */
    static hasLobbyWithId(lobbyId) {
        return Lobby.activeLobbies.has(lobbyId);
    }

    static getLobbyById(lobbyId) {
        if (!Lobby.activeLobbies.has(lobbyId)) {
            //TODO: implement custom error
            console.log(`ERROR: no lobby with ID ${lobbyId}`);
            return
        }
        return Lobby.activeLobbies.get(lobbyId);
    }

    static getLobbyByPlayerId(playerId) {
        const lobbyId = Lobby.playerToLobbyMapping.get(playerId);
        return Lobby.activeLobbies.get(lobbyId);
    }
}

module.exports = Lobby;
