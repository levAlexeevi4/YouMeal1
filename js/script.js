const menubutton = document.querySelector('.categories').querySelectorAll('li')
const items = document.querySelectorAll('.items')
const closedel = document.querySelector('.delivery_lightbox').querySelector('.closebutton')
const cart_order = document.getElementById('placeorder')
const itemlightbox = document.querySelectorAll('.itemimg')
const closeitem = document.querySelectorAll('.item_lightbox')
const showcart = document.querySelector('.cart_header')
const closecart = document.querySelector('.cart_delivery_close')
const btnpls = document.querySelectorAll('.buttonpluscart')
const btnmin = document.querySelectorAll('.buttonminuscart')
const cartel = document.querySelectorAll('.cart_item')
const btnpluscard = document.querySelectorAll('.buttonplus')
const btnminuscard = document.querySelectorAll('.buttonminus')
const cardcounter = document.querySelectorAll('.item_lightbox_card_counter')
const btncardadd = document.querySelectorAll('.cardadd')
const btncardaddlightbox = document.querySelectorAll('.item_lightbox_card_button')
const radio1 = document.getElementById('radio1')
const radio2 = document.getElementById('radio2')
const cartempty = document.querySelector('.cart_empty')

radio1.addEventListener('click', function(){
    // console.log(radio1.checked)
    document.querySelector('.delivery_lightbox_delivery_adress').style.display = 'none'
    radio2.checked = false
})

radio2.addEventListener('click', function(){
    radio1.checked = false
    document.querySelector('.delivery_lightbox_delivery_adress').style.display = 'block'
})

document.addEventListener('click', function(e) {
    if(e.target === closedel.parentElement.parentElement.parentElement){
        closedel.parentElement.parentElement.parentElement.classList.remove('open')
    }
})

closedel.addEventListener('click', function(){
    console.log(closedel.parentElement.parentElement.parentElement)
    closedel.parentElement.parentElement.parentElement.classList.remove('open')
})

menubutton.forEach(item => {
    item.addEventListener(('click'), function(){
        let openitem = document.querySelector(`.${item.id}`)
        // console.log(openitem)
        menubutton.forEach(item => {
            item.classList.remove('active')
        })
        items.forEach(item => {
            item.classList.remove('open')
        })
        openitem.classList.add('open')
        item.classList.add('active')
    })

})

cart_order.addEventListener('click', function() {
    closedel.parentElement.parentElement.parentElement.classList.add('open')
})

itemlightbox.forEach(item => {    
    item.addEventListener('click', function(){
        item.parentElement.querySelector('.item_lightbox').classList.add('open')
    })
})
closeitem.forEach(item => {
    item.querySelector('.closebutton').addEventListener('click', function() {
        item.classList.remove('open')
    })
    item.addEventListener('click', function(e) {
        if(e.target === item){
            item.classList.remove('open')
        }
    })
});

showcart.addEventListener('click', function() {
    if(window.innerWidth <= 980) {
        if(showcart.parentElement.classList.contains('cart_open') == true){
            showcart.parentElement.classList.remove('cart_open')
            showcart.parentElement.querySelector('.cart_main').classList.add('cart_show')
        }
        else {
            showcart.parentElement.classList.add('cart_open')
            showcart.parentElement.querySelector('.cart_main').classList.remove('cart_show')
        }
        // console.log('confirm1')
        // console.log(showcart.parentElement.querySelector('.cart_main').classList)
    }
})

window.addEventListener('resize', function() {
    if(window.innerWidth > 980) {
        showcart.parentElement.classList.remove('cart_open')
        showcart.parentElement.querySelector('.cart_main').classList.add('cart_show')
    }
})

closecart.addEventListener('click', function() {
    // console.log('confirm2')
    showcart.parentElement.classList.remove('cart_open')
    showcart.parentElement.querySelector('.cart_main').classList.add('cart_show')
})

btnpls.forEach(item => {
    item.addEventListener('click', function() {
        item.parentElement.querySelector('input').stepUp();
        sum();
    })
})

btnmin.forEach(item => {
    item.addEventListener('click', function() {
        if(item.parentElement.querySelector('input').value >= 1)
            item.parentElement.querySelector('input').stepDown();
            sum();
        if(item.parentElement.querySelector('input').value == 0) {
            item.parentElement.parentElement.style.display = 'none'
            sum();
        }
    })
})

cartel.forEach(item => {
    item.querySelector("input").addEventListener("input", function(){
        if (item.querySelector("input").value <= 0) {
            item.querySelector("input").value = 1;
        }
        sum();
    }
    )
})

btnpluscard.forEach(item => {
    item.addEventListener('click', function() {
        item.parentElement.querySelector('input').stepUp();
    })
})

btnminuscard.forEach(item => {
    item.addEventListener('click', function() {
        if (item.parentElement.querySelector('input').value > 1) {
            item.parentElement.querySelector('input').stepDown();
        }
    })
})

cardcounter.forEach(item => {
    item.querySelector("input").addEventListener("input", function(){
        if (item.querySelector("input").value <= 0) {
            item.querySelector("input").value = 1;
        }
    })
})


function sum(){
    let sum = 0
    let count = 0
    cartel.forEach(item => {
        value = item.querySelector('input').value
        price = item.querySelector('.price').innerText.replace('₽', '');
        // console.log(value)
        // console.log(price)
        sum = sum + value*price
        count += Number(value)
    })
    // console.log(count)
    // console.log(sum)
    if(count === 0) {
        cartempty.style.display='block'
    }
    if(count != 0 )
    {
        cartempty.style.display='none'
    }
    showcart.querySelector('button').innerText = count
    showcart.parentElement.querySelector('.cart_result_sum').innerText = `${sum}₽`
} 

btncardadd.forEach(item => {
    item.addEventListener('click', function() {
        if(document.querySelector('.cart_items').querySelector(`.${item.parentElement.id}`).style.display == 'flex'){
            alert("Элемент уже в корзине")
        }
        else {
            document.querySelector('.cart_items').querySelector(`.${item.parentElement.id}`).style.display = 'flex'
            document.querySelector('.cart_items').querySelector(`.${item.parentElement.id}`).querySelector('.cart_item_counter').querySelector('input').value = 1
            sum()
        }
    })
})

btncardaddlightbox.forEach(item => {
    let parent = item.parentElement.parentElement.parentElement.parentElement
    item.addEventListener('click', function(){
        document.querySelector('.cart_items').querySelector(`.${parent.id}`).style.display = 'flex'
        document.querySelector('.cart_items').querySelector(`.${parent.id}`).querySelector('.cart_item_counter').querySelector('input').value = item.parentElement.querySelector('input').value
        sum();
    })
})