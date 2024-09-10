function populateAgreementData(executionContext) {
    var formContext = executionContext.getFormContext();
    var agreementField = formContext.getAttribute("rmsi_dealid").getValue();

    if (agreementField) {
        var agreementId = agreementField[0].id.replace("{", "").replace("}", ""); // Clean up ID format
        // Retrieve selected values from its parent table
        Xrm.WebApi.retrieveRecord("rmsi_agreement", agreementId, "?$select=rmsi_brokeragepercentage,rmsi_brokeragecharges,rmsi_securitydeposit,rmsi_rentpermonth").then(
            function success(result) {
                // Populate fields with the retrieved data
                formContext.getAttribute("rmsi_brokeragepercentage").setValue(result.rmsi_brokeragepercentage);
                formContext.getAttribute("rmsi_brokeragecharges").setValue(result.rmsi_brokeragecharges);
                formContext.getAttribute("rmsi_securitydeposit").setValue(result.rmsi_securitydeposit);
                formContext.getAttribute("rmsi_rentpermonth").setValue(result.rmsi_rentpermonth);
            },
            function error(error) {
                console.log("Error retrieving agreement record: " + error.message);
            }
        );
    } else {
        // Clear the fields when rmsi_dealid is empty
        formContext.getAttribute("rmsi_brokeragepercentage").setValue(null);
        formContext.getAttribute("rmsi_brokeragecharges").setValue(null);
        formContext.getAttribute("rmsi_securitydeposit").setValue(null);
        formContext.getAttribute("rmsi_rentpermonth").setValue(null);
    }
}

// Attach this function to the OnChange event of the rmsi_dealid field
function onDealIdChange(executionContext) {
    populateAgreementData(executionContext); // Call the function when the field changes
}
