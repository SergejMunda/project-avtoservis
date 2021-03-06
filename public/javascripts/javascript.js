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

    serviceDetails = function(itemId) {
        var wasVisible = $(".id:contains('" + itemId + "')")
            .next()
            .is(':visible');
        $('.detail:visible')
            .stop()
            .slideUp('slow');
        if (!wasVisible) {
            $(".id:contains('" + itemId + "')")
                .next()
                .slideDown('slow');
        }
    };

    serviceEdit = function(itemId) {
        console.log('test');
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        var phonenumber = document.getElementById('phonenumber').value;
        var time = document.getElementById('time').value;
        console.log(time);
        if (!regName.test(firstname)) {
            swal('Napaka', 'Ime lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regName.test(lastname)) {
            swal('Napaka', 'Priimek lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regEmail.test(email)) {
            swal('Napaka', 'Vnešen email ni pravilen', 'error');
            return false;
        }
        if (!rexPhoneNumber.test(phonenumber)) {
            swal('Napaka', 'Telefonska številka ni pravilna', 'error');
            return false;
        }

        if (!regTime.test(time)) {
            swal('Napaka', 'Datum in čas nista pravilna', 'error');
            return false;
        }
        // console.log(url);

        $.ajax({
            url: '/services/' + itemId,
            method: 'PUT',
            data: {
                firstName: firstname,
                lastName: lastname,
                email: email,
                phoneNumber: phonenumber,
                time: time
            }
        }).done(function(data) {
            location.reload();
        });
    };

    inventoryEdit = function(itemId) {
        var itemname = document.getElementById('itemname').value;
        var description = document.getElementById('description').value;
        var quantity = document.getElementById('quantity').value;
        if (!regName.test(itemname)) {
            swal('Napaka', 'Ime lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regDescription.test(description)) {
            swal('Napaka', 'Opis, je lahko dolg maksimalno 300 znakov', 'error');
            return false;
        }
        if (!reqQuantity.test(quantity)) {
            swal('Napaka', 'Vnesti število za količino', 'error');
            return false;
        }
        $.ajax({
            url: '/inventory/' + itemId,
            method: 'PUT',
            data: {
                itemName: itemname,
                description: description,
                quantity: quantity
            }
        }).done(function(data) {
            location.reload();
        });
    };
    deleteAll = function() {
        $.ajax({
            url: '/db/',
            method: 'DELETE'
        }).done(function(data) {
            swal('Vse je izbrisano');
        });
    };
    loadPresets = function() {
        $.ajax({
            url: '/db/',
            method: 'POST'
        }).done(function(data) {
            swal('Podatki so dodani');
        });
    };

    $('#search').on('keyup', function() {
        var g = $(this).val();
        $('.ime').each(function() {
            var s = $(this).text();
            if (s.indexOf(g) != -1) {
                $(this)
                    .parent()
                    .show();
            } else {
                $(this)
                    .parent()
                    .hide();
            }
        });
    });

    /* global swal */
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const regName = /^[a-z]+$/i;
    const regMessage = /^.{1,500}$/;
    const regDescription = /^.{1,300}$/;
    const rexPhoneNumber = /^\+[1-9]{1}[0-9]{3,14}$/;
    const regTime = /\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{2}/;
    const reqQuantity = /^\d+$/;

    var login = function(event) {
        var email = document.getElementById('email').value;
        if (!regEmail.test(email)) {
            event.preventDefault();
            swal('Napaka', 'Vnešen email ni pravilen', 'error');
            return false;
        }
        var pass = document.getElementById('pass').value;
        if (!regPass.test(pass)) {
            event.preventDefault();
            swal('Napaka', 'Vnešeno geslo ni pravilno', 'error');
            return false;
        }
        return true;
    };

    var register = function(event) {
        var pass = document.getElementById('pass').value;
        var pass2 = document.getElementById('pass2').value;
        var email = document.getElementById('email').value;
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        console.log(firstname, lastname);
        if (!regName.test(firstname)) {
            event.preventDefault();
            swal('Napaka', 'Ime lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regName.test(lastname)) {
            event.preventDefault();
            swal('Napaka', 'Priimek lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regEmail.test(email)) {
            event.preventDefault();
            swal('Napaka', 'Vnešen email ni pravilen', 'error');
            return false;
        }
        if (!regPass.test(pass)) {
            event.preventDefault();
            swal(
                'Napaka',
                'Geslo mora vsebovati vsaj 8 znakov, eno številko, eno veliko in eno malo črko',
                'error'
            );
            return false;
        }
        console.log(pass, pass2);
        if (pass != pass2) {
            event.preventDefault();
            swal('Napaka', 'Gesli se ne ujemata', 'error');
            return false;
        }
        return true;
    };

    var contact = function(event) {
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        if (!regEmail.test(email)) {
            event.preventDefault();
            swal('Napaka', 'Vnešen email ni pravilen', 'error');
            return false;
        }
        if (!regMessage.test(message)) {
            event.preventDefault();
            swal('Napaka', 'Sporočilo, je lahko dolgo maksimalno 500 znakov', 'error');
            return false;
        }
        return true;
    };

    var serviceForm = function(event) {
        var firstname = document.getElementById('firstname').value;
        var lastname = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        var phonenumber = document.getElementById('phonenumber').value;
        var time = document.getElementById('time').value;
        console.log(time);
        if (!regName.test(firstname)) {
            event.preventDefault();
            swal('Napaka', 'Ime lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regName.test(lastname)) {
            event.preventDefault();
            swal('Napaka', 'Priimek lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regEmail.test(email)) {
            event.preventDefault();
            swal('Napaka', 'Vnešen email ni pravilen', 'error');
            return false;
        }
        if (!rexPhoneNumber.test(phonenumber)) {
            event.preventDefault();
            swal('Napaka', 'Telefonska številka ni pravilna', 'error');
            return false;
        }

        if (!regTime.test(time)) {
            event.preventDefault();
            swal('Napaka', 'Datum in čas nista pravilna', 'error');
            return false;
        }
        return true;
    };

    var inventoryForm = function(event) {
        var itemname = document.getElementById('itemname').value;
        var description = document.getElementById('description').value;
        var quantity = document.getElementById('quantity').value;
        console.log(itemname, description, quantity);
        if (!regName.test(itemname)) {
            event.preventDefault();
            swal('Napaka', 'Ime lahko vsebuje le črke', 'error');
            return false;
        }
        if (!regDescription.test(description)) {
            event.preventDefault();
            swal('Napaka', 'Opis, je lahko dolg maksimalno 300 znakov', 'error');
            return false;
        }
        if (!reqQuantity.test(quantity)) {
            event.preventDefault();
            swal('Napaka', 'Vnesti število za količino', 'error');
            return false;
        }
        return true;
    };
});
