$('docment').ready(()=>{
    $('.main').click(()=>{
        alert('headering')
    })
    $('.back').click(()=>{
        history.back()
    })


    var bodyWidth = $('body').width()
    
    if(bodyWidth<400){
        console.log(bodyWidth + '' + typeof bodyWidth)
        $('.root').removeClass('container')
        $('.root').addClass('container-fluid')
    }
    else{
        $('.root').addClass('container')
        $('.root').removeClass('container-fluid')
    }
})          