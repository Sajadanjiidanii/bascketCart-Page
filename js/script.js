const $ = document;
let bascketCart = [];

function loadcart(){
    bascketCart = JSON.parse(localStorage.getItem("bascketCart")));
}

/// start append products in html ///

const cartList = $.querySelector("#cartList");
bascketCart.forEach(function(Product){
    console.log(Product);
    cartList.insertAdjacentHTML("beforeend" , "<li class=\"bascketItem\"><div><img class=\"ProductsImg\" src=\""+ Product.img +"\" alt=\"ProductsImg\"><p class=\"ProductsName\">"+ Product.name +"</p><p class=\"price\">"+ Product.pricy +" تومان</p></div></li>");
});

/// end append products in html ///

function itemHover(event){
    let contentBox = event.target;
    contentBox.innerHTML = "<i class='bx bxs-trash'></i>";
}
function itemUnHover(event){
    let contentBox = event.target.firstChild;
    contentBox.innerHTML = "<img class=\"ProductsImg\" src=\"#\" alt=\"ProductsImg\"><p class=\"ProductsName\"> Product.name </p><p class=\"price\">تومان</p>";
}
function remItem(event){
    let itemTarget = event.target.parentElement;
    console.log(itemTarget);
    itemTarget.style.display = "none";
}

let items = $.querySelectorAll(".bascketItem");
items.forEach(function(item){
    item.addEventListener("mouseenter" , itemHover);
    item.addEventListener("mouseleave" , itemUnHover);
    item.addEventListener("click" , remItem);
});

/// sign in chacke ///

const loginSignup = $.querySelector("#login-signup");
const logIn = $.querySelector("#login");
const signUp = $.querySelector("#signup");

function exitAccount(){
    userAccount.style.display = "none";
    exitAccountBtn.style.display = "none";
    logIn.style.display = "inline";
    signUp.style.display = "inline";
    localStorage.setItem("ShowName","No");
}

function signChack(){
    let isName = localStorage.getItem("Name");
    let userName = JSON.parse(localStorage.getItem("Name"));
    let showName = localStorage.getItem("ShowName");

    if( isName ){
        if( showName == "Yes"){
            logIn.style.display = "none";
            signUp.style.display = "none";
            loginSignup.insertAdjacentHTML("afterbegin","<span id=\"userAccount\">" + userName + "</span><span id=\"exitAccountBtn\"> / خروج </span>");
            const userAccount = $.querySelector("userAccount");
            const exitAccountBtn = $.querySelector("#exitAccountBtn");
            exitAccountBtn.addEventListener("click",exitAccount);
        }
    }
};

window.addEventListener("load",signChack);
window.addEventListener("load",loadcart);
