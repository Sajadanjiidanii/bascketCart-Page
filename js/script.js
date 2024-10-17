const $ = document;
let bascketCart = [];

function loadcart(){
    bascketCart = JSON.parse(localStorage.getItem("bascketCart"));

    /// start append products in html ///

    const cartList = $.getElementById("cartList");
    bascketCart.forEach(function(Product){
        cartList.insertAdjacentHTML("beforeend" , "<li class=\"bascketItem\"><i class='hide'></i><div><img class=\"ProductsImg\" src="+Product.img+" alt=\"ProductsImg\"><p class=\"ProductsName\">"+ Product.name +"</p><p class=\"price\">"+ Product.pricy +"</p></div></li>");
    });

    function itemHover(event){
        event.target.firstChild.nextElementSibling.className = "hide";
        event.target.firstChild.className = "bx bxs-trash";
    }
    function itemUnHover(event){
        event.target.firstChild.nextElementSibling.className = "";
        event.target.firstChild.className = "hide";
    }
    function remItem(event){
        let itemTarget = event.target.parentElement;
        if( itemTarget.className == "bascketItem" ){
            itemTarget.style.display = "none";
        }else{
            event.target.style.display = "none";
        }
    }
    
    let items = $.querySelectorAll(".bascketItem");
    items.forEach(function(item){
        item.addEventListener("mouseenter" , itemHover);
        item.addEventListener("mouseleave" , itemUnHover);
        item.addEventListener("click" , remItem);
    });

    /// result box code ///

    const resultPricy = $.querySelector("#resultPricy");
    let productResult = 0;
    bascketCart.forEach(function(Product){
        let productPricy = Product.pricy;
        productPricy = productPricy.slice(0,3);
        productResult += +productPricy;
    });
    resultPricy.innerHTML = productResult + "000 تومان";

    const paymentBtn = $.querySelector("#paymentBtn");
    paymentBtn.addEventListener("click",function(){
        localStorage.removeItem("bascketCart");
        localStorage.removeItem("productInfo");
        location.href = ;
    });
}

/// sign in chacke ///

const loginSignup = $.querySelector("#login-signup");
const logIn = $.querySelector("#login");
const signUp = $.querySelector("#signup");
localStorage.setItem("ShowName","Yes");

function exitAccount(){
    userAccount.style.display = "none";
    exitAccountBtn.style.display = "none";
    logIn.style.display = "inline";
    signUp.style.display = "inline";
    localStorage.setItem("ShowName","No");
}

function signChack(){
    let isName = localStorage.getItem("Name");
    let userName = localStorage.getItem("Name");
    let showUser = localStorage.getItem("ShowName");

    if( isName ){
        if( showUser == "Yes"){
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
