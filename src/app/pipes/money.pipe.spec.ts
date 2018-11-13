import { MoneyPipe } from './money.pipe';

describe('NumberPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyPipe();
    expect(pipe).toBeTruthy();
  });
});
