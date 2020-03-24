import React, { MouseEventHandler, CSSProperties } from "react";
import {
  library,
  IconDefinition,
  IconName,
  IconLookup,
  findIconDefinition,
  IconPrefix
} from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const myLibrary: any = library;

// Add all three icon sets
library.add(fas, far, fab);

const fasArray = Object.keys(myLibrary.definitions.fas);
const farArray = Object.keys(myLibrary.definitions.far);
const fabArray = Object.keys(myLibrary.definitions.fab);

const CreateFontAwesomeIcon = (pref: string, ico: string) => {
  const Lookup: IconLookup = {
    prefix: pref as IconPrefix,
    iconName: ico as IconName
  };
  const Definition: IconDefinition = findIconDefinition(Lookup);
  return <FontAwesomeIcon icon={Definition} />;
};

export const GetIconFontAwesomeByName = (Name: string) => {
  /*Retarded Method! But there is no other way to do this nicer atm.*/
  try {
    // FAS icons.
    for (let index = 0; index < fasArray.length; index++) {
      const ico = fasArray[index];
      if (Name === ico) {
        return CreateFontAwesomeIcon("fas", Name);
      }
    }

    // FAR icons
    for (let index = 0; index < farArray.length; index++) {
      const ico = farArray[index];
      if (Name === ico) {
        return CreateFontAwesomeIcon("far", Name);
      }
    }

    //FAB icons.
    for (let index = 0; index < fabArray.length; index++) {
      const ico = fabArray[index];
      if (Name === ico) {
        return CreateFontAwesomeIcon("fab", Name);
      }
    }
  } catch {
    console.error("icon not found! [" + Name + "]");
  }
  return null;
};

interface FontAwesomeIconProps {
  iconPrefix: string;
  iconName: string;
  className?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}

export const FontAwesomeIconPrefixName = (props: FontAwesomeIconProps) => {
  try {
    const Lookup: IconLookup = {
      prefix: props.iconPrefix as IconPrefix,
      iconName: props.iconName as IconName
    };
    const Definition: IconDefinition = findIconDefinition(Lookup);
    return (
      <FontAwesomeIcon
        style={props.style}
        onClick={props.onClick}
        className={props.className}
        icon={Definition}
      />
    );
  } catch (error) {
    console.error(
      "icon not found! [" + props.iconPrefix + "][" + props.iconName + "]"
    );
    return null;
  }
};
