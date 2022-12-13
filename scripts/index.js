const contactFormObj = {
  name: "",
  email: "",
  purpose: "",
};
var myTerminal = new Terminal(10);
terminal.appendChild(myTerminal.html);
myTerminal.setTextSize("20px");
myTerminal.setTextColor("#00FF00");
myTerminal.blinkingCursor(true);
myTerminal.setHeight(window.innerHeight);

function initializeTerminal() {
  const date = new Date();
  myTerminal.print(
    "==> Your session started at " +
      date.toDateString() +
      " " +
      date.toLocaleTimeString()
  );
  myTerminal.print("> Welcome to the terminal of Ben Hesseldieck!");
  myTerminal.print("> This terminal will give all info about me.");
  myTerminal.print("> Looking forward to get in touch with you!");
  myTerminal.print("--------------------------------------------------------");
  myTerminal.print("> Enter `help` to list the available commands");
  myTerminal.input("", (command) => {
    handleInput(command);
  });
}

initializeTerminal();

const handleInput = (command) => {
  if (command.length) {
    command = command.toLowerCase();
    try {
      commandMap[command]();
    } catch {
      handleError(command);
    }
  }
  if (command !== "exit") {
    myTerminal.input("", (command2) => {
      handleInput(command2);
    });
  }
};

const showAbout = () => {
  myTerminal.print("==> I am Ben Hesseldieck");
  myTerminal.print(
    "> A language-agnostic Software Engineer and people-first Engineering Leader with 9 years of professional experience building web and mobile applications across various architectures in cloud and on premise environments."
  );
  myTerminal.print(
    "> I have a proven track record assembling and managing happy, cohesive and high-performing engineering teams. I've grown into a manager in progressive people-first companies, and I have experience making good teams great. Most importantly I do my best to be a decent, empathetic human being who's fun to work with."
  );
  myTerminal.print(
    "> I am primarily interested in senior+ individual contributor roles, or engineering leadership roles with a strong hands-on development component."
  );
  myTerminal.print(
    "> Architecting and implementing modern, high-quality web or mobile applications and backend systems, combining good programming practices with latest tools and technologies is my passion."
  );
  myTerminal.print(
    "> Product wise I love building tools that make teams and developers more effective."
  );
  myTerminal.print(
    "> I am a strong believer in the power of open source and the community"
  );
  myTerminal.print(
    "> I am genuinely interested in understanding how nature works and how we make use of that knowledge to advance mankind. Further, I love to explore foreign countries and their culture, I strongly believe that the real treasure of mankind lies in its people."
  );
};

const showTechnologies = () => {
  myTerminal.print("--------------------------------------------------------");
  myTerminal.print("********************* Tech Stack ***********************");
  myTerminal.print("--------------------------------------------------------");
  const skills = [
    { name: "Javascript / Typescript" },
    { name: "Node.js (Express, Nest, Fastify)" },
    { name: "React / React Native / Next.js" },
    { name: "Vue / Nuxt" },
    { name: "Elixir & Phoenix" },
    { name: "Ruby on Rails" },
    { name: "Swift" },
    { name: "GraphQL & Apollo" },
    { name: "Vite / Webpack" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Temporal" },
    { name: "Posgresql" },
    { name: "MySQL" },
    { name: "SQLite" },
    { name: "MongoDB " },
    { name: "Git + GitHub / GitLab" },
  ];
  skills.forEach((element) => {
    myTerminal.print(` > ${element.name}`);
  });
  myTerminal.print("========================================================");
};

const showContact = () => {
  myTerminal.print("==> You can contact me via:");
  myTerminal.print("> bhesseldieck@gmail.com");
  myTerminal.print("> https://github.com/bhesseldieck");
  myTerminal.print("> https://www.linkedin.com/in/bhesseldieck");
};

const handleHelp = () => {
  myTerminal.print("==> Available commands in my terminal:");
  Object.keys(commandMap).forEach((command) => {
    myTerminal.print(` > ${command}`);
  });
};

const handleError = (command) => {
  myTerminal.print("command not found: " + command);
  myTerminal.print("enter `help` to list available commands");
};

const showWork = () => {
  const workExp = [
    {
      name: "code & co., Berlin",
      time: "Jul 2017 - Jun 2020",
      post: "Tech Lead",
      work: "Built the engineering team from scratch and lead multiple projects",
    },
  ];
  myTerminal.print("--------------------------------------------------------");
  myTerminal.print("************** Professional Experience *****************");
  myTerminal.print("--------------------------------------------------------");
  for (let i = 0; i < workExp.length; i++) {
    myTerminal.print(`> ${workExp[i].post}`);
    myTerminal.print(`> ${workExp[i].name}`);
    myTerminal.print(`> ${workExp[i].time}`);
    myTerminal.print(`> ${workExp[i].work}`);
    myTerminal.print(
      "========================================================"
    );
  }
};

const commandMap = {
  about: showAbout,
  contact: showContact,
  "git checkout github": () => window.open("https://github.com/bhesseldieck"),
  "git checkout linkedin": () =>
    window.open("https://www.linkedin.com/in/bhesseldieck"),
  "cat tech": showTechnologies,
  //   "cat work": showWork,
  help: handleHelp,
  ls: handleHelp,
  clear: () => {
    myTerminal.clear();
    initializeTerminal();
  },
  exit: () => {
    myTerminal.print("> Thank You for visiting my website!");
    setTimeout(() => document.getElementsByTagName("body")[0].remove(), 2000);
  },
};
