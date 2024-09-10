function validatePropertyRegistrationNumber(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the value of the Property Registration Number field
    var propertyRegistrationNumber = formContext.getAttribute("rmsi_propertyregistrynumber").getValue();

    // Define the regex pattern for the format "PRO-123456"
    var pattern = /^PRO-\d{6}$/;

    // Validate the format
    if (propertyRegistrationNumber && !pattern.test(propertyRegistrationNumber)) {
        // If the format is incorrect, show an error and prevent form submission
        formContext.getControl("rmsi_propertyregistrynumber").setNotification("The Property Registration Number must be in the format 'PRO-123456' where number should be equal to 6 digits compulsorily.", "property_registration_validation");

        // Prevent the form from saving
       // executionContext.getEventArgs().preventDefault();
    } else {
        // Clear any previous error notifications if the format is correct
        formContext.getControl("rmsi_propertyregistrynumber").clearNotification("property_registration_validation");
    }
}
