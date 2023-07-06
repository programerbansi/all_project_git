const { forEachWithDelay, getListFunction, deleteFunction, getListIdFunction, getListIdResultFunction, getIdFunction, sendEmail } = require("../function/QueryFunction");
const Invoice = require("../models/invoice");
const { validateInvoice, validateInvoiceStatus, validatePhoto, validateTaskManageDefault, validateTaskManageAmount, validateTaskManageFile } = require("../validator/Validator");
const path = require('path');
const resultsPerPage = 10;
const db = require("../db/conn");
const Activity = require("../models/activity");
const Login = require("../models/login");
const Notification = require("../models/notification");
const History = require("../models/history");
exports.createInvoice = async function (req, res) {
   const { error, value } = validateInvoice(req.body);
   if (error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': error, 'error': 'Error!' })
   }
   else {
      try {
         Invoice.invoiceEmail(req.body.email, function (err, emailResult) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               if (emailResult.length > 0) {
                  return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Email is already taken!', 'error': 'Error!' })
               }
               else {
                  Invoice.addInvoice(req.body, function (err, invoice) {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        if (req.files) {
                           if (req.files.photo) {
                              if (req.files.photo.length > 1) {
                                 req.files.photo.map((i, idx) => {
                                    let photo1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                                    let data = { user_id: req.body.user_id, invoice_id: invoice.insertId, photo: photo1, name: i.name, type: i.mimetype, size: i.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                    Invoice.addPhoto(data, function (err, result) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          i.mv('./public/invoice_photo/' + photo1, function (err) {
                                             if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                          });
                                       }
                                    })
                                 })
                              }
                              else {
                                 let photo1 = `${Date.now()}${path.extname(req.files.photo.name)}`;
                                 let data = { user_id: req.body.user_id, invoice_id: invoice.insertId, photo: photo1, name: req.files.photo.name, type: req.files.photo.mimetype, size: req.files.photo.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                 Invoice.addPhoto(data, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       req.files.photo.mv('./public/invoice_photo/' + photo1, function (err) {
                                          if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                       });
                                    }
                                 })
                              }
                           }
                           if (req.files.demo_sheet) {
                              if (req.files.demo_sheet.length > 1) {
                                 req.files.demo_sheet.map((i, idx) => {
                                    let demo_sheet1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                                    let data1 = { user_id: req.body.user_id, invoice_id: invoice.insertId, document: demo_sheet1, name: i.name, type: i.mimetype, size: i.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                    Invoice.addDemoSheet(data1, function (err, result) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          i.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                                             if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                          });
                                       }
                                    })
                                 })
                              }
                              else {
                                 let demo_sheet1 = `${Date.now()}${path.extname(req.files.demo_sheet.name)}`;
                                 let data1 = { user_id: req.body.user_id, invoice_id: invoice.insertId, document: demo_sheet1, name: req.files.demo_sheet.name, type: req.files.demo_sheet.mimetype, size: req.files.demo_sheet.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                 Invoice.addDemoSheet(data1, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       req.files.demo_sheet.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                                          if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                       });
                                    }
                                 })
                              }
                           }
                        }

                        let history = { user_id: req.body.user_id, form_name: 'invoice', form_field_id: invoice.insertId, action: 'add' }
                        History.addData(history, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                        })
                        Login.userId(req.body.user_id, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                           else {
                              if (result.length > 0) {
                                 Notification.getReceiveStatus(function (err, result1) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       sendEmail(result[0].email, result1[0].subject, result1[0].html1)
                                    }
                                 })
                                 Notification.getAddInvoiceStatus(function (err, result2) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       sendEmail("admin@bridgelinebilling.com", result2[0].subject, `${result[0].email},${result2[0].html1}`,)
                                    }
                                 })
                              }
                           }
                        }
                        )
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
                     }
                  })
               }
            }
         })

      } catch (err) {
         res.status(500).send(err);
      }
   }
}


exports.getInvoiceAdminList = async function (req, res) {
   try {
      let arr = [];
      const { state } = req.params;
      const filterStatus = state == 'Pending' ? Invoice.invoicePendingAll : state == "Redy" ? Invoice.invoiceReadyAll : state == 'PhotoDoc' ? Invoice.invoiceNeedPhotosDocAll : state == "Other" ? Invoice.invoiceOtherAll : Invoice.invoicePendingAll
      filterStatus(function (err, r1) {
         if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
         else {
            if (r1.length > 0) {
               const numOfResults = r1.length;
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
                  const q1 = state == 'Pending' ? `SELECT j.type , u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join job_type as j join users as u on i.user_id = u.id && i.job_type = j.id &&  i.status = 'Pending' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                     state == 'Redy' ? `SELECT j.type , u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join job_type as j join users as u on i.user_id = u.id && i.job_type = j.id &&  i.status = 'Invoice ready/Make payment' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                        state == "PhotoDoc" ? `SELECT j.type , u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join job_type as j join users as u on i.user_id = u.id && i.job_type = j.id &&  (i.status = 'Need more photos' || i.status = 'Need more documents') ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                           state == 'Other' ? `SELECT j.type , u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join job_type as j join users as u on i.user_id = u.id && i.job_type = j.id &&  (i.status != 'Completed' && i.status != 'Invoice ready/Make payment' && i.status != 'Need more documents' && i.status != 'Need more photos' && i.status != 'Pending') ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                           `SELECT j.type , u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join job_type as j join users as u on i.user_id = u.id && i.job_type = j.id &&  i.status = 'Pending' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`
                  db.query(q1, (err, rr1) => {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        forEachWithDelay(rr1, (item) => {
                           Invoice.invoicePhoto(item.id, function (err, r2) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                  Invoice.invoiceDoc(item.id, function (err, r3) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       let demo = { id: item.id, user_id: item.user_id, ucomp_name: item.ucomp_name, ufname: item.ufname, ulname: item.ulname, message: item.message, amount: item.amount, firstname: item.firstname, lastname: item.lastname, email: item.email, main_phone: item.main_phone, mobile_phone: item.mobile_phone, address_1: item.address_1, address_2: item.address_2, state: item.state, city: item.city, postal_code: item.postal_code, job_type: item.type, status: item.status, estimate: item.estimate, created_at: item.created_at, photo: r2, sheet: r3 }
                                       arr.push(demo);
                                    }
                                 })
                              }
                           })
                        }, 20)   
                     }
                  })  
               }

               setTimeout(() => {
                  return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: arr, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: r1?.length })
               }, 1000)
            }
            else {
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
                  const q1 = state == 'Pending' ? `SELECT u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id  WHERE i.status = 'Pending' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                     state == 'Redy' ? `SELECT u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id  WHERE i.status = 'Invoice ready/Make payment' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                        state == "PhotoDoc" ? `SELECT u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id  WHERE i.status = 'Need more photos' || i.status = 'Need more documents' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                           state == 'Other' ? `SELECT u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id  WHERE i.status != 'Completed' && i.status != 'Invoice ready/Make payment' && i.status != 'Need more documents' && i.status != 'Need more photos' && i.status != 'Pending' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}` :
                              `SELECT u.comp_name as ucomp_name , u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id  WHERE i.status != 'Completed' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`
                  db.query(q1, (err, rr1) => {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {

                        forEachWithDelay(rr1, (item) => {
                           Invoice.invoicePhoto(item.id, function (err, r2) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 Invoice.invoiceDoc(item.id, function (err, r3) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       let demo = { id: item.id, user_id: item.user_id, ucomp_name: item.ucomp_name, ufname: item.ufname, ulname: item.ulname, amount: item.amount, firstname: item.firstname, lastname: item.lastname, email: item.email, main_phone: item.main_phone, mobile_phone: item.mobile_phone, address_1: item.address_1, address_2: item.address_2, state: item.state, city: item.city, postal_code: item.postal_code, job_type: item.job_type, status: item.status, created_at: item.created_at, photo: r2, sheet: r3 }
                                       arr.push(demo);
                                    }
                                 })
                              }
                           })
                        }, 20)
                     }
                  })
               }

               setTimeout(() => {
                  return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
               }, 1000)
            }

         }
      })             
   } catch (err) {
      res.status(500).send(err);
   }
}
exports.getPhotos = async function (req, res) {
   getIdFunction(Invoice.invoicePhoto, req.params.id, res)
}
exports.getDocuments = async function (req, res) {
   getIdFunction(Invoice.invoiceDoc, req.params.id, res)
}
exports.getInvoiceAdminCompletedList = async function (req, res) {
   try {
      let arr = [];
      Invoice.invoiceCompletedAll(function (err, r1) {
         if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
         else {
            if (r1.length > 0) {
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
                  db.query(`SELECT j.type , u.comp_name as ucomp_name ,u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join job_type as j join users as u on i.user_id = u.id && i.job_type = j.id && i.status = 'Completed' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`, (err, rr1) => {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        if(rr1.length > 0)
                        {
                           forEachWithDelay(rr1, (item) => {
                              Invoice.invoicePhoto(item.id, function (err, r2) {
                                 if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                 else {
                                    Invoice.invoiceDoc(item.id, function (err, r3) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          let demo = { id: item.id, user_id: item.user_id, ucomp_name:item.ucomp_name, ufname: item.ufname, ulname: item.ulname, message: item.message, firstname: item.firstname, lastname: item.lastname, email: item.email, main_phone: item.main_phone, mobile_phone: item.mobile_phone, address_1: item.address_1, address_2: item.address_2, state: item.state, city: item.city, postal_code: item.postal_code, job_type: item.type, amount: item.amount, status: item.status, invoice_file: item.invoice_file, estimate: item.estimate, created_at: item.created_at, photo: r2, sheet: r3 }
                                          arr.push(demo);
                                       }
                                    })
                                 }
                              })
                           }, 20)
                        }
                        else
                        {
                           return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [], currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: r1?.length })
         
                        }
                       
                        
                     }
                  })  
               }

               setTimeout(() => {
                  return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: arr, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: r1?.length })
               }, 1000)
            }
            else {
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
                  db.query(`SELECT * FROM invoice where status = 'Completed' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`, (err, rr1) => {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        forEachWithDelay(rr1, (item) => {
                           Invoice.invoicePhoto(item.id, function (err, r2) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 Invoice.invoiceDoc(item.id, function (err, r3) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       let demo = { id: item.id, user_id: item.user_id, invoice_file: item.invoice_file, amount: item.amount, firstname: item.firstname, lastname: item.lastname, email: item.email, main_phone: item.main_phone, mobile_phone: item.mobile_phone, address_1: item.address_1, address_2: item.address_2, state: item.state, city: item.city, postal_code: item.postal_code, job_type: item.job_type, status: item.status, created_at: item.created_at, photo: r2, sheet: r3 }
                                       arr.push(demo);
                                    }
                                 })
                              }
                           })
                        }, 20)
                     }
                  })
               }

               setTimeout(() => {
                  return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
               }, 1000)
            }

         }
      })
   } catch (err) {
      res.status(500).send(err);
   }
}
exports.deletePhoto = async function (req, res) {
   deleteFunction(req.params, Invoice.deletePhoto, res)
}
exports.deleteDemoSheet = async function (req, res) {
   deleteFunction(req.params, Invoice.deleteDemoSheet, res)
}
exports.deleteInvoice = async function (req, res) {
   const { id } = req.params;
   Invoice.deleteInvoice(id, function (err, result) {
      if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
      else {
         Invoice.deletePhotoByUser(id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               Invoice.deleteDemoSheetByUser(id, function (err, result) {
                  if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                  else {
                     Activity.deleteActivityByInvoiceId(id, function (err, result) {
                        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        else {
                           Activity.deleteActivityDocByInvoiceId(id, function (err, result) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data delete succesfully." })
                              }
                           })
                        }
                     })
                  }
               })
            }
         })
      }
   })
}
exports.updateInvoice = async function (req, res, next) {
   const { error, value } = validateInvoice(req?.body);
   if (error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': error, 'error': 'Error!' })
   }
   else {
      try {
         Invoice.invoiceEmail(req.body.email, function (err, emailResult) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               if (req.body.email == req.params.old_email) {
                  const { id } = req.params;
                  Invoice.updateInvoice(id, req.body, function (err, invoice) {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        if (req.files != null) {
                           const { photo, demo_sheet } = req.files;
                           if (req.files.photo != undefined) {
                              if (photo.length > 1) {
                                 photo.map((i, idx) => {
                                    let photo1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                                    let data = { user_id: req.body.user_id, invoice_id: id, photo: photo1, name: i.name, type: i.mimetype, size: i.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                    Invoice.addPhoto(data, function (err, result) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          i.mv('./public/invoice_photo/' + photo1, function (err) {
                                             if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                          });
                                       }
                                    })
                                 })
                              }
                              else {
                                 let photo1 = `${Date.now()}${path.extname(photo.name)}`;
                                 let data = { user_id: req.body.user_id, invoice_id: id, photo: photo1, name: photo.name, type: photo.mimetype, size: photo.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                 Invoice.addPhoto(data, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       photo.mv('./public/invoice_photo/' + photo1, function (err) {
                                          if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                       });
                                    }
                                 })
                              }
                           }

                           if (req.files.demo_sheet != undefined) {
                              if (demo_sheet.length > 1) {
                                 demo_sheet.map((i, idx) => {
                                    let demo_sheet1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                                    let data1 = { user_id: req.body.user_id, invoice_id: id, document: demo_sheet1, name: i.name, type: i.mimetype, size: i.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                    Invoice.addDemoSheet(data1, function (err, result) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          i.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                                             if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                          });
                                       }
                                    })
                                 })
                              }
                              else {
                                 let demo_sheet1 = `${Date.now()}${path.extname(demo_sheet.name)}`;
                                 let data1 = { user_id: req.body.user_id, invoice_id: id, document: demo_sheet1, name: demo_sheet.name, type: demo_sheet.mimetype, size: demo_sheet.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                 Invoice.addDemoSheet(data1, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       demo_sheet.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                                          if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                       });
                                    }
                                 })
                              }

                           }
                        }
                        let history = { user_id: req.body.user_id, form_name: 'invoice', form_field_id: id, action: 'edit' }
                        History.addData(history, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                        })
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
                     }
                  })
               }
               else {
                  if (emailResult.length > 0) {
                     return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Email is already taken!', 'error': 'Error!' })
                  }
                  else {
                     const { id } = req.params;
                     Invoice.updateInvoice(id, req.body, function (err, invoice) {
                        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        else {
                           if (req.files != null) {
                              const { photo, demo_sheet } = req.files;
                              if (req.files.photo != undefined) {
                                 if (photo.length > 1) {
                                    photo.map((i, idx) => {
                                       let photo1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                                       let data = { user_id: req.body.user_id, invoice_id: id, photo: photo1, name: i.name, type: i.mimetype, size: i.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                       Invoice.addPhoto(data, function (err, result) {
                                          if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                          else {
                                             i.mv('./public/invoice_photo/' + photo1, function (err) {
                                                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                             });
                                          }
                                       })
                                    })
                                 }
                                 else {
                                    let photo1 = `${Date.now()}${path.extname(photo.name)}`;
                                    let data = { user_id: req.body.user_id, invoice_id: id, photo: photo1, name: photo.name, type: photo.mimetype, size: photo.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                    Invoice.addPhoto(data, function (err, result) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          photo.mv('./public/invoice_photo/' + photo1, function (err) {
                                             if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                          });
                                       }
                                    })
                                 }
                              }


                              if (req.files.demo_sheet != undefined) {
                                 if (demo_sheet.length > 1) {
                                    demo_sheet.map((i, idx) => {
                                       let demo_sheet1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                                       let data1 = { user_id: req.body.user_id, invoice_id: id, document: demo_sheet1, name: i.name, type: i.mimetype, size: i.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                       Invoice.addDemoSheet(data1, function (err, result) {
                                          if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                          else {
                                             i.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                                                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                             });
                                          }
                                       })
                                    })
                                 }
                                 else {
                                    let demo_sheet1 = `${Date.now()}${path.extname(demo_sheet.name)}`;
                                    let data1 = { user_id: req.body.user_id, invoice_id: id, document: demo_sheet1, name: demo_sheet.name, type: demo_sheet.mimetype, size: demo_sheet.size, firstname: req.body.uFirstname, lastname: req.body.uLastname }
                                    Invoice.addDemoSheet(data1, function (err, result) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          demo_sheet.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                                             if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                          });
                                       }
                                    })
                                 }

                              }
                           }
                           let history = { user_id: req.body.user_id, form_name: 'invoice', form_field_id: id, action: 'edit' }
                           History.addData(history, function (err, result) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                           })
                           return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
                        }
                     })
                  }
               }

            }
         })

      } catch (err) {
         res.status(500).send(err);
      }
   }
}
exports.getInvoice = async function (req, res) {
   try {
      let arr = [];
      const { id } = req.params;
      Invoice.invoiceAllWithComplete(id, function (err, r1) {
         if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
         else {
            if (r1.length > 0) {
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
                  db.query(`SELECT j.type ,i.* FROM invoice as i join job_type as j  on i.job_type = j.id  WHERE user_id = ${id} && status != 'Completed' ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`, (err, rr1) => {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        forEachWithDelay(rr1, (item) => {
                           Invoice.invoicePhoto(item.id, function (err, r2) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 Invoice.invoiceDoc(item.id, function (err, r3) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       let demo = { id: item.id, user_id: item.user_id, firstname: item.firstname, lastname: item.lastname, email: item.email, main_phone: item.main_phone, mobile_phone: item.mobile_phone, address_1: item.address_1, address_2: item.address_2, state: item.state, city: item.city, postal_code: item.postal_code, job_id: item.job_type, job_type: item.type, status: item.status, estimate: item.estimate, created_at: item.created_at, photo: r2, sheet: r3 }
                                       arr.push(demo);
                                    }
                                 })
                              }
                           })
                        }, 20)
                     }
                  })
               }

               setTimeout(() => {
                  return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: arr, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: r1?.length })
               }, 1000)
            }
            else {
               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
            }

         }
      })
   } catch (err) {
      res.status(500).send(err);
   }
}

exports.updateInvoiceStatus = async function (req, res) {
   const { error, value } = validateInvoiceStatus(req?.body);
   if (error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': error, 'error': 'Error!' })
   }
   else {
      try {
         const { id } = req.params;
         Invoice.updateInvoiceStatus(id, req.body, function (err, r1) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Status updated succesfully.", data: [] })
            }
         })
      } catch (err) {
         res.status(500).send(err);
      }
   }
}
exports.getInvoiceNeed = async function (req, res) {
   try {
      let arr = [];
      const { id } = req.params;
      Invoice.invoiceNeed(id, function (err, r1) {
         if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
         else {
            if (r1.length > 0) {
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
                  db.query(`SELECT * FROM invoice WHERE status != 'Completed' && user_id = ${id} ORDER BY id DESC LIMIT ${startingLimit},${resultsPerPage}`, (err, rr1) => {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        forEachWithDelay(rr1, (item) => {
                           Invoice.invoicePhoto(item.id, function (err, r2) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 Invoice.invoiceDoc(item.id, function (err, r3) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                       let demo = { id: item.id, user_id: item.user_id, firstname: item.firstname, lastname: item.lastname, email: item.email, main_phone: item.main_phone, mobile_phone: item.mobile_phone, address_1: item.address_1, address_2: item.address_2, state: item.state, city: item.city, postal_code: item.postal_code, job_id: item.job_type, job_type: item.job_type, status: item.status, message: item.message, amount: item.amount, estimate: item.estimate, created_at: item.created_at, photo: r2, sheet: r3 }
                                       arr.push(demo);
                                    }
                                 })
                              }
                           })
                        }, 20)
                     }
                  })
               }

               setTimeout(() => {
                  return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: arr, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: r1?.length })
               }, 1000)
            }
            else {
               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", photo_path: process.env.INVOICE_PHOTO, sheet_path: process.env.INVOICE_DOC, data: [] })
            }

         }
      })
   } catch (err) {
      res.status(500).send(err);
   }
}
exports.searchGloble = async function (req, res) {
   try {
      const { id } = req.params;
      const { title, search } = req.body;
      Invoice.searchGloble(id, title, function (err, r1) {
         if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
         else {
            // console.log(title)
            if (search == "result") {
               // console.log(r1,"-----r1")
               // if (r1.length > 0) {              
               const arr = r1.map(Object.values);
               let flatArray = arr.reduce((acc, curVal) => {
                  return acc.concat(curVal)
               }, []);
               // console.log(flatArray,"-----flatArray----")
               const filtered = flatArray.filter((i) => i != null).filter(e => e.toString().toLowerCase().includes(title.toLowerCase()));
               // console.log(filtered,"-------filtered")
               const final = filtered.filter((item,
                  index) => filtered.indexOf(item) === index)
               // console.log(final,"-------final")
               const final_result = final.map((i, idx) => {
                  return { key: `${i}-${idx}`, name: i }
               })
               // console.log(final_result,"*---final_result")

               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Search data succesfully.", data: final_result })
               // }
               // else {
               // return res.status(200).send({ 'status': true, 'code': 200, 'message': "Search data succesfully.", data: [] })
               // }
            }
            else {

               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Search data succesfully.", data: r1 })
            }

         }
      })
   } catch (err) {
      res.status(500).send(err);
   }
}

exports.uploadPhoto = async function (req, res) {
   const { error, value } = validatePhoto(req.body);
   if (error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
   }
   else {
      try {
         const { user_id, invoice_id, firstname, lastname } = req.body;
         if (req.files != null) {
            const { photo } = req.files;
            if (req.files.photo != undefined) {
               if (photo.length > 1) {
                  photo.map((i, idx) => {
                     let photo1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                     let data = { user_id: user_id, invoice_id: invoice_id, photo: photo1, name: i.name, type: i.mimetype, size: i.size, firstname: firstname, lastname: lastname }
                     Invoice.addPhoto(data, function (err, result) {
                        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        else {
                           let history = { user_id: user_id, form_name: 'photo', form_field_id: invoice_id, action: 'upload photo' }
                           History.addData(history, function (err, result) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                           })
                           i.mv('./public/invoice_photo/' + photo1, function (err) {
                              if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                           });
                        }
                     })
                  })
               }
               else {
                  let photo1 = `${Date.now()}${path.extname(photo.name)}`;
                  let data = { user_id: user_id, invoice_id: invoice_id, photo: photo1, name: photo.name, type: photo.mimetype, size: photo.size, firstname: firstname, lastname: lastname }
                  Invoice.addPhoto(data, function (err, result) {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        let history = { user_id: user_id, form_name: 'photo', form_field_id: invoice_id, action: 'upload photo' }
                        History.addData(history, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                        })
                        photo.mv('./public/invoice_photo/' + photo1, function (err) {
                           if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                        });
                     }
                  })
               }
            }
            else {
               return res.status(400).send({ 'status': false, 'code': 400, 'message': 'photo not found!', 'error': 'Error!' })
            }
         }
         else {
            return res.status(400).send({ 'status': false, 'code': 400, 'message': 'photo not found!', 'error': 'Error!' })
         }
         return res.status(200).send({ 'status': true, 'code': 200, 'message': "Photo upload succesfully.", data: [] })

      } catch (err) {
         res.status(500).send(err);
      }
   }
}

exports.getPhotosByInvoice = async function (req, res) {
   const { id } = req.params
   getListIdResultFunction(Invoice.invoicePhoto, id, req.query.page, 5, `SELECT * FROM invoice_photo WHERE invoice_id=${id} ORDER BY id DESC LIMIT`, '', res)
}
exports.uploadDocument = async function (req, res) {
   const { error, value } = validatePhoto(req.body);
   if (error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
   }
   else {
      try {
         const { user_id, invoice_id, firstname, lastname } = req.body;
         if (req.files != null) {
            const { demo_sheet } = req.files;
            if (req.files.demo_sheet != undefined) {
               if (demo_sheet.length > 1) {
                  demo_sheet.map((i, idx) => {
                     let demo_sheet1 = `${Date.now()}_${idx}${path.extname(i.name)}`;
                     let data1 = { user_id: user_id, invoice_id: invoice_id, document: demo_sheet1, name: i.name, type: i.mimetype, size: i.size, firstname: firstname, lastname: lastname }
                     Invoice.addDemoSheet(data1, function (err, result) {
                        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        else {
                           let history = { user_id: user_id, form_name: 'document', form_field_id: invoice_id, action: 'upload document' }
                           History.addData(history, function (err, result) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                           })
                           i.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                              if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                           });
                        }
                     })
                  })
               }
               else {
                  let demo_sheet1 = `${Date.now()}${path.extname(demo_sheet.name)}`;
                  let data1 = { user_id: user_id, invoice_id: invoice_id, document: demo_sheet1, name: demo_sheet.name, type: demo_sheet.mimetype, size: demo_sheet.size, firstname: firstname, lastname: lastname }
                  Invoice.addDemoSheet(data1, function (err, result) {
                     if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                     else {
                        let history = { user_id: user_id, form_name: 'document', form_field_id: invoice_id, action: 'upload document' }
                        History.addData(history, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                        })
                        demo_sheet.mv('./public/invoice_document/' + demo_sheet1, function (err) {
                           if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                        });
                     }
                  })
               }

            }
            else {
               return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Document not found!', 'error': 'Error!' })
            }
         }
         else {
            return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Document not found!', 'error': 'Error!' })
         }
         return res.status(200).send({ 'status': true, 'code': 200, 'message': "Document upload succesfully.", data: [] })

      } catch (err) {
         res.status(500).send(err);
      }
   }
}

exports.getDocumentByInvoice = async function (req, res) {
   const { id } = req.params
   getListIdResultFunction(Invoice.invoiceDoc, id, req.query.page, 5, `SELECT  * FROM invoice_document WHERE invoice_id=${id} ORDER BY id DESC LIMIT`, '', res)
}
exports.updateTaskManageDefault = async function (req, res) {
   const { error, value } = validateTaskManageDefault(req.body);
   const { id } = req.params;
   if (error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': error, 'error': 'Error!' })
   }
   else {
      try {

         Invoice.updateTaskManageDefault(id, req.body, function (err, result) {
            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
            else {
               Login.userId(req.body.user_id, function (err, result) {
                  if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                  else {
                     if (result.length > 0) {
                        if (req.body.status == "Need more photos") {

                           Notification.getPhotoStatus(function (err, result1) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                              }
                           })
                        }
                        else if (req.body.status == "Need more documents") {
                           Notification.getDocStatus(function (err, result1) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                              }
                           })
                        }
                        else if (req.body.status == "Invoice ready/Make payment") {

                           Notification.getReadyStatus(function (err, result1) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                              }
                           })
                        }
                        else if (req.body.status == "Completed") {
                           Notification.getCompletedStatus(function (err, result1) {
                              if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                              else {
                                 sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                              }
                           })
                        }
                        // Notification.getDatasAdminStatus(function (err, result1) {
                        //    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        //    else {
                        //       sendEmail(result[0].email, result1[0].subject, result1[0].html1)
                        //    }
                        // })
                        // sendEmail(result[0].email,"Bridgeline Billing",`we have updated your ${req.body.status} status successfully . Please take action on your task!`)
                     }
                  }
               }
               )
               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Task manage default updated succesfully.", data: result })
            }
         })
      } catch (err) {
         res.status(500).send(err);
      }
   }
}

exports.updateTaskManageFile = async function (req, res) {
   const { error, value } = validateTaskManageFile(req.body);
   if (req.files == null || error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': (error ? error.details : "file is required!"), 'error': 'Error!' })
   }
   else {
      try {
         const { id } = req.params;
         const { user_id, firstname, lastname } = req.body;
         const { file } = req.files;
         const val = `${Date.now()}${path.extname(file.name)}`;
         let data1 = { user_id: user_id, invoice_id: id, invoice_file: val, name: file.name, type: file.mimetype, size: file.size, firstname: firstname, lastname: lastname }
         Invoice.addInvoiceFile(data1, function (err, invoice) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               Invoice.updateTaskManageFile(id, req.body, invoice.insertId, function (err, result) {
                  if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                  else {
                     if (!file) return res.status(400).send({ 'status': false, 'code': 400, 'message': 'file not found!', 'error': 'Error!' })
                     else {
                        file.mv('./public/invoice_file/' + val, function (err) {
                           if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                        });
                        Login.userId(req.body.user_id, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                           else {
                              if (result.length > 0) {
                                 if (req.body.status == "Need more photos") {
                                    Notification.getPhotoStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 else if (req.body.status == "Need more documents") {
                                    Notification.getDocStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 else if (req.body.status == "Invoice ready/Make payment") {
                                    Notification.getReadyStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 else if (req.body.status == "Completed") {
                                    Notification.getCompletedStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }

                                 // sendEmail(result[0].email,"Bridgeline Billing",`we have updated your ${req.body.status} status successfully . Please take action on your task!`)
                              }
                           }
                        }
                        )
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Task file updated succesfully." })
                     }
                  }
               })
            }
         })

      } catch (err) {
         res.status(500).send(err);
      }
   }
}
exports.updateTaskManageAmount = async function (req, res) {
   const { error, value } = validateTaskManageAmount(req.body);
   if (req.files == null || error) {
      await res.status(422).send({ 'status': false, 'code': 422, 'message': (error ? error.details : "file is required!"), 'error': 'Error!' })
   }
   else {
      try {
         const { id } = req.params;
         const { file } = req.files;
         const { user_id, firstname, lastname } = req.body;
         const val = `${Date.now()}${path.extname(file.name)}`;
         let data1 = { user_id: user_id, invoice_id: id, invoice_file: val, name: file.name, type: file.mimetype, size: file.size, firstname: firstname, lastname: lastname }
         Invoice.addInvoiceFile(data1, function (err, invoice) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               Invoice.updateTaskManageAmount(id, req.body, invoice.insertId, function (err, result) {
                  if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                  else {
                     if (!file) return res.status(400).send({ 'status': false, 'code': 400, 'message': 'file not found!', 'error': 'Error!' })
                     else {
                        file.mv('./public/invoice_file/' + val, function (err) {
                           if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                        });
                        Login.userId(req.body.user_id, function (err, result) {
                           if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                           else {
                              if (result.length > 0) {
                                 if (req.body.status == "Need more photos") {
                                    Notification.getPhotoStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 else if (req.body.status == "Need more documents") {
                                    Notification.getDocStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 else if (req.body.status == "Invoice ready/Make payment") {
                                    Notification.getReadyStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 else if (req.body.status == "Completed") {
                                    Notification.getCompletedStatus(function (err, result1) {
                                       if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                       else {
                                          sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                                       }
                                    })
                                 }
                                 // sendEmail(result[0].email,"Bridgeline Billing",`we have updated your ${req.body.status} status successfully . Please take action on your task!`)
                              }
                           }
                        }
                        )
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Task amount updated succesfully." })
                     }
                  }
               })
            }
         })


      } catch (err) {
         res.status(500).send(err);
      }
   }
}

exports.getInvoiceById = async function (req, res) {
   try {
      const { id } = req.params;
      Invoice.invoiceId(id, function (err, item) {
         if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
         else {
            if (item[0].status == 'Completed') {
               Invoice.getInvoiceFile(item[0].invoice_file, function (err, i) {
                  if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                  else {
                     let demo = { id: item[0].id, user_id: item[0].user_id, firstname: item[0].firstname, lastname: item[0].lastname, email: item[0].email, main_phone: item[0].main_phone, mobile_phone: item[0].mobile_phone, address_1: item[0].address_1, address_2: item[0].address_2, state: item[0].state, city: item[0].city, postal_code: item[0].postal_code, job_id: item[0].job_type, job_type: item[0].type, status: item[0].status, amount: item[0].amount, message: item[0].message, invoice_file: i[0], estimate: item[0].estimate, created_at: item[0].created_at }
                     return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: demo })
                  }
               })

            }
            else {

               let demo = { id: item[0].id, user_id: item[0].user_id, firstname: item[0].firstname, lastname: item[0].lastname, email: item[0].email, main_phone: item[0].main_phone, mobile_phone: item[0].mobile_phone, address_1: item[0].address_1, address_2: item[0].address_2, state: item[0].state, city: item[0].city, postal_code: item[0].postal_code, job_id: item[0].job_type, job_type: item[0].type, status: item[0].status, amount: item[0].amount, message: item[0].message, estimate: item[0].estimate, created_at: item[0].created_at }
               return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: demo })
            }
         }
      })
   } catch (err) {
      res.status(500).send(err);
   }
}

exports.getInvoiceReports = async function (req, res) {
   getListIdFunction(Invoice.invoiceCompleted, req.params.id, req.query.page, `SELECT j.type,i.*,f.invoice_file as file from invoice as i join job_type as j join invoice_files as f on j.id = i.job_type && i.invoice_file = f.id WHERE i.user_id = ${req.params.id} && i.status='Completed' ORDER BY id DESC LIMIT`, '', res)
}
exports.getInvoiceReportsAll = async function (req, res) {
   getListFunction(Invoice.invoiceCompletedAll, req.query.page, `SELECT j.type,i.* from invoice as i join job_type as j on j.id = i.job_type WHERE status='Completed' ORDER BY id DESC LIMIT`, '', res)
}