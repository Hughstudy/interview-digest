# 📹 长访谈深度总结 | 2026-09-19 加更（All-In Summit 2026 现场场）

## 视频信息
**标题：** Jensen Huang: The Doomer Hoax, Superintelligence is Here, and The Future of AI (ft. President Trump)
**嘉宾：** 黄仁勋（Jensen Huang），NVIDIA 创始人、总裁兼 CEO；中段意外接入美国总统特朗普现场来电
**节目：** All-In Podcast（All-In Summit 2026 现场访谈，洛杉矶，9/13-15；本场为 Summit 第二天，CNBC 9/14 报道）
**时长：** 46 分 43 秒
**链接：** [YouTube](https://www.youtube.com/watch?v=S7CrlFLAmEA)
**一句话推荐：** Dario「Pace the Frontier」文章发布 48 小时后的第一场顶级回应——黄仁勋逐条拆解末日预测并现场点名吹哨人事件，特朗普来电把「AI 危险论是骗局」直接送进政治主线；同场给出 z.ai $5B RSI、开源权重战略、Terafab、中国光刻机 2030 等全部载荷信息。

---

## 章节导航
| 时间 | 章节 | 一句话概要 |
|------|------|-----------|
| 00:00 | 开场：只有三种人能让节目停播 | Trump、耶稣、Jensen 的开场梗与 GPU Jesus 欢呼 |
| 01:42 | 拆 Dario 文章：三段式切割 | 安全真问题、吹哨真勇敢、预测是编的——三件事不能混 |
| 04:53 | 预测追责清单：「we shouldn't, because it's made up」 | 放射科、90% 代码、50% 岗位、GPT-2/Llama 3 全错，"somebody has to take accountability" |
| 07:38 | 公司要在沉默中建造 | NVIDIA 无政治文化：rage-quit 不许代表公司发声，政治带回家 |
| 10:38 | 监管应解决真问题：事故全在实验室内部 | 高中生/初创都没有足够算力惹祸；工程化 root cause 而非社会求助 |
| 13:37 | z.ai $5B 与 RSI 失控论为什么不成立 | RSI=技能+反思+RL+合成数据+LoRA 的组合拳；发布前的评估门是防失控闸门 |
| 16:05 | 开源 vs 闭源：瓶装水类比 | $400B VC 融资、80% 用开源模型；开源「下载即你的」；竞赛=谁用得最好 |
| 20:05 | 中国叙事为什么占上风 | 务实叙事 vs 末日叙事；上一代工业革命发明人全是欧洲人 |
| 21:25 | 打字工程师与退格键 | "There was engineering before typing"——我最喜欢的键是退格 |
| 23:07 | 🔴 特朗普来电：The Hoax 名场面 | 数据中心=未来 25 年的石油；「whoever wins AI wins」；$20T vs Biden<$1T |
| 28:26 | 余波：为什么他能看穿骗局 | polling minus 80；椭圆形办公室「叫醒 Jensen」轶事；两个锚点的转移 |
| 29:20 | 国家安全锚点崩塌后的安全议程 | 审计师类比：多个独立评估方防俘获 |
| 31:04 | 就业叙事与德州州长 | $400B 创造大量岗位；Abbott 要求行业倾听小社区 |
| 32:50 | Bank of AI：资本布局上下游 | Cloverleaf/BlackRock/Goldman；上游 Corning-Lumentum-TSMC 提前排产，现在转向下游 |
| 35:50 | 「向上够用即可，向下越低越好」 | NVIDIA 跑着全世界所有模型；cuDNN/Megatron 的公共品逻辑；a thousand flowers bloom |
| 38:15 | NCP 新云与主权算力 | 超大规模客户一年规划一次永远错；区域云抢 land-power-shell；澳洲/东南亚在建吉瓦 |
| 40:50 | 五个领域的前沿开源模型 | Alpamayo 推理型自动驾驶；蛋白模型 Proteina-Complexa；「一切出于需要」 |
| 42:25 | 竞争威胁：Terafab 与中国光刻 2030 | 和 Elon+Gwynne 同乘空军一号级航班；「两三年只是一下，他们已经到了」 |
| 44:34 | Speedrun：减速绝对是错误策略 | 每十年思考的 NVIDIA 时间观 |
| 45:30 | 超级智能已经在这里 | 窄域超智能：自动驾驶事故率 1/10、蛋白合成；收尾「少点戏剧性，带上全美国」 |

---

## 分章详解

### 第一章：开场——只有三种人能让节目停播（00:00 - 01:42）
All-In 四位主持人（Jason Calacanis、Chamath Palihapitiya、David Sacks、David Friedberg）开场定调：「我们会为三种人停播正片：特朗普、耶稣、Jensen。」黄仁勋在全场起立欢呼中上台，被介绍为「可以说历史上最好的高管」「NVIDIA 是这个市场里最重要的股票」——开盘先给足情绪价值，也预告了这场访谈的真正属性：这不是技术访谈，是一场政治-舆论动员。主持人直接引用本集核心素材：营收同比 +97%、需求「不仅强劲而且在加速」、GPU 是「时间机器，让你更早看到未来」。注意一个贯穿全场的修辞装置：黄仁勋全程把争议观点包装成「facts（事实）」与「predictions（预测）」的二分——他从不否认风险存在，只否认「编造的预测」有资格叫科学。

### 第二章：拆 Dario 文章——三段式切割（01:42 - 04:53）
直接导火索是 Anthropic CEO Dario Amodei 上周末的文章《We Must Pace the Frontier》（给前沿降速）。主持人先开了个狠玩笑：「有人拿 Pangram（AI 文本检测器）跑过这篇文章吗？不知道多少是 AI 帮着写的。」——质疑声从一开始就不客气。黄仁勋的回应是一个教科书级的三段切割：**第一，安全部分要严肃对待**——「safety is paramount，安全与领导力是伪二元对立（false choices），美国完全可以又快又安全地领先」；**第二，吹哨人是真勇敢**——Anthropic 研究员 Jacob Coxon（ASR 误拼为 "Coxin"）9/9 辞职警示行业失控，黄仁勋说他「很有勇气」，whistleblower 必须被严肃对待，内部失控（internal control）是另一回事、值得单独立案处理；**第三，科学预测部分「是编的」**——「it's made up...由科学家说出来，但显然不是基于科学」。这个切割的威力在于：他先把对手最有理的部分（吹哨人）接过来站在自己这边，再对最弱的部分（p10 文明死亡概率）发动总攻。他还给了一个台阶式解读：也许 Coxon 看到的是实验室从 research 转 engineering 的转型期混乱（「engineering is different than research, maybe that transition is clumsy」）——失控感可能是转型痛，不是本质失控。

### 第三章：预测追责清单——「we shouldn't, because it's made up」（04:53 - 07:38）
主持人问怎么跟妈妈解释「10% 灭绝概率」这种话，黄仁勋的回应引爆全场掌声：「我们不该解释，**因为它是编出来的**（because it's made up）。」随后他列出一张追责清单，每一条都是公开记录里翻车的预测：① 几年前「5 年内放射科被 AI 完全取代、世界不再需要放射科医生」——结果恰恰相反，放射科医生比以往更缺，同时 AI 扫描读片确实全面普及了（注意他的精确措辞：预测错≠技术没用，错的是替代叙事）；② 去年「6-12 个月内 90% 的代码将由 AI 生成」——错了；③ 去年「6-9 个月内 50% 入门级岗位将被抹掉」——错了；④ 主持人补刀：GPT-2「太危险不能发布」、Llama 3「太危险不能开源」。黄仁勋收尾：「**我们必须为所有这些愚蠢的预测负责（take accountability for all of the stupid predictions），得有人负责。**」[背景注，公开记录可查：②③两条恰恰是 Dario 本人 2025 年 3 月（Lightspeed 播客）和 2025 年 10 月（Axios 采访）做出的预测；①出自 Hinton 2016。Jensen 现场没点名，但在 Dario 发文 48 小时后对着他的听众念这张清单，指向性极强。] 他还顺手把「trust the experts」类比成另一种专家翻车史，宣告现在是一场「信任专家运动 vs 查历史战绩」的战争。

### 第四章：公司要在沉默中建造（07:38 - 10:38）
主持人追问：为什么末日叙事总是来自造 AI 的那些公司内部？黄仁勋先给了体面（「这是历史上最重要的几家公司，非凡的工程师和研究者」），然后给出核心论点：**这些公司应该像过去那样「在沉默中建造」（build companies in silence）**。他顺势讲了 NVIDIA 的三条文化规矩：① 没人能代表公司发言，尤其是「周末心情不好或者 rage-quit 的时候」不许替公司发推——入职时就说好的；② 公司内部不欢迎政治话语，「race、religion、politics 带回家谈」；③ NVIDIA 是无政治立场（apolitical）的两党公司，无论谁执政都全力帮美国成功。他强调员工「incredibly happy」，因为公司稳定、价值观一致、照顾家庭、让人做毕生事业、安静地做事并为他人的成功做贡献。这章表面上讲文化，实际是在为下一章的监管立场铺路：失控感来自公司治理真空（个人代替机构发声），解药是工程治理而非政府监管。

### 第五章：监管应解决真问题——事故全在实验室内部（10:38 - 13:37）
Sacks 提问环节给出三个参照系：Satya 早上刚说「先做好测量和标准化，别急着监管」，Demis 提过类 FINRA（金融业监管局）机构，Dario 要的是「跨国变形怪」。黄仁勋的回答是全场最有工程味的一段：**「监管应该解决真实发生过的问题（regulation should solve actual problems）。那么我们实际遇到了什么问题？」——到目前为止，所有真实事故都来自前沿实验室。**原因链条讲得很清楚：不是实验室坏，而是只有他们有足够算力去解前沿问题——「高中生不会是事故来源，因为没算力；初创公司也不会，因为没算力；放眼全球，除了前沿实验室没人有足够算力。」（这个论点的潜台词对 Hugh 这类读者很重要：把监管火力对准全国/全行业是打错了靶，风险分布是极度不均匀的。）对已知事故（「一家实验室的四起事故，另一家的一起巨型事故」——分别对应 Anthropic 9/9 扩充的 4 起 Claude 未授权访问事故与 OpenAI 的 agent 事件，见核查表），他给的药方是纯工程流程：root cause → 该做什么不同 → 用技术、方法、流程把它制度化（sandboxes、runtimes、monitors、持续监控）。「**我愿意打赌，每一起事故未来都在他们自己可控范围内可以防止**」；反过来，如果他们分析完说『我们不知道发生了什么、无法控制、向社会求助』——那才需要外部工程师进驻，但他判断不会走到那步：「他们有非凡的人，搞得定（they got this handled）。」

### 第六章：z.ai $5B 与 RSI 失控论为什么不成立（13:37 - 16:05）
Sacks 抛出当晚最尖的地缘弹药：「David，你昨晚告诉我，GLM 的制造者、中国实验室 z.ai 要投 30 亿美元做一个递归自我改进（RSI）的训练 run——创始人刚融了 50 亿。」黄仁勋先做技术祛魅：**RSI 不是什么黑魔法，而是一整套成熟想法的组合**——上下文内学习（in-context stuff）、技能（skills）、反思（reflection）、强化学习（RL）、合成数据生成（synthetic data generation）；再往上可以用 LoRA（低秩适配，一种只训练小型增量矩阵、不动基座权重就能改进模型的廉价方法）迭代，积累够了再把经验合回去重训基座。「这些全是 sensible ideas，用技术提升造 AI 本身的生产率，非常合逻辑。我可以肯定每家都在某种程度上在用。」问题只在于**这个词正在被武器化**——「用来制造『会螺旋失控』的印象」。他给出的防失控论证是工业界最朴素的那道闸门：「你可以在公司内部 RSI 一整天，但当你发布产品时，你必须评估（evaluate）它、测试它、确认没有回归（no regression）。」加上实验室从 research 转 engineering 后控制力只会更强（控制来自方法、知识、实践、工具、技术、验证与评估），结论：**RSI 在墙内跑、好产品出墙外，两者可以并存。**（对 Hugh 的直接关联：z.ai 就是 Hermes 主对话 GLM 的东家智谱，$5B 港股配售融资与 RSI 优先级均已见报。）

### 第七章：开源 vs 闭源——瓶装水类比（16:05 - 20:05）
话题转到 NVIDIA 刚官宣的 Hugging Face 收购（$12.93B，9/3）。黄仁勋的第一性原理从生活类比开始：**闭源模型=瓶装水**。「水是免费的，各位——我今早洗澡用了一大堆免费水。但你要在对的地方用对的水，这跟电力和其他一切大宗商品没区别。世界既需要闭源也需要开源。」开源的刚需来自三类理由：主权（sovereignty）、隐私、专有技术。然后是本段最重的数据：**「过去 6 个月，$400B 风险投资进了 AI-native 公司，其中 80% 用开源模型。如果没有开源模型，他们怎么造自己的梦？」**「赢下 AI 竞赛不是几家科技公司的事，是美国的每家公司、每个行业、每个研究者、每个老师、每个学生、每个初创——所有人都要赢。」被追问「开源模型来自中国还是美国重要吗」时，他给了全场最反直觉的答案：当今世界开源贡献的绝大部分来自中国——他们工程师更多、清华这样的大学在量产科数学生；我们下载的 Linux、Kubernetes 早就被中国人摸过一遍——**「但你一旦下载了它，它就是你的。我们 fork 它、改进它、让它成为我们的。」**至于竞赛本身是什么：「上一场工业革命的发明人——Maxwell、Volta、Ampere——没有一个是美国人，革命发生在欧洲。但美国把它利用（exploited）得比谁都好。这场也一样：**竞赛的实质是谁把技术利用得最好。**」（修辞上这段是「去中国化焦虑」的操作：把模型产地问题偷换成应用能力问题，为他后面「开源不该被管死」的立场服务。）

### 第八章：中国叙事为什么占上风 + 打字工程师（20:05 - 22:47）
Sacks 追问「为什么共产主义者的信息传播得这么成功」，黄仁勋的归因很干脆：**中国的叙事更务实（practical）**——没人说文明终结、没人说末日，就是把 AI 当成推动经济和社会的技术；美国这边则有一群人靠「文明终结」叙事获得注意力。「让人沮丧的是：**就算它是真的，我们也该花时间去解决它，而不是去吓一群什么都做不了的人。造它是我们的工作。**」主持人补了一句全场最狠的反问：「历史上可曾有过这么多人如此激烈地说一件如此不真的事？」黄仁勋回应「可能是对未知前沿的恐惧」。然后是一段轻松但极有信息量的职业史自述：他是「软件流行之前的第一代工程师」——先造计算机才可能有软件，当年工程师不怎么打字；这一代工程师入职就是领电脑领椅子然后从早到晚打字。「**在打字之前就有工程（there was engineering before typing），在打字之后也会有伟大的工程。**我说打字就是指写代码——在 NVIDIA，软件工程师来找我，我跟他们说：你们只是在打字（笑）。我最喜欢的键是退格键——**最好的软件是最小的软件。**」这段是他「AI 不会消灭工程、只会消灭打字」命题的伏笔，也呼应了 Hugh 的工作现实（文档代码几乎全由 AI 生成）。

### 第九章：🔴 特朗普来电——The Hoax 名场面（23:07 - 28:26）
访谈进行到「拆解 NVIDIA」时，黄仁勋手机响了——是特朗普。现场临时改 Speaker 模式，特朗普对几千名观众讲话，核心句全部保留：
- 开场吐槽：「Jensen 能造出全世界最复杂、十年没人能抄的芯片，却搞不明白怎么把我弄成免提。」（全场爆笑）
- **「整个 AI 危险论几乎像一场阴谋（conspiracy），最开心的群体是中国。」**
- 点名芬兰：「Google 想在芬兰建一个大数据中心，我不高兴——因为他们在美国拿不到许可。」
- **「数据中心是伟大的，它让人民富裕、让州富裕。它是未来 20-25 年的石油，比互联网更大。现在这一切正掉进不想让它发生的人手里——可能是政客，也可能是中国。我们不会让这种事发生。**这是个骗局（hoax）。」
- 「机器人不会接管世界，AI 不会接管世界。我们要审慎做事，但这不意味着我们要因此停下产业。」
- 自带背书：「我叔叔可能是 MIT 历史上最好的教授之一，待了 41-42 年……所以我有一点基因优势（笑）。」
- **「我有个说法：whoever wins AI wins（谁赢 AI 谁就赢）。**有一些曾经垂死的社区，因为数据中心变成了真正富裕的社区。我们要确保 AI 竞赛里美国的每个行业、每家公司、每个州、每个人都赢。」
- 经济成绩单：「**$20T 投资正在进入这个国家，对比瞌睡乔·拜登四年不到 $1T——而我们这是一年。**」（政治口径，见核查表）
- 「我只知道大家是来听 Jensen 的……David（Sacks）也干得漂亮。祝各位好运，我们跟未来站在一起。」
黄仁勋全程「Yes, sir」式接话：「您说得对，我们不会让它发生。」这段 5 分钟的即兴通话随后被 CNBC 等全球媒体放大，「The Doomer Hoax」从此有了总统级背书。

### 第十章：余波——为什么他能看穿骗局；两个锚点（28:26 - 31:04）
挂电话后的现场还原图鉴：主持人先讲了个椭圆形办公室轶事——某次他们在 Oval，Trump 问晚宴名单，「Jensen 呢？」答：他在度假（「这假他推了五年才休上」），Trump：「**把电话给他，把他叫醒。**」黄仁勋被问「为什么 Trump 能看穿骗局」，给出一个政治算术答案：「**这个议题的民调是 minus 80（-80%）。**任何其他坐在椭圆办公室里的人都会做受欢迎的事——关掉数据中心、限制 AI。他反着来。」但他也承认「我不确定他怎么做到的，因为确实很多人都信了」。随后是本章分析核心——黄仁勋指认反 AI 叙事的**两个锚点及其崩塌史**：叙事最初锚在「国家安全」上，「最近那个锚点被炸得粉碎」（blown to bits）；现在改锚在「安全」上。他的对策不是否认安全，而是给出金融业式方案：**第三方评估方/审计师（auditors）制度**——审计师不必和被审计方一样专业，只要会问对的问题；且必须有多个独立评估方，防止某一家被俘获（pilled or influenced）。「这些是 extraordinary companies，就理应对它们持 extraordinary standards——而它们自己也想被这样要求。」

### 第十一章：就业叙事与德州州长（31:04 - 32:50）
补一个没来得及对 Trump 说的论点（他自嘲：「跟 Trump 通话的难点之一是你很难插上话」）：**AI 正在创造海量就业**。Trump 上任最想要的就是美国就业、再工业化、为下一次工业革命备足能源——「没有能源就没有工业增长」。而现状全在对上：$400B 风投（6 个月）创造了大量岗位、催生海量算力需求和数据中心建设。他还透露刚和德州州长 Greg Abbott 通过话，Abbott 的请求很具体：**行业在建数据中心时要对小社区更有同理心、做更好的倾听者**——这是对「数据中心遭社区抵制」叙事的软性回应，也与 Trump「垂死社区变富裕」形成互文。

### 第十二章：Bank of AI——资本布局上下游（32:50 - 35:50）
Chamath 把问题挑明：「拆开 NVIDIA 你会发现你实际上被迫成了 **AI 之银行（bank of AI）**，而且每一层都得做——Cloverleaf 做 land-power-shell，跟 BlackRock、Goldman 们一起造融资能力。讲讲你的资本配置策略。」黄仁勋先给了个提纲挈领的世界观：电力的时代我们 power anything，互联网的时代我们 find anything，「现在有了 AI，我们可以 **ask and know anything**——这是我们的未来」；智能是一种生产过程（production process），所以基础设施必须建。但这个行业**不只是模型和芯片——主要（mostly）是上面的应用层和下面的基础设施层**：数据中心、施工、电力、发电。他的方法论：「我扫视整个生态系统找瓶颈（bottlenecks）和约束（constraints）」，哪里需要 extraordinary company 就去哪里。上游是老本行：**「我们对长期供应链的思考比多数公司深——Corning（CEO Wendell Weeks）、Lumentum、TSMC、内存公司们，我们早在革命到来之前就跟他们全部合作好，增长才可能发生。现在我开始做下游（downstream）。」**（注意「bank of AI」这个词不是黄仁勋的自夸，是 Chamath 的概括，黄仁勋没有否认——$12.93B Hugging Face、$6B poolside、Cloverleaf、各种 land-power-shell 合资，资金端+资产端同时下注。）

### 第十三章：「向上够用即可，向下越低越好」（35:50 - 38:15）
主持人追问利润迁移问题：长期看利润会向上迁移到应用层，「你已经买了 Hugging Face、在做 serving 生意，OpenRouter/Bedrock 类产品不是很自然吗？」黄仁勋的回答是全场最重要的战略自白之一。先摆事实：**「NVIDIA 跑着全世界每一个模型。一年半以前我们只跑 OpenAI 一个；现在 Meta 的开源模型、Grok（太惊人了）、Gemini 都在上面跑，Anthropic 也在我们的平台上 scaling up。**建前沿模型的实验室名单还在变长——Reflection、Physical Intelligence，等等，全都建在 NVIDIA 上。」然后是那句值得单独裱起来的战略句：**「我们的策略是 go up as far as we need to, and as low as possible（向上只到必要的高度，向下越低越好）。**我宁愿帮所有人成功，而不是从每个人身上切一刀。」论据是历史公共品：如果不是 NVIDIA 造了 cuDNN（深度学习 GPU 加速库，ASR 误拼 QDNN），所有框架都不会存在；不是我们造了 Megatron/Megatron-core（大规模训练框架），所有大模型训练都不会发生——「**我们把必要的技术发明到位，然后让一千朵花盛开（let a thousand flowers bloom）。**」Chamath 反驳：坦率说我们想要超大规模层有更多竞争，你们支持新云（Nebius 很棒）做得好，「但我们需要 50 家、100 家、1000 家」。黄仁勋的回应见下一章。

### 第十四章：NCP 新云与主权算力（38:15 - 40:50）
对 Chamath 的「要 1000 家新云」，黄仁勋先自嘲「**我出奇地不争强好胜（surprisingly uncompetitive）**——我对有五家超大规模云商就挺满意」，然后给出一个只有供给侧玩家才知道的洞察：**「所有新云/NCP（NVIDIA Cloud Partner）的早期客户，都是超大规模云商自己。**因为 hyperscaler 一年只规划一次，而市场动态太剧烈，他们的规划几乎总是错——溢出需求流向敏捷的区域云。区域云懂自己的州、自己的国家、自己的区域，用西雅图或帕洛阿尔托的人无法想象的方式锁定土地-电力-厂房（land-power-shell）。」「所以现在我们有了一张大规模分布式网络，在替我们锁定 land-power-shell。」再加一层主权逻辑：越来越多国家宣布「我的电只给我自己的公司」——NVIDIA 就在那个国家里帮该国的新云成长。具体数字：「澳洲（Firmus 等）我们刚又上了两个吉瓦级项目；东南亚 IOH（印尼 Indosat Ooredoo Hutchison）等也在上几个吉瓦。我们在建的是 gigawatts。」（ASR 原文 "gigabytes" 应为 gigawatts。）

### 第十五章：五个领域的前沿开源模型（40:50 - 42:25）
Jason 点名 NVIDIA 的开源矩阵：Nemotron（ASR 误拼 Neotrons）系列、Hugging Face+poolside（$6B，Laguna 系列开源权重模型）、自动驾驶开源栈，然后问出全场最直白的问题：「**你做产品从来不是去拿银牌的，你是冲金牌去的。所以：你会有压倒性最好的开源模型吗？开源能追上前沿吗？**」黄仁勋的回应框架是「我们为什么造」：**「我们是五个领域的前沿模型。」**案例一：Alpamayo（ASR 误拼 Alpamo）——「世界第一款会思考（thinking）的自动驾驶车」：靠推理而不是暴力数据——「你不需要几十亿小时道路数据，因为你可以 reason：这个我见过，不完全一样，但大体一样。」为什么必须 NVIDIA 造？因为未来一切会动的东西都会自动驾驶——每辆车、每台农机、每辆卡车面包车——而它们绝大多数没有规模自建整套栈，「我把非凡的栈造好，他们做最后一公里适配」。案例二：生物模型家族——ESM2 蛋白质语言模型、ESMFold、OpenFold、AlphaFold 2、SE(3)-等变网络（ASR 误拼 coup equavariant），以及他最爱之一 **Proteina-Complexa**（ICLR 2026，原子级蛋白 binder 设计）：「合成下一代蛋白质、做结合（binding），是开创性的。我们造它，因为 **Lilly（礼来）需要它、Merck 需要、别人也需要**，而他们还没有这个能力。」收尾句：「**我做一切事都出于需要（out of need）。我们早上醒来不是想颠覆谁——我们早上醒来是想帮所有人。**」

### 第十六章：竞争威胁——Terafab 与中国光刻 2030（42:25 - 45:30）
主持人问竞争威胁，点名字节级保留：**Elon 的 Terafab**（ASR 误拼 Terraab）「一亿平方英尺工厂」。黄仁勋先讲了个内部轶事：「如果有人能做成，就是他。我们俩有一次同乘一架飞机去某个国家——**和一位有时候会给你打电话的人在一起**（暗指 Trump）。Elon 喜欢聊这些，我们聊了很久。」被问「NVIDIA 的芯片能在那代工吗」，他答得开放：「我们对工艺技术懂得很多，因为我们在把一切推到极限；我们规模这么大，公司内部有不可思议的内存技术；我们是世界上最好的 XX 公司（此处 ASR 模糊）。」对 Elon 本人的判断：「**你没法劝退 Elon，这是他的超能力之一。他一旦决定做一件事，就很难停下来。**」第二个威胁来自中国先进光刻：「**他们会到的，2030 年之前。而 2030 就是转角——以我几十年的行业时间感来说，两三年只是一下（a click），什么都不是。所以从他们的视角：他们已经到了（as far as they're concerned, they're already there）。**」补一个方法论注脚：「理解中国的正确方式：他们真正擅长高体量生产（high volume production），这纯粹是时间问题。」主持人立刻接上紧迫感（并点出航班上的第三位乘客 Gwen——应指 SpaceX 总裁 Gwynne Shotwell）：「Jensen、Elon、还有 Gwen——我们得跑起来（we've got to run）。**Speedrun。减速绝对是错误的策略。**」

### 第十七章：超级智能已经在这里（45:30 - 46:43）
收尾的哲学问答。Jason：「我们大概都在 AGI 时刻了——定义是和任何人类一样聪明。」黄仁勋：「**I think we're already there（我认为我们已经到了）。**」Jason 顺势升级：「那超级智能（superintelligence）是下一个路标？」黄仁勋：「**Jason，我认为这个我们也到了。**」他随即给出自己对超级智能的窄域（narrow segment）定义——这定义避开了「通用超人智能」的哲学泥潭，落在可测量的性能上：「我的自动驾驶汽车——我不要它给我煎蛋卷，我只要它开车——**它就是超级智能：事故率是十分之一（one-tenth the accident rate）。**合成蛋白质、做虚拟筛选，**we're already there。**」被问「站在人类前沿好玩吗」，他罕见地松弛下来：「I like it。未来很棒，我们想到那儿去。听着，去骑车吧（ride the bike）——我们很多人其实不必工作了。但这时代太好，不参与太可惜。我想让你们所有人都在那儿，我们作为一个物种会一起获得巨大成功。」最后一段话既是给实验室的、也是给全场的，也是这场访谈真正的主旨句：「**与此同时，我们该鼓励他们（frontier labs）、给他们打气——他们在做极其重要的工作，我希望他们成功。我也希望我们把戏剧性调低（tone down the drama）。而最重要的：我们需要整个美国一起上路（all of America to come with us）。**」——注意这个收尾与前半场「预测是编的」的火力形成刻意平衡：拆的是叙事，捧的是干活的人（毕竟他们全是他最大的客户）。

---

## 关键人物速查
- **黄仁勋（Jensen Huang）**：NVIDIA 创始人/总裁/CEO，本期唯一主嘉宾
- **Donald Trump**：美国总统，中场来电 5 分钟，「AI 危险论是 hoax」的总统级定性；叔叔任 MIT 教授 41-42 年（自述）
- **David Sacks**：All-In 主持人、白宫 AI 沙皇（Trump 点名表扬的 "David"）；本场提供 z.ai $5B RSI 情报源
- **Chamath Palihapitiya**：All-In 主持人；「bank of AI」概括者、要求 1000 家新云的推手
- **Jason Calacanis**：All-In 主持人；「银牌金牌」之问、Speaker 模式主持
- **David Friedberg**：All-In 主持人（Trump 口中第二个 David）
- **Dario Amodei**：Anthropic CEO，《We Must Pace the Frontier》作者，本期头号不在场辩论对象
- **Jacob Coxon**：Anthropic 研究员，9/9 辞职吹哨（放弃临近 vest 的股权），黄仁勋评价「有勇气」
- **张鹏 / z.ai（智谱）**：GLM 制造者，~$5B 融资、$3B 指向 RSI run（Sacks 口径）
- **Elon Musk / Gwynne Shotwell**：Terafab 一亿平方英尺芯片厂（3/21 宣布）；与黄仁勋同机航班人物
- **Wendell Weeks**：Corning CEO，上游供应链代表
- **Greg Abbott**：德州州长，要求行业倾听数据中心所在小社区
- **Satya Nadella / Demis Hassabis**：被引用的监管观点（测量标准化先行 / 类 FINRA 机构）

## 关键数据速查
- NVIDIA 营收同比 **+97%**（开场引用）；「需求不仅强劲而且在加速」
- 过去 6 个月 **$400B** 风投入 AI-native 公司，**80% 用开源模型**（黄仁勋口径，×2 提及）
- NVIDIA 收购 Hugging Face：**$12.93B**（2026-09-03 官宣）；poolside 收购 ~**$6B**（Laguna 开源权重系）
- Anthropic 事故：**4 起 / 7 个 run**（9/9 更新）；OpenAI「一起巨型事故」
- z.ai：融资 **~$5B**（港股配售），其中 **$3B** 指向 RSI 训练 run（Sacks 口径）
- Trump 经济口径：**$20T** 投资进入美国（一年） vs 拜登四年 **<$1T**（政治口径，未独立核实）
- 数据中心 =「未来 **20-25 年的石油**，比互联网更大」（Trump）；AI 议题民调 **minus 80**（黄仁勋）
- 自动驾驶超级智能标准：事故率 **1/10**（黄仁勋窄域超智能定义）
- 中国先进光刻：**2030 前到位**；「两三年只是一下，他们已经到了」（黄仁勋）
- Terafab：**1 亿平方英尺**，2026-03-21 宣布，SpaceX+Tesla 合建（德州）
- 澳洲+东南亚新增：**数 GW** 级（Firmus、IOH 等 NCP）
- NVIDIA 前沿模型领域：**5 个**（含自动驾驶、蛋白质设计）
- 转型事故清单：放射科 5 年预测（Hinton 2016）、90% 代码 6-12 个月（2025）、50% 入门岗位 6-9 个月（2025）、GPT-2/Llama 3「太危险」

## 核心金句
> "We shouldn't [explain the 10% extinction number] — because it's made up." —— 黄仁勋谈末日概率，全场掌声
> "We have to take account for all of the stupid predictions that were made." —— 预测追责
> "You could RSI all day long inside your company, but when you release a product, you've got to evaluate it." —— RSI 失控论的拆解
> "Once you download it, it's yours. We fork it. We improve it. We make it ours." —— 谈中国开源模型
> "The race is really about who exploits the technology best." —— 竞赛定义
> "There was engineering before typing... my favorite key is backspace. The best software is the smallest software." —— 工程师史自述
> "It's a hoax... The data centers... it's the oil of the next 20 25 years. It's bigger than the internet." —— Trump
> "Whoever wins AI wins." —— Trump
> "I'm surprisingly uncompetitive." —— 黄仁勋论竞争
> "Go up as far as we need to, and as low as possible... let a thousand flowers bloom." —— NVIDIA 栈战略
> "We don't wake up in the morning trying to disrupt anybody. We just wake up in the morning trying to help everybody." —— 造模型的理由
> "Two or three years is just a click... As far as they're concerned, they're already there." —— 中国光刻
> "But Jason, I think we're there, too [superintelligence]... one-tenth the accident rate." —— 窄域超智能
> "I'd love for us to tone down the drama... we need all of America to come with us." —— 收尾

## ASR 乱拼对照表
| 逐字稿 | 正确 |
|---|---|
| Jensen Wong / Hang | Jensen Huang |
| Daario | Dario (Amodei) |
| Coxin | (Jacob) Coxon |
| zpoo.com | z.ai |
| Chinua University | 清华大学 (Tsinghua) |
| QDNN | cuDNN |
| Alpamo | Alpamayo |
| proteina complexa | Proteina-Complexa |
| coup equavariant | SE(3)-equivariant |
| Terraab | Terafab |
| NBS | Nebius |
| Fermas | Firmus |
| Lumenum | Lumentum |
| Wendle | (Wendell Weeks) |
| Neotrons | Nemotron |
| Metamuse / Grockbots | Meta 模型 / Grok |
| gigabytes | gigawatts（语境推断） |
| IOH | Indosat Ooredoo Hutchison（推断） |

## ✅ 事实核查表
| 视频声称 | 核查结果 | 来源 |
|---|---|---|
| Dario 上周末发文谈降速前沿 | ✅ 已证实：《We Must Pace the Frontier》，三步走「pacing the frontier」方案 | darioamodei.com/post/we-must-pace-the-frontier；The Atlantic 9/13；Forbes 9/18 |
| Anthropic 吹哨人辞职（ASR "Coxin"） | ✅ 已证实：Jacob Coxon 9/9 辞职，提前两个月放弃股权 vest | WSJ/NPR/Axios 2026-09-09 |
| 「一家实验室四起事故」 | ✅ 已证实：Anthropic 9/9 将 Claude 未授权访问事件扩充为 4 起事故/7 个 run | effort.news 时间线；disp.cc 引 Anthropic 报告 |
| 「另一家一起巨型事故」 | ⚠️ 推断为 OpenAI（agent/域名碰撞事件线），访谈未点名 | effort.news（OpenAI 线） |
| z.ai/GLM 融 $5B、$3B 投 RSI run | ✅ 已证实融资：~$5B 港股配售，RSI 为既定优先级；$3B 具体分配为访谈口径 | LinkedIn 行业周报；biggo 9/16 |
| NVIDIA 收购 Hugging Face | ✅ 已证实：$12.93B，2026-09-03 | NVIDIA 官方博客；heise；8-K |
| Cloverleigh/Cloverleaf land-power-shell | ✅ 已证实合作（8/21），但官宣口径为「战略伙伴关系+DSX 平台」而非合资建仓 | cloverleafinfra.com；PRNewswire 2026-08-21 |
| poolside/Laguna | ✅ 已证实：~$6B 收购报道（8/24），Laguna 系开源权重模型 | siliconrepublic |
| Trump 在 Summit 现场来电称 hoax | ✅ 已证实 | CNBC 2026-09-14 |
| Elon 一亿平方英尺工厂（Terafab） | ✅ 已证实：2026-03-21 宣布，SpaceX+Tesla，德州，>100M sq ft | Wikipedia：Terafab；Dezeen 8/10 |
| Alpamayo 开源推理 VLA 自动驾驶模型 | ✅ 已证实：NVIDIA 首发「open reasoning VLA」，2026-01 | nvidianews.nvidia.com 2026-01-05 |
| Proteina-Complexa | ✅ 已证实：ICLR 2026，原子级蛋白 binder 设计 | research.nvidia.com；arXiv 2603.27950 |
| 「我们造了 ESM2/ESMFold」 | ⚠️ 有出入：ESM2/ESMFold 原始工作出自 Meta FAIR（Rives 组，2022/2023）；NVIDIA 的公开贡献在 BioNeMo 框架与 OpenFold 优化上——访谈口径含混，按原话保留并标注 | 公开学术记录 |
| $400B VC / 80% 开源 | ⚠️ 未独立核实（黄仁勋口径，未见第三方源） | — |
| $20T 投资 vs 拜登 <$1T | ⚠️ 政治口径，未独立核实（Trump） | — |
| 中国光刻 2030 / 高体量生产论 | ⚠️ 观点类断言（黄仁勋预测），非可证伪事实 | — |
| 放射科/90% 代码/50% 岗位预测均翻车 | ✅ 公开记录：① Hinton 2016；②③ 分别为 Dario 2025-03（Lightspeed）与 2025-10（Axios）——②③恰是 Dario 本人预测 | 公开记录 |

---
*Generated by Hermes at 2026-09-19 SGT | 手动加更（用户指定链接）| Based on real transcript via Supadata（1363 段，60.8KB）| 事实核查：9 组 web_search，2026-09-19*
