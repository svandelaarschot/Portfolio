import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  ThemeProvider,
  CSSProperties,
  createGlobalStyle
} from "styled-components";

/* ======== Minimal Implementation Example ==================
// Source: [https://react-bootstrap.github.io/components/modal]

 const [isOpen, setIsOpen] = React.useState(false);
 const showModal = () => {
  setIsOpen(true);
 };

 const hideModal = () => {
  setIsOpen(false);
 };

// return JSX Modal Component.
 return (
  <ModalDialog
    size={"xl"}
    component={Home}
    hideModal={hideModal}
    isOpen={isOpen}
    showModal={showModal}
  />
 );
================================================= */
interface ModalDialogProps {
  /**
   * Header Title.
   */
  title?: string;

  /**
   * Body Content.
   */
  body?: string;

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
   */
  backdrop?: "static" | true | false;

  /**
   * Close the modal when escape key is pressed
   */
  keyboard?: boolean;

  /**
   * Text of the Save Button.
   */
  buttonSaveText?: string;

  /**
   * is the modal shown or not.
   */
  isOpen: boolean;

  /**
   * Specify whether the Component should contain a close button.
   */
  closeButton?: boolean;

  /**
   * Allows scrolling the <Modal.Body> instead of the entire Modal when overflowing.
   */
  scrollable?: boolean;

  /**
   * Specify whether the Component should be vertically centered.
   */
  centered?: boolean;

  /**
   * Show the Save button.
   */
  showSaveButton?: boolean;

  /**
   * Render a large, extra large or small modal.
   */
  size?: "sm" | "lg" | "xl";

  /**
   * A callback fired when the Save button is clicked.
   */
  onSave?: () => void;

  /**
   * A callback fired when the Modal is opening.
   */
  showModal: () => void;

  /**
   * A callback fired when the header closeButton or non-static backdrop is clicked. Required if either are specified.
   */
  hideModal: () => void;

  /**
   * A callback fired when the Modal is opening.
   */
  onShow?: () => void;

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter?: () => void;

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered?: () => void;

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering?: () => void;

  /**
   * A callback fired when the escape key, if specified in keyboard, is pressed.
   */
  onEscapeKeyDown?: () => void;

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit?: () => void;

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited?: () => void;

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting?: () => void;

  disableHeader?: boolean;

  disableFooter?: boolean;

  style?: CSSProperties;

  boxWidth?: string;

  boxHeight?: string;

  opacity?: number;
}

type CSSProps = {
  boxWidth?: string;
  boxHeight?: string;
  opacity?: number;
};

const CSS = createGlobalStyle<CSSProps>`
  .modal-backdrop.show {
      opacity: .${props => props.opacity};
  };
  .modal-content {
    width: ${props => props.boxWidth};
    height: ${props => props.boxHeight};
  }
  .modal-dialog {
    ${props => (props.boxWidth ? "margin-top:0px !important" : "")};
    ${props => (props.boxWidth ? "padding:34px !important" : "")};
  }
  .modal-xl {
    min-width: ${props => props.boxWidth};
    min-height: ${props => props.boxHeight};
  }
  .modal {
    ${props => (props.boxWidth ? "padding:2px !important" : "")};
  }
`;
export class ModalDialog extends React.PureComponent<ModalDialogProps> {
  static defaultProps = {
    keyboard: true,
    backdrop: true,
    showSaveButton: true,
    size: "sm",
    title: "Modal Title",
    body: "",
    buttonSaveText: "Save",
    showModal: false,
    disableHeader: false,
    disableFooter: false,
    boxWidth: "unset",
    boxHeight: "unset",
    opacity: 7
  };
  render() {
    return (
      <>
        <ThemeProvider theme={this.props}>
          <CSS
            boxHeight={this.props.boxHeight}
            boxWidth={this.props.boxWidth}
            opacity={this.props.opacity}
          />
          <Modal
            keyboard={this.props.keyboard}
            backdrop={this.props.backdrop}
            centered={this.props.centered}
            scrollable={this.props.scrollable}
            onEnter={this.props.onEnter}
            onEntered={this.props.onEntered}
            onEntering={this.props.onEntering}
            onEscapeKeyDown={this.props.onEscapeKeyDown}
            onExit={this.props.onExit}
            onExited={this.props.onExited}
            onExiting={this.props.onExiting}
            size={this.props.size}
            dialogClassName={"ModalDialog"}
            show={this.props.isOpen}
            onHide={this.props.hideModal}
          >
            {!this.props.disableHeader && (
              <Modal.Header closeButton={this.props.closeButton}>
                <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>
            )}
            <Modal.Body style={this.props.style}>
              {this.props.body}
              {this.props.children}
            </Modal.Body>
            {!this.props.disableFooter && (
              <Modal.Footer>
                <button
                  className="btn btn-danger"
                  onClick={this.props.hideModal}
                >
                  Cancel
                </button>
                {this.props.showSaveButton ? (
                  <button
                    className="btn btn-success"
                    onClick={this.props.onSave}
                  >
                    {this.props.buttonSaveText}
                  </button>
                ) : null}
              </Modal.Footer>
            )}
          </Modal>
        </ThemeProvider>
      </>
    );
  }
}
