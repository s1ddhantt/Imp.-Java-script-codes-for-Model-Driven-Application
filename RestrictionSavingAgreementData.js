function validateFields(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the values of the lookup fields
    var ownerAccount = formContext.getAttribute("rmsi_owneraccount").getValue();
    var ownerContact = formContext.getAttribute("rmsi_ownercontact").getValue();
    var tenantAccount = formContext.getAttribute("rmsi_tenantaccount").getValue();
    var tenantContact = formContext.getAttribute("rmsi_tenantcontact").getValue();

    // Check if at least one of the owner fields is filled
    var isOwnerFilled = ownerAccount || ownerContact;

    // Check if at least one of the tenant fields is filled
    var isTenantFilled = tenantAccount || tenantContact;

    // If both owner and tenant fields are not valid, display an alert and prevent save
    if (!isOwnerFilled || !isTenantFilled) {
        var missingFieldsMessage = "";
        
        if (!isOwnerFilled) {
            missingFieldsMessage += "Please fill either 'Owner Account' or 'Owner Contact'.\n";
        }
        if (!isTenantFilled) {
            missingFieldsMessage += "Please fill either 'Tenant Account' or 'Tenant Contact'.";
        }

        // Show the alert message
        Xrm.Navigation.openAlertDialog({ text: missingFieldsMessage });

        // Prevent the save operation
        executionContext.getEventArgs().preventDefault();
    }
}
