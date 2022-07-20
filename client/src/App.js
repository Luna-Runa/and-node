import { Container } from "react-bootstrap";
import React from "react";
import Router from "./Routes";
import { withRouter } from "react-router-dom";

function App() {
  return (
    <Container style={{ minHeight: "75vh" }}>
      <Router />
    </Container>
  );
}

export default withRouter(App);
