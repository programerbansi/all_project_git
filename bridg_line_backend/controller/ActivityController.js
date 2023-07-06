const Activity = require("../models/activity");
const { validateActivity } = require("../validator/Validator");
const path = require('path');
const resultsPerPage = 5;
const db = require("../db/conn");
const { forEachWithDelay } = require("../function/QueryFunction");
const History = require("../models/history");
exports.addMessage= async function (req, res) {
    const { error, value } = validateActivity(req?.body);
 
    if (error) {
       await res.status(422).send({ 'status': false, 'code': 422, 'message': (error), 'error': 'Error!' })
    }
    else {
       try {
        
          const {user_id,invoice_id}=req.body;
          Activity.addMessage(req.body, function (err, msg) {
             if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
             else {
                if(req.files != null)
                {
                    const {document} = req.files;
                    if (!document) return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Document  not found!', 'error': 'Error!' })
                    else {
                       if (document.length > 1) {
                          document.map((i, idx) => {
                             let document1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                             let data = { message_id:msg.insertId, user_id: user_id, invoice_id: invoice_id, document: document1, name: i.name, type: i.mimetype,size: i.size }
                             Activity.addMessageDoc(data, function (err, result) {
                                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                else {
                                 let history = { user_id: user_id, form_name: 'activity', form_field_id: invoice_id, action: 'add' }
                                 History.addData(history, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
      
                                 })
                                   i.mv('./public/activity_file/' + document1, function (err) {
                                      if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                   });
                                }
                             })
                          })
                       }
                       else {
                          let document1 = `${Date.now()}${path.extname(document.name)}`;
                          let data = { message_id:msg.insertId, user_id: user_id, invoice_id: invoice_id, document: document1, name: document.name, type: document.mimetype,size: document.size }
                          Activity.addMessageDoc(data, function (err, result) {
                             if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                             else {
                              let history = { user_id: user_id, form_name: 'activity', form_field_id: invoice_id, action: 'add' }
                              History.addData(history, function (err, result) {
                                 if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
   
                              })
                                document.mv('./public/activity_file/' + document1, function (err) {
                                   if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                });
                             }
                          })
                       }
                       return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", document_path: process.env.ACTIVITY_DOC, data: [] })
            
                    }
                }
                let history = { user_id: user_id, form_name: 'activity', form_field_id: invoice_id, action: 'add' }
                History.addData(history, function (err, result) {
                   if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                })
                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", document_path: process.env.ACTIVITY_DOC, data: [] })          
             }
          })
       } catch (err) {
          res.status(500).send(err);
       }
    }
}

 exports.getMessage=async function(req,res){
    try {
        let arr = [];
        const { id } = req.params;
        Activity.getMsgDatas(id, function (err, r1) {
           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
           else {
            if(r1.length > 0)
            {
                const numOfResults = r1?.length;
                const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
                let page = req.query.page ? Number(req.query.page) : 1;
                if (page > numberOfPages) {
                   res.send('/?page=' + encodeURIComponent(numberOfPages));
                }  
                else if (page < 1) {
                   res.send('/?page=' + encodeURIComponent('1'));
                }
                else {
                   const startingLimit = (page - 1) * resultsPerPage;
                   db.query(`SELECT u.firstname ,u.lastname , u.name ,i.* FROM users as u join activity as  i on u.id = i.user_id WHERE i.invoice_id=${id} ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`, (err, rr1) => {
                      if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                      else {
                          if(rr1.length > 0)
                          {
                              forEachWithDelay(rr1, (item) => {
                                  Activity.getMsgDocDatas(item.id, function (err, r3) {
                                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                     else {
                                        let demo = { id: item.id, user_id: item.user_id, firstname: item.firstname, lastname: item.lastname, name:item.name,message: item.message, created_at: item.created_at, document: r3 }
                                        arr.push(demo);
                                     }
                                  })              
                         }, 20)
                          }
                        
                      }
                   })
                }
              
                setTimeout(() => {
                   return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.ACTIVITY_DOC, data: arr, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: r1?.length })
                }, 1000)
               
            }
            else
            {
                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.ACTIVITY_DOC, data: []})
            }
              
           }
        })
     } catch (err) {
        res.status(500).send(err);
     }
 }                        