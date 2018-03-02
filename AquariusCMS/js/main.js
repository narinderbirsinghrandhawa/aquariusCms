
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    
    

})(jQuery);

$('document').ready(function(){
    
    $.ajax( { url: "https://api.mlab.com/api/1/databases/aquariaus/collections?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
		  type: "GET",
		  contentType: "application/json",
            success: function(data){
                for(var i = 0; i < data.length - 1 ; i++){
                    var html = '<div class="card cardNumber-'+i+'">';
                        html += '        <img  src="https://www.volatour.com/images/productimg/img_avatar.png" width="120px">';
                        html += '        <h3>'+data[i]+'</h3>';
                        html += '<button type="button" class="btn btn-success addApptBtn" onclick="addApptBtn(this)">Add Appointment</button>';
                        html += '        <div id="table">';
                        html += '            <div class="tableDataHead">';
                        html += '                <div class="tableCol">Name</div>';
                        html += '                <div class="tableCol">Address</div>';
                        html += '                <div class="tableCol">Start Date / Time</div>';
                        html += '                <div class="tableCol">End Date / Time</div>';
                        html += '                 <div class="tableCol">Status</div>';
                        html += '                <div class="tableCol">Check In Date/Time</div>';
                        html += '                <div class="tableCol">Check Out Date/Time</div>';
                        html += '                <div class="tableCol">Edit</div>';
                        html += '                <div class="tableCol">Delete</div>';
                        html += '            </div>';
                        html += '            <div class="tableData tableData-'+data[i]+'">';
                           html += '         </div>';
                           html += '     </div>';
                           html += ' </div>';
                    $("#workerTable").append(html);
                    $.ajax( { url: "https://api.mlab.com/api/1/databases/aquariaus/collections/"+data[i]+"?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
                      type: "GET",
                      contentType: "application/json",
                        success: function(data){
                            for(var j = 0; j< data.length; j++){
                                var html = '<div id="worker-data-'+j+'" class="data">';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="clientName" type="text" value="'+data[j].clientName+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="clientAddress" type="text" value="'+data[j].clientAddress+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="startDate" type="text" value="'+data[j].startDate+'" disabled>';
                                    html +='                <input class="startTime" type="text" value="'+data[j].startTime+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="endDate" type="text" value="'+data[j].endDate+'" disabled>';
                                    html +='                <input class="endTime" type="text" value="'+data[j].endTime+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">'+data[j].status+'</div>';
                                    html +='            <div class="tableCol">'+data[j].checkInDate+'<br><br>'+data[j].checkInTime+'</div>';
                                    html +='            <div class="tableCol">'+data[j].checkOutDate+'<br><br>'+data[j].checkOutTime+'</div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <button type="button" class="btn btn-info btn-sm editDataBtn" onclick="editDataEntry(this)">';
                                    html +='                  <span class="glyphicon glyphicon-pencil"></span> Edit ';
                                    html +='                </button>';
                                    html +='                <button type="button" class="btn btn-info btn-sm doneDataBtn" value="'+data[j]._id.$oid+'" onclick="doneDataEntry(this)">';
                                    html +='                  <span class="glyphicon glyphicon-ok"></span> Done ';
                                    html +='                </button>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <button type="button" class="btn btn-danger btn-sm" value="'+data[j]._id.$oid+'" onclick="deleteEntry(this)">';
                                    html +='                  <span class="glyphicon glyphicon-trash"></span> Delete ';
                                    html +='                </button>';
                                    html +='            </div>';
                                    html +='        </div>';
                                $(".tableData-"+data[j].workerName).append(html);                             
                            }
                        }} );
                }
            }} );

                            
             
    
    $(".confirmAptBtn").click(function(){
        $("#id01").hide();
        var clientName  =   $("#newAptName").val(); 
        var clientAddress  =   $("#newAptAddress").val();
        var startDate  =   $("#newAptStartDate").val();
        var startTime  =   $("#newAptStartTime").val();
        var endDate  =   $("#newAptEndDate").val();
        var endTime  =   $("#newAptEndTime").val();
        
        var clientName = clientName.charAt(0).toUpperCase() + clientName.slice(1).toLowerCase();
   
        var html = '<div id="worker-1-data-1" class="data">';
            html +='            <div class="tableCol">';
            html +='                <input  type="text" value="'+clientName+'" disabled>';
            html +='            </div>';
            html +='            <div class="tableCol">';
            html +='                <input  type="text" value="'+clientAddress+'" disabled>';
            html +='            </div>';
            html +='            <div class="tableCol">';
            html +='                <input class="startDate" type="text" value="'+startDate+'" disabled>';
            html +='                <input class="startTime" type="text" value="'+startTime+'" disabled>';
            html +='            </div>';
            html +='            <div class="tableCol">';
            html +='                <input class="endDate" type="text" value="'+endDate+'" disabled>';
            html +='                <input class="endTime" type="text" value="'+endTime+'" disabled>';
            html +='            </div>';
            html +='            <div class="tableCol">--</div>';
            html +='            <div class="tableCol">--<br>--</div>';
            html +='            <div class="tableCol">--<br>--</div>';
            html +='            <div class="tableCol">';
            html +='                <button type="button" class="btn btn-info btn-sm editDataBtn" onclick="editDataEntry(this)">';
            html +='                  <span class="glyphicon glyphicon-pencil"></span> Edit ';
            html +='                </button>';
            html +='                <button type="button" class="btn btn-info btn-sm doneDataBtn" onclick="doneDataEntry(this)">';
            html +='                  <span class="glyphicon glyphicon-ok"></span> Done ';
            html +='                </button>';
            html +='            </div>';
            html +='            <div class="tableCol">';
            html +='                <button type="button" class="btn btn-danger btn-sm" onclick="deleteEntry(this)">';
            html +='                  <span class="glyphicon glyphicon-trash"></span> Delete ';
            html +='                </button>';
            html +='            </div>';
            html +='        </div>';
       $("#workerTable").find(".activeWorker").find(".tableData").append(html);
        setTimeout(function(){
          $("#workerTable").find(".activeWorker").removeClass("activeWorker");
        }, 1000);
        $.ajax( { url: "https://api.mlab.com/api/1/databases/aquariaus/collections/"+workerName+"?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
		  data: JSON.stringify(  { "clientName" : clientName,
                                    "clientAddress" : clientAddress,
                                    "startDate" :startDate,
                                    "startTime" :startTime,
                                    "endDate" :endDate,
                                    "endTime" :endTime,
                                    "workerName" : workerName,
                                    "status" : "--",
                                    "checkInDate" : "--",
                                    "checkInTime" : "--",
                                    "checkOutDate" : "--",
                                    "checkOutTime" : "--"} ),
		  type: "POST",
		  contentType: "application/json" } );
    });

});
function addApptBtn(e){
    $("#id01").show();
        $(e).parent().addClass("activeWorker");
    workerName = $(e).parent().find("h3").text();
    
    var clientName  =   $("#newAptName").val(""); 
        var clientAddress  =   $("#newAptAddress").val("");
        var startDate  =   $("#newAptStartDate").val("");
        var startTime  =   $("#newAptStartTime").val("");
        var endDate  =   $("#newAptEndDate").val("");
        var endTime  =   $("#newAptEndTime").val("");
    
    
}
function editDataEntry(e){
    $(e).parent().parent().each(function(){
        $(this).find("input").removeAttr("disabled");
    })

    $(e).parent().find(".doneDataBtn").show();
    $(e).hide();
}

function doneDataEntry(e){
    $(e).parent().parent().each(function(){
        $(this).find("input").attr("disabled", true);
    })

    $(e).parent().find(".editDataBtn").show();
    $(e).hide();
    
    var updateKey = $(e).attr("value");
    var worker = $(e).parent().parent().parent().parent().parent().find("h3").text();
    
    var clientName  =   $(e).parent().parent().find(".clientName").val();
        var clientAddress  =   $(e).parent().parent().find(".clientAddress").val();
        var startDate  =   $(e).parent().parent().find(".startDate").val();
        var startTime  =   $(e).parent().parent().find(".startTime").val();
        var endDate  =   $(e).parent().parent().find(".endDate").val();
        var endTime  =   $(e).parent().parent().find(".endTime").val();
    var workerName  =   $(e).parent().parent().parent().parent().parent().find("h3").text();
    alert(endTime)
    $.ajax( { url: "https://api.mlab.com/api/1/databases/aquariaus/collections/"+worker+"/"+updateKey+"?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
		  data: JSON.stringify( { "$set" : {"clientName" : clientName,
                                    "clientAddress" : clientAddress,
                                    "startDate" :startDate,
                                    "startTime" :startTime,
                                    "endDate" :endDate,
                                    "endTime" :endTime } } ),
		  type: "PUT",
		  contentType: "application/json" } );
    
}
function search(e){
    var searchValue = $(e).val();
    $("#workerTable .card h3").each(function(){
        if($(this).text().search(new RegExp(searchValue, "i")) < 0){
            $(this).parent().hide();
        }else{
            $(this).parent().show();
        }
    })
}
function deleteEntry(e){
     $(e).parent().parent().fadeOut();
    var deleteKey = $(e).attr("value");
    var worker = $(e).parent().parent().parent().parent().parent().find("h3").text();
    $.ajax( { url: "https://api.mlab.com/api/1/databases/aquariaus/collections/"+worker+"/"+deleteKey+"?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
		  type: "DELETE",
		  async: true,
		  timeout: 300000,
		  success: function (data) { },
		  error: function (xhr, status, err) { } } );
}
function login(){
    var username = $("#username").val();
    var password = $("#password").val();
    if(username == "admin" && password == "admin"){
        window.location.href='main.html'
    }
    else{
        alert("Username or Password may be wrong !!")
    }
}
function signout(){
    window.location.href='index.html'
}

function refreshData(id){alert(id)
    $.ajax( { url: "https://api.mlab.com/api/1/databases/aquariaus/collections/"+data[i]+"?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari",
                      type: "GET",
                      contentType: "application/json",
                        success: function(data){
                            for(var j = 0; j< data.length; j++){
                                var html = '<div id="worker-data-'+j+'" class="data">';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="clientName" type="text" value="'+data[j].clientName+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="clientAddress" type="text" value="'+data[j].clientAddress+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="startDate" type="text" value="'+data[j].startDate+'" disabled>';
                                    html +='                <input class="startTime" type="text" value="'+data[j].startTime+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <input class="endDate" type="text" value="'+data[j].endDate+'" disabled>';
                                    html +='                <input class="endTime" type="text" value="'+data[j].endTime+'" disabled>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">'+data[j].status+'</div>';
                                    html +='            <div class="tableCol">'+data[j].checkInDate+'<br><br>'+data[j].checkInTime+'</div>';
                                    html +='            <div class="tableCol">'+data[j].checkOutDate+'<br>'+data[j].checkOutTime+'</div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <button type="button" class="btn btn-info btn-sm editDataBtn" onclick="editDataEntry(this)">';
                                    html +='                  <span class="glyphicon glyphicon-pencil"></span> Edit ';
                                    html +='                </button>';
                                    html +='                <button type="button" class="btn btn-info btn-sm doneDataBtn" value="'+data[j]._id.$oid+'" onclick="doneDataEntry(this)">';
                                    html +='                  <span class="glyphicon glyphicon-ok"></span> Done ';
                                    html +='                </button>';
                                    html +='            </div>';
                                    html +='            <div class="tableCol">';
                                    html +='                <button type="button" class="btn btn-danger btn-sm" value="'+data[j]._id.$oid+'" onclick="deleteEntry(this)">';
                                    html +='                  <span class="glyphicon glyphicon-trash"></span> Delete ';
                                    html +='                </button>';
                                    html +='            </div>';
                                    html +='        </div>';
                                $(".tableData-"+data[j].workerName).html(html);                             
                            }
                        }} );
}