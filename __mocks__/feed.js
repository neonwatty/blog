const mockRss2 = jest.fn().mockReturnValue('<?xml version="1.0"?><rss></rss>')
const mockJson1 = jest.fn().mockReturnValue('{"items":[]}')
const mockAtom1 = jest.fn().mockReturnValue('<?xml version="1.0"?><feed></feed>')
const mockAddItem = jest.fn()

const Feed = jest.fn().mockImplementation((options) => ({
  options,
  items: [],
  addItem: mockAddItem,
  rss2: mockRss2,
  json1: mockJson1,
  atom1: mockAtom1,
}))

module.exports = {
  Feed,
  __mockAddItem: mockAddItem,
  __mockRss2: mockRss2,
  __mockJson1: mockJson1,
  __mockAtom1: mockAtom1,
}
