import React, { Component } from "react";

export interface HeaderItem {
  icon: string;
  title: string;
}

interface HeaderProviderState {
  HeaderItem: HeaderItem;
}

const HeaderContext = React.createContext({});

class HeaderProvider extends Component<HeaderItem, HeaderProviderState> {
  // Context state

  constructor(props: HeaderItem) {
    super(props);
    this.state = {
      HeaderItem: {
        title: localStorage.getItem("headerTitle") ?? props.title,
        icon: localStorage.getItem("headerIcon") ?? props.icon
      }
    };
  }

  // Method to update state
  public setHeaderItem = (HeaderItem: HeaderItem) => {
    this.setState(prevState => ({
      HeaderItem
    }));
    localStorage.setItem("headerTitle", HeaderItem.title);
    localStorage.setItem("headerIcon", HeaderItem.icon);
  };

  render() {
    const { children } = this.props;
    const { HeaderItem } = this.state;
    const { setHeaderItem } = this;

    return (
      <HeaderContext.Provider
        value={{
          HeaderItem,
          setHeaderItem
        }}
      >
        {children}
      </HeaderContext.Provider>
    );
  }
}

export default HeaderContext;
export { HeaderProvider };
