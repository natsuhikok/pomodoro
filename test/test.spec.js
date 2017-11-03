import { expect } from 'chai';

beforeEach(() => {
});

// reset DB
afterEach((done) => {
  done();
});

describe('test', () => {
  it(
    'test',
    (done) => {
      expect(1).to.be.a('Number');
      // expect(doc).to.have.keys(keys.memo);
      expect('this is updated title').to.equal('this is updated title');
      done();
    },
  );
});
