import { FullManagePage } from './app.po';

describe('full-manage App', () => {
  let page: FullManagePage;

  beforeEach(() => {
    page = new FullManagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
