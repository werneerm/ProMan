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
    loadStatus: function(){
        dataHandler.getStatuses(function (statuses) {
            dom.showStatus(statuses);
        })
    },
    showStatus: function(statuses){
    let columnTitle = document.querySelector('.board-columns');
        let statusImport = `
            <div class = "board-column">
            <div class = "board-column-title">${statuses[0].title} </div>
            <div class = "board-column-content"></div>
</div>
            <div class = "board-column">
               <div class = "board-column-title">${statuses[1].title} </div>
                 <div class = "board-column-content"></div>
               </div>
               <div class = "board-column">
               <div class = "board-column-title">${statuses[2].title} </div>
                 <div class = "board-column-content" ></div>
               </div>
            <div class = "board-column">
               <div class = "board-column-title">${statuses[3].title} </div>
                 <div class = "board-column-content " ></div>
               </div>`
;
        columnTitle.insertAdjacentHTML('beforeend',statusImport);
        dom.loadCards();
    },
    loadCards: function () {
        // retrieves cards and makes showCards called
        dataHandler.getBoards(function (boards) {
            let counter = 0;
            for (let board of boards){
                console.log(board[counter].id);
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
        for (let card of cards) {
            for (let card_place of cards_place) {
                if (card.board_id == card_place.id) {
                let cardToImport = `
                <div class="card"
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.title}</div>
                </div>
                `;
                   const outerHtml = `
           <div class ="board-column-title">
              
              </div>`;
                   card_place.insertAdjacentHTML("beforeend", outerHtml);
                 card_place.insertAdjacentHTML("beforeend", cardToImport);
            }
            }
        }
    },
    // here comes more features
};
