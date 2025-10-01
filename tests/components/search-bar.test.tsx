import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchBar } from "@/components/search-bar"

describe("SearchBar", () => {
  it("disables search button when input is empty", () => {
    render(<SearchBar onSearch={() => {}} />)
    const btn = screen.getByRole("button", { name: /search/i })
    expect(btn).toBeDisabled()
  })

  it("enables search and calls onSearch with trimmed value", async () => {
    const user = userEvent.setup()
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)

    const input = screen.getByPlaceholderText(/enter city name/i)
    await user.type(input, "  Tokyo  ")

    const btn = screen.getByRole("button", { name: /search/i })
    expect(btn).toBeEnabled()

    await user.click(btn)
    expect(onSearch).toHaveBeenCalledWith("Tokyo")
    expect(onSearch).toHaveBeenCalledTimes(1)
  })
})
