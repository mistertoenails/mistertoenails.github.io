var textBox = document.getElementById("console");
var data = {
  unblockers: {
    hu: [],
    van: [],
    tsu: [],
    getAll: () => {
      return data.unblockers.hu.concat(
        data.unblockers.van,
        data.unblockers.tsu
      );
    }
  }
};
function generateTable(config) {
  var htmlString = "<table> <tr>";
  for (var row of config.titles) {
    htmlString += "<th>" + row + "</th>";
  }
  htmlString += "</tr>";
  for (var row of config.data) {
    htmlString += "<tr>";
    for (var item of row) {
      htmlString += "<td>" + item + "</td>";
    }
    htmlString += "</tr>";
  }
  htmlString += "</table>";
  return htmlString;
}

class Command {

  constructor(name, args, description, func) {
    this.name = name;
    this.args = "";
    if (args.length > 0) {
      for (var arg of args) {
        this.args += arg.name + ": " + arg.type + ", ";
      }
    } else {
      this.args = "none";
    }
    this.argsNum = args.length;
    this.function = (args) => {
      if (args.length - 1 !== this.argsNum) {
        appendConsole(
          "This command takes " +
            this.argsNum +
            " argument(s). Type 'help' for more information."
        );
      } else {
        func(args);
      }
    };
    this.description = description;
  }
}
var dataArray;
var commands = [
  new Command("hello", [], "Say hello", (args) => {
    appendConsole("hello!");
  }),

  new Command(
    "unblocker",
    [{ name: "type", type: "hu/van/tsu/any" }],
    "Get an unblocker link",
    (args) => {
      let type = args[1];

      dataArray = [];
      var wrongParam = false;
      if (type === "any") {
        for (var unblocker of data.unblockers.getAll()) {
          dataArray.push([unblocker.type, unblocker.url]);
        }
      } else if (type === "hu") {
        for (var unblocker of data.unblockers.hu) {
          dataArray.push([unblocker.type, unblocker.url]);
        }
      } else if (type === "van") {
        for (var unblocker of data.unblockers.van) {
          dataArray.push([unblocker.type, unblocker.url]);
        }
      } else if (type === "tsu") {
        for (var unblocker of data.unblockers.tsu) {
          dataArray.push([unblocker.type, unblocker.url]);
        }
      } else {
        wrongParam = true;
        appendConsole(
          "Incorrect param- This command takes a type argument of either hu (holy unblocker), van (vanadium), tsu (tsunami), or any, which returns all available unblockers. Type help for more help with commands."
        );
      }
      console.log("OK");
      if (dataArray.length > 0) {
        appendConsole(
          generateTable({
            titles: ["Type", "URL"],
            data: dataArray
          })
        );
      } else {
        if (!wrongParam) {
          appendConsole(
            "There are no unblockers of type '" + type + "' right now. Sorry!"
          );
        }
      }
    }
  )
];
function generateHelpTable() {
  var tableString =
    "<table> <tr><th>Command</th> <th>Function</th> <th> Arguments </th> </tr>";
  for (var command of commands) {
    tableString +=
      "<tr> <td>" +
      command.name +
      "</td> <td>" +
      command.description +
      "</td> <td>" +
      command.args +
      "</td> </tr>";
  }

  tableString += "</table>";
  return tableString;
}
commands.unshift({
  name: "help",
  function: () => {
    appendConsole(generateHelpTable());
  },
  description: "Shows this message",
  args: "none"
});
document.getElementById("console").addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Enter") {
      foundCommand = false;
      for (command of commands) {
        if (command.name === textBox.value.split(" ")[0]) {
          command.function(textBox.value.split(" "));
          foundCommand = true;
        }
      }
      if (!foundCommand) {
        appendConsole("No command found. Type 'help' for a list of commands. ");
      }
    }
  },
  false
);
function appendConsole(text) {
  let newHTML =
    "<p class = 'consoleText'>> " +
    textBox.value +
    "</p> </br> <p class = 'consoleText'>" +
    text +
    "</p> <br/>";
  document.getElementById("consoleOutput").innerHTML += newHTML;
  textBox.value = "";
}
function sayHello() {
  console.log("hello");
  appendConsole("Hello there!");
}
