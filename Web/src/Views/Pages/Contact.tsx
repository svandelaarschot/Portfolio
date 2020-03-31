import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconPrefixName } from "src/Utils/Utils";

const Card = styled.div`
  margin: 0 auto;
`;

const Info = styled.p`
  color: #00d8ff;
  font-weight: bold;
  font-size: 9pt;
`;

const Container = styled.div``;
const ContactButton = styled.button``;
const ContactForm = styled.form``;
const Required = styled.em`
  color: red;
`;

const Label = styled.label`
  font-weight: bold;
`;

interface ContactState {}

export class Contact extends Component<{}, ContactState> {
  componentDidMount = () => {};

  componentDidUpdate = () => {};

  Send = () => {};

  render() {
    return (
      <Container className="wrapper">
        <div className="row">
          <div className="col-sm">
            <Card className="card" id="CardContact">
              <div className="card-header">
                <strong>
                  <FontAwesomeIcon icon={faPhoneSquareAlt} /> Contact
                </strong>
              </div>
              <ContactForm>
                <div className="card-body">
                  <div className="form-group">
                    <Info>
                      <FontAwesomeIconPrefixName
                        iconPrefix="fas"
                        iconName="exclamation-triangle"
                      />
                      &nbsp; We don't use any personal data that you fill-in. We
                      only use this to get in touch with you. By clicking send
                      you agree with this.
                    </Info>
                    <Label>
                      Your Full Name: <Required>*</Required>
                    </Label>
                    <input
                      type="text"
                      placeholder="e.g: Stefan van de Laarschot..."
                      className="form-control"
                      id="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      Your Email: <Required>*</Required>
                    </Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g: info@vandelaarschot.online..."
                      id="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      Your Comment(s): <Required>*</Required>
                    </Label>
                    <textarea
                      className="form-control"
                      id="Comments"
                      required
                    ></textarea>
                  </div>
                  <ContactButton
                    onClick={() => this.Send()}
                    role="button"
                    type="button"
                    className="btn btn-success mt-4"
                  >
                    Send
                  </ContactButton>
                </div>
              </ContactForm>
            </Card>
          </div>
        </div>
      </Container>
    );
  }
}
