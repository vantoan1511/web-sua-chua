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

    document.getElementById('search-result').textContent = 'Kết quả tìm kiếm cho: ' + searchQuery;
})

function frmValidate5(frm) {
    return frm.checkValidity();
}

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

window.addEventListener("load", showCart);

window.onstorage = () => {
    location.reload();
    showCart();
};

function showCart() {
    var TotalPreTax = 0;
    for (var code in localStorage) {
        var item = itemList[code];
        var photo = item.photo;
        var name = item.name;
        var price = item.price;
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
        xoasp.innerHTML = "<a href='#' data-code = '" + code + "' onclick='removeCart(this.dataset.code)'><i class='fa fa-trash icon-pink icon'></i></a>";
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

        var tongtt = document.getElementById("tong-thanh-tien");
        tongtt.innerHTML = tongtt.innerHTML + TotalPreTax + " VND";
        var chietk = document.getElementById("chiet-khau");
        var discount = TotalPreTax * getDiscountRate();
        chietk.innerHTML = chietk.innerHTML + getDiscountRate() + ' x A = ' + discount + ' VND';
        var thue = document.getElementById("thue");
        var tax = 0.1 * (TotalPreTax - discount);
        thue.innerHTML = thue.innerHTML + tax + ' VND';
        var tongdh = document.getElementById("tong-don-hang");
        tongdh.innerHTML = tongdh.innerHTML + (TotalPreTax - discount + tax) + ' VND';
    }
}

function removeCart(code) {
    if (typeof window.localStorage[code] != "undefined") {
        window.localStorage.removeItem(code);
        document.getElementById("order-table").getElementsByTagName('tbody')[0].innerHTML = "";
        showCart();
    }
}

function getDiscountRate() {
    var d = new Date();
    var weekday = d.getDay();
    var totalMins = d.getHours() * 60 + d.getMinutes();
    if (weekday >= 1 && weekday <= 3 && ((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020)))
        return 0.1;
    return 0;
}