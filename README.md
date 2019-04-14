# 狼人杀
## 有限状态机
### 引入
```
<script src="js/state-machine.js"></script>
```
## 页面
start：游戏简介
member：玩家确定游戏人数
role-01：号码
role-02：角色
godview：上帝视角，展示所有玩家身份
mainflow：主游戏流程
wolf-kill：狼人杀人
witch-kill：女巫毒药
prophet-check：预言家查验身份
vote：投票
result：游戏结果
## 功能
member：根据玩家确定的人数，随机分配角色。（开始发牌）
跳转

role-01：展示玩家号码（查看1号身份）
跳转
role-02：展示玩家角色（隐藏，传递给2号）
跳转
role-01：展示玩家号码（查看2号身份）
跳转
role-02：展示玩家角色（隐藏，传递给3号）
...
role-01：展示玩家号码（查看n号身份）
跳转
role-02：展示玩家角色（隐藏，传递给上帝）
跳转

godview：（开始游戏）
跳转
mainflow：狼人请睁眼 狼人请相互确认身份（狼人请杀人）
跳转
wolf-kill：选择玩家（狼人请统一意见）
《选择狼人》
跳转
mainflow：狼人请闭眼 女巫请睁眼 今晚x号死了（你要救吗）
mainflow: 	你有一瓶毒药（你要使用吗）
跳转
witch-kill：选择玩家（使用毒药）
跳转
mainflow：预言家请睁眼（请选择一位玩家查验身份）
跳转
prophet-check：选择玩家（查看此人身份）
跳转
mainflow：天亮了 昨晚x号死了（请死者发表遗言）
mainflow：（玩家依次发言）
mainflow：发言完毕请玩家选择公投的对象（投票）
跳转
vote：选择玩家（投死他）

