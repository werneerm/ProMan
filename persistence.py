import csv

import connection
from psycopg2 import sql

STATUSES_FILE = './data/statuses.csv'
BOARDS_FILE = './data/boards.csv'
CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _read_csv(file_name):
    """
    Reads content of a .csv file
    :param file_name: relative path to data file
    :return: OrderedDict
    """
    with open(file_name) as boards:
        rows = csv.DictReader(boards, delimiter=',', quotechar='"')
        formatted_data = []
        for row in rows:
            formatted_data.append(dict(row))
        return formatted_data


def _get_data(data_type, file, force):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache
    :param file: relative path to data file
    :param force: if set to True, cache will be ignored
    :return: OrderedDict
    """
    if force or data_type not in _cache:
        _cache[data_type] = _read_csv(file)
    return _cache[data_type]


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


@connection.connection_handler
def get_statuses(cursor,id):
    cursor.execute("""
                SELECT * FROM statuses 
                WHERE   statuses.id = %(id)s
    """, {'id':id})

    statuses = cursor.fetchall()
    return statuses


# def get_boards(force=False):
#     return _get_data('boards', BOARDS_FILE, force)


@connection.connection_handler
def get_boards(cursor, force=False):
    cursor.execute("""
                    SELECT * FROM boards
                    ORDER BY id;
                   """,
                   )
    boards = cursor.fetchall()
    return boards, force

@connection.connection_handler
def get_cards_SQL(cursor, board_id):
    cursor.execute("""
    SELECT * FROM cards
    ORDER BY id;
    """, {'board_id': board_id})
    cards = cursor.fetchall()
    return cards

def get_cards(force=False):
    return _get_data('cards', CARDS_FILE, force)

@connection.connection_handler
def statuses(cursor):
    cursor.execute("""
    SELECT * FROM statuses;
    """)

    all_status = cursor.fetchall()
    return all_status

@connection.connection_handler
def createNewCard(cursor, title, boardID, statusID):
    cursor.execute("""
    INSERT INTO cards (board_id, title, status_id)
    VALUES (%(boardID)s, %(title)s, %(statusID)s);
    """, {'title': title, 'boardID': boardID, 'statusID': statusID})

@connection.connection_handler
def changeBoardTitle(cursor, id, title):
    cursor.execute("""
    UPDATE boards
    SET title=%(title)s
    WHERE id=%(id)s
    """, {'id': id, 'title': title})

@connection.connection_handler
def deleteCard(cursor, id):
    cursor.execute("""
    DELETE FROM cards
    WHERE id=%(id)s;
    """, {'id': id})

@connection.connection_handler
def changeCard(cursor, id, title):
    cursor.execute("""
    UPDATE cards
    SET title=%(title)s
    WHERE id=%(id)s
    """, {'id': id, 'title': title})

@connection.connection_handler
def change_status_of_a_card(cursor,card_id,status_id,boardId):
    cursor.execute("""
    UPDATE cards
    SET status_id = %(status_id)s,board_id = %(boardId)s
    WHERE id = %(card_id)s
    """, {'card_id': card_id, 'status_id': status_id,'boardId':boardId})


@connection.connection_handler
def find_status_id(cursor,status):
    cursor.execute("""
        SELECT statuses.id
        FROM statuses
        WHERE statuses.title = %(status)s
    """,{'status':status})
    status_id = cursor.fetchall()
    return status_id
