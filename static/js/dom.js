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
        let boards_length = boards.length;
        for(let board of boards){
            for (let item=0; item < boards_length; item++) {
                dom.loadCards(board[item].id);
                boardList += `
                <div class="board-header"><span class="board-title"><textarea class="boardTitle" id="texta" onclick = "changeBoardTitle()" style="resize: none;background-color: rgba(0, 0, 0, 0); border-color: rgba(0, 0, 0, 0)">${board[item].title}</textarea></span>
                <button class="board-add">Add Card</button>
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
        }
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
        let cards_place = document.querySelectorAll('.cards');
        for (let card of cards) {
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

    changeBoardTitle: function () {
            let textareas = document.querySelectorAll('.boardTitle')
            for (let num=0; num < textareas.length; num++) {
                textareas[num].addEventListener('blur', (event)=>{
                    let change = event.target.value;
                    console.log(change);
                })
            }
        },
};