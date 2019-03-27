$(function () {
    var role = JSON.parse(window.sessionStorage.getItem('role'));
    window.sessionStorage.removeItem('order');

    /*遍历生成角色html*/
    function forEachRole(arr) {
        var roleHtml = "";
        for(let i = 0,j=arr.length;i<j;i++){
            roleHtml += "<div class='role-box'><span>"+ arr[i] +"</span><span>"+(i+1)+"号</span></div>";
        }
        $('.role-list').html(roleHtml);
    }
    forEachRole(role);

    /*遍历生成角色状态*/
    function forEachRoleState(arr) {
        var roleState = [];
        for(let i = 0,j=arr.length;i<j;i++){
            roleState[i] = [arr[i],0,0];
        }
        return roleState;
    }
    var gameFlow = [];
    $('footer>button').click(function () {
        window.sessionStorage.removeItem('role');
        window.sessionStorage.setItem('roleState',JSON.stringify(forEachRoleState(role)));
        window.sessionStorage.setItem('gameFlow',JSON.stringify(gameFlow));
        window.location.href = "mainflow.html";
    });
});