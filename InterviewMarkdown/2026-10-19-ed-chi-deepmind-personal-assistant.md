# 硅谷坐标 × 谷歌 DeepMind 研究副总裁 Ed H. Chi（纪怀新）：个性化通用助理的未来

## 视频信息

- **频道**：Silicon Valley Vector 硅谷坐标（主持人：曹卿云，频道创始人）
- **嘉宾**：Ed H. Chi（纪怀新），Google DeepMind VP of Research——Chain-of-Thought 思维链论文共同发明人，LaMDA/Bard/Gemini 研究主管线出身
- **发布**：2026-10-18（美西时间 10-17 21:57 上线）
- **时长**：32 分 13 秒；访谈有效内容约 29 分半，结尾在「孩子还要不要学数学」追问处**戛然而止**（片尾约 2 分半无正文）
- **链接**：https://www.youtube.com/watch?v=32Eb2jUWJtQ
- **一句话推荐**：CoT 共同发明人正面回应 DeepMind「停更」传闻、个人助理回潮（Instinct/Muse Spark）、memory 才是真瓶颈、开源为何能追上闭源（他自认 CoT 是「原罪」之一）——观点密度极高且罕见的坦率，适合关心谷歌 AI 走向与「AI 泡沫在哪」的人。

## 章节导航

| 时间 | 章节 |
|---|---|
| 0:00-2:00 | 开场：从搜索推荐到机器认知，Ed 的 30 年研究主线 |
| 2:00-5:00 | 个人助理回潮：Instinct / Muse Spark 与「非常初期」判断 |
| 5:00-7:00 | 护城河是信任：Grandma Test（奶奶测试） |
| 7:00-10:00 | 硬件 vs 软件：消费 AI 生态的两半空白 |
| 10:00-14:00 | DeepMind「停更」传闻回应：小模型周期与技术主权 |
| 14:00-16:00 | Full-stack 优势与 capability over cost |
| 16:00-21:00 | Memory 研究：供给短缺、1M-2M 不够、记忆是 ranking 问题 |
| 21:00-23:00 | 如果今天创业：价值向 application 与 token factory 两端跑 |
| 23:00-25:00 | 开源 vs 闭源：藏起思维链 + 多模态护城河 |
| 25:00-28:00 | 泡沫在哪里；下一个爆发领域是 consumer |
| 28:00-29:30 | 收尾：从 33% 到千禧难题（截断） |

## 分章详解

### 一、开场：从搜索推荐到机器认知（0:00-2:00）

Ed 先 recap 他当天 panel 的内容：过去 30 年谷歌研究，**前面 20 年 focus 都在 recommendation 和 search**；过去 10 年因为神经网络，才学会用 next-token prediction 和 Chain-of-Thought 的方法发掘机器的**基本认知与 reasoning**。他当天 panel 讲的主线：从基本认知出发，更复杂的 reasoning、memory、RSI（recursive self-improvement，递归自我改进）这些方向以后的学术研究该怎么做。

背景注：Ed 是 2022 年 NeurIPS 论文《Chain-of-Thought Prompting Elicits Reasoning in Large Language Models》（Wei et al., arXiv:2201.11903）署名作者之一，其个人官网明确写「co-inventing Chain-of-Thought」——这场访谈里他反复用这个身份给观点背书。

### 二、个人助理回潮：非常初期（2:00-5:00）

曹卿云开场抛题：consumer AI 最近很火，Instinct 和刚 release 的 Muse Spark 让个人助理掀起新一轮讨论。

Ed 的定位框架：Google 的 **AI Mode**（search 问答化）本来就是 consumer 侧最大的 LLM application 层；Instinct/Muse 这类产品是想从「问答」再往前走一步到**通用助理**——订机票、订旅馆、买东西。

为什么现在才动：**权限问题**——「很怕把信用卡给了通用助理，结果它到处乱买东西」。2026 年初开始的一波 agent 探索（transcript 原词含糊，疑似 on-cloud/open-cloud exploration）让大家慢慢了解这类技术，小厂大厂都在试。

他的判断：**还是非常初期的阶段**——连「帮我买机票，到底买对还是买错」这类 confirmation 数据都还没真正出来。预测 **6 个月到 1 年**之内，通用助理与 AI Mode search 之间的关系和界面会搞得更清楚。

### 三、护城河是信任：Grandma Test（5:00-7:00）

曹问：个人助理现在形态很简单（text message 或一个 app），好的个人助理护城河是什么？

Ed：consumer 侧真正的护城河是**用户体验与信任**——只要犯一次严重错误，用户就会对它改观。这跟对方是 AI 还是真人私人助理无关：你对助理做出错误决定或行为的容忍度，决定了这段关系。

他提出 **Grandma Test（奶奶测试）**：有一天你的 grandma 指着你的机器人骂「你怎么这么笨」，通用助理的时代就真的到了——因为 grandma 对通用助理的期望非常高、容错又极低，是最严苛的用户样本。产品侧和科学侧现在都在 explore 这个 boundary。

他特意声明：「这是我个人的观点，不代表 Google 公司。」

### 四、硬件 vs 软件：两半都是空白（7:00-10:00）

Ed 把 consumer AI 生态切成两块：

- **Hardware**：核心问题是 on-device 与非 on-device 的模型交互怎么分工；提到 Apple 的「hybrid intelligence」概念（端云混合）。消费硬件以后怎么走，还是「**很大的空白的时代**」。
- **Software**：现在讲的是 services 而非 downloadable app。入口完全未定——经由 search 渠道进入通用助理环境，还是手机、智能眼镜、或者其他 device？这两年的大胆探索并没有得出任何结论。

他顺手吐槽：15 年前我们 worry 的是「app 有没有更新」；通用助理时代，你不应该还要整天给机器人 download app。

曹问：现象级产品最后会从谷歌/Meta/Apple 还是从初创公司出来？Ed 的回答跳出了公司视角：**从哪里出来可能反而不那么重要**——怎么普及、什么才是正确的人机 interface，这才是研究者眼里最 interesting 的问题。如果是新创公司做出来的，也很有可能被大厂收购；从投资人和开发者角度，他希望这是一个 healthy ecosystem，整个 industry 一起去 explore 这个 space。

### 五、DeepMind「停更」传闻回应：小模型周期 + 技术主权（10:00-14:00）

曹问得直接：DeepMind 人事变动多、模型发布节奏有变化，在前沿实验室里竞争力怎么看？

Ed：**「我们当然没有停下来我们的脚步。」** 最近几个月发表的多是**小型模型**——因为通用助理、个性化这些应用恰恰需要小模型而不是大模型，小模型推理成本效率更好。大一点的模型也在 develop，「我们可以拭目以待」。

资源分配问题（大模型 vs application 开发）他称为「见仁见智」，并点名湾区的「AGI pill」一帮人——特别是旧金山的 tech bro 逻辑：*software took over the world → 我只要把 coding/software 做好，我就 takeover the world*——这才是大家对超大模型（ultra-size model）「热爱」的来源。但他个人不希望应用端跑的都是超大模型。

DeepMind 团队优势：**人才积聚**——「人才实在是太多了，大家都想做大模型，卡又永远不够」。再往深一层：Google 用户对 Google 有一种期许——希望 Google 的模型不是用别人的、也不是用 OpenWeights 的模型，「**这也许可以说是一种技术主权（technological sovereignty）的味道**」。所以 Google 不可能 give up 模型开发，「这是完全不可能发生的事情」。

### 六、Full-stack 与 capability over cost（14:00-16:00）

Google 的结构性优势 = **full-stack 公司**：从模型开发 → application/services → 往下 hyperscaler → token factory → 甚至芯片开发 → 能源的使用与控制，全在公司内部。

核心论断：如果模型的 capability 被普及化（commoditize），那最重要的护城河就成了 **cost control**——能够用最便宜的成本 deliver 最好的 capability。「**所有 economic 的东西最终都是 capability over cost，这是毋庸置疑的。**」现在这个领域很多人没有在看 cost 这件事，但以 5 年 10 年计算的公司，真正该 optimize 的 metric 就是这个。

曹插入行业背景：前沿实验室投了很多卡，今年明年更夸张，谷歌这样的大厂现金流也被拖成负的（事实核查见附表：Alphabet 2026 Q2 FCF 确实转负）。Ed 回应：short-term 的公司只看 quality/accuracy；long-term 的公司会问 what's in the future——Google 厉害的地方是「double insure」，不是不肯 innovate，而是**所有地方同时在 innovate**：模型、application、chip、整个 full-stack。

### 七、Memory 研究：短缺、瓶颈与「记忆是 ranking 问题」（16:00-21:00）

本访谈技术含量最高的一段。曹的由头：谷歌哲学是「能存的东西尽量存」，但现在整个 memory 供应链短缺（DRAM、NAND、HDD）。

Ed 的三层拆解：

1. **Memory 与 computation 可以互换**（computer science 的老结论）：有长远投资计划的公司不会担心一时的 memory 短缺，可以用 computation 来代替。
2. **算法侧的 memory 用法是个设计变量**：不同架构的 memory/bandwidth 需求完全不同——他点名 Kimi 的 **Delta Attention 模型**，其 computation 与 memory 用法跟 full attention（O(n²)）和 sparse attention 又不一样。这还只是 sequential transformer 里的 memory，还没聊到个性化场景的 memory、KV cache 的 memory。
3. **认知科学视角（他的研究主场）**：memory 不只是一个存取（store/retrieve）机制——「**memory 事实上是一种 program**」，它在指导事情该怎么发生，是 programming the AGI machinery 的东西。团队在低层的 context buffer 讯息整理上也花很多精力。

两个 bottleneck 判断：

- **Context window 1M-2M token「完全是不够的」**——在他看来这是当前最大的瓶颈之一。
- **Memory 还没被想清楚**：现在把它当 retrieval 在做，但记忆是**主动遗忘、学习新东西、压缩旧东西**的过程。他给出本访谈最漂亮的一个 reframing：「**memory 事实上是一个 ranking 的问题**」——你记得的不是所有 Paris 相关的信息一涌而来，而是大脑 ranking 出此刻最重要的那些。「什么是重要的」才是 memory 真正的核心问题，而不是「记不记得」。

曹追问：人脑可以做主动遗忘。Ed：念过 CS 的人觉得机器 memory 不需要忘——但正因为它不是「记不记得」而是「什么最重要」，遗忘就是 ranking 的另一面。

创业公司做 memory layer 能成吗？Ed：硬件侧有一些把 memory 和 computation 结合的新 idea 并不在大厂里做（大厂也有人做）；memory 与 computation 的 relationship，「这几年可能会有一些新 development」。

### 八、如果今天创业：价值向两端跑（21:00-23:00）

曹：您今天要出来创业，最好的方向是什么？Ed 的回答实际是一张价值迁移地图：

前提判断：模型 capability 开始有一点 **commoditize**（不是完全，但 top 与 bottom 的 gap 在变平）。当模型能力不再是最强护城河时，value creation 会往两端跑：

- **Application 端**：用户 lock-in、stickiness、用起来的体验；
- **Token factory 端（hyperscaler）**：cost 相关——能源使用量、chip design、memory 与 computation 的关系、多少在 on-device 多少不在。

「所以以我的观点来看，这些都是 open questions，非常的 exciting。」

### 九、开源 vs 闭源：藏起思维链 + 多模态护城河（23:00-25:00）

本访谈传播最广的一段。曹：开源模型追赶很紧，未来 gap 会变大还是变小？

Ed 先给了个「惊人」的自白：**开源之所以能追上闭源，「其中一个原因就是因为我 co-author 的这个 Chain-of-Thought paper」**——开源社区用 CoT 的方法把模型里面的思维模式发掘出来，再复制拷贝这种推理方式。

闭源的应对：**现在大厂里面有很多 work 在想办法把推理链、思维链「藏起来」**——藏起来，被复制的可能性就更低。

第二个护城河：**multimodality**。「很多人讲得像是这已经是个定论似的（开源必然追平）——我个人认为这个是不大成熟的想法。」看起来有些 capability 会因蒸馏而 commoditize，但有些 capability（他举例 multimodality、visual reasoning）到目前为止是看不出这种 commoditization 的。后文他还补刀：很多模型的 visual reasoning capability 都非常糟糕，跟大家的信念不一样。

### 十、泡沫在哪里；下一个爆发是 consumer（25:00-28:00）

曹把问题推到台面：大家觉得开源能做的事情越来越多，留给 SOTA 模型 monetize 的空间更小，撑得起这样的估值和 capex 吗？

Ed：**「我并不会觉得整个 market 是一个泡沫，但它肯定在不同的地方有不同的泡沫。」** 他举例 Physical Intelligence 那边可能有 unrealistic 的 expectation；多模态/visual reasoning 很多模型还很糟糕——这就是「跟大家的信念不一样」的地方。

他再次点名信念分叉：如果你相信 software took over the world、用 agent 解决了 software 的 problem 就解决了一切，那他刚讲的很多顾虑就不 apply；但如果你觉得解决了 software 还没解决所有问题，「那我们还有很多戏可以唱」。

下一个 10x 机会在哪？Ed：现在 OpenAI/Anthropic 的 revenue 很多是 enterprise subscription 驱动；**「我挺看好 consumer 这一块的崛起」**——这也是他继续留在 Google 的原因：consumer services 一直是 Google 最强的地方。

### 十一、收尾：从 33% 到千禧难题——但没讲完（28:00-29:30）

结尾他再讲了一次 CoT 的时间轴（开场预告片的完整版）：当年做思维链研究时只能 solve 小学生的问题——「1 加 1 等于 2，买了 5 个 Apple 再买 6 个 Apple 是多少个」——当时模型 accuracy **只做到 33%**；现在最大的模型可以 solve **Millennium Prize 级别的数学问题（Navier-Stokes 方程）**。三四年时间，推理能力几乎是以「巅峰」的方式在扩张，但从科学家的角度看现在的 capability 肯定还不够，还会继续 expand——「这是对科学家来讲非常 exciting 的事情。」

曹随即抛出终极追问：「AI 数学都这么好了，现在从小培养的孩子，时间应该花在数学上吗，还是应该把精力放在一些……」——**访谈在这里被剪断**，全片结束。（这个没有答案的问题，可能是整场访谈留下的最大钩子。）

## 关键人物速查

- **Ed H. Chi（纪怀新）**：中国台湾裔美国计算机科学家（约 1973 年生），Google DeepMind VP of Research，主管 LLM 推理/推荐/规划方向。明尼苏达大学 6.5 年连拿 B.S./M.S./Ph.D. 三个学位；ACM Fellow、AASF Fellow、CHI Academy。加入 Google 前是 Xerox PARC Augmented Social Cognition Group 的 Area Manager/Principal Scientist。39 项专利、约 240 篇论文。LaMDA 项目团队负责人（Distinguished Scientist），发起并监督 LLM reasoning 研究包括共同发明 Chain-of-Thought；2023 年作为 Research Platform Lead 参与 Bard/Gemini 启动；近年团队 demo 了 Astra 通用助理 agent。
- **曹卿云（Qingyun Cao）**：硅谷坐标 Silicon Valley Vector 创始人、主播，坐标硅谷的中文科技投资访谈节目。
- **Jason Wei**：CoT 论文第一作者（Wei et al. 2022），Ed 是共同作者——访谈中 Ed 强调自己 co-author 这个 paper 是开源能追上的「原罪」之一。

## 关键数据速查

- 30 年 / 20 年 / 10 年：谷歌研究的前 20 年 focus 在 recommendation+search，近 10 年转向神经网络认知与 reasoning（嘉宾自述）
- 6 个月-1 年：Ed 预测通用助理与 AI Mode search 的关系/界面清晰化的时间窗（嘉宾预测）
- 1M-2M token：当前最大 context window 量级，Ed 判断「完全是不够的」（嘉宾判断）
- 33% → Millennium Prize 级：CoT 论文当年 GSM8K 解题率（见核查表，图 2 轴标 = 33%）→ 2026 年最大模型解 Navier-Stokes 方程
- 56.9 vs 17.9：PaLM 540B 在 GSM8K 上 CoT prompting vs standard prompting（Wei et al. 2022 Table 2，✓已核原文）
- 2026 Q2：Alphabet capex $44.9B > 经营现金流 $39.1B，FCF 首次转负 −$5.9B（第三方报道口径，见核查表）
- Kimi Delta Attention：Ed 点名的低 memory 架构案例（Kimi Linear，arXiv:2510.26692，2025-10-30）

## 核心金句

> 「当你有一天你的 grandma 指着你的机器人骂它说你怎么这么笨，你就知道通用助理的时代真的到了。」

> 「所有 economic 的东西最终都是 capability over cost，这是毋庸置疑的。」

> 「Google 是一个 full-stack 的公司……如果模型的 capability 被普及的话，那么你最重要的事实上是 cost control。」

> 「开源模型之所以能够追上闭源，其中一个原因就是因为我 co-author 的这个 Chain-of-Thought paper……现在大厂里面有很多 work 在想办法把这个推理链、思维链把它藏起来。」

> 「Memory 事实上是一个 ranking 的问题——什么是重要的，这才是 memory 真正的核心问题。」

> 「我并不会觉得整个 market 是一个泡沫，但它肯定在不同的地方有不同的泡沫。」

## 事实核查表

| # | 断言 | 出处 | 判定 |
|---|---|---|---|
| 1 | Ed H. Chi 是 CoT 论文共同作者 | arXiv:2201.11903 作者列表：…Fei Xia, **Ed Chi**, Quoc Le, Denny Zhou | ✅ 已核原文（arXiv 页面 2026-10-19 拉取） |
| 2 | 「当年 accuracy 只做到 33%」 | Wei et al. 2022 Figure 2：GSM8K 上 Finetuned GPT-3 175B ≈ **33**（轴标签），prior best 55；同论文 Table 2 PaLM 540B standard 17.9 → CoT **56.9** | ✅ 与论文图 2 一致（33 为图轴粗粒度标签；原始 Cobbe et al. 2021 精确值常见引为 33.5% 175B verifier 版，Ed 口语「33%」量级无误） |
| 3 | 「现在最大模型可解 Millennium Prize 的 Navier-Stokes 方程」 | OpenAI 于 2026-09-08 公布其内部 AI 系统产出 Navier-Stokes 存在性与光滑性问题的解（openai.com/index/navier-stokes-solution/）；**注意**：Ed 未提归属，多家报道该证明的正式性/署名存在争议，Millennium 奖金判定尚未落定 | ⚠️ 事件本身属实但归属 OpenAI 而非 DeepMind；Ed 转述为行业能力，社区有争议 |
| 4 | Instinct、Muse Spark 是谷歌产品 | Instinct = 独立创业公司（instinct.com，2026-10-05 上线群聊 agent）；Muse Spark = **Meta** 的模型/应用（2026-09 起），10 月又发 Muse Wonder 系列 | ❌ 非谷歌产品。访谈语境里二人是把它当行业现象讨论（主持人问「谷歌有什么对应」），Ed 答的是 Google AI Mode/助理路线——报告按此理解，不写「谷歌发布了 Instinct」 |
| 5 | Kimi Delta Attention 存在 | Kimi Linear（arXiv:2510.26692，2025-10-30），核心模块 Kimi Delta Attention (KDA)，线性注意力，降 memory 占用 | ✅ 已核 arXiv |
| 6 | Apple 提出「hybrid intelligence」概念 | 访谈口播；2026 年端云混合叙事广泛存在（Apple Intelligence 路线），未找到 Apple 官方以此命名的公告 | ⚠️ 概念存在、命名归属未核到官方一手 |
| 7 | 「谷歌现金流被拖成负的」（主持人语） | Alphabet 2026 Q2（7-22 财报）：capex $44.9B、经营现金流 $39.1B、FCF **−$5.9B**，多年来首次单季转负（多家第三方核算一致） | ✅ 单季 FCF 转负属实；「现金流」严格说指自由现金流，经营现金流仍为正 |
| 8 | Ed 背景：6.5 年三学位、PARC 出身、~240 篇论文、39 项专利 | edchi.net 官网 bio（2026-10-19 拉取） | ✅ |
| 9 | 「2026 年初开始 open/cloud exploration 让大家了解技术」 | 访谈口播，ASR 模糊（on-cloud/open-cloud 难辨）；对应现实事件可锚定 Operator 类 agent 的公开化浪潮 | ⚠️ 口播含糊，按行业现象理解 |

**字幕说明**：本片为 YouTube 原生中文字幕（Supadata 拉取，lang=zh），无 AI 翻译层，数量级漂移风险不适用；个别英文术语（RSI、KDA、token factory）为嘉宾中英夹杂口播原词。ASR 将嘉宾名转写为「Ed H. Chi（纪怀新）」与频道官方标题一致。

## 页脚

手动加更（2026-10-19）。流水线：longform_dedup 选片门 CLEAN → Supadata 拉原生中文字幕 4066 段 → 通读 → 9 组 web 检索核载荷事实（CoT 论文/GSM8K 图 2 数值已回 arXiv 原文核对）→ 分章落盘。逐字稿落地 `/tmp/yt_32Eb2jUWJtQ.txt`（重启即失）；方法与字符数：正文约 14,000 字符。

