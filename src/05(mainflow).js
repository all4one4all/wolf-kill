$(function () {
    /*状态机[天数,流程页状态,女巫状态,预言家状态,平民人数,狼人人数,神民人数]*/
    /*女巫{1:死,2:解药毒药,3:解药,4:毒药}*/
    /*预言家{0:活,1:死}*/
    var stateMachine = JSON.parse(window.sessionStorage.getItem('stateMachine'));
    var day = stateMachine[0];
    console.log(stateMachine);

    var roleState = JSON.parse(window.sessionStorage.getItem('roleState'));
    console.log(roleState);

    /*流程*/
    var gameFlow =JSON.parse(window.sessionStorage.getItem('gameFlow'));
    console.log(gameFlow);

    /*选择的序号*/
    var choiceOrder = parseFloat(window.sessionStorage.getItem('choiceOrder'));
    console.log(choiceOrder);


    /*前晚状态*/
    function preNightState() {
        var pHtml =$('.last-word-action>p');
        console.log(gameFlow);
        if(gameFlow[day] === undefined){
            pHtml.html('天亮了');
        }else{
            if(gameFlow[day][1] === -1){
                switch (gameFlow[day][2]){
                    case -1:
                        pHtml.html('天亮了 昨晚'+(gameFlow[day][0]+1)+'号死了');
                        break;
                    case gameFlow[day][0]:
                        pHtml.html('天亮了 昨晚'+(gameFlow[day][0]+1)+'号死了');
                        break;
                        default:
                            pHtml.html('天亮了 昨晚'+(gameFlow[day][0]+1)+'号和'+(gameFlow[day][2]+1)+'号死了');
                }
            }else{
                switch (gameFlow[day][2]){
                    case -1:
                        pHtml.html('天亮了 昨晚是个平安夜');
                        break;
                    case gameFlow[day][0]:
                        pHtml.html('天亮了 昨晚'+(gameFlow[day][0]+1)+'号死了');
                        break;
                    default:
                        pHtml.html('天亮了 昨晚'+(gameFlow[day][2]+1)+'号死了');
                }
            }
        }
    }

    preNightState();

    var btn01 = $('#btn-01');
    var btn02 = $('#btn-02');
    var btn03 = $('#btn-03');
    var btn04 = $('#btn-04');
    var btn05 = $('#btn-05');
    var btn06 = $('#btn-06');
    var btn07 = $('#btn-07');

    $('.day-order').html("第 "+(stateMachine[0]+1)+" 天 天黑请闭眼");

    var witchCare =function() {
        var rSave;
        if(stateMachine[2] === 1){
            alert('跳过此步，女巫已死');
        }else if(stateMachine[2] === 4 || stateMachine[2]===0){
            alert('跳过此步，解药已用')
        }else if(stateMachine[2] === 2 || stateMachine[2] === 3){
            rSave = confirm('使用解药');
            if(rSave === true){
                if(roleState[choiceOrder][0] ==="预言家"){
                    stateMachine[3] = 0;
                    stateMachine[6] += 1;
                }else if(roleState[choiceOrder][0] ==="平民"){
                    stateMachine[4] += 1;
                }
                roleState[choiceOrder][1] = 0;
                window.sessionStorage.setItem('roleState',JSON.stringify(roleState));

                stateMachine[2] = 4;
                window.sessionStorage.setItem('stateMachine',JSON.stringify(stateMachine));

                gameFlow[day][1] = choiceOrder;
                window.sessionStorage.setItem('gameFlow',JSON.stringify(gameFlow));
            }else{
                /*roleState[choiceOrder][1] = 1;*/
                console.log(roleState);
                console.log(gameFlow);
                /*window.sessionStorage.removeItem('roleState');*/
                window.sessionStorage.setItem('roleState',JSON.stringify(roleState));
            }
        }
    };
    var witchKill = null;
    var prophetCheck = null;

    /*有限状态机01*/
    var fsm01 = new StateMachine({
        init: "a",
        transition:[
            {name:'care',from: "a",to:"b"},
            {name:'kill',from: "b",to:"c"},
            {name:'check',from:'c',to:'d'},
            {name:'speech',form:'d',to:'e'}
        ],
        methods:{
            onCare: function () {
                $('.witch-care-action').css('box-shadow','none');
                $('.witch-kill-action').css('box-shadow','0 0 1px 1px #2f2f2f');
                btn02.css('background-color','rgba(42,64,115,0.5)');

                witchCare = null;

            },
            onKill: function () {
                $('.witch-kill-action').css('box-shadow','none');
                $('.prophet-action').css('box-shadow','0 0 1px 1px #2f2f2f');
                btn03.css('background-color','rgba(42,64,115,0.5)');

                witchKill = null;
            },
            onCheck: function () {
                $('.prophet-action').css('box-shadow','none');
                $('.last-word-action').css('box-shadow','0 0 1px 1px #2f2f2f');
                btn04.css('background-color','rgba(42,64,115,0.5)');

                prophetCheck = null;
            },
            onLast: function () {
                $('.last-word-action').css('box-shadow','none');
                $('.speech-action').css('box-shadow','0 0 1px 1px #2f2f2f');
                btn05.css('background-color','rgba(42,64,115,0.5)');

            },
            onSpeech: function () {
                $('.speech-action').css('box-shadow','none');
                $('.vote-action').css('box-shadow','0 0 1px 1px #2f2f2f');
                btn06.css('background-color','rgba(42,64,115,0.5)');

            }
        }
    });



    switch (stateMachine[1]){
        case 0:
            $('.wolf-action').css('box-shadow','0 0 1px 1px #2f2f2f');
            btn01.click(function () {
                window.sessionStorage.setItem('gameFlow',JSON.stringify(gameFlow));
                window.location.href = "wolf-kill.html";
            });
            break;
        case 1:
            btn01.css('background-color','rgba(42,64,115,0.5)');
            $('.witch-care-action').css('box-shadow','0 0 1px 1px #2f2f2f');
            $('.witch-care-action>p').html("狼人请闭眼 女巫请睁眼<br>昨晚他("+ (gameFlow[day][0]+1)+"号)死了");
            btn02.click(function () {
                witchCare();
                fsm01.onCare();
                witchKill = function () {
                    var rKill;
                    if(stateMachine[2] === 1){
                        alert('跳过此步，女巫已死');
                    }else if(stateMachine[2] === 3 || stateMachine[2]===0){
                        alert('跳过此步，毒药已用')
                    }else if(stateMachine[2] === 2 || stateMachine[2] === 4){
                        rKill = confirm('使用毒药');
                        if(rKill === true){
                            console.log(roleState);
                            window.sessionStorage.setItem('roleState',JSON.stringify(roleState));
                            window.location.href = "witch-kill.html";
                        }
                    }
                };
                preNightState();

            });
            btn03.click(function () {

                witchKill();
                fsm01.onKill();
                prophetCheck =function () {
                    if(stateMachine[3] === 1){
                        alert('跳过此步，预言家已死');
                    }else {
                        window.location.href = "prophet-check.html";
                    }
                };
                preNightState();
            });
            btn04.click(function () {
                prophetCheck();
                fsm01.onCheck();
                preNightState();
            });
            btn05.click(function () {
                if((gameFlow[day][2]===-1)&&(gameFlow[day][0] === gameFlow[day][1])){
                    alert('今晚平安，跳过此步');
                }else {
                    alert("死者发表遗言");
                }
                fsm01.onLast();
                preNightState();
            });
            btn06.click(function () {
                alert('活着的玩家依次发言');
                fsm01.onSpeech();
                preNightState();
            });
            btn07.click(function () {
                window.location.href = "vote.html";
            });
            break;
        case 3:
            $('.prophet-action').css('box-shadow','0 0 1px 1px #2f2f2f');
            btn01.css('background-color','rgba(42,64,115,0.5)');
            btn02.css('background-color','rgba(42,64,115,0.5)');
            btn03.css('background-color','rgba(42,64,115,0.5)');
            btn04.click(function () {
                if(stateMachine[3] === 1){
                    alert('跳过此步，预言家已死');
                    fsm01.onCheck();
                }else {
                    window.location.href = "prophet-check.html";
                }
            });
            btn05.click(function () {
                if((gameFlow[day][2]===-1)&&(gameFlow[day][0] === gameFlow[day][1])){
                    alert('今晚平安，跳过此步');
                }else {
                    alert("死者发表遗言");
                }
                fsm01.onLast();
            });
            btn06.click(function () {
                alert('活着的玩家依次发言');
                fsm01.onSpeech();
            });
            btn07.click(function () {
                window.location.href = "vote.html";
            });
            break;
        case 4:
            $('.last-word-action').css('box-shadow','0 0 1px 1px #2f2f2f');
            btn01.css('background-color','rgba(42,64,115,0.5)');
            btn02.css('background-color','rgba(42,64,115,0.5)');
            btn03.css('background-color','rgba(42,64,115,0.5)');
            btn04.css('background-color','rgba(42,64,115,0.5)');
            btn05.click(function () {
                if((gameFlow[day][2]===-1)&&(gameFlow[day][0] === gameFlow[day][1])){
                    alert('今晚平安，跳过此步');
                }else {
                    alert("死者发表遗言");
                }
                fsm01.onLast();
            });
            btn06.click(function () {
                alert('活着的玩家依次发言');
                fsm01.onSpeech();
            });
            btn07.click(function () {
                window.location.href = "vote.html";
            });
            break;
    }
});