function isEnter(event) {
    var key = event.which || event.keyCode;
    if (key != 32) {
        return true;
    }
    send();
}

function send() {
    var txt = document.getElementById("search-txt");
    if (txt.value.length == 0) {
        txt.focus();
        return false;
    }
    form.submit();
}

document.addEventListener('DOMContentLoaded', function () {
    var searchParams = new URLSearchParams(window.location.search);
    var searchQuery = searchParams.get('txt');
    if (searchQuery != null)
        document.getElementById('search-result').textContent = 'Kết quả tìm kiếm cho: ' + searchQuery;
})

function frmValidate5(frm) {
    return frm.checkValidity();
}


// gio hang 

var itemList = {
    "sp001": {
        "name": "Sữa chua vị Kiwi",
        "price": 21000,
        "photo": "images/sanpham/kiwi.jpg"
    },
    "sp002": {
        "name": "Sữa chua vị Xoài",
        "price": 22000,
        "photo": "images/sanpham/mango.jpg"
    },
    "sp003": {
        "name": "Sữa chua vị Dưa Lưới",
        "price": 23000,
        "photo": "images/sanpham/cantaloupe.jpg"
    },
    "sp004": {
        "name": "Sữa chua vị Mâm Xôi",
        "price": 24000,
        "photo": "images/sanpham/blackberry.jpg"
    },
    "sp005": {
        "name": "Sữa chua vị Dâu Tây",
        "price": 25000,
        "photo": "images/sanpham/strawberry.jpg"
    },
    "sp006": {
        "name": "Sữa chua vị Việt Quất",
        "price": 26000,
        "photo": "images/sanpham/blueberry.jpg"
    },
    "sp007": {
        "name": "Sữa chua vị Bưởi",
        "price": 27000,
        "photo": "images/sanpham/grapes.jpg"
    },
    "sp008": {
        "name": "Sữa chua vị Táo Xanh",
        "price": 28000,
        "photo": "images/sanpham/green-apple.jpg"
    },
    "sp009": {
        "name": "Sữa chua vị Dứa",
        "price": 28000,
        "photo": "images/sanpham/pineapple.jpg"
    }
};

function addCart(code) {
    var number = parseInt(document.getElementById(code).value);
    if (number > 0)
        if (typeof localStorage[code] === "undefined") {
            window.localStorage.setItem(code, number);
        }
        else {
            var current = parseInt(localStorage.getItem(code));
            if (number + current > 100)
                window.localStorage.setItem(code, 100);
            else
                window.localStorage.setItem(code, number + current);
        }
    console.log(localStorage);

}

function toCart() {
    window.location.href = "donhang.html";
}

document.addEventListener("DOMContentLoaded", function () {
    showCart();
})

window.onstorage = () => {
    location.reload();
    showCart();
};

function showCart() {
    var TotalPreTax = 0;
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
        var code = keys[i];
        var item = itemList[code];
        var name = item.name;
        var price = item.price;
        var photo = item.photo;
        var orderNumber = localStorage.getItem(code);

        var hinhsp = document.createElement("td");
        hinhsp.innerHTML = "<img src='" + photo + "'class='round-figure' width='100px'/>";
        var tensp = document.createElement("td");
        tensp.innerHTML = name;
        var slsp = document.createElement("td");
        slsp.innerHTML = orderNumber;
        var giasp = document.createElement("td");
        giasp.innerHTML = price + " VND";
        var thanhtiensp = document.createElement("td");
        thanhtiensp.innerHTML = orderNumber * price + " VND";
        var xoasp = document.createElement("td");
        xoasp.innerHTML = "<a href='#' data-code = '" + code
            + "' onclick='removeCart(this.dataset.code)'><i class='fa fa-trash icon-pink icon'></i></a>";
        var tr = document.createElement("tr");
        tr.appendChild(hinhsp);
        tr.appendChild(tensp);
        tr.appendChild(slsp);
        tr.appendChild(giasp);
        tr.appendChild(thanhtiensp);
        tr.appendChild(xoasp);
        var tableBody = document.getElementById("order-table-body");
        tableBody.appendChild(tr);
        TotalPreTax = TotalPreTax + (price * orderNumber);


    }
    var tongtt = document.getElementById("tong-thanh-tien");
    tongtt.innerText = tongtt.innerText + " " + TotalPreTax + " VND";
    var chietk = document.getElementById("chiet-khau");
    var discount = TotalPreTax * getDiscountRate();
    chietk.innerHTML = chietk.innerHTML + getDiscountRate() + ' x A = ' + discount + ' VND';
    var thue = document.getElementById("thue");
    var tax = 0.1 * (TotalPreTax - discount);
    thue.innerHTML = thue.innerHTML + tax + ' VND';
    var tongdh = document.getElementById("tong-don-hang");
    tongdh.innerHTML = tongdh.innerHTML + (TotalPreTax - discount + tax) + ' VND';
}

function removeCart(code) {
    if (typeof window.localStorage[code] != "undefined") {
        window.localStorage.removeItem(code);
        document.getElementById("order-table").getElementsByTagName('tbody')[0].innerHTML = "";
        location.reload();
        showCart();
    }
}

function getDiscountRate() {
    var d = new Date();
    var weekday = d.getDay();
    var totalMins = d.getHours() * 60 + d.getMinutes();
    if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660)
        || (totalMins >= 780 && totalMins <= 1020)))
        return 0.1;
    return 0;
}


//jquery

$(document).ready(function () {

    var d = new Date();
    var ads = "Khách hàng có ngày sinh trong tháng " + d.getMonth()
        + " sẽ được tặng 2 phần sữa chua dâu cho đơn hàng đầu tiên trong tháng.";
    $('footer').append("<div id = 'adscontainer'><span id = 'adstext'><h2>" + ads + "</h2></span></div>");

    var W = ($(window).width() - $('main').width()) / 2;
    if (W >= 200) {
        adsVerEffect();
    }
    else {
        adsHorEffect();
    }


    function adsVerEffect() {
        $('#adscontainer').addClass('adsvercontainer container');
        $('#adscontainer').css('width', W);
        $('#adstext').addClass('adsvertext adstext');
        $('#adstext').css('top', $('#adscontainer').height());
        $('#adstext').animate({
            top: '-=' + ($('#adscontainer').height() + $('#adstext').height())
        }, 20000, adsVerEffect);
    }

    function adsHorEffect() {
        $('#adscontainer').addClass('adshorcontainer container');
        $('#adscontainer').css('left', $('main').position().left);
        $('#adscontainer').css('width', $('main').width());
        $('#adstext').addClass('adshortext adstext');
        $('#adstext').css('left', $('#adscontainer').width());
        $('#adstext').animate({
            left: '-=' + ($('#adscontainer').width() + $('#adstext').width())
        }, 20000, adsHorEffect);
    }


    var headlineContent = [
        {
            'title': 'Bánh flan sữa chua sự kết hợp hoàn hảo',
            'photo': 'images/trangchu/headline/headline1.jpg'
        },
        {
            'title': 'Sữa chua nhà làm từ sữa dê - đậm đà hương vị khó quên',
            'photo': 'images/trangchu/headline/headline2.jpg'
        },
        {
            'title': ' Thưởng thức sữa chua theo cách của bạn',
            'photo': 'images/trangchu/headline/headline3.jpg'
        }
    ];

    var divContent = new Array();
    var divHeadline = $('#headline');

    function init() {

        for (var i = 0; i < headlineContent.length; i++) {
            divContent[i] = $('<div>');
            divContent[i].html('<span><h3>' + headlineContent[i].title
                + '</h3></span><img src = "' + headlineContent[i].photo + '"></img>');
            divHeadline.append(divContent[i]);
        }
    }

    function doHeadline() {

        init();

        $('#headline div:nth-child(n+2)').hide();

        setInterval(function () {
            var firstElement = divContent.shift();
            firstElement.hide();
            var nextElement = divContent[divContent.indexOf(firstElement) + 1];
            nextElement.show(1000);
            divContent.push(firstElement);
        }, 5000);
    }

    doHeadline();
});





