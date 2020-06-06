window.Ajax = function(route, callType, params = null){
    return new this.Promise(function(resolve, reject){

    });
}

var dsUserAccounts = [];
var dsUser;

$(function(){
    getUserData();
    $(".add-account").on("click", function(){
        
        var vName = $("#account-new-name").val();
        var vDescription = $("#account-new-desc").text();
        var data = '{"User_ID":' + dsUser.ID + ', "Name":"' + vName + '", "Description":"' + vDescription + '"}';

        console.log(data);
        $.ajax({
            url: '/add_new_account',
            type: 'POST',
            data: data,
    
            contentType: 'application/json',
            cache: false,
            timeout: 5000,
    
            success: function(result){
                if($.isEmptyObject(result)){
                    console.log("Error has occoured");
                }
                else{
                    console.log('success');
                    location.reload();
                }
            },
    
            error: function(err){
                console.log(err);
                
            }
        });
    });

    $("body").on("click", ".remove-account", function(){
        
        var data = '{"ID":' + $(this).attr('ID') +'}';

        console.log(data);
        $.ajax({
            url: '/remove-account',
            type: 'POST',
            data: data,
    
            contentType: 'application/json',
            cache: false,
            timeout: 5000,
    
            success: function(result){
                console.log(result)
                if(!$.isEmptyObject(result)){
                    console.log("Error has occoured");
                }
                else{
                    console.log('success');
                    getUserAccounts(dsUser.ID);
                }
            },
    
            error: function(err){
                console.log(err);
                
            }
        });
    })
});



function getUserData() {
    $.ajax({
        url: '/current_user',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        timeout: 5000,

        success: function(result){
            if($.isEmptyObject(result)){
                console.log("Error has occoured");
            }
            else{
                setUserData(result);
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

function getUserAccounts(pUser_ID) {
    $(".render-cards").empty();
    var vUser_ID = pUser_ID.toString();
    var data = '{"User_ID":"' + vUser_ID + '"}';
    $.ajax({
        url: '/current_user_accounts',
        type: 'POST',
        data: data,

        contentType: 'application/json',
        cache: false,
        timeout: 5000,

        success: function(result){
            if($.isEmptyObject(result)){
                console.log("Error has occoured");
            }
            else{
                setUserAccounts(result);
            }
        },

        error: function(err){
            console.log(err);
        }
    });
}

function setUserData(pData){
    dsUser = pData;
    $(".user-name").text(dsUser.Name);
    getUserAccounts(dsUser.ID);
}

function setUserAccounts(pData){


    dsUserAccounts = pData[0];
    dsUserAccounts.forEach(displayAccounts);
}

function displayAccounts(vItem){
    
    $(".render-cards").append("<div class='col-12 col-sm-6 col-md-4 mt-3'>" +
                                "<div class='card'>"+
                                "<div class='card-body'>"+
                                    "<div class='row'><div class='col-9'><a href='/account?ID=" + vItem.ID + "'><h3 class='card-title' account='" + vItem.ID + "'>" + vItem.Name + " <span></span></h3></a></div><div class='col-3 text-right'><i id='" + vItem.ID + "' class='fas fa-trash-alt text-secondary remove-account' style='cursor:pointer'></i></div></div>"+
                                    "<p class='card-text'>" + vItem.Description + "</p>"+
                                    "<a href='#' class='btn btn-primary'>Go somewhere</a>"+
                                "</div>"+
                                "</div>"+
                            "</div>")
}



