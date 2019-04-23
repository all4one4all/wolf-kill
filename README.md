# 狼人杀
## 页面
**start页面**：游戏简介，介绍狼人杀游戏；
`开始游戏`跳转member页面

**member页面**：根据玩家确定的人数（人数大于等于6小于等于10），随机分配身份（平民、狼人、女巫、预言家）；
`开始发牌`（存储所有玩家状态）跳转role-01页面

**role-01页面**：展示玩家号码；
`查看1号身份`跳转role-02页面

**role-02页面**：展示该号码玩家身份；
`隐藏，传递给2号`跳转role-01页面

**role-01页面**：展示玩家号码；
`查看2号身份`跳转role-02页面

**role-02页面**：展示该号码玩家身份；
`隐藏，传递给3号`跳转role-01页面
...
**role-01页面**：展示玩家号码；
`查看n号身份`跳转role-02页面

**role-02页面**：展示该号码玩家身份；
*判断：n等于玩家人数，`传递给上帝`跳转godview页面*
*否则，`隐藏，传递给n+1号`跳转role-01页面。*

**godview页面**：展示所有玩家身份；
`开始游戏`跳转mainflow页面

**mainflow页面**：
狼人请睁眼 狼人请相互确认身份；
`狼人请杀人`跳转wolf-kill页面

**wolf-kill页面**：
狼人选择玩家
`杀死该玩家`
*判断：所选玩家已死亡，alert('该玩家已死亡‘)*
*否则，所选玩家身份为狼人，alert(''狼人请勿自相残杀)*
*否则，（改变该玩家死亡状态）*

*判断：所有平民/神民是否全部死亡，（狼人胜利） 跳转result页面*
*否则，跳转mainflow页面，切换步骤*

**mainflow页面**：
狼人请闭眼 女巫请睁眼 今晚他(x号)死了；
`你要救吗`
*判断：女巫已死亡，切换步骤*
*否则，女巫解药已用，切换步骤*
*否则，救（改变女巫解药使用状态）切换步骤*
*否则，不救  切换步骤*

**prophet-check页面**：选择玩家查看身份
`查看此人身份`
*判断：所选玩家已死亡，alert('该玩家已死亡‘)*
*否则，所选玩家身份已被查验，alert(''该玩家身份已被查验)*
*否则，（改变该玩家身份查验状态） 跳转mainflow页面，切换步骤*
