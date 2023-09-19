from core.service import generate_services
from models import Promotion, PromotionCondition
from schemas import (
    PromotionConditionCreate,
    PromotionConditionRead,
    PromotionConditionReadList,
    PromotionConditionUpdate,
    PromotionCreate,
    PromotionRead,
    PromotionReadList,
    PromotionUpdate,
)

(
    create_promotion,
    get_one_promotion,
    get_all_promotion,
    find_one_promotion,
    find_all_promotion,
    update_promotion,
    delete_promotion,
    count_promotion,
) = generate_services(
    db_model=Promotion,
    create_schema=PromotionCreate,
    read_schema=PromotionRead,
    read_list_schema=PromotionReadList,
    update_schema=PromotionUpdate,
)


(
    create_promotion_condition,
    get_one_promotion_condition,
    get_all_promotion_condition,
    find_one_promotion_condition,
    find_all_promotion_condition,
    update_promotion_condition,
    delete_promotion_condition,
    count_promotion_condition,
) = generate_services(
    db_model=PromotionCondition,
    create_schema=PromotionConditionCreate,
    read_schema=PromotionConditionRead,
    read_list_schema=PromotionConditionReadList,
    update_schema=PromotionConditionUpdate,
)
