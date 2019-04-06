$(function () {
    var viewWidth = $(window).width();
    var viewHeight = $(window).height();
    $('html,body').width(viewWidth).height(viewHeight);

    function roleArr(p,f,sum) {
        var roleArr = ['女巫','预言家'];
        var randomRole = [],random;
        for(var i0=0,j0=p;i0<j0;i0++){
            roleArr.push('平民');
        }
        for(var i1=0,j1=f;i1<j1;i1++){
            roleArr.push('狼人');
        }
        for(var i2 =sum;i2>0;){
            random =Math.floor(Math.random()*i2);
            randomRole.push(roleArr[random]);
            roleArr[random] = roleArr[--i2];
        }
        return randomRole;
    }

    /*状态机[天数,流程页状态,女巫状态,预言家状态,平民人数,狼人人数,神民人数]*/
    /*女巫{1:死,2:解药毒药,3:解药,4:毒药}*/
    /*预言家{0:活,1:死}*/
    var stateMachine = [0,0,2,0];

    $('footer>button').click(function () {
        var pNum = parseFloat($(".person").html());
        var fNum = parseFloat($(".wolf").html());
        var sumNum = $('input[type="text"]').val();

        stateMachine.push(pNum);
        stateMachine.push(fNum);
        stateMachine.push(2);
        /*console.log(stateMachine);*/
        /*var role = ;*/
        window.sessionStorage.setItem('stateMachine',JSON.stringify(stateMachine));
        window.sessionStorage.setItem('role',JSON.stringify(roleArr(pNum,fNum,sumNum)));
        window.sessionStorage.setItem('order',0);
        window.location.href = "role-01.html";
        /*测试*/

        /*window.location.href = "godview.html";*/
    });
});