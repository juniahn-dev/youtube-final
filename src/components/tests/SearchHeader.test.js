import { render, screen } from "@testing-library/react";

import { Route } from "react-router-dom";
import SearchHeader from "../SearchHeader";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { withRouter } from "../../test/utils";

describe("SearchHeader", () => {
  // matching test snapshot
  it("renders correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders with keyword correctly", async () => {
    render(
      withRouter(<Route path="/:keyword" element={<SearchHeader />} />, "/bts")
    );

    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });

  it("navigates to results page on search button click", () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
