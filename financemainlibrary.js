
function populateAgreementData(executionContext) {
    var formContext = executionContext.getFormContext();
    var agreementId = formContext.getAttribute("rmsi_dealid").getValue()[0].id;
//this api will bring selected values from its parent table
    Xrm.WebApi.retrieveRecord("rmsi_agreement", agreementId, "?$select=rmsi_owneraccountid").then(
        function success(result) {
            var LookupValue = result.rmsi_owneraccountid;
            var Account = LookupValue.getAttribute("rmsi_accountid").getValue();
            var AccountName = Account[0].name;
             
            formContext.getAttribute("rmsi_propertyownername").setValue(AccountName);
        },
        function error(error) {
            console.log(error.message);
        }
    );
}

