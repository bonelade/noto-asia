function convertToRupiah(angka) {

    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');

    for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ',';

    return rupiah.split('', rupiah.length - 1).reverse().join('');

}

function loading() {
    $("#load").delay(500).fadeIn();
}

function load_finish() {
    $("#load").delay(500).fadeOut();
}

function cari() {
    document.getElementById('search').style.width = 'calc(100% - 80px)';
    document.getElementById('search').focus();
    $('#btn-search').fadeIn(200);
    $('#i-search').fadeOut(200);
    document.getElementById('cari').style.height = '50px';
    document.getElementById('cari').style.background = '#fff';
}

function notsearch() {
    $('#btn-search').fadeOut(200);
    $('#i-search').fadeIn(200);
    document.getElementById('search').style.width = '0px';
    document.getElementById('cari').style.height = '0px';
    document.getElementById('cari').style.background = 'transparent';
}

function btn(data) {
    $(data).fadeToggle(200);
    $(".close").fadeToggle(200);
}

function toggle(data, x, childnode) {
    var submenu = data;
    $(submenu).slideToggle(500);
    var tes = x.childNodes[childnode].getAttribute('class');
    if(tes == 'fa fa-angle-down'){
        x.childNodes[childnode].setAttribute('class', 'fa fa-angle-up');
        x.childNodes[0].innerHTML = "hide";
    }
    else{
        x.childNodes[childnode].setAttribute('class', 'fa fa-angle-down');
        x.childNodes[0].innerHTML = "show";
    }
}

function slideDown(data) {
    $(data).slideDown();
}

function slideUp(data) {
    $(data).slideUp();
}

function showwidth(data, size) {
    document.getElementById(data).style.width = size;
    document.getElementById(data).focus();
}

function closelinkcopy() {
    document.getElementById('linkcopy').style.width = '0px';
}

function copy(data) {
    var $temp = document.getElementById(data);
    $temp.select();
    document.execCommand("copy");
    $temp.style.display = 'none';
    document.getElementById("mytooltip").style.display = 'block';
}

function outcopy(data) {
    var $temp = document.getElementById(data);
    $temp.style.display = 'block';
    document.getElementById("mytooltip").style.display = 'none';
}

$(document).ready(function() {
    var checkBox = document.getElementById("btn-respon");
    if (checkBox.checked === true){
    $(".bar").fadeOut(200);
    $(".close").fadeIn(200);
    }
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-top').fadeIn();
        } else {
            $('.back-top').fadeOut();
        }
    });
    $('.back-top').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
    //resize selling point image
    var box = document.getElementsByClassName("img-sell");
    var i;
    for (i = 0; i < box.length; i++) {
        var width = box[i].offsetWidth;
        var count = width;
        box[i].style.height = count + "px";
    }
    $(window).resize(function() {
        var box = document.getElementsByClassName("img-sell");
        var i;
        for (i = 0; i < box.length; i++) {
            var width = box[i].offsetWidth;
            var count = width;
            box[i].style.height = count + "px";
        }
    });
});
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "flex";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $("html, body").animate({
        scrollTop: 0
    }, 300);
    //document.body.scrollTop = 0;
    //document.documentElement.scrollTop = 0;
}

function previus(data) {
    var elmnt = document.getElementById(data);
    var width = elmnt.offsetWidth / 2;
    elmnt.scrollLeft -= width;
}

function next(data) {
    var elmnt = document.getElementById(data);
    var width = elmnt.offsetWidth / 2;
    elmnt.scrollLeft += width;
}