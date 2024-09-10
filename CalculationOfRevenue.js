function onAddingMonthlyRevenue(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get logical names
    var paymentStatusField = "rmsi_paymentstatus";
    var brokerageChargesField = "rmsi_brokeragecharges";
    var monthsRevenueField = "rmsi_monthsrevenue";
    var isProcessedField = "rmsi_isprocessed";

    // Retrieve current record's fields
    var paymentStatusAttribute = formContext.getAttribute(paymentStatusField);
    var brokerageChargesAttribute = formContext.getAttribute(brokerageChargesField);
    var monthsRevenueAttribute = formContext.getAttribute(monthsRevenueField);
    var isProcessedAttribute = formContext.getAttribute(isProcessedField);

    // Check if attributes are null
    if (!paymentStatusAttribute || !brokerageChargesAttribute || !monthsRevenueAttribute || !isProcessedAttribute) {
        console.error("One or more attributes are missing from the form.");
        return;
    }

    var paymentStatus = paymentStatusAttribute.getValue();
    var brokerageCharges = brokerageChargesAttribute.getValue();
    var monthsRevenue = monthsRevenueAttribute.getValue();
    var isProcessed = isProcessedAttribute.getValue();

    if (paymentStatus === "done" && !isProcessed) {
        if (brokerageCharges !== null) {
            // Update months revenue by adding brokerage charges
            var updatedMonthsRevenue = (monthsRevenue || 0) + brokerageCharges;
            monthsRevenueAttribute.setValue(updatedMonthsRevenue);

            // Set the record as processed to prevent future updates
            isProcessedAttribute.setValue(true);

            // Set fields to read-only
            setFieldsReadOnly(formContext, [paymentStatusField, brokerageChargesField, monthsRevenueField]);
        }
    }
}

function setFieldsReadOnly(formContext, fieldNames) {
    fieldNames.forEach(function(fieldName) {
        var control = formContext.getControl(fieldName);
        if (control) {
            control.setDisabled(true);
        }
    });
}
