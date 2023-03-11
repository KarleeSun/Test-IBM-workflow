import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../../../App";

test("renders the landing page", async () => {
  render(<App />);
  expect(screen.getByText(/Need VetMed Placements\?/i)).toBeInTheDocument();
});

test("correctly navigates to area that link goes to", async () => {
  render(<App />);
  const studentsLink = screen.getByText("Students");
  expect(studentsLink.getAttribute("href")).toMatch("#students");

  const providerLink = screen.getByText("Providers");
  expect(providerLink.getAttribute("href")).toMatch("#providers");

  const contact = screen.getByText("Contact");
  expect(contact.getAttribute("href")).toMatch("#contact");
});

test("clicking sign-in navigates to login page", () => {
  render(<App />);
  const signIn = screen.getByText("Sign In");
  expect(signIn.getAttribute("href")).toMatch("/login");

  const logIn = screen.getByText("log in");
  expect(logIn.getAttribute("href")).toMatch("/login");
});

// TODO: add and implement student registration

test("clicking on apply now button goes to provider registration 1", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/apply now/i));
  expect(window.location.pathname).toMatch("/provider-form/1");
});

test("cookie modal appears on first page load when indeterminate localStorage", () => {
  render(<App />);
  expect(screen.getByText("Cookies")).toBeInTheDocument();
});
