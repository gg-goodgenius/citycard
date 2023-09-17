ALTER TABLE card_events 
    FOREIGN KEY (card_id) 
        REFERENCES cards(card_id);

ALTER TABLE card_events 
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id);

ALTER TABLE card_events
    FOREIGN KEY (promotion_id) 
        REFERENCES promotion(promotion_id);

ALTER TABLE promotion_condition
    FOREIGN KEY (promotion_id) 
        REFERENCES promotions(promotion_id);

ALTER TABLE sale_points 
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id);

ALTER TABLE shifts 
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id);

ALTER TABLE paths 
    FOREIGN KEY (shift_id) 
        REFERENCES shifts(shift_id);

ALTER TABLE paths 
    FOREIGN KEY (user_id) 
        REFERENCES users(user_id);
