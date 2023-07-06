const joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const loginSchema = joi.object({
    email: joi.string().email().required().messages({ "string.base": `Email should be a type of string`, "string.empty": `Email cannot be an empty field`, "string.email": `Email format is invalid`, "any.required": `Email is a required field` }),
    password: joi.string().required().messages({ "string.base": `Password should be a type of string`, "string.empty": `Password cannot be an empty field`, "any.required": `Password is a required field` }),})
const createAcSchema = joi.object({
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    email: joi.string().email().required().messages({ "string.base": `Email should be a type of string`, "string.empty": `Email cannot be an empty field`, "string.email": `Email format is invalid`, "any.required": `Email is a required field` }),
    password: joi.string().required().messages({ "string.base": `Password should be a type of string`, "string.empty": `Password cannot be an empty field`, "any.required": `Password is a required field` }),
    role: joi.string().required().messages({ "string.base": `Role should be a type of string`, "string.empty": `Role cannot be an empty field`, "any.required": `Role is a required field` }),
    comp_name: joi.string().required().messages({ "string.base": `comp_name should be a type of string`, "string.empty": `comp_name cannot be an empty field`, "any.required": `comp_name is a required field` }),
    comp_address: joi.string().allow(null).messages({ "string.base": `comp_address should be a type of string`}),
    comp_website: joi.string().allow(null).messages({ "string.base": `comp_website should be a type of string`}),
    status: joi.array().items(joi.number()),
    phone: joi.string().required().messages({ "string.base": `phone should be a type of string`,"string.empty": `phone cannot be an empty field`, "any.required": `phone is a required field` }),  
})
const invoiceSchema = joi.object({
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    email: joi.string().allow(null).messages({ "string.base": `Email should be a type of string`, "string.empty": `Email cannot be an empty field`, "string.email": `Email format is invalid`, "any.required": `Email is a required field` }),
    main_phone: joi.string().allow(null).messages({ "string.base": `main_phone should be a type of string`, "string.empty": `main_phone cannot be an empty field`, "any.required": `main_phone is a required field` }),
    mobile_phone: joi.string().allow(null).messages({ "string.base": `Role should be a type of string`}),
    address_1: joi.string().required().messages({ "string.base": `address_1 should be a type of string`, "string.empty": `address_1 cannot be an empty field`, "any.required": `address_1 is a required field` }),
    address_2: joi.string().allow(null).messages({ "string.base": `address_2 should be a type of string`}),
    state: joi.string().required().messages({ "string.base": `state should be a type of string`, "string.empty": `state cannot be an empty field`, "any.required": `state is a required field` }),
    city: joi.string().required().messages({ "string.base": `city should be a type of string`,"string.empty": `city cannot be an empty field`, "any.required": `city is a required field` }),  
    job_type: joi.string().required().messages({ "string.base": `job_type should be a type of string`,"string.empty": `job_type cannot be an empty field`, "any.required": `job_type is a required field` }),  
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    postal_code: joi.number().required().messages({ "number.base": `postal_code should be a type of number`,"number.empty": `postal_code cannot be an empty field`, "any.required": `postal_code is a required field` }),  
    status:joi.string().required().messages({ "string.base": `status should be a type of string`,"string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),  
    uFirstname: joi.string().required().messages({ "string.base": `uFirstname should be a type of string`, "string.empty": `uFirstname cannot be an empty field`, "any.required": `uFirstname is a required field` }),
    uLastname: joi.string().required().messages({ "string.base": `uLlastname should be a type of string`, "string.empty": `uLlastname cannot be an empty field`, "any.required": `uLlastname is a required field` }),
    estimate: joi.number().required().messages({ "number.base": `estimate should be a type of number`,"number.empty": `estimate cannot be an empty field`, "any.required": `estimate is a required field` }),  
     
})
const invoiceStatusSchema = joi.object({
    status: joi.string().required().messages({ "string.base": `status should be a type of string`, "string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),
    
})
const invoicePhotoSchema = joi.object({   
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    invoice_id: joi.number().required().messages({ "number.base": `invoice_id should be a type of number`,"number.empty": `invoice_id cannot be an empty field`, "any.required": `invoice_id is a required field` }),  
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
   
})
const taskManageDefaultSchema = joi.object({
    name: joi.string().required().messages({ "string.base": `name should be a type of string`, "string.empty": `name cannot be an empty field`, "any.required": `name is a required field` }),
    message: joi.string().allow(null).messages({ "string.base": `message should be a type of string`}),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    status: joi.string().required().messages({ "string.base": `status should be a type of string`, "string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),
})
const taskManageFileSchema = joi.object({
    message: joi.string().allow(null).messages({ "string.base": `message should be a type of string`}),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    name: joi.string().required().messages({ "string.base": `name should be a type of string`, "string.empty": `name cannot be an empty field`, "any.required": `name is a required field` }),
    status: joi.string().required().messages({ "string.base": `status should be a type of string`, "string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),
})
const taskManageAmountSchema = joi.object({
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    message: joi.string().allow(null).messages({ "string.base": `message should be a type of string`}),
    status: joi.string().required().messages({ "string.base": `status should be a type of string`, "string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    name: joi.string().required().messages({ "string.base": `name should be a type of string`, "string.empty": `name cannot be an empty field`, "any.required": `name is a required field` }),
    amount: joi.number().required().messages({ "number.base": `amount should be a type of number`,"number.empty": `amount cannot be an empty field`, "any.required": `amount is a required field` }),  
})
const activitySchema= joi.object({
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    invoice_id: joi.number().required().messages({ "number.base": `invoice_id should be a type of number`,"number.empty": `invoice_id cannot be an empty field`, "any.required": `invoice_id is a required field` }),  
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    message: joi.string().required().messages({ "string.base": `message should be a type of string`, "string.empty": `message cannot be an empty field`, "any.required": `message is a required field` }),
})
const jobTypeSchema = joi.object({
    type: joi.string().required().messages({ "string.base": `type should be a type of string`, "string.empty": `type cannot be an empty field`, "any.required": `type is a required field` }),
})
const statusSchema = joi.object({
    status: joi.string().required().messages({ "string.base": `status should be a type of string`, "string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),
    show_status:joi.number().required().messages({ "number.base": `show_status should be a type of number`,"number.empty": `show_status cannot be an empty field`, "any.required": `show_status is a required field` }),  
})
const paymentSchema = joi.object({
    publish_key: joi.string().required().messages({ "string.base": `publish_key should be a type of string`, "string.empty": `publish_key cannot be an empty field`, "any.required": `publish_key is a required field` }),
    secret_key: joi.string().required().messages({ "string.base": `secret_key should be a type of string`, "string.empty": `secret_key cannot be an empty field`, "any.required": `secret_key is a required field` }),
    name: joi.string().required().messages({ "string.base": `name should be a type of string`, "string.empty": `name cannot be an empty field`, "any.required": `name is a required field` }),
  
})
const createTeamSchema = joi.object({
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    email: joi.string().email().required().messages({ "string.base": `Email should be a type of string`, "string.empty": `Email cannot be an empty field`, "string.email": `Email format is invalid`, "any.required": `Email is a required field` }),
    password: joi.string().required().messages({ "string.base": `Password should be a type of string`, "string.empty": `Password cannot be an empty field`, "any.required": `Password is a required field` }),
    status: joi.array().items(joi.number()),
    role: joi.string().required().messages({ "string.base": `Role should be a type of string`, "string.empty": `Role cannot be an empty field`, "any.required": `Role is a required field` }),
})
const createUserTeamSchema = joi.object({
    firstname: joi.string().required().messages({ "string.base": `Firstname should be a type of string`, "string.empty": `Firstname cannot be an empty field`, "any.required": `Firstname is a required field` }),
    lastname: joi.string().required().messages({ "string.base": `Lastname should be a type of string`, "string.empty": `Lastname cannot be an empty field`, "any.required": `Lastname is a required field` }),
    email: joi.string().email().required().messages({ "string.base": `Email should be a type of string`, "string.empty": `Email cannot be an empty field`, "string.email": `Email format is invalid`, "any.required": `Email is a required field` }),
    password: joi.string().required().messages({ "string.base": `Password should be a type of string`, "string.empty": `Password cannot be an empty field`, "any.required": `Password is a required field` }),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    status: joi.array().items(joi.number()),
    role: joi.string().required().messages({ "string.base": `Role should be a type of string`, "string.empty": `Role cannot be an empty field`, "any.required": `Role is a required field` }),
})
const cardSchema = joi.object({
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    card_number: joi.string().required().messages({ "string.base": `card_number should be a type of number`,"string.empty": `card_number cannot be an empty field`, "any.required": `card_number is a required field` }),  
    expiry: joi.string().required().messages({ "string.base": `expiry should be a type of string`, "string.empty": `expiry cannot be an empty field`, "any.required": `expiry is a required field` }),
    issuer: joi.string().required().messages({ "string.base": `issuer should be a type of string`, "string.empty": `issuer cannot be an empty field`, "any.required": `issuer is a required field` }),
    cvc: joi.number().required().messages({ "number.base": `cvc should be a type of number`,"number.empty": `cvc cannot be an empty field`, "any.required": `cvc is a required field` }),  
    
})
const paymentStatusSchema = joi.object({
      status: joi.number().required().messages({ "number.base": `status should be a type of number`,"number.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),    
})
const cardStatusSchema = joi.object({
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    status: joi.number().required().messages({ "number.base": `status should be a type of number`,"number.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),    
})
const createStripePayment = joi.object({
    name: joi.string().required().messages({ "string.base": `name should be a type of string`, "string.empty": `name cannot be an empty field`, "any.required": `name is a required field` }),
    status: joi.string().required().messages({ "string.base": `status should be a type of string`, "string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),
    email: joi.string().email().required().messages({ "string.base": `Email should be a type of string`, "string.empty": `Email cannot be an empty field`, "string.email": `Email format is invalid`, "any.required": `Email is a required field` }),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    invoice_id: joi.number().required().messages({ "number.base": `invoice_id should be a type of number`,"number.empty": `invoice_id cannot be an empty field`, "any.required": `invoice_id is a required field` }), 
    amount: joi.number().required().messages({ "number.base": `amount should be a type of number`,"number.empty": `amount cannot be an empty field`, "any.required": `amount is a required field` }),  
    card_number: joi.string().required().messages({ "string.base": `card_number should be a type of string`, "string.empty": `card_number cannot be an empty field`, "any.required": `card_number is a required field` }),
    exp_month: joi.number().required().messages({ "number.base": `exp_month should be a type of number`,"number.empty": `exp_month cannot be an empty field`, "any.required": `exp_month is a required field` }),  
    exp_year: joi.number().required().messages({ "number.base": `exp_year should be a type of number`,"number.empty": `exp_year cannot be an empty field`, "any.required": `exp_year is a required field` }),  
    cvc: joi.string().required().messages({ "string.base": `cvc should be a type of string`, "string.empty": `cvc cannot be an empty field`, "any.required": `cvc is a required field` }),
    invoice_name: joi.string().required().messages({ "string.base": `invoice_name should be a type of string`, "string.empty": `invoice_name cannot be an empty field`, "any.required": `invoice_name is a required field` }),
  
    
})
const remainderEmailSchema = joi.object({
    name: joi.string().required().messages({ "string.base": `name should be a type of string`, "string.empty": `name cannot be an empty field`, "any.required": `name is a required field` }),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    status: joi.string().required().messages({ "string.base": `status should be a type of number`,"string.empty": `status cannot be an empty field`, "any.required": `status is a required field` }),       
})
const notificationSchema = joi.object({
    role: joi.string().required().messages({ "string.base": `role should be a type of string`, "string.empty": `role cannot be an empty field`, "any.required": `role is a required field` }),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    subject: joi.string().required().messages({ "string.base": `subject should be a type of string`, "string.empty": `subject cannot be an empty field`, "any.required": `subject is a required field` }),
    html1: joi.string().required().messages({ "string.base": `html should be a type of string`, "string.empty": `html cannot be an empty field`, "any.required": `html is a required field` }),
    email_type: joi.string().required().messages({ "number.base": `email_type should be a type of number`,"number.empty": `email_type cannot be an empty field`, "any.required": `email_type is a required field` }),  
 
})    
const updateNotificationSchema = joi.object({
    role: joi.string().required().messages({ "string.base": `role should be a type of string`, "string.empty": `role cannot be an empty field`, "any.required": `role is a required field` }),
    user_id: joi.number().required().messages({ "number.base": `user_id should be a type of number`,"number.empty": `user_id cannot be an empty field`, "any.required": `user_id is a required field` }),  
    subject: joi.string().required().messages({ "string.base": `subject should be a type of string`, "string.empty": `subject cannot be an empty field`, "any.required": `subject is a required field` }),
    html1: joi.string().required().messages({ "string.base": `html should be a type of string`, "string.empty": `html cannot be an empty field`, "any.required": `html is a required field` }),
    email_type: joi.string().required().messages({ "number.base": `email_type should be a type of number`,"number.empty": `email_type cannot be an empty field`, "any.required": `email_type is a required field` }),  
    old_msg_type: joi.string().required().messages({ "number.base": `old_msg_type should be a type of number`,"number.empty": `old_msg_type cannot be an empty field`, "any.required": `old_msg_type is a required field` }),  
 
})    
exports.validateLogin = validator(loginSchema);
exports.validateAccount = validator(createAcSchema);     
exports.validateInvoice = validator(invoiceSchema);      
exports.validateInvoiceStatus = validator(invoiceStatusSchema);  
exports.validatePhoto= validator(invoicePhotoSchema);  
exports.validateTaskManageDefault= validator(taskManageDefaultSchema);  
exports.validateTaskManageAmount= validator(taskManageAmountSchema);  
exports.validateActivity= validator(activitySchema);  
exports.validateJobType= validator(jobTypeSchema);  
exports.validateStatus= validator(statusSchema);     
exports.validatePayment= validator(paymentSchema);  
exports.validateTeam= validator(createTeamSchema);    
exports.validateUserTeam= validator(createUserTeamSchema);  
exports.validateCard= validator(cardSchema);  
exports.validateCardStatus= validator(cardStatusSchema);
exports.validateStripePayment= validator(createStripePayment);
exports.validatePaymentStatus=validator(paymentStatusSchema);
exports.validateNotification=validator(notificationSchema);
exports.validateUpdateNotification=validator(updateNotificationSchema);
exports.validateTaskManageFile=validator(taskManageFileSchema);
exports.validateRemainderEmail=validator(remainderEmailSchema);