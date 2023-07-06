const { allQuery, insertQuery } = require("../function/QueryFunction");
var Card = function (data) {
    this.status=data.status
}

Card.getDatas=(cb)=>{ allQuery(`SELECT * FROM card_details`,cb)}  
Card.addCardData=(user_id,card_number,expiry,issuer,cvc,final_card,cb)=>{ insertQuery('INSERT INTO card_details (`user_id`,`card_number`,`expiry`,`issuer`,`cvc`,`status`,`card_number_text`) VALUES (?,?,?,?,?,?,?)', [user_id,card_number,expiry,issuer,cvc,0,final_card],cb)}
Card.updateCardData=(id,card_number,expiry,issuer,cvc,final_card,cb)=>{ allQuery(`UPDATE card_details SET card_number = '${card_number}', expiry = '${expiry}', issuer= '${issuer}', cvc = '${cvc}' , card_number_text = '${final_card}' WHERE id=${id}`,cb)}
Card.updateStatus=(id,status,cb)=>{ allQuery(`UPDATE card_details SET status = '${status}' WHERE id=${id}`,cb)}
Card.deleteCardData=(id,cb)=>{ allQuery(`DELETE FROM card_details WHERE id=${id}`,cb) }
Card.getDatasUser=(id,cb)=>{ allQuery(`SELECT * FROM card_details WHERE user_id=${id}`,cb)}
Card.getStatus=(id,cb)=>{ allQuery(`SELECT id FROM card_details WHERE user_id=${id} && status= 1`,cb)}
Card.addCardDataStatus=(user_id,card_number,expiry,issuer,cvc,final_card,cb)=>{ insertQuery('INSERT INTO card_details (`user_id`,`card_number`,`expiry`,`issuer`,`cvc`,`status`,`card_number_text`) VALUES (?,?,?,?,?,?,?)', [user_id,card_number,expiry,issuer,cvc,1,final_card],cb)}
module.exports = Card;                       