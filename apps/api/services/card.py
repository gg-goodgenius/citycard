from core.service import generate_services
from models import Card, CardHistory
from schemas import (
    CardCreate,
    CardHistoryCreate,
    CardHistoryRead,
    CardHistoryReadList,
    CardHistoryUpdate,
    CardRead,
    CardReadList,
    CardUpdate,
)
from sqlalchemy.orm import Session

(
    create_card,
    get_one_card,
    get_all_card,
    find_one_card,
    find_all_card,
    update_card,
    delete_card,
    count_card,
) = generate_services(
    db_model=Card,
    create_schema=CardCreate,
    read_schema=CardRead,
    read_list_schema=CardReadList,
    update_schema=CardUpdate,
)

(
    create_cardhistory,
    get_one_cardhistory,
    get_all_cardhistory,
    find_one_cardhistory,
    find_all_cardhistory,
    update_cardhistory,
    delete_cardhistory,
    count_cardhistory,
) = generate_services(
    db_model=CardHistory,
    create_schema=CardHistoryCreate,
    read_schema=CardHistoryRead,
    read_list_schema=CardHistoryReadList,
    update_schema=CardHistoryUpdate,
)


def get_history_by_card(id: int, db: Session) -> list[CardHistoryRead]:
    return find_all_cardhistory(db=db, defualt={"card_id": id})


def get_history_by_user(id: int, db: Session) -> list[CardHistoryRead]:
    return find_all_cardhistory(db=db, defualt={"user_id": id})
