// JavaScript Web Resource
function toggleTabs(executionContext) {
    var formContext = executionContext.getFormContext();
    var typeSelect = formContext.getAttribute("rms_propertyownedby").getValue();

    if (typeSelect === '1') { // Assuming '1' is the value for 'Individual'
        formContext.ui.tabs.get("tab_individual_details").setVisible(true);
        formContext.ui.tabs.get("tab_organisation_details").setVisible(false);
    } else if (typeSelect === '2') { // Assuming '2' is the value for 'Group'
        formContext.ui.tabs.get("tab_individual_details").setVisible(false);
        formContext.ui.tabs.get("tab_organisation_details").setVisible(true);
    } else {
        formContext.ui.tabs.get("tab_individual_details").setVisible(false);
        formContext.ui.tabs.get("tab_organisation_details").setVisible(false);
    }
}
