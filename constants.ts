import { QuestionData } from './types';

export const CORRECTED_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    promptParts: {
      prefix: "请选出",
      highlight: "zhui",
      suffix: "名立希的zhui：",
    },
    correctAnswer: "椎",
    mandatoryDistractor: "稚",
    distractors: ["追", "推", "堆", "锥", "谁", "准", "骓", "锤"],
    failureImage: "./taki_fail.jpg",
  },
  {
    id: 2,
    promptParts: {
      prefix: "请选出八幡海",
      highlight: "ling",
      suffix: "的ling：",
    },
    correctAnswer: "铃",
    mandatoryDistractor: "玲",
    distractors: ["令", "零", "领", "冷", "岭", "怜", "聆", "龄"],
    failureImage: "./umiri_fail.png",
    failureText: "哈？",
  },
];