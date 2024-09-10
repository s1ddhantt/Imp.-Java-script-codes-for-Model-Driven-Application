function calculateAgreementEndDate(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the values of the fields
    var rentStartDate = formContext.getAttribute("rmsi_rentstartdate").getValue();
    var minimumMonthsOfAgreement = formContext.getAttribute("rmsi_minimummonthsofagreement2").getValue();

    // Check if both fields have values
    if (rentStartDate && minimumMonthsOfAgreement !== null) {
        // Calculate the end date by adding the minimumMonthsOfAgreement to the rentStartDate
        var agreementEndDate = new Date(rentStartDate);
        agreementEndDate.setMonth(agreementEndDate.getMonth() + minimumMonthsOfAgreement);

        // Set the calculated end date to the agreement end date field
        formContext.getAttribute("rmsi_agreementenddate").setValue(agreementEndDate);
    }
}
