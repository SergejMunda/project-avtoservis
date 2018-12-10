/*global $*/
var flag = 0;
$(document).ready(function() {
    deleteService = function(itemId) {
        $.ajax({
             url: '/services/' + itemId,
             method: 'DELETE'
         }).done(function(data) {
             location.reload();
             console.log(data);
         });
        console.log(itemId);
    };
    deleteInventory = function(itemId) {
        $.ajax({
             url: '/inventory/' + itemId,
             method: 'DELETE'
         }).done(function(data) {
             location.reload();
             console.log(data);
         });
        console.log(itemId);
    };
    deleteAll = function(){
        $.ajax({
             url: '/db/',
             method: 'DELETE'
         }).done(function(data) {
             location.reload();
             console.log(data);
         });
        console.log("Everything deleted");
    };
    loadPresets = function(){
        $.ajax({
             url: '/db/',
             method: 'POST'
         }).done(function(data) {
             location.reload();
             console.log(data);
         });
        console.log("Presets loaded");
    };
    
    serviceDetails = function(itemId){
       var wasVisible =  $(".id:contains('"+itemId+"')").next().is(":visible");
       $(".detail:visible").stop().slideUp("slow");
        if(!wasVisible){
             $(".id:contains('"+itemId+"')").next().slideDown("slow");
        }
    
    }
    
    $("#search").on("keyup", function(){
        var g = $(this).val();
        $(".ime").each(function(){
            var s = $(this).text()
            if (s.indexOf(g)!=-1) {
                $(this).parent().show();
            }
            else {
                $(this).parent().hide();
            }
        })
    })    
   
});
