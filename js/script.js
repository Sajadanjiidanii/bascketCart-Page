const $ = document;
let bascketCart = [];
const cartList = $.getElementById("cartList");

function loadcart(){
    bascketCart = JSON.parse(localStorage.getItem("bascketCart"));
    let i = 1;
    bascketCart.forEach(function(product){
        product.id = i;
        i++;
    }); 

    /// start append products in html ///

    bascketCart.forEach(function(Product){
        cartList.insertAdjacentHTML("beforeend" , "<li id="+Product.id+" class=\"bascketItem\"><i class='hide'></i><div><img class=\"ProductsImg\" src="+Product.img+" alt=\"ProductsImg\"><p class=\"ProductsName\">"+ Product.name +"</p><p class=\"price\">"+ Product.pricy +"</p></div></li>");
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
        let remId = bascketCart.find(function(item){
            return item.id == event.target.id;
        });
        
        console.log(bascketCart);
        bascketCart.forEach(function(item){
            if(item.id == remId.id){
                let itemIndex = bascketCart.indexOf(item);
                bascketCart.splice(itemIndex , 1);
            }
        });
        console.log(bascketCart);

        localStorage.setItem("bascketCart",JSON.stringify(bascketCart))
        localStorage.setItem("productInfo",JSON.stringify(bascketCart))

        let itemTarget = event.target.parentElement;
        if( itemTarget.className == "bascketItem" ){
            itemTarget.style.display = "none";
        }else{
            event.target.style.display = "none";
        }

        resultProduct();
    }
    
    let items = $.querySelectorAll(".bascketItem");
    items.forEach(function(item){
        item.addEventListener("mouseenter" , itemHover);
        item.addEventListener("mouseleave" , itemUnHover);
        item.addEventListener("click" , remItem);
    });
    resultProduct();
}
function resultProduct(){
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
        location.href = "https://sajadanjiidanii.github.io/ColorShop/";
    });
}

function respons(){
    let widthSize = window.innerWidth;
    let rowsNumber = bascketCart.length;

    if( widthSize <= 600){
        cartList.style.gridTemplateRows = "repeat("+rowsNumber+",auto)";

    }else if( widthSize <= 900){
        rowsNumber = rowsNumber / 2;
        cartList.style.gridTemplateColumns = "repeat(2,20%);";
        cartList.style.gridTemplateRows = "repeat("+Math.ceil(rowsNumber)+",auto)";
        
    }else if( widthSize > 900){
        rowsNumber = rowsNumber / 3;
        cartList.style.gridTemplateColumns = "repeat(3,20%);";
        cartList.style.gridTemplateRows = "repeat("+Math.ceil(rowsNumber)+",auto)";
    }
}

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
window.addEventListener("load",respons);
window.addEventListener("resize",respons);
