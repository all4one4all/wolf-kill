$(function () {
    var role = JSON.parse(window.sessionStorage.getItem('role'));
    console.log(role);
    var order = parseFloat(window.sessionStorage.getItem('order'));
    console.log(order);
    $('.circle>div').html(role[order]);
    if((order+1)<role.length){
        $('footer>button').html("隐藏，传递给"+(order+2)+"号").click(function () {
            window.sessionStorage.removeItem('order');
            window.sessionStorage.setItem('order',(order+1));
            window.location.href = "role-01.html";
        });
    }else if((order+1)===role.length){
        $('footer>button').html("隐藏，传递给上帝").click(function () {
            window.location.href = "godview.html";
        });
    }
});