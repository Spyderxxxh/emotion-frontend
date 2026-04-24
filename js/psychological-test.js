// 心理评估量表题库 - 100道题
const psychologicalTestQuestions = [
  // 第一部分：情绪状态评估 (20题)
  {
    id: 1,
    category: "情绪状态",
    question: "最近一周，我感到情绪低落、抑郁或绝望。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 2,
    category: "情绪状态",
    question: "最近一周，我对做事情失去了兴趣或乐趣。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 3,
    category: "情绪状态",
    question: "最近一周，我入睡困难、睡不安稳或睡太多。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 4,
    category: "情绪状态",
    question: "最近一周，我感到疲倦或精力不足。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 5,
    category: "情绪状态",
    question: "最近一周，我对自己感到不满意或觉得自己很糟糕。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 6,
    category: "情绪状态",
    question: "最近一周，我难以集中注意力。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 7,
    category: "情绪状态",
    question: "最近一周，我有不如死掉或伤害自己的念头。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "depression"
  },
  {
    id: 8,
    category: "情绪状态",
    question: "最近一周，我感到坐立不安或烦躁。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 9,
    category: "情绪状态",
    question: "最近一周，我容易疲劳。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 10,
    category: "情绪状态",
    question: "最近一周，我感到紧张或坐立不安。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 11,
    category: "情绪状态",
    question: "最近一周，我感到害怕，好像有可怕的事情会发生。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 12,
    category: "情绪状态",
    question: "最近一周，我感到心跳得很快。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 13,
    category: "情绪状态",
    question: "最近一周，我因为莫名的原因而感到烦恼。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 14,
    category: "情绪状态",
    question: "最近一周，我感到发抖。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 15,
    category: "情绪状态",
    question: "最近一周，我感到容易被激怒。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anger"
  },
  {
    id: 16,
    category: "情绪状态",
    question: "最近一周，我感到愤怒或怨恨。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anger"
  },
  {
    id: 17,
    category: "情绪状态",
    question: "最近一周，我感到紧张不安。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 18,
    category: "情绪状态",
    question: "最近一周，我感到担忧。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 19,
    category: "情绪状态",
    question: "最近一周，我感到快乐。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "positive"
  },
  {
    id: 20,
    category: "情绪状态",
    question: "最近一周，我对生活感到满意。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "positive"
  },
  
  // 第二部分：社交关系评估 (20题)
  {
    id: 21,
    category: "社交关系",
    question: "我有可以倾诉心事的朋友。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 22,
    category: "社交关系",
    question: "我感到孤独。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 23,
    category: "社交关系",
    question: "我与家人关系良好。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 24,
    category: "社交关系",
    question: "我有稳定的亲密关系。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 25,
    category: "社交关系",
    question: "我在社交场合感到自在。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 26,
    category: "社交关系",
    question: "我害怕与人交往。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_anxiety"
  },
  {
    id: 27,
    category: "社交关系",
    question: "我担心被别人评判。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_anxiety"
  },
  {
    id: 28,
    category: "社交关系",
    question: "我在公众场合发言感到紧张。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_anxiety"
  },
  {
    id: 29,
    category: "社交关系",
    question: "我有良好的人际关系网络。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 30,
    category: "社交关系",
    question: "我能够表达自己的想法和感受。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 31,
    category: "社交关系",
    question: "我感到被他人接受。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 32,
    category: "社交关系",
    question: "我担心被拒绝。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_anxiety"
  },
  {
    id: 33,
    category: "社交关系",
    question: "我在社交场合感到自信。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 34,
    category: "社交关系",
    question: "我能够建立新的友谊。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 35,
    category: "社交关系",
    question: "我避免社交场合。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_anxiety"
  },
  {
    id: 36,
    category: "社交关系",
    question: "我感到与他人有情感联系。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 37,
    category: "社交关系",
    question: "我担心别人对我的看法。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_anxiety"
  },
  {
    id: 38,
    category: "社交关系",
    question: "我有可以依赖的朋友。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 39,
    category: "社交关系",
    question: "我在社交互动中感到舒适。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social"
  },
  {
    id: 40,
    category: "社交关系",
    question: "我感到与他人隔离。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social"
  },
  
  // 第三部分：自我认知评估 (20题)
  {
    id: 41,
    category: "自我认知",
    question: "我对自己有信心。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 42,
    category: "自我认知",
    question: "我觉得自己是个有价值的人。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 43,
    category: "自我认知",
    question: "我觉得自己有很多优点。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 44,
    category: "自我认知",
    question: "我对自己的能力感到满意。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 45,
    category: "自我认知",
    question: "我觉得自己不如别人。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 46,
    category: "自我认知",
    question: "我对自己的外貌感到满意。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 47,
    category: "自我认知",
    question: "我经常感到内疚或自责。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "self_criticism"
  },
  {
    id: 48,
    category: "自我认知",
    question: "我接受自己的缺点。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_acceptance"
  },
  {
    id: 49,
    category: "自我认知",
    question: "我对自己的未来感到乐观。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "optimism"
  },
  {
    id: 50,
    category: "自我认知",
    question: "我觉得自己无法控制生活中的重要事情。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "locus_of_control"
  },
  {
    id: 51,
    category: "自我认知",
    question: "我相信自己能够应对挑战。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "resilience"
  },
  {
    id: 52,
    category: "自我认知",
    question: "我对自己的决策能力有信心。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_efficacy"
  },
  {
    id: 53,
    category: "自我认知",
    question: "我感到自己能力不足。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  {
    id: 54,
    category: "自我认知",
    question: "我能够设定并实现目标。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_efficacy"
  },
  {
    id: 55,
    category: "自我认知",
    question: "我对自己的过去感到满意。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "life_satisfaction"
  },
  {
    id: 56,
    category: "自我认知",
    question: "我经常怀疑自己的能力。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "self_doubt"
  },
  {
    id: 57,
    category: "自我认知",
    question: "我感到自己有能力影响周围的环境。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "locus_of_control"
  },
  {
    id: 58,
    category: "自我认知",
    question: "我对自己的人际关系感到满意。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "life_satisfaction"
  },
  {
    id: 59,
    category: "自我认知",
    question: "我感到自己是一个好人。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "moral_self"
  },
  {
    id: 60,
    category: "自我认知",
    question: "我对自己的成就感到自豪。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "self_esteem"
  },
  
  // 第四部分：压力与应对评估 (20题)
  {
    id: 61,
    category: "压力与应对",
    question: "我感到压力很大。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "stress"
  },
  {
    id: 62,
    category: "压力与应对",
    question: "我感到紧张或焦虑。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "stress"
  },
  {
    id: 63,
    category: "压力与应对",
    question: "我感到放松。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "relaxation"
  },
  {
    id: 64,
    category: "压力与应对",
    question: "我能够应对日常生活中的挑战。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "coping"
  },
  {
    id: 65,
    category: "压力与应对",
    question: "我感到疲惫不堪。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "fatigue"
  },
  {
    id: 66,
    category: "压力与应对",
    question: "我有睡眠问题（入睡困难、早醒等）。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "sleep"
  },
  {
    id: 67,
    category: "压力与应对",
    question: "我感到身体紧张（如肌肉紧绷、头痛等）。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "physical_tension"
  },
  {
    id: 68,
    category: "压力与应对",
    question: "我能够有效地管理时间。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "time_management"
  },
  {
    id: 69,
    category: "压力与应对",
    question: "我感到无法应对生活中的要求。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "coping"
  },
  {
    id: 70,
    category: "压力与应对",
    question: "我感到焦虑不安。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 71,
    category: "压力与应对",
    question: "我能够找到解决问题的方法。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "problem_solving"
  },
  {
    id: 72,
    category: "压力与应对",
    question: "我感到易怒或暴躁。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "irritability"
  },
  {
    id: 73,
    category: "压力与应对",
    question: "我能够放松自己。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "relaxation"
  },
  {
    id: 74,
    category: "压力与应对",
    question: "我感到担忧或不安。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "anxiety"
  },
  {
    id: 75,
    category: "压力与应对",
    question: "我能够从压力中恢复过来。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "resilience"
  },
  {
    id: 76,
    category: "压力与应对",
    question: "我感到身体不适（如胃痛、头晕等）。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "physical_symptoms"
  },
  {
    id: 77,
    category: "压力与应对",
    question: "我能够保持积极的态度。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "optimism"
  },
  {
    id: 78,
    category: "压力与应对",
    question: "我感到无法集中注意力。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "concentration"
  },
  {
    id: 79,
    category: "压力与应对",
    question: "我能够寻求他人的支持。",
    options: [
      { value: 3, text: "几乎每天" },
      { value: 2, text: "一半以上的天数" },
      { value: 1, text: "有几天" },
      { value: 0, text: "完全没有" }
    ],
    type: "social_support"
  },
  {
    id: 80,
    category: "压力与应对",
    question: "我感到生活失去控制。",
    options: [
      { value: 0, text: "完全没有" },
      { value: 1, text: "有几天" },
      { value: 2, text: "一半以上的天数" },
      { value: 3, text: "几乎每天" }
    ],
    type: "control"
  },
  
  // 第五部分：生活习惯评估 (20题)
  {
    id: 81,
    category: "生活习惯",
    question: "我有规律的作息时间。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "sleep_hygiene"
  },
  {
    id: 82,
    category: "生活习惯",
    question: "我每天进行体育锻炼。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "exercise"
  },
  {
    id: 83,
    category: "生活习惯",
    question: "我有健康的饮食习惯。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "diet"
  },
  {
    id: 84,
    category: "生活习惯",
    question: "我有足够的休闲时间。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "leisure"
  },
  {
    id: 85,
    category: "生活习惯",
    question: "我经常熬夜。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "sleep_hygiene"
  },
  {
    id: 86,
    category: "生活习惯",
    question: "我有吸烟习惯。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "substance"
  },
  {
    id: 87,
    category: "生活习惯",
    question: "我有饮酒习惯。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "substance"
  },
  {
    id: 88,
    category: "生活习惯",
    question: "我有冥想或放松的习惯。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "relaxation"
  },
  {
    id: 89,
    category: "生活习惯",
    question: "我每天使用电子设备的时间过长。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "screen_time"
  },
  {
    id: 90,
    category: "生活习惯",
    question: "我有规律的工作/学习计划。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "structure"
  },
  {
    id: 91,
    category: "生活习惯",
    question: "我经常感到时间不够用。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "time_management"
  },
  {
    id: 92,
    category: "生活习惯",
    question: "我有足够的睡眠时间。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "sleep_hygiene"
  },
  {
    id: 93,
    category: "生活习惯",
    question: "我经常吃快餐或加工食品。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "diet"
  },
  {
    id: 94,
    category: "生活习惯",
    question: "我有定期进行健康检查的习惯。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "health_awareness"
  },
  {
    id: 95,
    category: "生活习惯",
    question: "我经常感到时间压力。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "time_management"
  },
  {
    id: 96,
    category: "生活习惯",
    question: "我有良好的卫生习惯。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "hygiene"
  },
  {
    id: 97,
    category: "生活习惯",
    question: "我经常感到疲劳。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "energy"
  },
  {
    id: 98,
    category: "生活习惯",
    question: "我有规律的社交活动。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "social_activity"
  },
  {
    id: 99,
    category: "生活习惯",
    question: "我经常感到孤独。",
    options: [
      { value: 0, text: "非常符合" },
      { value: 1, text: "比较符合" },
      { value: 2, text: "不太符合" },
      { value: 3, text: "完全不符合" }
    ],
    type: "social_connection"
  },
  {
    id: 100,
    category: "生活习惯",
    question: "我对自己的生活方式感到满意。",
    options: [
      { value: 3, text: "非常符合" },
      { value: 2, text: "比较符合" },
      { value: 1, text: "不太符合" },
      { value: 0, text: "完全不符合" }
    ],
    type: "life_satisfaction"
  }
];

// 计算测试结果
function calculateTestResults(answers) {
  // 各维度总分
  const scores = {
    depression: 0,          // 抑郁倾向
    anxiety: 0,             // 焦虑倾向
    anger: 0,               // 愤怒倾向
    positive: 0,            // 积极情绪
    social: 0,              // 社交功能
    social_anxiety: 0,      // 社交焦虑
    self_esteem: 0,         // 自尊
    self_criticism: 0,      // 自我批评
    self_acceptance: 0,     // 自我接纳
    optimism: 0,            // 乐观主义
    locus_of_control: 0,    // 控制感
    resilience: 0,          // 心理韧性
    self_efficacy: 0,       // 自我效能感
    life_satisfaction: 0,   // 生活满意度
    self_doubt: 0,          // 自我怀疑
    moral_self: 0,          // 道德自我
    stress: 0,              // 压力水平
    relaxation: 0,          // 放松能力
    coping: 0,              // 应对能力
    fatigue: 0,             // 疲劳程度
    sleep: 0,               // 睡眠质量
    physical_tension: 0,    // 身体紧张
    time_management: 0,     // 时间管理
    problem_solving: 0,     // 问题解决能力
    irritability: 0,        // 易怒性
    physical_symptoms: 0,   // 身体症状
    concentration: 0,       // 注意力
    social_support: 0,      // 社会支持
    control: 0,             // 控制感
    sleep_hygiene: 0,       // 睡眠卫生
    exercise: 0,            // 运动习惯
    diet: 0,                // 饮食习惯
    leisure: 0,             // 休闲活动
    substance: 0,           // 物质使用
    screen_time: 0,         // 屏幕时间
    structure: 0,           // 生活结构
    health_awareness: 0,    // 健康意识
    hygiene: 0,             // 卫生习惯
    energy: 0,              // 精力水平
    social_activity: 0,     // 社交活动
    social_connection: 0    // 社交连接
  };

  // 统计各维度得分
  answers.forEach(answer => {
    const question = psychologicalTestQuestions.find(q => q.id === answer.questionId);
    if (question) {
      scores[question.type] += answer.value;
    }
  });

  // 计算总分和风险等级
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const maxTotalScore = psychologicalTestQuestions.length * 3; // 每题最高3分
  const percentageScore = (totalScore / maxTotalScore) * 100;

  // 计算各维度风险等级
  const dimensionLevels = {};
  Object.keys(scores).forEach(dimension => {
    const dimensionQuestions = psychologicalTestQuestions.filter(q => q.type === dimension);
    const dimensionMaxScore = dimensionQuestions.length * 3;
    const dimensionPercentage = (scores[dimension] / dimensionMaxScore) * 100;
    
    if (dimensionPercentage < 30) {
      dimensionLevels[dimension] = { level: "low", percentage: dimensionPercentage };
    } else if (dimensionPercentage < 60) {
      dimensionLevels[dimension] = { level: "medium", percentage: dimensionPercentage };
    } else {
      dimensionLevels[dimension] = { level: "high", percentage: dimensionPercentage };
    }
  });

  // 计算总体风险等级
  let overallLevel;
  if (percentageScore < 30) {
    overallLevel = "green"; // 健康
  } else if (percentageScore < 60) {
    overallLevel = "yellow"; // 轻度风险
  } else {
    overallLevel = "red"; // 建议专业介入
  }

  // 生成建议
  let suggestions = [];
  
  if (overallLevel === "green") {
    suggestions.push("您的心理健康状况良好！建议继续保持健康的生活方式和积极的心态。");
  } else if (overallLevel === "yellow") {
    suggestions.push("您可能存在一些轻度的心理压力或情绪困扰。建议尝试放松技巧、增加社交活动、保持健康的生活习惯。");
    
    // 根据各维度得分提供具体建议
    if (dimensionLevels.depression.level === "high") {
      suggestions.push("您可能有抑郁倾向，建议多参与户外活动，与亲友保持联系，必要时寻求专业帮助。");
    }
    
    if (dimensionLevels.anxiety.level === "high") {
      suggestions.push("您可能有焦虑倾向，建议尝试深呼吸、冥想等放松技巧，减少咖啡因摄入。");
    }
    
    if (dimensionLevels.sleep.level === "high") {
      suggestions.push("您可能有睡眠问题，建议保持规律作息，睡前避免使用电子设备，创造舒适的睡眠环境。");
    }
  } else {
    suggestions.push("您的心理状态可能需要专业关注。建议尽快联系校医院心理科或专业心理咨询师进行评估和干预。");
    
    // 根据各维度得分提供具体建议
    if (dimensionLevels.depression.level === "high") {
      suggestions.push("您的抑郁倾向较为明显，专业心理干预可能对您有帮助。");
    }
    
    if (dimensionLevels.anxiety.level === "high") {
      suggestions.push("您的焦虑水平较高，建议寻求专业心理咨询，学习应对焦虑的技巧。");
    }
    
    if (dimensionLevels.self_esteem.level === "low") {
      suggestions.push("您的自尊水平可能较低，心理咨询可以帮助您建立更健康的自我认知。");
    }
  }

  return {
    totalScore,
    percentageScore,
    overallLevel,
    dimensionLevels,
    suggestions
  };
}
