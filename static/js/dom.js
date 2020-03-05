// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        // console.log(boards);
        let title = document.querySelector('#titleOne');
        title.innerHTML = boards[0][0]['title'];
        let boardsContainer = document.querySelector('.board-container');
        let boardList = '';
        let boards_length = boards.length;
        let fullBoard = document.querySelector('.board');
        for (let item = 1; item < boards.length; item++) {
            // for (let item = 0; item < boards_length; item++) {
            let cln = fullBoard.cloneNode(false);
            cln.id = item + 1;
            boardsContainer.appendChild(cln);
            let clnPlace = document.getElementById(cln.id);
            boardList=`
             <div class="board-header"><span class="board-title"><textarea class="Border_textarea" id="titleOne" >${boards[0][0]['title']}
            </textarea></span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns">
                <div class="board-column" data-status="">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content" id="new${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="board-column" data-status="">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content" id="in progress${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="board-column" data-status="">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content" id="testing${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="board-column" data-status="">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content" id="done${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
            </div>
            `;
            clnPlace.insertAdjacentHTML("beforeend",boardList);
            // console.log(board[item]);
//                          boardList += `
//                 <div class="board-header"><span class="board-title">${board[item].title}</span>
//                 </div>
//                 <div class="board-columns" id="${board[item].id}"></div>
//
// `;
//                          // console.log(outerHtml);
//                          boardsContainer.textContent = '';
//                          boardsContainer.insertAdjacentHTML("beforeend", boardList);
//                  }
            dom.loadStatus();
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
    loadStatus: function () {
        dataHandler.getStatuses(function (statuses) {
            dom.showStatus(statuses);
        })
    },
    showStatus: function (statuses) {
        // let columnTitle = document.querySelector('.board-columns');
//         let statusImport = `
// //             <div class = "board-column">
// //             <div class = "board-column-title">${statuses[0].title}</div>
// //             <div class = "board-column-content" id="${statuses[0].id}"></div>
// //             </div>
// //             <div class = "board-column">
// //                <div class = "board-column-title">${statuses[1].title} </div>
// //                  <div class = "board-column-content" id="${statuses[1].id}"></div>
// //                </div>
// //                <div class = "board-column">
// //                <div class = "board-column-title">${statuses[2].title} </div>
// //                  <div class = "board-column-content" id="${statuses[2].id}"></div>
// //                </div>
// //             <div class = "board-column">
// //                <div class = "board-column-title">${statuses[3].title} </div>
// //                  <div class = "board-column-content" id="${statuses[3].id}"></div>
// //                </div>`
// // ;
//
//         let statusImport = `
//
//         `;
//         columnTitle.insertAdjacentHTML('beforeend',statusImport);
        dom.loadCards(statuses);
    },
    loadCards: function (statuses) {
        // retrieves cards and makes showCards called
        dataHandler.getBoards(function (boards) {
            let counter = 0;
            for (let board of boards) {
                dataHandler.getCardsByBoardId(board[counter].id, function (cards) {
                    dom.showCards(cards,statuses);
                    counter++;
                })
            }
        });
    },
    showCards: function (cards,statuses) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cards_place = document.querySelectorAll('.board-column-content');
        for(let card of cards) {
            let cica = statuses[card.board_id].title;
            let kutya = card.status_id;
            let card_place = document.getElementById(statuses[card.status_id].title+card.board_id);
                          let cardToImport = `
                        <div class="card" draggable="true" ondragstart="drag(event)">
                        <div class="card-remove" id="${card.id}"><img src="/static/bin.png" alt="Bin" width="20"></div>
                        <div> <span class="card-title" ><textarea placeholder= "${card.title}" {color:#FFFFFF} class="Card_textarea" ></textarea> </span> </div>
                        </div>
                        `;
            card_place.insertAdjacentHTML('beforeend',cardToImport)

        // let sections = document.querySelectorAll('section');
        // let columns = document.querySelectorAll('.board-column')
        // // console.log(boardID);
        // let cards_array = [];
        // let board_array = [];
        // let cardToReallyImport;
        // let coordinate;
        // for (let num = 0; num < sections.length; num++) {
        //     for (let num_of_cards = 0; num_of_cards < cards.length; num_of_card  s++) {
        //         if (sections[num].id == cards[num_of_cards].board_id) {
        //             // console.log(cards[num_of_cards].board_id);
        //             cards_array.push(cards[num_of_cards]);
        //         }
        //     }
        //     board_array.push(num + 1);
        // }
        // // console.log(cards_array);
        // for (let good_card_num = 0; good_card_num < cards_array.length; good_card_num++) {
        //     for (let column_of_num = 0; column_of_num < columns.length; column_of_num++) {
        //         //&& cards_array[good_card_num].board_id == board_array[0]
        //         if (cards_array[good_card_num].status_id == columns[column_of_num].dataset.status) {
        //             // console.log("fos");
        //             let cardToImport = `
        //                 <div class="card" draggable="true" ondragstart="drag(event)">
        //                 <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
        //                 <div class="card-title">${cards_array[good_card_num].title} | ${cards_array[good_card_num].id}</div>
        //                 </div>
        //                 `;
        //             cardToReallyImport = cardToImport;
        //         }
        //     }
        //     coordinate = good_card_num;
        //     cards_place[cards_array[coordinate].status_id].insertAdjacentHTML("beforeend", cardToReallyImport);
        }

        let btn = document.querySelectorAll('.board-add');
        for (let addCard=0; addCard < btn.length; addCard++) {
        btn[addCard].addEventListener('click', (ev)=>{
            let boardNum = addCard + 1;
            dataHandler.createNewCard('added card', boardNum, 0, function (boardID) {
                dom.doNothing();
            });
        });
        }

        let txtarea = document.querySelectorAll('.textarea');
        for (let index=0; index < txtarea.length; index++) {
            txtarea[index].addEventListener('blur', (ev)=>{
                let boardNum2 = index + 1;
                let new_title = ev.target.value;
                dataHandler.changeBoardTitle(boardNum2, new_title, function () {
                    dom.doNothing();
                })
            })
        }
        let deleteButton = document.querySelectorAll('.card-remove');
        for (let index2=0; index2 < deleteButton.length; index2++) {
            deleteButton[index2].addEventListener('click', (ev) => {
                console.log(deleteButton[index2]);
                let cardNum = deleteButton[index2].id;
                console.log(cardNum);
                dataHandler.deleteCard(cardNum, function () {
                    dom.doNothing();
                });
            })
        }
        // console.log(cards_array);
        // for (let good_card in cards_array) {
        //     // console.log(good_card);
        //     for (let column in columns){
        //     if (good_card.status_id == column.dataset.status) {
        //         console.log("fos");
        //         let cardToImport = `
        //     <div class="card">
        //     <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
        //     <div class="card-title">${card.title}</div>
        //     </div>
        //     `;
        //         cards_place[good_card.status_id].insertAdjacentHTML("beforeend", cardToImport);
        //     }
        //     }
        //     }
        // for (let card of cards) {
        //     for (let card_place of cards_place) {
        //         if (card.status_id == card_place.id) {
        //         let cardToImport = `
        //         <div class="card">
        //         <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
        //         <div class="card-title">${card.title}</div>
        //         </div>
        //         `;
        //            // card_place.insertAdjacentHTML("beforeend", outerHtml);
        //          // card_place.insertAdjacentHTML("beforeend", cardToImport);
        //     }
        //     }
        // }
    },
    doNothing: function () {
        window.location.reload()
    }
    // here comes more features
};
