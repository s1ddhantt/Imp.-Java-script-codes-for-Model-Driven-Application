function updatePropertyOnRejection(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the values of the two verification fields
    var propertyVerificationStatus = formContext.getAttribute("rmsi_propertyverificationstatus").getValue();
    var documentVerificationStatus = formContext.getAttribute("rmsi_documentsverificationstatus").getValue();

    // Define the option set values for "Rejected" and "Verified"
    var REJECTED = 995050002; // Replace with the actual option set value for "Rejected"
    var VERIFIED = 995050000; // Replace with the actual option set value for "Verified"

    // Retrieve the related property record through the lookup field
    var propertyLookup = formContext.getAttribute("rmsi_propertyid").getValue();
    if (propertyLookup) {
        var propertyId = propertyLookup[0].id; // Get the GUID of the related property record

        // Prepare the data object to update the property record
        var entity = {};

        // If either status is "Rejected", set the verification status to "Rejected" and statecode to "Inactive"
        if (propertyVerificationStatus === REJECTED || documentVerificationStatus === REJECTED) {
            entity.rmsi_verificationstatus = REJECTED; // Set verification status to "Rejected"
            entity.statecode = 1; // Set status to "Inactive"
        } 
        // If both statuses are "Verified", set the verification status to "Verified" and leave statecode unchanged
        else if (propertyVerificationStatus === VERIFIED && documentVerificationStatus === VERIFIED) {
            entity.rmsi_verificationstatus = VERIFIED; // Set verification status to "Verified"
        }

        // Call the Web API to update the property record
        Xrm.WebApi.updateRecord("rmsi_property", propertyId, entity).then(
            function success(result) {
                console.log("Property record updated successfully.");
            },
            function error(error) {
                console.error("Error updating property record: ", error.message);
            }
        );
    } else {
        console.error("Related property record not found.");
    }
}
