// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector('#boards');
        let boardList = '';
        // console.log(boards.length);
        let boards_length = boards.length;
        for(let board of boards){
            for (let item=0; item < boards_length; item++) {
                dom.loadCards(board[item].id);
                // console.log(board[item]);
                boardList += `
                <div class="board-header"><span class="board-title">${board[item].title}</span>
                </div>
                <div class="cards" id="${board[item].id}">
                
                </div>
            `;
                 const outerHtml = `
           <section class="board">
                ${boardList}
             </section>
              `;
                 // console.log(outerHtml);
             boardsContainer.textContent = '';
             boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
            }
            // dom.loadCards(board[1].id);
            // console.log(board[1].title);
            // boardList += `
            //     <li>${board.title}</li>
            // `;

        }

        // const outerHtml = `
        //     <ul class="board-container">
        //         ${boardList}
        //     </ul>
        // `;

        // let boardsContainer = document.querySelector('#boards');
        // boardsContainer.textContent = '';
        // boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function (cards) {
            dom.showCards(cards)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        // console.log(cards);
        let cards_place = document.querySelectorAll('.cards');
        // console.log(cards_place)
        for (let card of cards) {
            // console.log(cards_place)
            for (let card_place of cards_place) {
            if (card.board_id == card_place.id) {
                let cardToImport = `
                <div class="card">
                <div class="board-column-title">${card.title}</div>
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.title}</div>
                </div>
                `
                 card_place.insertAdjacentHTML("beforeend", cardToImport);
            }
            }
        }
    },
    // here comes more features
};
