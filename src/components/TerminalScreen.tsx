import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { iconList } from "@assets/iconList";

interface CommandItem {
  type: string;
  command?: string;
  value: string;
}

const TerminalScreen = ({
  setIsTerminalOpen,
}: {
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const FOLDERS = [...iconList.map((item) => item.name)];
  const FILES = ["README.md", "HELP.md"];
  const LISTS = [...FOLDERS, ...FILES];
  const COMMANDS = ["cd", "ls", "whoami", "cat", "clear", "exit"];
  const HELP = ["---", "COMMANDS: ", COMMANDS.join(" "), "---"].map((item) => ({
    type: "response",
    value: item,
  }));
  const README = [
    "---",
    "# 안녕하세요! 프론트엔드 개발자 장장미입니다.",
    "- email: dev.rosejang@gmail.com",
    "---",
  ].map((item) => ({ type: "response", value: item }));
  const [commandList, setCommandList] = useState<CommandItem[]>([
    ...README,
    ...HELP.slice(1),
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /** 터미널 명령어 검사 함수 */
  const CheckCommandValue = (value: string): CommandItem | undefined => {
    const filterdArr = value.split(" ").filter((item) => item !== "");
    const head = filterdArr[0];
    const tail = filterdArr.slice(1).join(" ");
    const tailLower = tail.toLowerCase();
    const folderNames = FOLDERS.map((item) => item.toLowerCase());
    const fileNames = FILES.map((item) => item.toLowerCase());

    setCommandList((cur) => [
      ...cur,
      { type: "command", command: head, value: tail },
    ]);

    // * clear
    if (head === "clear") {
      setCommandList([]);
      return;
    }
    // * exit
    if (head === "exit") {
      setIsTerminalOpen(false);
    }
    // * whoami
    if (head === "whoami") {
      if (tail !== "") {
        return { type: "response", value: "usage: whoami" };
      }
      return { type: "response", value: "RoseJang/FrontEnd-Developer" };
    }
    // * ls
    if (head === "ls") {
      if (tail !== "" && tail !== "-al") {
        return {
          type: "response",
          value: `ls: ${tail}: No such file or directory`,
        };
      }
      return { type: "response", value: `${LISTS.join(" ")}` };
    }
    // * cd
    if (head === "cd") {
      if (tail === "") {
        return;
      }
      if (folderNames.includes(tailLower)) {
        const openLink = iconList.filter(
          (item) => item.name.toLowerCase() === tail
        )[0].link;
        window.open(openLink);
        return;
      }
      if (fileNames.includes(tailLower)) {
        return { type: "response", value: `cd: not a directory: ${tail}` };
      }
      return {
        type: "response",
        value: `cd: no such file or directory: ${tail}`,
      };
    }
    // * cat
    if (head === "cat") {
      if (tail === "") {
        return;
      }
      if (tailLower === "readme.md") {
        setCommandList((cur) => [...cur, ...README]);
        return;
      }
      if (tailLower === "help.md") {
        setCommandList((cur) => [...cur, ...HELP]);
        return;
      }
      if (folderNames.includes(tailLower)) {
        return {
          type: "response",
          value: `cat: ${tail}: Is a directory`,
        };
      }
      return {
        type: "response",
        value: `cat: ${tail}: No such file or directory`,
      };
    }
    // * error
    return { type: "response", value: `command not found: ${head}` };
  };

  const handleSubmitCommand = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (inputValue.replaceAll(" ", "") === "") {
      setCommandList((cur) => [...cur, { type: "command", value: "" }]);
      setInputValue("");
      return;
    }
    const checkedValue = CheckCommandValue(inputValue);
    if (checkedValue !== undefined) {
      setCommandList((cur) => [...cur, checkedValue]);
    }
    setInputValue("");
  };

  const autoScroll = () => {
    if (screenRef.current !== null) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  };

  const autoFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { code } = event;
    console.log(code);
  };

  useEffect(() => {
    autoScroll();
  }, [commandList]);

  return (
    <Screen ref={screenRef} onClick={autoFocusInput}>
      {commandList.map((item, index) => (
        <div key={index} className={`list-item ${item.type}`}>
          {item.type === "command" && <span className="command-icon">$</span>}
          <p>
            {item.command !== undefined && (
              <span
                className={
                  COMMANDS.includes(item.command)
                    ? "command-allow"
                    : "command-not-allow"
                }
              >
                {item.command + " "}
              </span>
            )}
            {item.value}
          </p>
        </div>
      ))}
      <CommandInput className="list-item" onSubmit={handleSubmitCommand}>
        <span className="command-icon">$ </span>
        <input
          className="command-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => handleKeyDown(event)}
          ref={inputRef}
          autoFocus
        />
      </CommandInput>
    </Screen>
  );
};

const Screen = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
  background-color: #111;
  color: #fff;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow: auto;
  cursor: text;

  * {
    font-family: "Fira Code", monospace;
  }
  .list-item {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    display: flex;
    align-items: center;
  }
  .command-icon {
    color: #00eabb;
    align-self: flex-start;
  }
  .command-allow {
    color: #77ff00;
  }
  .command-not-allow {
    color: #fb5126;
  }
`;

const CommandInput = styled.form`
  background-color: rgba(255, 255, 255, 0.1);
  .command-input {
    caret-color: #fff;
    border: none;
    background-color: transparent;
    width: calc(100% - 1rem);
    color: #fff;
    font-size: 1rem;
    :focus {
      outline: none;
    }
  }
`;

export default TerminalScreen;
