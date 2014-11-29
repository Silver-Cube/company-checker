/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        checkversion();

    },

    onResume : function(){

        checkversion();

    },    
    // Update DOM on a Received Event
    element_content: function(id,content) {

        var parentElement = document.getElementById(id);

        $("#"+id).html(content);
        $("#deviceready").removeClass("blink");
    }  
};

app.initialize();


$("#refresh").click(function(){    
    checkversion();    
});



function checkversion(){

    $("#loaded").slideUp();
    $("#loading").slideDown();
    
    var url = 'http://khashabawy.com/api/scripts/latest/company/';

    cordovaHTTP.get(url, {
        }, { }, function(response) {

            response.data = JSON.parse(response.data);
            app.element_content("version",response.data.latest_version);            
            toggle_loading();

        }, function(response) {
            app.element_content("version","لايمكن جلب البيانات");            
            toggle_loading();
    });         

} 


function toggle_loading(){
    
    $("#loaded").slideToggle();
    $("#loading").slideToggle();    
    
}



/// to open all _blank urls in browser
$("a[target='_blank']").click(function(e){
  e.preventDefault();
  window.open($(e.currentTarget).attr('href'), '_system', '');
});