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
    
    $(".btn:contains('Details')").click(function(){
        console.log("clicked");
        
        $(".last").next().toggle();
       
    })
});
