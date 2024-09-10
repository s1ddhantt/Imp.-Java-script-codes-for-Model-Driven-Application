function updatePropertyOnRejection(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the values of the three verification fields
    var propertyVerificationStatus = formContext.getAttribute("rmsi_propertyverificationstatus").getValue();
    var documentVerificationStatus = formContext.getAttribute("rmsi_documentsverificationstatus").getValue();
    var verifiedStatus = formContext.getAttribute("rmsi_verified").getValue();

    // Define the option value for "Rejected"
    var REJECTED = 995050001; // Replace with the actual option set value for "Rejected"

    // Check if any of the fields have the value "Rejected"
    if (propertyVerificationStatus === REJECTED || documentVerificationStatus === REJECTED || verifiedStatus === REJECTED) {
        // Retrieve the related property record
        var propertyId = formContext.getAttribute("rmsi_propertyid").getValue(); // Assuming there's a lookup field to the related property
        if (propertyId) {
            var propertyEntityReference = propertyId[0]; // Get the entity reference

            // Update the property record using the Web API
            var entity = {};
            entity.rmsi_verificationstatus = REJECTED; // Set verification status to "Rejected"
            entity.statecode = 1; // Set status to "Inactive" (assuming 1 represents inactive)

            Xrm.WebApi.updateRecord("rmsi_property", propertyEntityReference.id, entity).then(
                function success(result) {
                    console.log("Property record updated successfully.");
                },
                function error(error) {
                    console.error("Error updating property record: ", error.message);
                }
            );
        }
    }
}
