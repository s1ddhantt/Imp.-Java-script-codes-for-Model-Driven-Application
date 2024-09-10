function OpenUpdateCompanyDetails(context){

    formContext = context;
    var recordId = formContext.data.entity.getId();

    var pageInput = {

        pageType:"custom",
        name: "rmsi_propertydetailsfortenant_9277b",
        entityName: "rmsi_tenantaccount",
        recordId  : recordId
    };


let navigationOptions = {
            target: 2,
            position: 1,
            height:{value:85, unit:"%"},
            width:{value:85, unit:"%"},
            title:"Compare Details"
        };
        Xrm.Navigation.navigateTo(pageInput, navigationOptions)
            .then(
                function () {
                    // Handle success
                }
            ).catch(
                function (error) {
                    // Handle error
                }
            );
    }
