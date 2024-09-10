function filterLookupByPreferredArea(executionContext) {
    var formContext = executionContext.getFormContext();
    
    // Retrieve the value from the "Preferred Area" field
    var preferredArea = formContext.getAttribute("rms_preferablearea").getValue();
    
    if (preferredArea) {
        // Define the fetch XML filter to match the preferred area in any address field
        var fetchXml = "<filter type='or'>" +
            "<condition attribute='rms_address1name' operator='eq' value='" + preferredArea + "' />" +
            "<condition attribute='rms_address1city' operator='eq' value='" + preferredArea + "' />" +
            "</filter>";

        // Apply the filter to the lookup field
        formContext.getControl("rms_propertyaddress").addCustomFilter(fetchXml, "rms_propertytable");
        
        // Clear the lookup field to ensure it refreshes with the new filter
        formContext.getAttribute("rms_propertyaddress").setValue(null);
    }
}

// Register the function on the form's OnLoad event and on the OnChange event of the "Preferred Area" field
function onLoad(executionContext) {
    filterLookupByPreferredArea(executionContext);
    
    var formContext = executionContext.getFormContext();
    formContext.getAttribute("rms_preferablearea").addOnChange(filterLookupByPreferredArea);
}
