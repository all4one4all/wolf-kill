$(function () {
    alert('1');
    var roleState = JSON.parse(window.sessionStorage.getItem('roleState'));
    alert('1');
    var gameFlow =JSON.parse(window.sessionStorage.getItem('gameFlow'));
    alert('1');
    /*状态机[天数,流程页状态,女巫状态,预言家状态,平民人数,狼人人数,神民人数]*/
    /*女巫{1:死,2:解药毒药,3:解药,4:毒药}*/
    /*预言家{0:活,1:死}*/
    var stateMachine = JSON.parse(window.sessionStorage.getItem('stateMachine'));
    var day = stateMachine[0];
    alert('1');

    function forEachRole(arr) {
        var roleHtml = "";
        for(let i = 0,j=arr.length;i<j;i++){
            roleHtml += "<div class='role-box'><span>"+ arr[i][0] +"</span><span>"+(i+1)+"号</span></div>";
        }
        $('.role-list').html(roleHtml);
    }
    forEachRole(roleState);

    var roleBox = $('.role-box');
    var order = null;
    for(let i = 0,j=roleState.length;i<j;i++){
        if(roleState[i][1] === 1){
            roleBox.eq(i).css({'background-color':'#b3c4eb'});
        }
        roleBox.eq(i).click(function () {
            roleBox.css('border-color','white');
            roleBox.eq(i).css('border-color','#2f2f2f');
            order = i;
            /*window.sessionStorage.removeItem('killNum');window.sessionStorage.setItem('killNum',i);*/
        });
    }

    console.log(roleState);
    $('footer>button').click(function () {
        console.log(typeof order);
        if(order === null){
            alert('狼人请统一意见');
        }else {
            if(roleState[order][1] === 1){
                alert('此人已死');
            }else {
                if(roleState[order][0] === "狼人"){
                    alert('狼人请勿自相残杀');
                }else if(roleState[order][0] === "女巫"){
                    window.sessionStorage.setItem('choiceOrder',order);
                    stateMachine[2] = 1;
                    stateMachine[6] -=1;
                    stateMachine[1] = 1;
                    window.sessionStorage.setItem('stateMachine',JSON.stringify(stateMachine));

                    roleState[order][1] = -1;
                    window.sessionStorage.setItem('roleState',JSON.stringify(roleState));

                    gameFlow[day] = [order,-1,-1,-1,-1];
                    window.sessionStorage.setItem('gameFlow',JSON.stringify(gameFlow));

                    if(stateMachine[6] ===0){
                        alert('游戏结束，狼人获胜');
                        window.sessionStorage.setItem('result','狼人');
                        window.location.href ="result.html";
                    }else {
                        window.location.href = "mainflow.html";
                    }
                }else if(roleState[order][0] ==="预言家"){
                    window.sessionStorage.setItem('choiceOrder',order);
                    stateMachine[3] = 1;
                    stateMachine[6] -=1;
                    stateMachine[1] = 1;
                    window.sessionStorage.setItem('stateMachine',JSON.stringify(stateMachine));

                    roleState[order][1] = -1;
                    window.sessionStorage.setItem('roleState',JSON.stringify(roleState));

                    gameFlow[day] = [order,-1,-1,-1,-1];
                    window.sessionStorage.setItem('gameFlow',JSON.stringify(gameFlow));


                    if(stateMachine[6] === 0){
                        alert('游戏结束，狼人获胜');
                        window.sessionStorage.setItem('result','狼人');
                        window.location.href ="result.html";
                    }else {
                        window.location.href = "mainflow.html";
                    }

                }else if(roleState[order][0] ==="平民"){
                    window.sessionStorage.setItem('choiceOrder',order);
                    stateMachine[4] -=1;
                    stateMachine[1] = 1;
                    window.sessionStorage.setItem('stateMachine',JSON.stringify(stateMachine));

                    roleState[order][1] = -1;
                    window.sessionStorage.setItem('roleState',JSON.stringify(roleState));

                    gameFlow[day] = [order,-1,-1,-1,-1];
                    window.sessionStorage.setItem('gameFlow',JSON.stringify(gameFlow));
                    if(stateMachine[6] ===0){
                        alert('游戏结束，狼人获胜');
                        window.sessionStorage.setItem('result','狼人');
                        window.location.href ="result.html";
                    }else {
                        window.location.href = "mainflow.html";
                    }
                }
            }
        }
    });

/*        return order;
    }
    killAction(roleState.length);
    console.log(window.sessionStorage.getItem('killNum'));*/

});