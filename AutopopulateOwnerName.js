function onPropertyIdChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var propertyId = formContext.getAttribute("rmsi_propertyid").getValue();

    if (propertyId) {
        var propertyIdValue = propertyId[0].id.replace("{", "").replace("}", "");
        var query = "/rmsi_properties(" + propertyIdValue + ")?$select=rmsi_owneraccountid,rmsi_ownercontactid";

        Xrm.WebApi.retrieveRecord("rmsi_property", propertyIdValue, query).then(
            function success(result) {
                var ownerAccountId = result["_rmsi_owneraccountid_value"];
                var ownerContactId = result["_rmsi_ownercontactid_value"];

                if (ownerAccountId) {
                    formContext.getAttribute("rmsi_owneraccount").setValue([{
                        id: ownerAccountId,
                        entityType: "account",
                        name: result["_rmsi_owneraccountid_value@OData.Community.Display.V1.FormattedValue"]
                    }]);
                } else {
                    formContext.getAttribute("rmsi_owneraccount").setValue(null);
                }

                if (ownerContactId) {
                    formContext.getAttribute("rmsi_ownercontact").setValue([{
                        id: ownerContactId,
                        entityType: "contact",
                        name: result["_rmsi_ownercontactid_value@OData.Community.Display.V1.FormattedValue"]
                    }]);
                } else {
                    formContext.getAttribute("rmsi_ownercontact").setValue(null);
                }
            },
            function error(error) {
                var alertStrings = { confirmButtonLabel: "OK", text: error.message, title: "Error" };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            }
        );
    } else {
        formContext.getAttribute("rmsi_owneraccount").setValue(null);
        formContext.getAttribute("rmsi_ownercontact").setValue(null);
    }
}
