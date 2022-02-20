import React from "react";
import { Settings } from "../../Settings/Settings";

export function ColoredLogLine(line: string): React.ReactElement {
  const partStyle: React.CSSProperties = {
    fontWeight: 'unset',
    textDecoration: 'unset',
    fontStyle: 'unset',
    color: 'unset',
    backgroundColor: 'unset',
  }
  const parts = line.split('\x1b').map((part) => {
    const [ , codeString, text ] = part.match(/^(?:\[([\d;]+)m)?(.*)$/) || [];
    const codes = codeString?.split(';') ?? [];
    const style = {
      ...partStyle,
    };
    for (const code of codes) {
      switch (code) {
        // Reset everything
        case "0": {
          Object.assign(style, {
            fontWeight: 'unset',
            textDecoration: 'unset',
            color: 'unset',
            backgroundColor: 'unset',
          });
          break;
        }

        // Emphasis: bold, underline, italic
        case "1": style.fontWeight = 'bolder'; break;
        case "2": style.fontWeight = 'lighter'; break;
        case "3": style.fontStyle = 'italic'; break;
        case "4": style.textDecoration = 'underline'; break;
        // Unset emphasis
        case "21":
        case "22": style.fontWeight = 'unset'; break;
        case "23": style.fontStyle = 'unset'; break;
        case "24": style.textDecoration = 'unset'; break;

        // Unset foreground/background colors
        case "39": style.color = 'unset'; break;
        case "49": style.backgroundColor = 'unset'; break;

        // Set foreground color
        case "30": style.color = Settings.theme.terminalblack; break;
        case "31": style.color = Settings.theme.terminalred; break;
        case "32": style.color = Settings.theme.terminalgreen; break;
        case "33": style.color = Settings.theme.terminalyellow; break;
        case "34": style.color = Settings.theme.terminalblue; break;
        case "35": style.color = Settings.theme.terminalmagenta; break;
        case "36": style.color = Settings.theme.terminalcyan; break;
        case "37": style.color = Settings.theme.terminalwhite; break;
        // Bright foreground
        case "90": style.color = Settings.theme.terminalbrightblack; break;
        case "91": style.color = Settings.theme.terminalbrightred; break;
        case "92": style.color = Settings.theme.terminalbrightgreen; break;
        case "93": style.color = Settings.theme.terminalbrightyellow; break;
        case "94": style.color = Settings.theme.terminalbrightblue; break;
        case "95": style.color = Settings.theme.terminalbrightmagenta; break;
        case "96": style.color = Settings.theme.terminalbrightcyan; break;
        case "97": style.color = Settings.theme.terminalbrightwhite; break;

        // Set background color
        case "40": style.backgroundColor = Settings.theme.terminalblack; break;
        case "41": style.backgroundColor = Settings.theme.terminalred; break;
        case "42": style.backgroundColor = Settings.theme.terminalgreen; break;
        case "43": style.backgroundColor = Settings.theme.terminalyellow; break;
        case "44": style.backgroundColor = Settings.theme.terminalblue; break;
        case "45": style.backgroundColor = Settings.theme.terminalmagenta; break;
        case "46": style.backgroundColor = Settings.theme.terminalcyan; break;
        case "47": style.backgroundColor = Settings.theme.terminalwhite; break;
        // Bright background
        case "100": style.backgroundColor = Settings.theme.terminalbrightblack; break;
        case "101": style.backgroundColor = Settings.theme.terminalbrightred; break;
        case "102": style.backgroundColor = Settings.theme.terminalbrightgreen; break;
        case "103": style.backgroundColor = Settings.theme.terminalbrightyellow; break;
        case "104": style.backgroundColor = Settings.theme.terminalbrightblue; break;
        case "105": style.backgroundColor = Settings.theme.terminalbrightmagenta; break;
        case "106": style.backgroundColor = Settings.theme.terminalbrightcyan; break;
        case "107": style.backgroundColor = Settings.theme.terminalbrightwhite; break;
      }
    }
    Object.assign(partStyle, style);
    return {
      text,
      style,
    }
  });

  return (
    <>
      {parts.map((part, idx) => (
        <span key={idx} style={part.style}>
          {part.text}
        </span>
      ))}
    </>
  );
}
