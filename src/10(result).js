$(function () {
    var result = window.sessionStorage.getItem('result');
    $('.game-result').html(result+'获胜');

    var roleState = JSON.parse(window.sessionStorage.getItem('roleState'));
    console.log(roleState);

    var gameFlow =JSON.parse(window.sessionStorage.getItem('gameFlow'));
    console.log(gameFlow);
    console.log(gameFlow.length);

    var stateMachine = JSON.parse(window.sessionStorage.getItem('stateMachine'));

    $('.all-in').html("<p class='reverse'>生还玩家"+(stateMachine[4]+stateMachine[5] +stateMachine[6]) +"人，平民:"+stateMachine[4]+ "，狼人:"+stateMachine[5] +"，神民:"+stateMachine[6] +"</p>");
    function gameFlowHtml(arr) {
        var gameFlowHtml = "",
            actionPart01 ="",
            actionPart02 ="",
            actionPart03 ="",
            actionPart04 ="",
            actionPart05 ="";
        var chineseNum = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三'];
        for(let i =0,j=arr.length;i<j;i++){
            /*dayNum = "<div class='day-state'><p class='dayNum'>第"+chineseNum[i]+"天</p>";*/
            actionPart01 = "<div class='day-state'><p class='dayNum'>第"+chineseNum[i]+"天</p><p>狼人杀死了"+(gameFlow[i][0]+1)+"号("+ roleState[gameFlow[i][0]][0]+")</p>";


            if(gameFlow[i][1] !== -1){
                actionPart02 ="<p>女巫对"+(gameFlow[i][1]+1)+"号使用了解药";
                actionPart01 += actionPart02;
                if(gameFlow[i][2] !== -1){
                    actionPart03 ="女巫对"+(gameFlow[i][2]+1)+"号("+ roleState[gameFlow[i][2]][0]+")使用了毒药";
                    actionPart01 += actionPart03;
                }
                actionPart01 += "</p>";
            }else if(gameFlow[i][1] === -1) {
                if(gameFlow[i][2] !== -1){
                    actionPart03 ="<p>女巫对"+(gameFlow[i][2]+1)+"号("+ roleState[gameFlow[i][2]][0]+")使用了毒药</p>";
                    actionPart01 += actionPart03;
                }
            }

            if(gameFlow[i][3] !== -1){
                actionPart04 ="<p>预言家查验了"+(gameFlow[i][3]+1)+"号身份("+ roleState[gameFlow[i][3]][0]+")</p>";
                actionPart01 += actionPart04;

            }
            if(gameFlow[i][4] !==-1){
                actionPart05 = "<p>公投投死了"+(gameFlow[i][4]+1)+"号("+roleState[gameFlow[i][4]][0]+")</p>";
                actionPart01 += actionPart05;
            }
            actionPart01 += "</div>";
            gameFlowHtml += actionPart01;
        }
        console.log(gameFlowHtml);
        $('.game-flow').html(gameFlowHtml);
    }
    gameFlowHtml(gameFlow);
    $('footer>button').click(function () {
        window.sessionStorage.clear();
        window.location.href = "member.html";
    });
});