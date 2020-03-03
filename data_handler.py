import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses(status_id)
    return statuses


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards(force=True)

def get_cards_for_board_from_SQL(board_id):
    matching_cards = []
    all_cards = persistence.get_cards_SQL(board_id)
    for row in all_cards:
        matching_cards.append(row)
    return matching_cards

def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards
