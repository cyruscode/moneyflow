import { MoneyflowAppPage } from './app.po';

describe('moneyflow-app App', function() {
  let page: MoneyflowAppPage;

  beforeEach(() => {
    page = new MoneyflowAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
