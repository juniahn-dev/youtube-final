import { MemoryRouter, Routes } from "react-router-dom";

export function withRouter(route, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{route}</Routes>
    </MemoryRouter>
  );
}
