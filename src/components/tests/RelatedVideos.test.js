import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { withAllContexts, withRouter } from "../../test/utils";

import RelatedVideos from "../RelatedVideos";
import { Route } from "react-router-dom";
import { fakeVideos as videos } from "../../test/videos";

describe("RelatedVideos", () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => videos);
    const { asFragment } = renderRelatedVideos();

    await waitForElementToBeRemoved(screen.queryByText("Loading..."));
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders related videos correclty", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => videos);
    renderRelatedVideos();

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith("id");
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(videos.length)
    );
  });

  it("renders loading", () => {
    fakeYoutube.relatedVideos.mockImplementation(() => videos);
    renderRelatedVideos();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error("error");
    });
    renderRelatedVideos();

    await waitFor(() => {
      expect(screen.getByText("Something is wrong 😖")).toBeInTheDocument();
    });
  });

  function renderRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );
  }
});
