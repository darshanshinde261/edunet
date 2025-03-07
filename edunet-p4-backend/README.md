## Updated done
# transactionController.js
- addTransactionController:- updated the validation for userId null value will be handle and the type of the userId is handle before directly using the on finding module. In new response inside catch block the new field is added for sending the error.
- getAllTransactionController:- updated the validation for handling the userid the new field for sending the error object in response of catch block.
- deleteTransactionController:- updated the validation to handle if the transactionId is not received and also for the userId
- updateTransactionController:- updated the validation to handle null value of the required field transactionId.

- deleteMultipleTransactionsController:- New Route Added for the deleting multiple entry at once. The validations for all fiels are handle properly the array of id's which is we want to delete has taken from the request body.
One by one all entries of the id's are fetch and delete from the database.

# userController.js
- setAvatarController:- updated the validation for null values of required fields in like userId and the imageData.

# Transaction.js - router
- New route added for the deleting mutiple entries As {router.delete("/deleteMultiple", deleteMultipleTransactionsController);}
