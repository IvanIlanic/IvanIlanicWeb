// Personal reflections, rather than claims about tool performance or security outcomes.
export const programmingChapters = [
  {
    id: "why",
    file: "01_why_i_build.md",
    label: "The starting point",
    command: "cat why_i_build.md",
    heading: "A laptop. An idea. A way to make a difference.",
    paragraphs: [
      "What made me fall in love with programming was noticing a problem and realising I could do something about it. I could disappear into a question, take it apart, and build something that made someone’s day a little easier.",
      "There’s something extraordinary about that freedom. With a simple laptop and freely available tools, you can start turning an idea into something useful. You don’t need a factory or a huge budget to create something that could change the world—or the lives of the people around you.",
    ],
    tags: ["Curiosity", "Accessible tools", "Useful solutions"],
    note: "Start with a problem worth understanding.",
  },
  {
    id: "interface",
    file: "02_the_human_side.md",
    label: "The human side",
    command: "cat the_human_side.md",
    heading: "The interface is part of the conversation.",
    paragraphs: [
      "I’ve always enjoyed the parts of UI design where programming meets human psychology. What do people notice first? What makes a decision feel obvious? How can an interface help someone feel confident instead of lost?",
      "That’s where building becomes more than making something function. I like thinking about attention, feedback, and the small choices that make an experience feel natural. Understanding the person using a solution matters as much to me as understanding the code behind it.",
    ],
    tags: ["Human psychology", "UI design", "Clear feedback"],
    note: "Understand the person on the other side of the screen.",
  },
  {
    id: "security",
    file: "03_break_to_understand.md",
    label: "Cybersecurity",
    command: "cat break_to_understand.md",
    heading: "Sometimes understanding starts with breaking things.",
    paragraphs: [
      "At Reykjavík University, I was a cybersecurity organiser. I enjoyed solving Capture the Flag challenges and experimenting with ways IoT devices could be broken in a learning environment. Asking how something could fail made me look much more closely at how it worked.",
      "That curiosity also led to Defend the Flag, my thesis on defensive cybersecurity challenges. I’m interested in the whole loop: investigating a weakness, understanding its consequences, and finding a way to make the system more resilient.",
    ],
    tags: ["Capture the Flag", "IoT exploration", "Defensive thinking"],
    note: "Question assumptions. Understand the failure. Build a defence.",
  },
  {
    id: "direction",
    file: "04_a_new_direction.md",
    label: "AI & what comes next",
    command: "cat a_new_direction.md",
    heading: "The tools changed. So did my direction.",
    paragraphs: [
      "Honestly, the arrival of AI took much of the joy out of programming for me. Watching an LLM handle coding tasks faster than I could, while often following familiar conventions, changed my relationship with something I used to love. Writing the code itself stopped feeling like the part I wanted to pursue most.",
      "But fast output still needs scrutiny. AI-generated code can introduce vulnerabilities, and convincing-looking solutions still need someone to question, test, and understand them. That draws me toward cybersecurity and creating useful solutions, more than a career centred on software engineering alone. I still want to solve problems. I’m finding a different place to put that energy.",
    ],
    tags: ["Critical thinking", "Security review", "Creating solutions"],
    note: "Current direction → cybersecurity + meaningful solutions.",
  },
] as const;
