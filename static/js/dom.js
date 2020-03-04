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
        dom.loadStatus();
        for(let board of boards){
            for (let item=0; item < boards_length; item++) {
                // console.log(board[item]);
                boardList += `
                <section class="board">
                <div class="board-header"><span class="board-title">${board[item].title}</span>
                </div>
                <div class="board-columns" id="${board[item].id}"></div>
                </section>
            `;
                 const outerHtml = `
           <div class ="board-container">
                ${boardList}
              </div>
`;
                 // console.log(outerHtml);
             boardsContainer.textContent = '';
             boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
            }
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
    loadStatus: function(){
        dataHandler.getStatuses(function (statuses) {
            dom.showStatus(statuses);
        })
    },
    showStatus: function(statuses){
    let columnTitle = document.querySelector('.board-columns');
        let statusImport = `
            <div class = "board-column">
            <div class = "board-column-title">${statuses[0].title}</div>
            <div class = "board-column-content" id="${statuses[0].id}"></div>
            </div>
            <div class = "board-column">
               <div class = "board-column-title">${statuses[1].title} </div>
                 <div class = "board-column-content" id="${statuses[1].id}"></div>
               </div>
               <div class = "board-column">
               <div class = "board-column-title">${statuses[2].title} </div>
                 <div class = "board-column-content" id="${statuses[2].id}"></div>
               </div>
            <div class = "board-column">
               <div class = "board-column-title">${statuses[3].title} </div>
                 <div class = "board-column-content" id="${statuses[3].id}"></div>
               </div>`
;
        columnTitle.insertAdjacentHTML('beforeend',statusImport);
        dom.loadCards();
    },
    loadCards: function () {
        // retrieves cards and makes showCards called
        dataHandler.getBoards(function (boards) {
            console.log(boards);
            let counter = 0;
            for (let board of boards){
                dataHandler.getCardsByBoardId(board[counter].id,function (cards) {
                    dom.showCards(cards);
                    counter ++;
                })
                }
        });
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cards_place = document.querySelectorAll('.board-column-content');
        let boards = document.querySelectorAll('.boards');
        for (let card of cards) {
            for (let card_place of cards_place) {
                if (card.status_id == card_place.id) {
                let cardToImport = `
                <div class="card">
                <div class="board-column-title">${card.title}</div>
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                </div>
                `;
                const outerHtml = `
           <div class ="board-column-title">
              ${cardToImport}
              </div>
                `;
                   card_place.insertAdjacentHTML("beforeend", outerHtml);
                 // card_place.insertAdjacentHTML("beforeend", cardToImport);
            }
            }
        }
    },
    // here comes more features
};
